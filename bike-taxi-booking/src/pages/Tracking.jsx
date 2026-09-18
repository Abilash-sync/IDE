import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Star, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Tracking({ bookings }) {
  const { id } = useParams();
  const booking = bookings.find(b => b.id === parseInt(id));
  const [driver, setDriver] = useState(null);
  const [eta, setEta] = useState(null);

  useEffect(() => {
    if (booking) {
      // Simulate driver arrival
      setDriver({
        name: 'Alex Chen',
        rating: 4.9,
        trips: 342,
        vehicle: '🚲 Red Bike #42',
        phone: '+1 (555) 987-6543',
      });

      // Simulate ETA calculation
      setEta('3 minutes away');
    }
  }, [booking]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
            <Link
              to="/bookings"
              className="inline-block bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Back to Bookings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Link to="/bookings" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-semibold">
          <ArrowLeft size={20} />
          Back to Bookings
        </Link>

        {/* Main Tracking Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {/* Status Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle size={24} />
              <h1 className="text-3xl font-bold">Your Ride is Confirmed</h1>
            </div>
            <p className="text-green-100">Driver is on the way to your pickup location</p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gradient-to-b from-blue-100 to-blue-50 h-64 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-4 h-full">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="border border-gray-300"></div>
                ))}
              </div>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-2">🗺️</div>
              <p className="text-gray-600 font-semibold">Live Map View</p>
              <p className="text-sm text-gray-500">Location tracking (simulated)</p>
            </div>
          </div>

          {/* ETA and Route Info */}
          <div className="p-8 border-b border-gray-200">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-orange-500" size={24} />
                <div>
                  <p className="text-sm text-gray-500">Estimated Arrival</p>
                  <p className="text-2xl font-bold text-gray-900">{eta}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Pickup */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="w-1 h-12 bg-gray-300"></div>
                </div>
                <div className="pb-12">
                  <p className="text-sm text-gray-500 font-semibold uppercase">Pickup</p>
                  <p className="text-lg font-semibold text-gray-900">{booking.pickup}</p>
                </div>
              </div>

              {/* Dropoff */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold uppercase">Dropoff</p>
                  <p className="text-lg font-semibold text-gray-900">{booking.dropoff}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Info */}
          {driver && (
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Your Driver</h2>
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl">
                    👤
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900">{driver.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600">
                        {driver.rating} ({driver.trips} trips)
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{driver.vehicle}</p>
                  </div>
                </div>
                <a
                  href={`tel:${driver.phone}`}
                  className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition"
                >
                  📞
                </a>
              </div>
            </div>
          )}

          {/* Booking Details */}
          <div className="p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Booking Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Ride Type</p>
                <p className="font-semibold text-gray-900 capitalize">{booking.rideType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="font-semibold text-green-600 text-lg">
                  {booking.rideType === 'standard' && '$2.99'}
                  {booking.rideType === 'comfort' && '$4.99'}
                  {booking.rideType === 'xl' && '$6.99'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Passenger</p>
                <p className="font-semibold text-gray-900">{booking.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Contact</p>
                <p className="font-semibold text-gray-900">{booking.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white border-2 border-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-50 transition">
            💬 Message Driver
          </button>
          <button className="bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition">
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}
