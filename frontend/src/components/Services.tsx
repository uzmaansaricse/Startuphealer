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

interface Service {
  title: string;
  description: string;
  icon: IconType;
  features: string[];
  color: string;
}

const services: Service[] = [
  {
    title: "Startup India Certificate",
    description: "Get recognized under the Startup India scheme with complete registration support.",
    icon: FaCertificate,
    features: ["Eligibility check & consultation", "Document preparation"],
    color: "from-pink-500 to-red-500",
  },
  {
    title: "MSME Certificate",
    description: "Register your business under MSME and avail government benefits.",
    icon: FaBuilding,
    features: ["Udyam registration", "Subsidy consultation"],
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "GST Registration",
    description: "Complete GST registration and compliance assistance.",
    icon: FaFileInvoice,
    features: ["GST number registration", "Monthly/Quarterly filing"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "ISO 9001-2015 Certification",
    description: "International quality certification for your organization.",
    icon: FaAward,
    features: ["Documentation support", "Audit preparation"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Trademark & Company Registration",
    description: "Protect your brand and register your business legally.",
    icon: FaTrademark,
    features: ["Trademark search & filing", "Company incorporation"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Funding & Investment",
    description: "Support in finding investors and funding opportunities.",
    icon: FaHandHoldingUsd,
    features: ["Pitch deck creation", "Investor networking"],
    color: "from-teal-500 to-cyan-500",
  },
  {
    title: "Web Designing",
    description: "Modern, responsive, and user-friendly website development.",
    icon: FaGlobe,
    features: ["Custom UI/UX design", "Responsive layouts"],
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    title: "Digital Marketing",
    description: "Boost your online presence with digital marketing strategies.",
    icon: FaBullhorn,
    features: ["SEO & SEM campaigns", "Social media marketing"],
    color: "from-rose-500 to-pink-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
      className="py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Section Heading */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Our <span className="text-blue-400">Services</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-300 mt-3 text-sm md:text-base max-w-2xl mx-auto">
          We provide a wide range of professional services to help your business
          grow, comply, and succeed.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            className={`relative max-w-md mx-auto p-6 rounded-2xl shadow-lg
              bg-black/40 border border-white/10 backdrop-blur-md
              transition-transform transform hover:scale-105
              hover:shadow-2xl hover:border-transparent
              hover:bg-gradient-to-r ${service.color}`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-4">
              {React.createElement(service.icon as React.ElementType, {
                className: "text-3xl text-white",
              })}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>

            {/* Description */}
            <p className="text-gray-200 text-sm mb-3">{service.description}</p>

            {/* Features */}
            <ul className="space-y-1 text-gray-100 text-sm">
              {service.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center">
                  <span className="mr-2 text-green-300">✔</span> {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
