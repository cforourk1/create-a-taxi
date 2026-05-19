import React from 'react';

function HomePage({ setPage }) {
  return (
    <div className="page">

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div>
          <p className="hero-eyebrow">Local. Reliable. Friendly.</p>
          <h1 id="hero-heading">
            Your ride,<br /><em>on your terms.</em>
          </h1>
          <p>Book a taxi in minutes. No surge pricing, no surprises — just safe, comfortable rides from drivers who know your city.</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => setPage('book')}>Book a Ride</button>
            <button className="btn-secondary" onClick={() => setPage('services')}>View Services</button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-stat">
            <div className="hero-stat-label">Average Wait Time</div>
            <div className="hero-stat-value">4 min</div>
            <div className="hero-stat-sub">In your neighborhood</div>
          </div>
          <div className="hero-stat-row">
            <div className="hero-stat">
              <div className="hero-stat-label">Drivers</div>
              <div className="hero-stat-value">200+</div>
              <div className="hero-stat-sub">Licensed & vetted</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-label">Rating</div>
              <div className="hero-stat-value">4.9 ★</div>
              <div className="hero-stat-sub">Avg. driver rating</div>
            </div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-label">Base Fare</div>
            <div className="hero-stat-value">$3.50</div>
            <div className="hero-stat-sub">+ $1.80 per mile</div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Why us */}
      <section className="section" aria-labelledby="why-heading">
        <p className="section-label">Why Book A Taxi</p>
        <h2 id="why-heading">Simple. Safe. Straightforward.</h2>
        <p className="section-intro">We're a locally-owned service focused on doing one thing really well — getting you where you need to go.</p>
        <div className="cards-grid">
          {[
            { icon: '📍', title: 'Real-Time Tracking', desc: 'See your driver on the map from the moment they accept your ride.' },
            { icon: '💳', title: 'Flat Rate Pricing', desc: 'Know your fare before you book. No dynamic pricing, ever.' },
            { icon: '🔒', title: 'Safe & Vetted', desc: 'Every driver passes a background check and vehicle inspection.' },
            { icon: '🕐', title: '24 / 7 Availability', desc: "Early morning airport run or a late night out — we've got you covered." },
          ].map(item => (
            <div className="card" key={item.title}>
              <div className="card-icon" aria-hidden="true">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* CTA Strip */}
      <section className="section" style={{ textAlign: 'center', padding: '3rem 2rem' }} aria-labelledby="cta-heading">
        <p className="section-label" style={{ textAlign: 'center' }}>Ready to ride?</p>
        <h2 id="cta-heading" style={{ marginBottom: '1rem' }}>Book your taxi in under 2 minutes.</h2>
        <button className="btn-primary" onClick={() => setPage('book')}>Get Started →</button>
      </section>

    </div>
  );
}

export default HomePage;
