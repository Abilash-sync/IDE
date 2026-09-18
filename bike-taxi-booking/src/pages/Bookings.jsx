import { Link } from 'react-router-dom';
import { MapPin, Phone, Calendar, DollarSign, ChevronRight } from 'lucide-react';

export default function Bookings({ bookings }) {
  const getRideColor = (type) => {
    const colors = {
      standard: 'bg-blue-100 text-blue-800',
      comfort: 'bg-purple-100 text-purple-800',
      xl: 'bg-orange-100 text-orange-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getRidePrice = (type) => {
    const prices = {
      standard: '$2.99',
      comfort: '$4.99',
      xl: '$6.99',
    };
    return prices[type] || '$0';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🚲</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't booked any rides yet. Start your eco-friendly journey today!
            </p>
            <Link
              to="/"
              className="inline-block bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Book Your First Ride
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Link
                key={booking.id}
                to={`/tracking/${booking.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRideColor(booking.rideType)}`}>
                        {booking.rideType.toUpperCase()}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={24} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-semibold text-gray-900">{booking.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-semibold text-gray-900">{booking.dropoff}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {booking.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(booking.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="flex items-center gap-2 font-bold text-green-600">
                    <DollarSign size={16} />
                    {getRidePrice(booking.rideType)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
