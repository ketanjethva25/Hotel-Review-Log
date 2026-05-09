export default function Footer() {
  return (
    <footer className="footer-custom" id="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-2 mb-md-0">
            <div className="d-flex align-items-center gap-2">
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'var(--gradient-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  color: 'white'
                }}
              >
                <i className="bi bi-building"></i>
              </span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                HotelLog
              </span>
            </div>
            <p className="footer-text mt-1 mb-0">Your private hotel review journal. All data stored locally.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="footer-text mb-0">
              <i className="bi bi-lock-fill me-1"></i>
              100% Private · No data leaves your browser
            </p>
            <p className="footer-text mb-0 mt-1" style={{ fontSize: '0.78rem' }}>
              © {new Date().getFullYear()} HotelLog. Built with <i className="bi bi-heart-fill" style={{ color: '#ef4444', fontSize: '0.7rem' }}></i> for travelers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
