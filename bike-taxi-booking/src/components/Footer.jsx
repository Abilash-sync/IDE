import { Bike, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-green-400 mb-4">
              <Bike size={24} />
              BikeRide
            </div>
            <p className="text-gray-400">Eco-friendly urban transportation for everyone.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition">How It Works</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Safety</a></li>
              <li><a href="#" className="hover:text-green-400 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                support@bikeride.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                San Francisco, CA
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition">Twitter</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Facebook</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 BikeRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
