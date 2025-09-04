import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0f23] text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <img src="/st_logo.jpeg" alt="Startup Healer Logo" className="h-20 w-auto mb-4" />
          <p className="text-gray-300 mb-6">
            We're fashion visionaries who bring your ideas to life through stunning digital experiences. We understand your brand, your vibe, and your audience—then design every detail to reflect your style. From concept to creation, we use thoughtful design and smart tech to elevate your fashion business.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="bg-yellow-600 p-3 rounded-md hover:bg-yellow-700 transition">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="bg-yellow-600 p-3 rounded-md hover:bg-yellow-700 transition">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="bg-yellow-600 p-3 rounded-md hover:bg-yellow-700 transition">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="bg-yellow-600 p-3 rounded-md hover:bg-yellow-700 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Our Services</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Plans & Offers</a></li>
          </ul>

          <h3 className="text-yellow-400 font-bold text-lg mt-8 mb-4">Get Help</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-yellow-400 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Support Center</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-4">Contact Us</h3>
          <div className="mb-6 rounded-lg overflow-hidden">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.1234567890123!2d75.81234567890123!3d26.91234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db12345678901%3A0x123456789abcdef!2sStartup%20Healer!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex items-center mb-4 space-x-3 text-gray-300">
            <FaPhoneAlt className="text-yellow-500" />
            <a href="tel:8502996638" className="hover:text-yellow-400 transition">+91 9610332259</a>
          </div>
          <div className="flex items-center mb-4 space-x-3 text-gray-300">
            <FaEnvelope className="text-yellow-500" />
            <a href="mailto:sales@startuphealer.com" className="hover:text-yellow-400 transition">sales@startuphealer.com</a>
          </div>
          <div className="flex items-start space-x-3 text-gray-300">
            <FiMapPin className="text-yellow-500 mt-1" />
            <address>
              P NO 8, near VPM Classes, B yojna, Radha kunj, Mansarovar, Jaipur, Rajasthan 302020
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
