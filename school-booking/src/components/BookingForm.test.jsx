import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BookingForm from './BookingForm.jsx';

describe('BookingForm', () => {
  it('shows accessible inline errors and does not submit when empty', async () => {
    const onSubmit = vi.fn();
    render(<BookingForm bookings={[]} onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole('button', { name: /book appointment/i }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Student name is required.')).toBeInTheDocument();
    expect(screen.getByLabelText(/student name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(3);
  });

  it('flags invalid email', async () => {
    render(<BookingForm bookings={[]} onSubmit={() => {}} />);
    await userEvent.type(screen.getByLabelText(/email/i), 'nope');
    await userEvent.click(screen.getByRole('button', { name: /book appointment/i }));
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
  });

  it('disables already-booked slots and submits valid data', async () => {
    const onSubmit = vi.fn();
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
    const p = (n) => String(n).padStart(2, '0');
    const date = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    render(<BookingForm bookings={[{ date, slot: '10:00', status: 'Pending' }]} onSubmit={onSubmit} />);
    const u = userEvent;
    await u.type(screen.getByLabelText(/student name/i), 'Amy Lee');
    await u.type(screen.getByLabelText(/date of birth/i), '2018-03-04');
    await u.selectOptions(screen.getByLabelText(/grade applying/i), 'Grade 1');
    await u.type(screen.getByLabelText(/parent/i), 'Bob Lee');
    await u.type(screen.getByLabelText(/email/i), 'bob@example.com');
    await u.type(screen.getByLabelText(/phone/i), '555-123-4567');
    await u.type(screen.getByLabelText(/preferred date/i), date);
    expect(screen.getByRole('option', { name: /10:00 \(booked\)/ })).toBeDisabled();
    await u.selectOptions(screen.getByLabelText(/time slot/i), '11:00');
    await u.click(screen.getByRole('button', { name: /book appointment/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject({ slot: '11:00', date });
  });
});
