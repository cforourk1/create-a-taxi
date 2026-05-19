import React, { useState } from 'react';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim()) e.message = 'Please enter your message.';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitted(true);
    setErrors({});
  }

  function handleChange(field, val) {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  }

  return (
    <div className="page">

      <div className="page-header">
        <div className="page-header-inner">
          <p className="section-label" style={{ textAlign: 'center' }}>Get in touch</p>
          <h1>Contact Us</h1>
          <p>Have a question? We typically respond within a few hours on business days.</p>
        </div>
      </div>

      <section className="section" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="sr-only">Contact information and form</h2>
        <div className="contact-grid">

          {/* Contact Info */}
          <div>
            <p className="section-label">Reach us</p>
            <h2 style={{ marginBottom: '1.5rem' }}>We're real people.</h2>
            {[
              { icon: '📞', label: 'Phone', value: '(313) 555-0192', sub: 'Mon–Fri, 8am–8pm' },
              { icon: '✉️', label: 'Email', value: 'hello@bookataxiapp.com', sub: 'We reply within 4 hours' },
              { icon: '📍', label: 'Address', value: '402 Woodward Ave, Detroit, MI 48226', sub: 'Walk-ins welcome' },
            ].map(item => (
              <div className="contact-info-item" key={item.label}>
                <div className="contact-info-icon" aria-hidden="true">{item.icon}</div>
                <div>
                  <h4>{item.label}</h4>
                  <p>{item.value}</p>
                  <p>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="form-card">
            {submitted ? (
              <div className="success-banner" role="alert">
                <span className="success-icon" aria-hidden="true">✅</span>
                <div>
                  <h3>Message sent!</h3>
                  <p>Thanks for reaching out, {form.name}. We'll get back to you at {form.email} within a few hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <h2 className="form-title">Send a message</h2>
                <p className="form-subtitle">All fields are required.</p>

                <div className="form-group">
                  <label htmlFor="c-name">Your name</label>
                  <input id="c-name" type="text" autoComplete="name" value={form.name} onChange={e => handleChange('name', e.target.value)} className={errors.name ? 'error' : ''} aria-describedby={errors.name ? 'c-name-err' : undefined} aria-required="true" />
                  {errors.name && <p className="field-error" id="c-name-err" role="alert">⚠ {errors.name}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="c-email">Email address</label>
                  <input id="c-email" type="email" autoComplete="email" value={form.email} onChange={e => handleChange('email', e.target.value)} className={errors.email ? 'error' : ''} aria-describedby={errors.email ? 'c-email-err' : undefined} aria-required="true" />
                  {errors.email && <p className="field-error" id="c-email-err" role="alert">⚠ {errors.email}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" rows={4} value={form.message} onChange={e => handleChange('message', e.target.value)} className={errors.message ? 'error' : ''} aria-describedby={errors.message ? 'c-msg-err' : undefined} aria-required="true" style={{ resize: 'vertical' }} />
                  {errors.message && <p className="field-error" id="c-msg-err" role="alert">⚠ {errors.message}</p>}
                </div>

                <button type="submit" className="form-submit">Send Message</button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

export default ContactPage;
