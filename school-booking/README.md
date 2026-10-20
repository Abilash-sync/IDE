# School Application Booking

React + Vite app where parents book an admission-application appointment for a child.
No backend: data is stored in `localStorage` (key `school-bookings`).

## Features
- Booking form with inline, accessible validation (required fields, email, phone, no past dates, weekdays only, sensible DOB / age 2–18)
- Time slots; slots already booked for the chosen date are disabled
- Confirmation view with a booking reference (e.g. `SCH-20250611-A1B2`)
- Dashboard: list, confirm/cancel, filter by status, search by student/parent name

## Scripts
```
npm install
npm run dev     # start dev server
npm test        # vitest (unit + component tests)
npm run build   # production build to dist/
```

## Structure
- `src/lib/booking.js` – pure validation/slot/filter logic (tested in `booking.test.js`)
- `src/hooks/useLocalStorage.js` – persistence hook
- `src/components/` – BookingForm, Confirmation, Dashboard
