import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0f23] text-white mt-12">
      <div className="py-12 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <img src="/st_logo.jpeg" alt="Startup Healer Logo" className="h-20 w-auto mb-4" />
          <p className="text-gray-300 mb-6">
            At Startup Healer, we empower entrepreneurs with the right tools and guidance to
            launch, grow, and scale their businesses. From registrations and certifications
            to funding, branding, and digital growth — we are your trusted startup partner.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="bg-emerald-600 p-3 rounded-md hover:bg-emerald-700 transition">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="bg-emerald-600 p-3 rounded-md hover:bg-emerald-700 transition">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="bg-emerald-600 p-3 rounded-md hover:bg-emerald-700 transition">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="bg-emerald-600 p-3 rounded-md hover:bg-emerald-700 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-emerald-400 font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-emerald-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-emerald-400 transition">About</a></li>
            <li><a href="/services" className="hover:text-emerald-400 transition">Services</a></li>
            <li><a href="/testimonials" className="hover:text-emerald-400 transition">Testimonials</a></li>
            <li><a href="/faq" className="hover:text-emerald-400 transition">FAQ</a></li>
            <li><a href="/contact" className="hover:text-emerald-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-emerald-400 font-bold text-lg mb-4">Contact Us</h3>
          <div className="mb-6 rounded-lg overflow-hidden">
            <iframe
              title="Startup Healer Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.097791317973!2d75.76316007446336!3d26.81967916467788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db63cb0e25a29%3A0x8a5a8b5e6f27e0a3!2sRadha%20Kunj%2C%20Mansarovar%2C%20Jaipur%2C%20Rajasthan%20302020!5e0!3m2!1sen!2sin!4v1693830945643!5m2!1sen!2sin"
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex items-center mb-4 space-x-3 text-gray-300">
            <FaPhoneAlt className="text-emerald-500" />
            <a href="tel:9610332259" className="hover:text-emerald-400 transition">+91 9610332259</a>
          </div>
          <div className="flex items-center mb-4 space-x-3 text-gray-300">
            <FaEnvelope className="text-emerald-500" />
            <a href="mailto:sales@startuphealer.com" className="hover:text-emerald-400 transition">sales@startuphealer.com</a>
          </div>
          <div className="flex items-start space-x-3 text-gray-300">
            <FiMapPin className="text-emerald-500 mt-1" />
            <address>
              P NO 8, near VPM Classes, B yojna, Radha Kunj, Mansarovar, Jaipur, Rajasthan 302020
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#080c1a] text-center py-4 border-t border-white/10">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Startup Healer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
