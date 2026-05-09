export default function Navbar({ onAddNew, theme, onToggleTheme }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top" id="main-navbar">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <span className="navbar-brand-icon">
            <i className="bi bi-building"></i>
          </span>
          <span className="navbar-brand-custom">HotelLog</span>
        </a>

        <div className="d-flex align-items-center gap-2">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="btn-theme-toggle"
          >
            <i className="bi bi-sun-fill icon-sun"></i>
            <i className="bi bi-moon-fill icon-moon"></i>
          </button>
          <button
            className="btn btn-gradient d-flex align-items-center gap-2"
            onClick={onAddNew}
            id="btn-add-review-nav"
          >
            <i className="bi bi-plus-lg"></i>
            <span className="d-none d-sm-inline">Add Review</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
