export default function FilterBar({ searchQuery, onSearchChange }) {  {/*, ratingFilter, onRatingChange, tripFilter, onTripChange, sortBy, onSortChange*/ }
  return (
    <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
      <div className="filter-bar animate-fade-in" id="filter-bar">
        <div className="row g-3 align-items-center">
          {/* Search */}
          <div className=""> {/* col-lg-4 col-md-6 */}
            <div className="position-relative">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search hotels, locations..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                id="search-input"
              />
            </div>
          </div>

          {/* Rating Filter */}
          {/* <div className="col-lg-2 col-md-6 col-6">
            <select
              className="form-select filter-select"
              value={ratingFilter}
              onChange={(e) => onRatingChange(e.target.value)}
              id="filter-rating"
            >
              <option value="all">All Ratings</option>
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★ (4+)</option>
              <option value="3">★★★ (3+)</option>
              <option value="2">★★ (2+)</option>
              <option value="1">★ (1+)</option>
            </select>
          </div> */}

          {/* Trip Type Filter */}
          {/* <div className="col-lg-3 col-md-6 col-6">
            <select
              className="form-select filter-select"
              value={tripFilter}
              onChange={(e) => onTripChange(e.target.value)}
              id="filter-trip"
            >
              <option value="all">All Trip Types</option>
              <option value="Business">Business</option>
              <option value="Leisure">Leisure</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Family">Family</option>
              <option value="Solo">Solo</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div> */}

          {/* Sort By */}
          {/* <div className="col-lg-3 col-md-6">
            <select
              className="form-select filter-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              id="sort-by"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating-high">Rating: High to Low</option>
              <option value="rating-low">Rating: Low to High</option>
              <option value="name-az">Name: A–Z</option>
              <option value="name-za">Name: Z–A</option>
            </select>
          </div> */}
        </div>
      </div>
    </div>
  );
}
