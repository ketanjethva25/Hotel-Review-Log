export default function HeroSection() { {/*{ stats }*/}
  return (
    <section className="hero-section" id="hero-section" style={{ paddingTop: '7rem' }}>
      {/* <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="animate-fade-in">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: 'var(--hero-badge-bg)',
                    color: 'var(--hero-badge-color)',
                    border: '1px solid var(--hero-badge-border)',
                    fontSize: '0.78rem',
                    fontWeight: 500
                  }}
                >
                  <i className="bi bi-journal-bookmark-fill me-1"></i>
                  Personal Travel Diary
                </span>
              </div>
              <h1 className="hero-title">
                Your Private<br />
                <span className="gradient-text">Hotel Review</span><br />
                Journal
              </h1>
              <p className="hero-subtitle mt-3">
                Keep track of every hotel stay — rate your experience, jot down
                private notes, and build your personal travel history.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row g-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="col-6">
                <div className="stat-card">
                  <div className="d-flex align-items-center gap-3">
                    <div className="stat-icon" style={{ background: 'var(--stat-icon-1-bg)', color: 'var(--stat-icon-1-color)' }}>
                      <i className="bi bi-building"></i>
                    </div>
                    <div>
                      <div className="stat-value">{stats.total}</div>
                      <div className="stat-label">Hotels</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="stat-card">
                  <div className="d-flex align-items-center gap-3">
                    <div className="stat-icon" style={{ background: 'var(--stat-icon-2-bg)', color: 'var(--stat-icon-2-color)' }}>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <div>
                      <div className="stat-value">{stats.avgRating}</div>
                      <div className="stat-label">Avg Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="stat-card">
                  <div className="d-flex align-items-center gap-3">
                    <div className="stat-icon" style={{ background: 'var(--stat-icon-3-bg)', color: 'var(--stat-icon-3-color)' }}>
                      <i className="bi bi-globe-americas"></i>
                    </div>
                    <div>
                      <div className="stat-value">{stats.countries}</div>
                      <div className="stat-label">Countries</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="stat-card">
                  <div className="d-flex align-items-center gap-3">
                    <div className="stat-icon" style={{ background: 'var(--stat-icon-4-bg)', color: 'var(--stat-icon-4-color)' }}>
                      <i className="bi bi-moon-stars"></i>
                    </div>
                    <div>
                      <div className="stat-value">{stats.totalNights}</div>
                      <div className="stat-label">Total Nights</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
