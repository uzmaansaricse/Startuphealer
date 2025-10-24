// src/pages/FAQ.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA } from '../utils/constants';
import { FaSearch, FaQuestionCircle, FaCheckCircle, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import bgimage from '../assets/StartupHealer.png';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const categories = [
    { id: 'all', label: 'All Questions', icon: FaQuestionCircle },
    { id: 'services', label: 'Services', icon: FaCheckCircle },
    { id: 'pricing', label: 'Pricing', icon: FaCheckCircle },
    { id: 'support', label: 'Support', icon: FaCheckCircle },
  ];

  return (
    <motion.section
      id="faq"
      className="py-24 min-h-screen relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-emerald-50/60 to-white/70 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Questions</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full shadow-md mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
            Everything you need to know about StartupHealer's services, processes, and support. 
            Can't find your answer? We're here to help!
          </p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-md border-2 border-emerald-200 rounded-2xl 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                  text-gray-800 placeholder-gray-400 shadow-lg transition-all"
              />
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-600 mt-2">
                Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}
              </p>
            )}
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { value: '15+', label: 'FAQs Covered' },
              { value: '24/7', label: 'Support Available' },
              { value: '< 2hrs', label: 'Response Time' },
              { value: '100%', label: 'Satisfaction Rate' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-md border border-emerald-100"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={searchQuery}
            className="space-y-4 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  className="rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md border-2 border-emerald-100 shadow-md hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-start justify-between bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all duration-300 group"
                  >
                    <div className="flex items-start flex-1 pr-4">
                      <FaQuestionCircle className="text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="font-semibold text-gray-800 text-base md:text-lg group-hover:text-emerald-700 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-xl group-hover:bg-emerald-600 group-hover:rotate-90 transition-all duration-300">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-5 text-gray-700 bg-white leading-relaxed border-t-2 border-emerald-100">
                          <div className="flex items-start">
                            <FaCheckCircle className="text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center py-12 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-emerald-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  No results found for "{searchQuery}"
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Try different keywords or contact our support team
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Popular Topics */}
        <motion.div
          className="mb-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border-2 border-emerald-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Popular Topics
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Getting Started', queries: ['What is StartupHealer?', 'How to get started?'] },
              { title: 'Services & Pricing', queries: ['Pricing structure', 'Available services'] },
              { title: 'Support & Contact', queries: ['Contact support', 'Service area'] },
            ].map((topic, idx) => (
              <div key={idx} className="bg-white/90 rounded-xl p-5 shadow-md border border-emerald-100">
                <h4 className="font-bold text-gray-800 mb-3">{topic.title}</h4>
                <ul className="space-y-2">
                  {topic.queries.map((query, qIdx) => (
                    <li key={qIdx}>
                      <button
                        onClick={() => setSearchQuery(query)}
                        className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors text-left"
                      >
                        • {query}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-10 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            Still Have Questions?
          </h3>
          <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help you. Get in touch and we'll respond within 2 hours!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-full 
                font-bold shadow-lg hover:shadow-xl hover:bg-emerald-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
              Contact Support
            </motion.a>
            <motion.a
              href="tel:9610332259"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full 
                font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhoneAlt />
              Call: +91 9610332259
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQ;
