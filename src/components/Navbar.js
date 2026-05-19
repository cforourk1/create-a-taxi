import React from 'react';

function Navbar({ page, setPage }) {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <div
          className="nav-logo"
          onClick={() => setPage('home')}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && setPage('home')}
          aria-label="Book A Taxi home"
        >
          🚕 Book<span>A</span>Taxi
        </div>
        <ul className="nav-links" role="list">
          {['home', 'services', 'about', 'contact'].map(p => (
            <li key={p}>
              <button
                onClick={() => setPage(p)}
                className={page === p ? 'active' : ''}
                aria-current={page === p ? 'page' : undefined}
              >
                {p === 'home' ? 'Home' : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            </li>
          ))}
          <li>
            <button
              className="nav-book-btn"
              onClick={() => setPage('book')}
              aria-current={page === 'book' ? 'page' : undefined}
            >
              Book a Ride
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
