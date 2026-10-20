export default function Confirmation({ booking, onNew, onView }) {
  if (!booking) return null;
  return (
    <section className="card confirmation" aria-labelledby="conf-title">
      <h2 id="conf-title">Booking received</h2>
      <p>Your reference ID is:</p>
      <p className="ref" data-testid="reference">{booking.id}</p>
      <dl>
        <dt>Student</dt><dd>{booking.studentName}</dd>
        <dt>Grade</dt><dd>{booking.grade}</dd>
        <dt>Date</dt><dd>{booking.date} at {booking.slot}</dd>
        <dt>Status</dt><dd>{booking.status}</dd>
      </dl>
      <div className="actions">
        <button className="btn primary" onClick={onNew}>Book another</button>
        <button className="btn" onClick={onView}>View all bookings</button>
      </div>
    </section>
  );
}
