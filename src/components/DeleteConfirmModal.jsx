export default function DeleteConfirmModal({ show, review, onClose, onConfirm }) {
  if (!show || !review) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'var(--modal-overlay)', backdropFilter: 'blur(4px)' }} id="delete-confirm-modal">
      <div className="modal-dialog modal-dialog-centered modal-sm modal-custom">
        <div className="modal-content text-center">
          <div className="modal-body py-4">
            <div className="delete-warning-icon mx-auto">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <h5 className="mb-2" style={{ fontWeight: 600 }}>Delete Review?</h5>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Are you sure you want to delete your review for
            </p>
            <p style={{ fontWeight: 600, color: 'var(--accent-primary)', fontSize: '1rem', marginBottom: '1.5rem' }}>
              &ldquo;{review.hotelName}&rdquo;
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              This action cannot be undone.
            </p>
          </div>

          <div className="modal-footer justify-content-center border-0 pt-0 pb-4">
            <button
              type="button"
              className="btn btn-outline-glass px-4"
              onClick={onClose}
              id="btn-cancel-delete"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn px-4"
              onClick={() => onConfirm(review.id)}
              id="btn-confirm-delete"
              style={{
                background: 'linear-gradient(135deg, var(--accent-red), #b91c1c)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
              }}
            >
              <i className="bi bi-trash3 me-2"></i>Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
