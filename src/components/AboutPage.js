import React from 'react';

function AboutPage() {
  const team = [
    { name: 'Sandra T.', role: 'Founder & CEO', initials: 'ST' },
    { name: 'Marcus L.', role: 'Head of Operations', initials: 'ML' },
    { name: 'Priya K.', role: 'Driver Relations', initials: 'PK' },
    { name: 'James O.', role: 'Customer Support', initials: 'JO' },
  ];

  return (
    <div className="page">

      <div className="page-header">
        <div className="page-header-inner">
          <p className="section-label" style={{ textAlign: 'center' }}>Our story</p>
          <h1>About Book A Taxi</h1>
          <p>We started as a one-car operation in 2018. Today we serve thousands of riders a week — and we still pick up every call personally.</p>
        </div>
      </div>

      <section className="section" aria-labelledby="mission-heading">
        <p className="section-label">Why we exist</p>
        <h2 id="mission-heading">Our mission</h2>
        <p className="section-intro">Transportation should be simple, safe, and fairly priced. We built Book A Taxi because we were tired of apps that put profit before people.</p>
        <div className="cards-grid">
          {[
            { icon: '🌍', title: 'Community First', desc: 'We hire local drivers, pay fair wages, and reinvest in the neighborhoods we serve.' },
            { icon: '♿', title: 'Accessible Service', desc: 'Wheelchair-accessible vehicles available on request. We believe transportation is for everyone.' },
            { icon: '🌱', title: 'Sustainable Future', desc: "We're transitioning our fleet to hybrid and electric vehicles by 2027." },
          ].map(v => (
            <div className="card" key={v.title}>
              <div className="card-icon" aria-hidden="true">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      <section className="section" aria-labelledby="team-heading">
        <p className="section-label">The people behind the wheel</p>
        <h2 id="team-heading">Meet the team</h2>
        <div className="team-grid">
          {team.map(member => (
            <div className="team-card" key={member.name}>
              <div className="team-avatar" aria-hidden="true">{member.initials}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default AboutPage;
