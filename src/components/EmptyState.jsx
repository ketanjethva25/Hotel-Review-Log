export default function EmptyState({ onAddNew, hasFilter }) {
  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-state-icon">
        <i className={`bi ${hasFilter ? 'bi-search' : 'bi-journal-bookmark'}`}></i>
      </div>
      {hasFilter ? (
        <>
          <h4>No Reviews Found</h4>
          <p>
            No hotel reviews match your current filters. Try adjusting your search
            criteria or clear the filters.
          </p>
        </>
      ) : (
        <>
          <h4>No Reviews Yet</h4>
          <p>
            Start building your personal hotel diary. Add your first review and
            keep track of every memorable stay.
          </p>
          <button
            className="btn btn-gradient mt-3"
            onClick={onAddNew}
            id="btn-add-first-review"
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Your First Review
          </button>
        </>
      )}
    </div>
  );
}
