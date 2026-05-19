import React, { useState, useEffect } from 'react';

function useLocalTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
}

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function getMinDate() {
  return new Date().toISOString().split('T')[0];
}

function BookingPage() {
  const localTime = useLocalTime();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    pickup: '', dropoff: '', date: getTomorrowDate(), time: '08:00',
    passengers: '1', serviceType: 'standard', notes: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const serviceRates = {
    standard: { label: 'Standard', base: 3.50, mile: 1.80 },
    premium:  { label: 'Premium',  base: 6.00, mile: 2.50 },
    xl:       { label: 'XL',       base: 7.50, mile: 3.00 },
  };
  const selected = serviceRates[form.serviceType];

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim())  e.lastName  = 'Last name is required.';
    if (!form.email.trim())     e.email     = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.phone.trim())     e.phone     = 'Phone number is required.';
    else if (!/^\+?[\d\s\-().]{7,15}$/.test(form.phone))     e.phone = 'Enter a valid phone number.';
    if (!form.pickup.trim())    e.pickup    = 'Pickup address is required.';
    if (!form.dropoff.trim())   e.dropoff   = 'Drop-off address is required.';
    if (!form.date)             e.date      = 'Please select a date.';
    if (!form.time)             e.time      = 'Please select a time.';
    return e;
  }

  function handleChange(field, val) {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  }

  function Field({ id, label, error, children }) {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        {children}
        {error && <p className="field-error" id={`${id}-err`} role="alert">⚠ {error}</p>}
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="page">
        <section className="section" style={{ maxWidth: 640, margin: '0 auto' }} aria-labelledby="confirmed-heading">
          <div className="success-banner" role="alert">
            <span className="success-icon" aria-hidden="true">🎉</span>
            <div>
              <h3 id="confirmed-heading">Booking confirmed!</h3>
              <p>Thanks {form.firstName}! We've sent your confirmation to {form.email}. Your driver will contact you before pickup.</p>
            </div>
          </div>
          <div className="form-card">
            <h2 className="form-title">Your booking summary</h2>
            <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }} aria-label="Booking summary">
              {[
                ['Passenger',  `${form.firstName} ${form.lastName}`],
                ['Service',    selected.label],
                ['Pickup',     form.pickup],
                ['Drop-off',   form.dropoff],
                ['Date',       new Date(form.date + 'T00:00:00').toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
                ['Time',       form.time],
                ['Passengers', form.passengers],
                ['Base Fare',  `$${selected.base.toFixed(2)} + $${selected.mile.toFixed(2)}/mile`],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.65rem 0', color: 'var(--warm-gray)', width: '45%' }}>{k}</td>
                  <td style={{ padding: '0.65rem 0', fontWeight: 500 }}>{v}</td>
                </tr>
              ))}
            </table>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="page-header">
        <div className="page-header-inner">
          <p className="section-label" style={{ textAlign: 'center' }}>Let's go</p>
          <h1>Book a Ride</h1>
          <p>Fill in your details below and we'll match you with a nearby driver.</p>
        </div>
      </div>

      <section className="section" aria-labelledby="book-heading">
        <h2 id="book-heading" className="sr-only">Booking form</h2>

        <div style={{ marginBottom: '1.25rem' }}>
          <span className="time-display" role="status" aria-live="polite">🕐 Your local time: {localTime}</span>
        </div>

        <div className="booking-layout">

          {/* Form */}
          <div className="form-card">
            <h2 className="form-title">Your details</h2>
            <p className="form-subtitle">All fields marked as required must be filled in.</p>

            <form onSubmit={handleSubmit} noValidate aria-label="Ride booking form">

              {/* Personal Info */}
              <fieldset style={{ border: 'none', padding: 0, marginBottom: '1.5rem' }}>
                <legend style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--warm-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Info</legend>
                <div className="form-row">
                  <Field id="b-fname" label="First name *" error={errors.firstName}>
                    <input id="b-fname" type="text" autoComplete="given-name" value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} className={errors.firstName ? 'error' : ''} aria-required="true" aria-describedby={errors.firstName ? 'b-fname-err' : undefined} />
                  </Field>
                  <Field id="b-lname" label="Last name *" error={errors.lastName}>
                    <input id="b-lname" type="text" autoComplete="family-name" value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} className={errors.lastName ? 'error' : ''} aria-required="true" aria-describedby={errors.lastName ? 'b-lname-err' : undefined} />
                  </Field>
                </div>
                <div className="form-row">
                  <Field id="b-email" label="Email address *" error={errors.email}>
                    <input id="b-email" type="email" autoComplete="email" value={form.email} onChange={e => handleChange('email', e.target.value)} className={errors.email ? 'error' : ''} aria-required="true" aria-describedby={errors.email ? 'b-email-err' : undefined} />
                  </Field>
                  <Field id="b-phone" label="Phone number *" error={errors.phone}>
                    <input id="b-phone" type="tel" autoComplete="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)} className={errors.phone ? 'error' : ''} aria-required="true" aria-describedby={errors.phone ? 'b-phone-err' : undefined} />
                  </Field>
                </div>
              </fieldset>

              {/* Trip Details */}
              <fieldset style={{ border: 'none', padding: 0, marginBottom: '1.5rem' }}>
                <legend style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--warm-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trip Details</legend>
                <Field id="b-pickup" label="Pickup address *" error={errors.pickup}>
                  <input id="b-pickup" type="text" autoComplete="street-address" placeholder="e.g. 400 Main St, Detroit, MI" value={form.pickup} onChange={e => handleChange('pickup', e.target.value)} className={errors.pickup ? 'error' : ''} aria-required="true" aria-describedby={errors.pickup ? 'b-pickup-err' : undefined} />
                </Field>
                <Field id="b-dropoff" label="Drop-off address *" error={errors.dropoff}>
                  <input id="b-dropoff" type="text" placeholder="e.g. DTW Airport, Romulus, MI" value={form.dropoff} onChange={e => handleChange('dropoff', e.target.value)} className={errors.dropoff ? 'error' : ''} aria-required="true" aria-describedby={errors.dropoff ? 'b-dropoff-err' : undefined} />
                </Field>
                <div className="form-row">
                  <Field id="b-date" label="Pickup date *" error={errors.date}>
                    <input id="b-date" type="date" min={getMinDate()} value={form.date} onChange={e => handleChange('date', e.target.value)} className={errors.date ? 'error' : ''} aria-required="true" aria-describedby={errors.date ? 'b-date-err' : undefined} />
                  </Field>
                  <Field id="b-time" label="Pickup time *" error={errors.time}>
                    <input id="b-time" type="time" value={form.time} onChange={e => handleChange('time', e.target.value)} className={errors.time ? 'error' : ''} aria-required="true" aria-describedby={errors.time ? 'b-time-err' : undefined} />
                  </Field>
                </div>
              </fieldset>

              {/* Service Options */}
              <fieldset style={{ border: 'none', padding: 0, marginBottom: '1.5rem' }}>
                <legend style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--warm-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Options</legend>
                <div className="form-row">
                  <Field id="b-service" label="Service type">
                    <select id="b-service" value={form.serviceType} onChange={e => handleChange('serviceType', e.target.value)} aria-label="Select service type">
                      <option value="standard">Standard — $3.50 base</option>
                      <option value="premium">Premium — $6.00 base</option>
                      <option value="xl">XL — $7.50 base</option>
                    </select>
                  </Field>
                  <Field id="b-passengers" label="Passengers">
                    <select id="b-passengers" value={form.passengers} onChange={e => handleChange('passengers', e.target.value)} aria-label="Number of passengers">
                      {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </Field>
                </div>
                <Field id="b-notes" label="Special requests (optional)">
                  <textarea id="b-notes" rows={2} placeholder="e.g. child seat needed, wheelchair accessible vehicle" value={form.notes} onChange={e => handleChange('notes', e.target.value)} style={{ resize: 'vertical' }} />
                </Field>
              </fieldset>

              <button type="submit" className="form-submit">Confirm Booking →</button>
            </form>
          </div>

          {/* Sidebar Summary */}
          <aside className="booking-summary-card" aria-label="Booking summary">
            <h2 className="summary-title">Fare estimate</h2>
            <div className="summary-row">
              <span className="summary-label">Service</span>
              <span>{selected.label}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Base fare</span>
              <span>${selected.base.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Per mile</span>
              <span>${selected.mile.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Passengers</span>
              <span>{form.passengers}</span>
            </div>
            {form.date && form.time && (
              <div className="summary-row">
                <span className="summary-label">Scheduled</span>
                <span style={{ fontSize: '0.82rem', textAlign: 'right' }}>
                  {new Date(form.date + 'T00:00:00').toLocaleDateString([], { month: 'short', day: 'numeric' })} at {form.time}
                </span>
              </div>
            )}
            <div className="summary-row" style={{ marginTop: '0.5rem' }}>
              <span>Estimated start</span>
              <span>${selected.base.toFixed(2)}+</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--warm-gray)', marginTop: '1rem', lineHeight: 1.5 }}>
              Final fare calculated at drop-off based on actual distance. No surprise fees.
            </p>
          </aside>

        </div>
      </section>

    </div>
  );
}

export default BookingPage;
