import { navItems } from '../data/siteContent';

export function Navbar({ menuOpen, setMenuOpen, activeSection, onNavigate }) {
  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <a href="#" className="logo" onClick={(event) => onNavigate(event, '#')}>
          Lelum Jayasooriya
        </a>
        <button
          className={`menu-toggle${menuOpen ? ' is-active' : ''}`}
          id="mobile-menu"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`} id="primary-navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={isActive ? 'is-current' : ''}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(event) => onNavigate(event, `#${item.id}`)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
