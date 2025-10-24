// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-emerald-200 text-gray-800 ">
      <div className="py-12 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <img src="/st_logo.jpeg" alt="Startup Healer Logo" className="h-20 w-auto mb-4" />
          <p className="text-gray-600 mb-6 leading-relaxed">
            At Startup Healer, we empower entrepreneurs with the right tools and guidance to
            launch, grow, and scale their businesses. From registrations and certifications
            to funding, branding, and digital growth — we are your trusted startup partner.
          </p>
          <div className="flex space-x-4">
            <a 
              href="#" 
              aria-label="Facebook" 
              className="bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 transition shadow-md"
            >
              <FaFacebookF />
            </a>
            <a 
              href="#" 
              aria-label="Twitter" 
              className="bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 transition shadow-md"
            >
              <FaTwitter />
            </a>
            <a 
              href="#" 
              aria-label="Instagram" 
              className="bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 transition shadow-md"
            >
              <FaInstagram />
            </a>
            <a 
              href="#" 
              aria-label="LinkedIn" 
              className="bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 transition shadow-md"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-emerald-700 font-bold text-xl mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="/" className="hover:text-emerald-600 transition-colors flex items-center">
                <span className="mr-2">›</span>Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-emerald-600 transition-colors flex items-center">
                <span className="mr-2">›</span>About
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-emerald-600 transition-colors flex items-center">
                <span className="mr-2">›</span>Services
              </a>
            </li>
            <li>
              <a href="/testimonials" className="hover:text-emerald-600 transition-colors flex items-center">
                <span className="mr-2">›</span>Testimonials
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-emerald-600 transition-colors flex items-center">
                <span className="mr-2">›</span>FAQ
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-emerald-600 transition-colors flex items-center">
                <span className="mr-2">›</span>Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-emerald-700 font-bold text-xl mb-4">Contact Us</h3>
          <div className="mb-6 rounded-lg overflow-hidden shadow-md border-2 border-emerald-200">
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
          <div className="flex items-center mb-4 space-x-3 text-gray-600">
            <FaPhoneAlt className="text-emerald-600 text-lg" />
            <a href="tel:9610332259" className="hover:text-emerald-600 transition-colors font-medium">
              +91 9610332259
            </a>
          </div>
          <div className="flex items-center mb-4 space-x-3 text-gray-600">
            <FaEnvelope className="text-emerald-600 text-lg" />
            <a href="mailto:sales@startuphealer.com" className="hover:text-emerald-600 transition-colors font-medium">
              sales@startuphealer.com
            </a>
          </div>
          <div className="flex items-start space-x-3 text-gray-600">
            <FiMapPin className="text-emerald-600 text-xl mt-1 flex-shrink-0" />
            <address className="not-italic leading-relaxed">
              P NO 8, near VPM Classes, B yojna, Radha Kunj, Mansarovar, Jaipur, Rajasthan 302020
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-emerald-50 text-center py-4 border-t border-emerald-200">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Startup Healer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
