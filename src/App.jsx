import { useState, useEffect, useMemo, useCallback } from 'react';
import { getReviews, addReview, updateReview, deleteReview, getStats } from './data';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import ReviewCard from './components/ReviewCard';
import ReviewFormModal from './components/ReviewFormModal';
import ViewReviewModal from './components/ViewReviewModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';

function getInitialTheme() {
  const saved = localStorage.getItem('hotellog-theme');
  if (saved) return saved;
  return 'dark';
}

export default function App() {
  // ─── Theme ──────────────────────────────────────
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hotellog-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // ─── State ──────────────────────────────────────
  const [reviews, setReviews] = useState(() => {
    // Clear old data to load new Indian hotel seed data
    const stored = localStorage.getItem('hotelReviews');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if data has old $ prices (< 1000 means old data)
        if (parsed.length > 0 && parsed[0].pricePerNight && parsed[0].pricePerNight < 1000 && parsed[0].hotelName === 'The Ritz-Carlton') {
          localStorage.removeItem('hotelReviews');
        }
      } catch { /* ignore */ }
    }
    return getReviews();
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [tripFilter, setTripFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [viewingReview, setViewingReview] = useState(null);
  const [deletingReview, setDeletingReview] = useState(null);

  // Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // ─── Stats ──────────────────────────────────────
  const stats = useMemo(() => getStats(reviews), [reviews]);

  // ─── Filtered & Sorted Reviews ──────────────────
  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.hotelName.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        (r.notes && r.notes.toLowerCase().includes(q)) ||
        (r.roomType && r.roomType.toLowerCase().includes(q))
      );
    }

    // Rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseInt(ratingFilter);
      result = result.filter(r => r.rating >= minRating);
    }

    // Trip type filter
    if (tripFilter !== 'all') {
      result = result.filter(r => r.tripType === tripFilter);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'rating-high':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'name-az':
        result.sort((a, b) => a.hotelName.localeCompare(b.hotelName));
        break;
      case 'name-za':
        result.sort((a, b) => b.hotelName.localeCompare(a.hotelName));
        break;
    }

    return result;
  }, [reviews, searchQuery, ratingFilter, tripFilter, sortBy]);

  const hasActiveFilters = searchQuery || ratingFilter !== 'all' || tripFilter !== 'all';

  // ─── Toast Helper ───────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
  }, []);

  // ─── CRUD Handlers ─────────────────────────────
  const handleAddNew = useCallback(() => {
    setEditingReview(null);
    setShowFormModal(true);
  }, []);

  const handleEdit = useCallback((review) => {
    setEditingReview(review);
    setShowFormModal(true);
  }, []);

  const handleView = useCallback((review) => {
    setViewingReview(review);
  }, []);

  const handleDeleteClick = useCallback((review) => {
    setDeletingReview(review);
  }, []);

  const handleSave = useCallback((formData) => {
    if (editingReview) {
      const updated = updateReview(editingReview.id, formData);
      setReviews(updated);
      showToast('Review updated successfully!', 'success');
    } else {
      const updated = addReview(formData);
      setReviews(updated);
      showToast('New review added successfully!', 'success');
    }
    setShowFormModal(false);
    setEditingReview(null);
  }, [editingReview, showToast]);

  const handleConfirmDelete = useCallback((id) => {
    const updated = deleteReview(id);
    setReviews(updated);
    setDeletingReview(null);
    showToast('Review deleted successfully.', 'info');
  }, [showToast]);

  // ─── Render ─────────────────────────────────────
  return (
    <div className="app-wrapper" id="app">
      {/* Navbar */}
      <Navbar onAddNew={handleAddNew} theme={theme} onToggleTheme={toggleTheme} />

      {/* Hero Section */}
      <HeroSection stats={stats} />

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        ratingFilter={ratingFilter}
        onRatingChange={setRatingFilter}
        tripFilter={tripFilter}
        onTripChange={setTripFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Reviews Grid */}
      <section className="container py-4" id="reviews-section">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h4 className="mb-1" style={{ fontWeight: 600 }}>
              {hasActiveFilters ? 'Filtered Results' : 'Your Reviews'}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
              {hasActiveFilters ? ' found' : ' total'}
            </p>
          </div>
          {hasActiveFilters && (
            <button
              className="btn btn-outline-glass btn-sm"
              onClick={() => { setSearchQuery(''); setRatingFilter('all'); setTripFilter('all'); }}
              id="btn-clear-filters"
            >
              <i className="bi bi-x-lg me-1"></i>Clear Filters
            </button>
          )}
        </div>

        {filteredReviews.length > 0 ? (
          <div className="row g-4">
            {filteredReviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                index={index}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <EmptyState onAddNew={handleAddNew} hasFilter={hasActiveFilters} />
        )}
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ReviewFormModal
        show={showFormModal}
        onClose={() => { setShowFormModal(false); setEditingReview(null); }}
        onSave={handleSave}
        editReview={editingReview}
      />

      <ViewReviewModal
        show={!!viewingReview}
        review={viewingReview}
        onClose={() => setViewingReview(null)}
        onEdit={handleEdit}
      />

      <DeleteConfirmModal
        show={!!deletingReview}
        review={deletingReview}
        onClose={() => setDeletingReview(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast */}
      <ToastNotification
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
}
