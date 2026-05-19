import React from 'react';

function Footer({ setPage }) {
  return (
    <footer>
      <p>© 2025 <span>BookATaxi</span> — Detroit, MI. All rights reserved.</p>
      <p style={{ marginTop: '0.5rem', fontSize: '0.78rem' }}>
        <button onClick={() => setPage('about')} style={{ background: 'none', border: 'none', color: '#9A9590', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif' }}>About</button>
        {' · '}
        <button onClick={() => setPage('services')} style={{ background: 'none', border: 'none', color: '#9A9590', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif' }}>Services</button>
        {' · '}
        <button onClick={() => setPage('contact')} style={{ background: 'none', border: 'none', color: '#9A9590', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif' }}>Contact</button>
      </p>
    </footer>
  );
}

export default Footer;
