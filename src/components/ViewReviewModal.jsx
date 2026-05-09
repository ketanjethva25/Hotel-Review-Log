function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i key={i} className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'}`}></i>
    );
  }
  return stars;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  return Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
}

export default function ViewReviewModal({ show, review, onClose, onEdit }) {
  if (!show || !review) return null;

  const nights = getNights(review.checkInDate, review.checkOutDate);

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'var(--modal-overlay)', backdropFilter: 'blur(4px)' }} id="view-review-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg modal-custom">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <div>
              <h5 className="modal-title mb-1">{review.hotelName}</h5>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <i className="bi bi-geo-alt me-1"></i>
                {review.location}
              </div>
            </div>
            <button type="button" className="btn-close" onClick={onClose} id="btn-close-view"></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Rating & Trip Type Row */}
            <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <span className="rating-stars" style={{ fontSize: '1.3rem' }}>{renderStars(review.rating)}</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-amber)' }}>{review.rating}.0</span>
              </div>
              {review.tripType && (
                <span className="trip-badge" style={{ fontSize: '0.82rem', padding: '0.35rem 0.8rem' }}>
                  <i className="bi bi-airplane me-1"></i>{review.tripType}
                </span>
              )}
              {review.roomType && (
                <span className="trip-badge" style={{ fontSize: '0.82rem', padding: '0.35rem 0.8rem', background: 'var(--badge-room-bg)', color: 'var(--badge-room-color)', borderColor: 'var(--badge-room-border)' }}>
                  <i className="bi bi-door-open me-1"></i>{review.roomType}
                </span>
              )}
            </div>

            {/* Info Grid */}
            <div className="row g-3 mb-4">
              <div className="col-md-3 col-6">
                <div className="view-detail-label">Check-in</div>
                <div className="view-detail-value" style={{ fontSize: '0.9rem' }}>{formatDate(review.checkInDate)}</div>
              </div>
              <div className="col-md-3 col-6">
                <div className="view-detail-label">Check-out</div>
                <div className="view-detail-value" style={{ fontSize: '0.9rem' }}>{formatDate(review.checkOutDate)}</div>
              </div>
              <div className="col-md-3 col-6">
                <div className="view-detail-label">Nights</div>
                <div className="view-detail-value">{nights > 0 ? `${nights} night${nights !== 1 ? 's' : ''}` : '—'}</div>
              </div>
              <div className="col-md-3 col-6">
                <div className="view-detail-label">Price/Night</div>
                <div className="view-detail-value">
                  {review.pricePerNight ? (
                    <span className="price-badge" style={{ fontSize: '0.85rem' }}>
                      ₹{review.pricePerNight.toLocaleString('en-IN')}
                    </span>
                  ) : '—'}
                </div>
              </div>
            </div>

            {/* Total Cost */}
            {review.pricePerNight && nights > 0 && (
              <div
                className="d-flex align-items-center justify-content-between p-3 rounded-3 mb-4"
                style={{ background: 'var(--total-cost-bg)', border: '1px solid var(--total-cost-border)' }}
              >
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Estimated Total Cost</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                  ₹{(review.pricePerNight * nights).toLocaleString('en-IN')}
                </span>
              </div>
            )}

            {/* Notes */}
            {review.notes && (
              <div>
                <div className="view-detail-label mb-2">Private Notes</div>
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: 'var(--surface-3)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-lg)',
                    lineHeight: 1.75,
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {review.notes}
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="d-flex gap-4 mt-4" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {review.createdAt && (
                <span><i className="bi bi-clock me-1"></i>Created: {new Date(review.createdAt).toLocaleDateString('en-IN')}</span>
              )}
              {review.updatedAt && review.updatedAt !== review.createdAt && (
                <span><i className="bi bi-pencil me-1"></i>Updated: {new Date(review.updatedAt).toLocaleDateString('en-IN')}</span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-glass" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-gradient"
              onClick={() => { onClose(); onEdit(review); }}
              id="btn-edit-from-view"
            >
              <i className="bi bi-pencil me-2"></i>Edit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
