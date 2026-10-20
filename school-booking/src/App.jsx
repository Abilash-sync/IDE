import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage.js';
import BookingForm from './components/BookingForm.jsx';
import Confirmation from './components/Confirmation.jsx';
import Dashboard from './components/Dashboard.jsx';
import { generateReference } from './lib/booking.js';

export default function App() {
  const [bookings, setBookings] = useLocalStorage('school-bookings', []);
  const [tab, setTab] = useState('book');
  const [last, setLast] = useState(null);

  const add = (values) => {
    const booking = { ...values, id: generateReference(), status: 'Pending', createdAt: new Date().toISOString() };
    setBookings((b) => [...b, booking]);
    setLast(booking);
  };
  const setStatus = (id, status) =>
    setBookings((b) => b.map((x) => (x.id === id ? { ...x, status } : x)));

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className="header">
        <h1>School Application Booking</h1>
        <nav aria-label="Main">
          <button className={`tab${tab === 'book' ? ' active' : ''}`} aria-current={tab === 'book' ? 'page' : undefined}
            onClick={() => setTab('book')}>Book</button>
          <button className={`tab${tab === 'list' ? ' active' : ''}`} aria-current={tab === 'list' ? 'page' : undefined}
            onClick={() => setTab('list')}>Bookings ({bookings.length})</button>
        </nav>
      </header>
      <main id="main">
        {tab === 'book' && (last ? (
          <Confirmation booking={last} onNew={() => setLast(null)} onView={() => { setLast(null); setTab('list'); }} />
        ) : (
          <BookingForm bookings={bookings} onSubmit={add} />
        ))}
        {tab === 'list' && <Dashboard bookings={bookings} onStatus={setStatus} />}
      </main>
    </>
  );
}
