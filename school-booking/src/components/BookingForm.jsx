import { useState } from 'react';
import { GRADES, TIME_SLOTS, getBookedSlots, validateBooking, toDateString } from '../lib/booking.js';

const EMPTY = {
  studentName: '', dob: '', grade: '', parentName: '', email: '',
  phone: '', date: '', slot: '', notes: '',
};

function Field({ id, label, error, children, hint }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <span className="hint">{hint}</span>}
      <p className="error" id={`${id}-error`} role={error ? 'alert' : undefined}>{error || ''}</p>
    </div>
  );
}

export default function BookingForm({ bookings, onSubmit }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const booked = values.date ? getBookedSlots(bookings, values.date) : [];

  const change = (e) => {
    const { name, value } = e.target;
    setValues((v) => {
      const next = { ...v, [name]: value };
      if (name === 'date' && getBookedSlots(bookings, value).includes(v.slot)) next.slot = '';
      return next;
    });
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validateBooking(values, bookings);
    setErrors(errs);
    const keys = Object.keys(errs);
    if (keys.length) {
      const first = document.getElementById(keys[0]);
      if (first) first.focus();
      return;
    }
    onSubmit(values);
    setValues(EMPTY);
  };

  const props = (name) => ({
    id: name, name, value: values[name], onChange: change,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': `${name}-error`,
  });
  const today = toDateString(new Date());

  return (
    <form onSubmit={submit} noValidate aria-labelledby="form-title" className="card">
      <h2 id="form-title">Book an admission application slot</h2>
      <div className="grid">
        <Field id="studentName" label="Student name *" error={errors.studentName}>
          <input type="text" autoComplete="off" {...props('studentName')} />
        </Field>
        <Field id="dob" label="Date of birth *" error={errors.dob}>
          <input type="date" {...props('dob')} max={today} />
        </Field>
        <Field id="grade" label="Grade applying for *" error={errors.grade}>
          <select {...props('grade')}>
            <option value="">Select grade…</option>
            {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>
        <Field id="parentName" label="Parent / guardian name *" error={errors.parentName}>
          <input type="text" autoComplete="name" {...props('parentName')} />
        </Field>
        <Field id="email" label="Email *" error={errors.email}>
          <input type="email" autoComplete="email" {...props('email')} />
        </Field>
        <Field id="phone" label="Phone *" error={errors.phone}>
          <input type="tel" autoComplete="tel" {...props('phone')} />
        </Field>
        <Field id="date" label="Preferred date *" error={errors.date} hint="Weekdays only">
          <input type="date" {...props('date')} min={today} />
        </Field>
        <Field id="slot" label="Time slot *" error={errors.slot}>
          <select {...props('slot')} disabled={!values.date}>
            <option value="">{values.date ? 'Select time…' : 'Choose a date first'}</option>
            {TIME_SLOTS.map((s) => (
              <option key={s} value={s} disabled={booked.includes(s)}>
                {s}{booked.includes(s) ? ' (booked)' : ''}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="notes" label="Notes (optional)">
        <textarea rows="3" {...props('notes')} />
      </Field>
      <button type="submit" className="btn primary">Book appointment</button>
    </form>
  );
}
