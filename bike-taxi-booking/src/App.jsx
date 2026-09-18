import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import Tracking from './pages/Tracking';
import './index.css';

function App() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      status: 'confirmed',
      createdAt: new Date(),
    };
    setBookings([...bookings, newBooking]);
    return newBooking;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header user={user} setUser={setUser} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addBooking={addBooking} user={user} />} />
            <Route path="/bookings" element={<Bookings bookings={bookings} />} />
            <Route path="/tracking/:id" element={<Tracking bookings={bookings} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
