import { useState } from 'react';
import { STATUSES, filterBookings } from '../lib/booking.js';

export default function Dashboard({ bookings, onStatus }) {
  const [status, setStatus] = useState('All');
  const [query, setQuery] = useState('');
  const shown = filterBookings(bookings, { status, query });

  return (
    <section className="card" aria-labelledby="dash-title">
      <h2 id="dash-title">All bookings</h2>
      <div className="toolbar">
        <div className="field">
          <label htmlFor="search">Search by name</label>
          <input id="search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="status-filter">Status</label>
          <select id="status-filter" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <p aria-live="polite" className="muted">{shown.length} booking{shown.length === 1 ? '' : 's'} shown</p>
      {shown.length === 0 ? (
        <p className="empty">No bookings found.</p>
      ) : (
        <ul className="list">
          {shown.map((b) => (
            <li key={b.id} className="item">
              <div>
                <strong>{b.studentName}</strong> <span className="muted">({b.grade})</span>
                <div className="muted">Parent: {b.parentName} · {b.email} · {b.phone}</div>
                <div>{b.date} at {b.slot} · Ref <code>{b.id}</code></div>
                {b.notes && <div className="muted">Notes: {b.notes}</div>}
              </div>
              <div className="side">
                <span className={`badge ${b.status.toLowerCase()}`}>{b.status}</span>
                <div className="actions">
                  <button className="btn small" disabled={b.status === 'Confirmed'}
                    onClick={() => onStatus(b.id, 'Confirmed')}
                    aria-label={`Confirm booking for ${b.studentName}`}>Confirm</button>
                  <button className="btn small danger" disabled={b.status === 'Cancelled'}
                    onClick={() => onStatus(b.id, 'Cancelled')}
                    aria-label={`Cancel booking for ${b.studentName}`}>Cancel</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
