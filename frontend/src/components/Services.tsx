// src/pages/Services.tsx
import {
  FaCertificate,
  FaBuilding,
  FaFileInvoice,
  FaAward,
  FaTrademark,
  FaHandHoldingUsd,
  FaGlobe,
  FaBullhorn,
} from "react-icons/fa";
import { IconType } from "react-icons";
import React from "react";
import { motion } from "framer-motion";
import bgimage from '../assets/StartupHealer.png';

interface Service {
  title: string;
  description: string;
  icon: IconType;
  features: string[];
  color: string;
  iconColor: string;
}

const services: Service[] = [
  {
    title: "Startup India Certificate",
    description: "Get recognized under the Startup India scheme with complete registration support.",
    icon: FaCertificate,
    features: ["Eligibility check & consultation", "Document preparation", "End-to-end support"],
    color: "from-emerald-50 to-teal-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "MSME Certificate",
    description: "Register your business under MSME and avail government benefits.",
    icon: FaBuilding,
    features: ["Udyam registration", "Subsidy consultation", "Compliance assistance"],
    color: "from-blue-50 to-cyan-50",
    iconColor: "text-blue-600",
  },
  {
    title: "GST Registration",
    description: "Complete GST registration and compliance assistance.",
    icon: FaFileInvoice,
    features: ["GST number registration", "Monthly/Quarterly filing", "Tax consultation"],
    color: "from-green-50 to-emerald-50",
    iconColor: "text-green-600",
  },
  {
    title: "ISO 9001-2015 Certification",
    description: "International quality certification for your organization.",
    icon: FaAward,
    features: ["Documentation support", "Audit preparation", "Quality management"],
    color: "from-amber-50 to-yellow-50",
    iconColor: "text-amber-600",
  },
  {
    title: "Trademark & Company Registration",
    description: "Protect your brand and register your business legally.",
    icon: FaTrademark,
    features: ["Trademark search & filing", "Company incorporation", "Legal compliance"],
    color: "from-purple-50 to-pink-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Funding & Investment",
    description: "Support in finding investors and funding opportunities.",
    icon: FaHandHoldingUsd,
    features: ["Pitch deck creation", "Investor networking", "Financial planning"],
    color: "from-teal-50 to-cyan-50",
    iconColor: "text-teal-600",
  },
  {
    title: "Web Designing",
    description: "Modern, responsive, and user-friendly website development.",
    icon: FaGlobe,
    features: ["Custom UI/UX design", "Responsive layouts", "E-commerce solutions"],
    color: "from-fuchsia-50 to-purple-50",
    iconColor: "text-fuchsia-600",
  },
  {
    title: "Digital Marketing",
    description: "Boost your online presence with digital marketing strategies.",
    icon: FaBullhorn,
    features: ["SEO & SEM campaigns", "Social media marketing", "Content strategy"],
    color: "from-rose-50 to-pink-50",
    iconColor: "text-rose-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Services() {
  return (
    <motion.section
      className="py-24 min-h-screen relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-emerald-50/60 to-white/70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Services</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full shadow-md"></div>
          <p className="text-gray-700 mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We provide a comprehensive range of professional services to help your business
            grow, comply with regulations, and achieve lasting success.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className={`group relative p-8 rounded-2xl shadow-lg
                bg-white/95 backdrop-blur-md border-2 border-emerald-100
                transition-all duration-300
                hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-2
                bg-gradient-to-br ${service.color}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100/50 to-transparent rounded-bl-full" />
              
              {/* Icon */}
              <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-6 
                group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {React.createElement(service.icon as React.ElementType, {
                  className: `text-4xl ${service.iconColor}`,
                })}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2.5">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start text-gray-700 text-sm">
                    <span className="mr-2.5 mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-600 font-bold text-xs">✓</span>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Call to action button */}
              <motion.button
                className="mt-6 w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg 
                  shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA section */}
        <motion.div
          className="mt-20 text-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-10 border-2 border-emerald-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let us help you achieve your business goals. Contact us today for a free consultation.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full 
              font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us Now
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
