import React from 'react';

function ServicesPage({ setPage }) {
  const fares = [
    { type: 'Standard', desc: 'Sedan — up to 4 passengers', base: '$3.50', mile: '$1.80', badge: 'badge-standard', label: 'Standard' },
    { type: 'Premium', desc: 'SUV / Luxury — up to 4 passengers', base: '$6.00', mile: '$2.50', badge: 'badge-premium', label: 'Premium' },
    { type: 'XL', desc: 'Van / Minibus — up to 7 passengers', base: '$7.50', mile: '$3.00', badge: 'badge-xl', label: 'XL' },
  ];

  return (
    <div className="page">

      <div className="page-header">
        <div className="page-header-inner">
          <p className="section-label" style={{ textAlign: 'center' }}>What we offer</p>
          <h1>Our Services</h1>
          <p>Straightforward rides with transparent pricing. Pick the option that fits your group and budget.</p>
        </div>
      </div>

      <section className="section" aria-labelledby="services-heading">
        <p className="section-label">Service types</p>
        <h2 id="services-heading">Choose your ride</h2>
        <p className="section-intro">Every vehicle is inspected monthly. Every driver is licensed and background-checked.</p>
        <div className="cards-grid">
          {[
            { icon: '🚕', title: 'Standard', desc: 'Clean, reliable sedans for everyday trips. Best for solo riders or small groups up to 4.' },
            { icon: '🚙', title: 'Premium', desc: 'SUVs and luxury vehicles for a more comfortable ride. Great for business travel or a special night out.' },
            { icon: '🚐', title: 'XL', desc: 'Spacious vans for groups up to 7. Perfect for airport runs, events, or family trips.' },
            { icon: '✈️', title: 'Airport Transfers', desc: 'Fixed-price airport pickups and drop-offs. We track your flight — no extra charge for delays.' },
          ].map(s => (
            <div className="card" key={s.title}>
              <div className="card-icon" aria-hidden="true">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      <section className="section" aria-labelledby="fares-heading">
        <p className="section-label">Transparent pricing</p>
        <h2 id="fares-heading">Base fare rates</h2>
        <p className="section-intro">All fares include one piece of luggage. Additional bags may incur a small fee.</p>
        <div className="form-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="fare-table" aria-label="Service pricing table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Vehicle</th>
                <th>Base Fare</th>
                <th>Per Mile</th>
              </tr>
            </thead>
            <tbody>
              {fares.map(f => (
                <tr key={f.type}>
                  <td><span className={`badge ${f.badge}`}>{f.label}</span></td>
                  <td>{f.desc}</td>
                  <td>{f.base}</td>
                  <td>{f.mile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--warm-gray)' }}>
          * Fares may vary during peak hours or major events. All prices include applicable taxes.
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <button className="btn-primary" onClick={() => setPage('book')}>Book Now</button>
        </div>
      </section>

    </div>
  );
}

export default ServicesPage;
