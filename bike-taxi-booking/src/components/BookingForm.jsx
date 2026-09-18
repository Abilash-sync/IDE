import { useState } from 'react';
import { X, MapPin, Phone } from 'lucide-react';

export default function BookingForm({ onClose, onBook }) {
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    rideType: 'standard',
    phone: '',
    name: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.pickup.trim()) newErrors.pickup = 'Pickup location required';
    if (!formData.dropoff.trim()) newErrors.dropoff = 'Dropoff location required';
    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      onBook(formData);
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  const rideTypes = [
    { value: 'standard', label: 'Standard - $2.99' },
    { value: 'comfort', label: 'Comfort - $4.99' },
    { value: 'xl', label: 'XL - $6.99' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Book Your Ride</h2>
          <button onClick={onClose} className="hover:bg-green-700 p-1 rounded transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <MapPin size={16} /> Pickup Location
            </label>
            <input
              type="text"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.pickup ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123 Main St"
            />
            {errors.pickup && <p className="text-red-500 text-sm mt-1">{errors.pickup}</p>}
          </div>

          {/* Dropoff Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <MapPin size={16} /> Dropoff Location
            </label>
            <input
              type="text"
              name="dropoff"
              value={formData.dropoff}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.dropoff ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="456 Oak Ave"
            />
            {errors.dropoff && <p className="text-red-500 text-sm mt-1">{errors.dropoff}</p>}
          </div>

          {/* Ride Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ride Type</label>
            <select
              name="rideType"
              value={formData.rideType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              {rideTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition mt-6"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
