// src/pages/Contact.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import bgimage from '../assets/StartupHealer.png';

const Contact = () => {
  const form = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending email
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      form.current?.reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <motion.section
      id="contact"
      className="py-24 min-h-screen relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-emerald-50/60 to-white/70 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Touch</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full shadow-md mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Ready to get started? Reach out to us and let's discuss how we can help your startup succeed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8 border-2 border-emerald-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                    <FaPhoneAlt className="text-emerald-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                    <a href="tel:9610332259" className="text-gray-600 hover:text-emerald-600 transition">
                      +91 9610332259
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-emerald-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <a href="mailto:sales@startuphealer.com" className="text-gray-600 hover:text-emerald-600 transition">
                      sales@startuphealer.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-emerald-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      P NO 8, near VPM Classes, B yojna,<br />
                      Radha Kunj, Mansarovar,<br />
                      Jaipur, Rajasthan 302020
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border-2 border-emerald-100">
              <iframe
                title="Startup Healer Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.097791317973!2d75.76316007446336!3d26.81967916467788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db63cb0e25a29%3A0x8a5a8b5e6f27e0a3!2sRadha%20Kunj%2C%20Mansarovar%2C%20Jaipur%2C%20Rajasthan%20302020!5e0!3m2!1sen!2sin!4v1693830945643!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8 border-2 border-emerald-100"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              // Success Message
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Thank You!</h3>
                <p className="text-gray-600 text-lg">
                  Your message has been sent successfully.<br />
                  We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              // Contact Form
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-emerald-200 rounded-lg 
                        focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                        text-gray-800 placeholder-gray-400 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-emerald-200 rounded-lg 
                        focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                        text-gray-800 placeholder-gray-400 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="user_phone"
                    className="w-full px-4 py-3 bg-white border-2 border-emerald-200 rounded-lg 
                      focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                      text-gray-800 placeholder-gray-400 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-emerald-200 rounded-lg 
                      focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                      text-gray-800 placeholder-gray-400 transition-all resize-none"
                    placeholder="Tell us about your project and how we can help..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg 
                    font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 
                    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
