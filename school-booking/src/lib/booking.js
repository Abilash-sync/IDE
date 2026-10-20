export const GRADES = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];
export const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
export const STATUSES = ['Pending', 'Confirmed', 'Cancelled'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-().]{7,20}$/;

/** Parse 'YYYY-MM-DD' as a local date; returns null if invalid. */
export function parseDate(str) {
  if (typeof str !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
  const [y, m, d] = str.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

export function toDateString(date) {
  const p = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

export function isWeekday(str) {
  const d = parseDate(str);
  return !!d && d.getDay() !== 0 && d.getDay() !== 6;
}

export function isPastDate(str, today = new Date()) {
  const d = parseDate(str);
  if (!d) return false;
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return d < t;
}

/** Slots already taken (non-cancelled) on a date. */
export function getBookedSlots(bookings, date) {
  return bookings.filter((b) => b.date === date && b.status !== 'Cancelled').map((b) => b.slot);
}

export function getAvailableSlots(bookings, date) {
  const booked = getBookedSlots(bookings, date);
  return TIME_SLOTS.filter((s) => !booked.includes(s));
}

export function validateBooking(values, bookings = [], today = new Date()) {
  const errors = {};
  const v = (k) => (values[k] || '').toString().trim();

  if (!v('studentName')) errors.studentName = 'Student name is required.';
  else if (v('studentName').length < 2) errors.studentName = 'Student name is too short.';

  if (!v('dob')) errors.dob = 'Date of birth is required.';
  else {
    const dob = parseDate(v('dob'));
    if (!dob) errors.dob = 'Enter a valid date of birth.';
    else {
      const age = (today - dob) / (365.25 * 24 * 3600 * 1000);
      if (dob > today) errors.dob = 'Date of birth cannot be in the future.';
      else if (age < 2 || age > 18) errors.dob = 'Student age must be between 2 and 18 years.';
    }
  }

  if (!v('grade')) errors.grade = 'Please select a grade.';
  else if (!GRADES.includes(v('grade'))) errors.grade = 'Please select a valid grade.';

  if (!v('parentName')) errors.parentName = 'Parent name is required.';

  if (!v('email')) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(v('email'))) errors.email = 'Enter a valid email address.';

  if (!v('phone')) errors.phone = 'Phone number is required.';
  else if (!PHONE_RE.test(v('phone')) || v('phone').replace(/\D/g, '').length < 7)
    errors.phone = 'Enter a valid phone number.';

  if (!v('date')) errors.date = 'Preferred date is required.';
  else if (!parseDate(v('date'))) errors.date = 'Enter a valid date.';
  else if (isPastDate(v('date'), today)) errors.date = 'Date cannot be in the past.';
  else if (!isWeekday(v('date'))) errors.date = 'Appointments are available on weekdays only.';

  if (!v('slot')) errors.slot = 'Please choose a time slot.';
  else if (!TIME_SLOTS.includes(v('slot'))) errors.slot = 'Please choose a valid time slot.';
  else if (!errors.date && getBookedSlots(bookings, v('date')).includes(v('slot')))
    errors.slot = 'That time slot is already booked.';

  return errors;
}

export function generateReference(now = new Date(), rand = Math.random) {
  const suffix = Math.floor(rand() * 36 ** 4).toString(36).toUpperCase().padStart(4, '0');
  return `SCH-${toDateString(now).replace(/-/g, '')}-${suffix}`;
}

export function filterBookings(bookings, { status = 'All', query = '' } = {}) {
  const q = query.trim().toLowerCase();
  return bookings.filter((b) => {
    if (status !== 'All' && b.status !== status) return false;
    if (!q) return true;
    return b.studentName.toLowerCase().includes(q) || b.parentName.toLowerCase().includes(q);
  });
}
