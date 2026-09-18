import { useState } from 'react';
import { MapPin, Clock, DollarSign, Zap, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

export default function Home({ addBooking, user }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleBooking = (booking) => {
    const newBooking = addBooking(booking);
    navigate(`/tracking/${newBooking.id}`);
  };

  const features = [
    {
      icon: <Zap size={32} />,
      title: 'Quick & Easy',
      description: 'Book your bike in just 30 seconds',
    },
    {
      icon: <DollarSign size={32} />,
      title: 'Affordable',
      description: 'Competitive pricing for every journey',
    },
    {
      icon: <Shield size={32} />,
      title: 'Safe',
      description: 'Helmets provided and trained riders',
    },
    {
      icon: <Users size={32} />,
      title: 'Professional',
      description: 'Verified and rated drivers',
    },
  ];

  const rideTypes = [
    {
      name: 'Standard',
      icon: '🚲',
      price: '$2.99',
      time: '5-10 min',
      passengers: '1-2',
      description: 'Perfect for solo trips and small groups',
    },
    {
      name: 'Comfort',
      icon: '🚲‍♀️',
      price: '$4.99',
      time: '3-8 min',
      passengers: '1-2',
      description: 'Premium comfort with extra features',
    },
    {
      name: 'XL',
      icon: '🛵',
      price: '$6.99',
      time: '2-5 min',
      passengers: '1-3',
      description: 'Extra space for more passengers',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">Your Eco-Friendly Ride Awaits</h1>
              <p className="text-xl text-green-100 mb-8">
                Fast, affordable, and sustainable bike taxi service in your city. Book now and save the planet!
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-white text-green-600 font-bold px-8 py-3 rounded-lg hover:bg-green-50 transition text-lg"
              >
                Book Your Ride
              </button>
            </div>
            <div className="hidden md:block">
              <div className="bg-green-500 bg-opacity-30 rounded-lg p-8 text-center">
                <div className="text-8xl">🚲</div>
                <p className="text-green-100 mt-4">Fast & Eco-Friendly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose BikeRide?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition">
                <div className="text-green-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ride Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Choose Your Ride</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rideTypes.map((ride, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
                  <div className="text-5xl mb-3">{ride.icon}</div>
                  <h3 className="text-2xl font-bold text-white">{ride.name}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Price:</span>
                      <span className="font-bold text-green-600 text-lg">{ride.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Pickup Time:</span>
                      <span className="font-bold">{ride.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Passengers:</span>
                      <span className="font-bold">{ride.passengers}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">{ride.description}</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Book {ride.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Enter Location', desc: 'Tell us where you are and where you want to go' },
              { step: '2', title: 'Choose Ride', desc: 'Select from our available bike taxi options' },
              { step: '3', title: 'Confirm & Pay', desc: 'Confirm your booking and secure payment' },
              { step: '4', title: 'Enjoy Ride', desc: 'Your driver arrives and you\'re on your way' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showForm && <BookingForm onClose={() => setShowForm(false)} onBook={handleBooking} />}
    </div>
  );
}
