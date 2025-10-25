// src/pages/Services.jsx
import {
  FaCertificate,
  FaBuilding,
  FaFileInvoice,
  FaAward,
  FaTrademark,
  FaHandHoldingUsd,
  FaGlobe,
  FaBullhorn,
  FaCheckCircle,
  FaRocket,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";
import React from "react";
import { motion } from "framer-motion";
import bgimage from '../assets/StartupHealer.png';


const services = [
  {
    title: "Startup India Certificate",
    description: "Get recognized under the Startup India scheme with complete registration support.",
    detailedDesc: "Unlock exclusive benefits including tax exemptions, faster patent approvals, and access to government tenders. We handle the entire certification process from eligibility assessment to final approval.",
    icon: FaCertificate,
    features: [
      "Eligibility assessment & consultation",
      "Complete document preparation & filing",
      "DPIIT registration support",
      "Government liaison & follow-up",
      "Certificate delivery & activation",
    ],
    benefits: ["Tax exemptions for 3 years", "IPR fast-track", "Access to government schemes"],
    timeline: "7-14 business days",
    price: "Starting from ₹5,999",
    color: "from-cyan-50 to-teal-50",
    iconColor: "text-cyan-600",
  },
  {
    title: "MSME Certificate",
    description: "Register your business under MSME and avail government benefits.",
    detailedDesc: "Get your Udyam Registration Certificate and unlock benefits like collateral-free loans, subsidy schemes, and priority sector lending.",
    icon: FaBuilding,
    features: [
      "Udyam registration portal setup",
      "Business classification guidance",
      "Subsidy scheme consultation",
      "Annual compliance support",
      "Certificate issuance",
    ],
    benefits: ["Easy bank loans", "Government subsidies", "Lower interest rates"],
    timeline: "3-5 business days",
    price: "Starting from ₹3,999",
    color: "from-teal-50 to-emerald-50",
    iconColor: "text-teal-600",
  },
  {
    title: "GST Registration",
    description: "Complete GST registration and compliance assistance.",
    detailedDesc: "Simplify your GST journey with end-to-end registration, filing support, and compliance management. Stay penalty-free with our expert guidance.",
    icon: FaFileInvoice,
    features: [
      "GST number registration",
      "Monthly/Quarterly return filing",
      "Input tax credit optimization",
      "GST audit support",
      "Notice handling & consultation",
    ],
    benefits: ["Legal compliance", "Input tax benefits", "Invoice credibility"],
    timeline: "5-7 business days",
    price: "Starting from ₹4,999",
    color: "from-emerald-50 to-green-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "ISO 9001:2015 Certification",
    description: "International quality certification for your organization.",
    detailedDesc: "Enhance credibility, improve processes, and access global markets with ISO certification. We provide complete documentation and audit support.",
    icon: FaAward,
    features: [
      "Gap analysis & consultation",
      "Complete documentation support",
      "Internal audit preparation",
      "External audit coordination",
      "Certificate issuance & maintenance",
    ],
    benefits: ["Global recognition", "Process improvement", "Customer trust"],
    timeline: "30-45 business days",
    price: "Starting from ₹24,999",
    color: "from-green-50 to-cyan-50",
    iconColor: "text-green-600",
  },
  {
    title: "Trademark & Company Registration",
    description: "Protect your brand and register your business legally.",
    detailedDesc: "Safeguard your brand identity and establish legal business entity. From trademark search to company incorporation, we handle everything.",
    icon: FaTrademark,
    features: [
      "Comprehensive trademark search",
      "Application drafting & filing",
      "Company name approval (RoC)",
      "MOA/AOA drafting",
      "PAN, TAN & other registrations",
    ],
    benefits: ["Legal protection", "Brand ownership", "Business credibility"],
    timeline: "Trademark: 12-18 months | Company: 7-10 days",
    price: "Trademark from ₹6,999 | Company from ₹9,999",
    color: "from-cyan-50 to-emerald-50",
    iconColor: "text-cyan-700",
  },
  {
    title: "Funding & Investment Support",
    description: "Support in finding investors and funding opportunities.",
    detailedDesc: "From pitch deck creation to investor introductions and term sheet negotiations - we guide you through the entire fundraising journey.",
    icon: FaHandHoldingUsd,
    features: [
      "Professional pitch deck design",
      "Financial model preparation",
      "Investor database access",
      "Pitch practice & refinement",
      "Term sheet negotiation support",
    ],
    benefits: ["Investor connections", "Better valuations", "Strategic guidance"],
    timeline: "Ongoing support",
    price: "Custom packages from ₹29,999",
    color: "from-teal-50 to-cyan-50",
    iconColor: "text-teal-700",
  },
  {
    title: "Web Design & Development",
    description: "Modern, responsive, and conversion-focused websites.",
    detailedDesc: "Build a stunning online presence that converts visitors into customers. Custom designs, SEO optimization, and mobile-first approach included.",
    icon: FaGlobe,
    features: [
      "Custom UI/UX design",
      "Responsive mobile layouts",
      "SEO-friendly development",
      "E-commerce integration",
      "Hosting & maintenance support",
    ],
    benefits: ["Professional presence", "Lead generation", "24/7 availability"],
    timeline: "15-30 business days",
    price: "Starting from ₹19,999",
    color: "from-emerald-50 to-green-50",
    iconColor: "text-emerald-700",
  },
  {
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your online presence.",
    detailedDesc: "Reach your target audience effectively with SEO, social media, and performance marketing. We focus on ROI, not vanity metrics.",
    icon: FaBullhorn,
    features: [
      "SEO & keyword strategy",
      "Social media management",
      "Google & Facebook ads",
      "Content marketing",
      "Analytics & reporting",
    ],
    benefits: ["Increased visibility", "Quality leads", "Brand awareness"],
    timeline: "Ongoing campaigns",
    price: "Starting from ₹14,999/month",
    color: "from-green-50 to-teal-50",
    iconColor: "text-green-700",
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};


const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
      {/* Light overlay with blue-green gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-cyan-50/40 to-emerald-50/50 pointer-events-none" />


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
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600">Services</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 mx-auto rounded-full shadow-md mb-6"></div>
          <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-4">
            Comprehensive solutions designed to help startups grow smarter, faster, and stronger — from compliance to scale.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-cyan-600" />
              <span>Expert Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-teal-600" />
              <span>Fast Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-emerald-600" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRocket className="text-green-600" />
              <span>Result-Oriented</span>
            </div>
          </div>
        </motion.div>


        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className={`group relative p-8 rounded-2xl shadow-lg
                bg-white/95 backdrop-blur-md border-2 border-cyan-100
                transition-all duration-300
                hover:shadow-2xl hover:border-cyan-300 hover:-translate-y-2
                bg-gradient-to-br ${service.color} flex flex-col h-full`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-100/50 to-transparent rounded-bl-full" />
              
              {/* Icon */}
              <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-4 
                group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {React.createElement(service.icon, {
                  className: `text-4xl ${service.iconColor}`,
                })}
              </div>


              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-cyan-700 transition-colors">
                {service.title}
              </h3>


              {/* Short Description */}
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {service.description}
              </p>


              {/* Detailed Description */}
              <p className="text-gray-500 text-xs mb-4 leading-relaxed italic">
                {service.detailedDesc}
              </p>


              {/* Timeline & Price */}
              <div className="flex justify-between items-center mb-4 text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <FaClock className="text-cyan-600" />
                  <span>{service.timeline}</span>
                </div>
                <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">
                  {service.price}
                </div>
              </div>


              {/* Features */}
              <ul className="space-y-2 mb-4 flex-grow">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start text-gray-700 text-xs">
                    <span className="mr-2 mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-cyan-100 flex items-center justify-center">
                      <span className="text-cyan-600 font-bold text-[10px]">✓</span>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>


              {/* Benefits */}
              <div className="mb-4 pt-4 border-t border-cyan-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">Key Benefits:</p>
                <div className="flex flex-wrap gap-2">
                  {service.benefits.map((benefit, bIdx) => (
                    <span
                      key={bIdx}
                      className="text-[10px] bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full border border-cyan-200"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>


              {/* CTA Button */}
              <motion.button
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 text-white font-semibold rounded-lg 
                  shadow-md hover:shadow-lg hover:from-cyan-600 hover:via-emerald-600 hover:to-green-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </motion.div>


        {/* Why Choose Our Services */}
        <motion.div
          className="mb-20 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-10 border-2 border-cyan-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why Choose StartupHealer Services?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaShieldAlt, title: "100% Secure", desc: "Your data is safe with us", color: "text-cyan-600" },
              { icon: FaClock, title: "Fast Delivery", desc: "Quick turnaround times", color: "text-teal-600" },
              { icon: FaCheckCircle, title: "Expert Support", desc: "Experienced professionals", color: "text-emerald-600" },
              { icon: FaRocket, title: "Results Focused", desc: "Measurable outcomes", color: "text-green-600" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 via-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className={`${item.color} text-3xl`} />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>


        {/* Bottom CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 rounded-3xl shadow-2xl p-10 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Transform Your Startup?
          </h3>
          <p className="text-cyan-50 text-lg mb-8 max-w-2xl mx-auto">
            Choose any service or get a custom package tailored to your needs. Free consultation included!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              className="inline-block bg-white text-cyan-600 px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-cyan-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Free Consultation
            </motion.a>
            <motion.a
              href="tel:9610332259"
              className="inline-block bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Call: +91 9610332259
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
