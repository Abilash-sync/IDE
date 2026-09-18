import { Link } from 'react-router-dom';
import { Bike, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

export default function Header({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-green-600">
            <Bike size={28} />
            BikeRide
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition">
              Home
            </Link>
            <Link to="/bookings" className="text-gray-700 hover:text-green-600 transition">
              My Bookings
            </Link>
            <button
              onClick={() => setUser(user ? null : { name: 'John Doe', email: 'john@example.com' })}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <User size={18} />
              {user ? 'Logout' : 'Login'}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition block">
              Home
            </Link>
            <Link to="/bookings" className="text-gray-700 hover:text-green-600 transition block">
              My Bookings
            </Link>
            <button
              onClick={() => {
                setUser(user ? null : { name: 'John Doe', email: 'john@example.com' });
                setIsOpen(false);
              }}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full justify-center"
            >
              <User size={18} />
              {user ? 'Logout' : 'Login'}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
