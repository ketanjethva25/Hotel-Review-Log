function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'}`}
      ></i>
    );
  }
  return stars;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  return Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
}

export default function ReviewCard({ review, onView, onEdit, onDelete, index }) {
  const nights = getNights(review.checkInDate, review.checkOutDate);

  return (
    <div className="col-lg-6 col-xl-4">
      <div
        className="review-card animate-fade-in h-100 d-flex flex-column"
        style={{ animationDelay: `${(index || 0) * 0.06}s` }}
        id={`review-card-${review.id}`}
      >
        {/* Header */}
        <div className="d-flex align-items-start gap-3 mb-3">
          <div className="hotel-image-placeholder">
            <i className="bi bi-building"></i>
          </div>
          <div className="flex-grow-1 min-w-0">
            <h5 className="hotel-name mb-1 text-truncate">{review.hotelName}</h5>
            <div className="hotel-location">
              <i className="bi bi-geo-alt me-1"></i>
              {review.location}
            </div>
          </div>
        </div>

        {/* Rating & Trip Type */}
        <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
          <div className="d-flex align-items-center">
            <span className="rating-stars">{renderStars(review.rating)}</span>
            <span className="rating-value">{review.rating}.0</span>
          </div>
          {review.tripType && (
            <span className="trip-badge">
              <i className="bi bi-airplane me-1"></i>
              {review.tripType}
            </span>
          )}
        </div>

        {/* Notes Preview */}
        {review.notes && (
          <p className="review-notes mb-3">{review.notes}</p>
        )}

        {/* Meta Info */}
        <div className="d-flex align-items-center gap-3 mb-3 flex-wrap mt-auto">
          {review.checkInDate && (
            <span className="review-date">
              <i className="bi bi-calendar3 me-1"></i>
              {formatDate(review.checkInDate)}
              {review.checkOutDate && ` — ${formatDate(review.checkOutDate)}`}
            </span>
          )}
          {nights > 0 && (
            <span className="review-date">
              <i className="bi bi-moon me-1"></i>
              {nights} night{nights !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Price & Actions */}
        <div className="d-flex align-items-center justify-content-between pt-3" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <div>
            {review.pricePerNight && (
              <span className="price-badge">
                ₹{review.pricePerNight.toLocaleString('en-IN')}/night
              </span>
            )}
          </div>
          <div className="d-flex gap-2">
            <button
              className="action-btn view-btn"
              onClick={() => onView(review)}
              title="View Details"
              id={`btn-view-${review.id}`}
            >
              <i className="bi bi-eye"></i>
            </button>
            <button
              className="action-btn edit-btn"
              onClick={() => onEdit(review)}
              title="Edit Review"
              id={`btn-edit-${review.id}`}
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              className="action-btn delete-btn"
              onClick={() => onDelete(review)}
              title="Delete Review"
              id={`btn-delete-${review.id}`}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
