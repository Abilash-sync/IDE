import { describe, it, expect } from 'vitest';
import {
  validateBooking, isWeekday, isPastDate, getBookedSlots, getAvailableSlots,
  filterBookings, generateReference, generateUniqueReference, hasSlotConflict, parseDate, TIME_SLOTS,
} from './booking.js';

const today = new Date(2025, 5, 11); // Wed 11 Jun 2025
const valid = {
  studentName: 'Amy Lee', dob: '2018-03-04', grade: 'Grade 1', parentName: 'Bob Lee',
  email: 'bob@example.com', phone: '+1 555-123-4567', date: '2025-06-12', slot: '10:00', notes: '',
};

describe('date helpers', () => {
  it('parses valid and rejects invalid dates', () => {
    expect(parseDate('2025-02-30')).toBeNull();
    expect(parseDate('nope')).toBeNull();
    expect(parseDate('2025-02-28')).toBeInstanceOf(Date);
  });
  it('detects weekdays', () => {
    expect(isWeekday('2025-06-12')).toBe(true);
    expect(isWeekday('2025-06-14')).toBe(false);
    expect(isWeekday('2025-06-15')).toBe(false);
  });
  it('detects past dates but not today', () => {
    expect(isPastDate('2025-06-10', today)).toBe(true);
    expect(isPastDate('2025-06-11', today)).toBe(false);
  });
});

describe('validateBooking', () => {
  it('accepts valid input', () => {
    expect(validateBooking(valid, [], today)).toEqual({});
  });
  it('requires all mandatory fields', () => {
    const e = validateBooking({}, [], today);
    ['studentName', 'dob', 'grade', 'parentName', 'email', 'phone', 'date', 'slot'].forEach((k) =>
      expect(e[k]).toBeTruthy());
    expect(e.notes).toBeUndefined();
  });
  it('checks email and phone format', () => {
    expect(validateBooking({ ...valid, email: 'bad@' }, [], today).email).toMatch(/valid/);
    expect(validateBooking({ ...valid, phone: 'abc' }, [], today).phone).toMatch(/valid/);
  });
  it('rejects past and weekend dates', () => {
    expect(validateBooking({ ...valid, date: '2025-06-10' }, [], today).date).toMatch(/past/);
    expect(validateBooking({ ...valid, date: '2025-06-14' }, [], today).date).toMatch(/weekdays/);
  });
  it('rejects unreasonable DOB', () => {
    expect(validateBooking({ ...valid, dob: '2030-01-01' }, [], today).dob).toMatch(/future/);
    expect(validateBooking({ ...valid, dob: '1990-01-01' }, [], today).dob).toMatch(/age/);
    expect(validateBooking({ ...valid, dob: '2025-01-01' }, [], today).dob).toMatch(/age/);
  });
  it('rejects a double-booked slot', () => {
    const existing = [{ date: '2025-06-12', slot: '10:00', status: 'Confirmed' }];
    expect(validateBooking(valid, existing, today).slot).toMatch(/already booked/);
  });
});

describe('slots', () => {
  const bookings = [
    { date: '2025-06-12', slot: '10:00', status: 'Pending' },
    { date: '2025-06-12', slot: '11:00', status: 'Cancelled' },
    { date: '2025-06-13', slot: '09:00', status: 'Pending' },
  ];
  it('ignores cancelled and other dates', () => {
    expect(getBookedSlots(bookings, '2025-06-12')).toEqual(['10:00']);
  });
  it('returns available slots', () => {
    const a = getAvailableSlots(bookings, '2025-06-12');
    expect(a).not.toContain('10:00');
    expect(a).toContain('11:00');
    expect(a.length).toBe(TIME_SLOTS.length - 1);
  });
});

describe('filterBookings / reference', () => {
  const list = [
    { studentName: 'Amy Lee', parentName: 'Bob', status: 'Pending' },
    { studentName: 'Cara Fox', parentName: 'Dan', status: 'Confirmed' },
  ];
  it('filters by status and query', () => {
    expect(filterBookings(list, { status: 'Confirmed' })).toHaveLength(1);
    expect(filterBookings(list, { query: ' amy ' })).toHaveLength(1);
    expect(filterBookings(list, { query: 'dan' })[0].studentName).toBe('Cara Fox');
    expect(filterBookings(list, {})).toHaveLength(2);
  });
  it('generates formatted references', () => {
    expect(generateReference(new Date(2025, 5, 11), () => 0.5)).toMatch(/^SCH-20250611-[0-9A-Z]{4}$/);
  });
});

describe('reference and conflict helpers', () => {
  it('generates a reference not already used', () => {
    const vals = [0, 0, 0.5];
    const rand = () => vals.shift();
    const first = generateReference(new Date(2025, 0, 1), () => 0);
    const id = generateUniqueReference([{ id: first }], new Date(2025, 0, 1), rand);
    expect(id).not.toBe(first);
  });
  it('detects a conflict with an active booking only', () => {
    const a = { id: 'a', date: '2025-06-02', slot: '09:00', status: 'Cancelled' };
    const b = { id: 'b', date: '2025-06-02', slot: '09:00', status: 'Pending' };
    expect(hasSlotConflict([a, b], a)).toBe(true);
    expect(hasSlotConflict([a], a)).toBe(false);
  });
});
