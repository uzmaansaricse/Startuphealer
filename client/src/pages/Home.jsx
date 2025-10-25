// src/pages/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Team from '../components/Team';
import Cube3D from '../components/Cube3D';
import { FaCertificate, FaBuilding, FaFileInvoice, FaAward, FaTrademark, FaHandHoldingUsd, FaGlobe, FaBullhorn } from 'react-icons/fa';
import bgimage from '../assets/StartupHealer.png';


const services = [
  { name: 'Startup India Certificate', icon: FaCertificate, color: 'from-cyan-100 to-teal-100', iconColor: 'text-cyan-600' },
  { name: 'MSME Certificate', icon: FaBuilding, color: 'from-teal-100 to-emerald-100', iconColor: 'text-teal-600' },
  { name: 'GST Registration', icon: FaFileInvoice, color: 'from-emerald-100 to-green-100', iconColor: 'text-emerald-600' },
  { name: 'ISO 9001-2015 Certification', icon: FaAward, color: 'from-green-100 to-cyan-100', iconColor: 'text-green-600' },
  { name: 'Trademark & Company Registration', icon: FaTrademark, color: 'from-cyan-100 to-emerald-100', iconColor: 'text-cyan-700' },
  { name: 'Funding & Investment', icon: FaHandHoldingUsd, color: 'from-teal-100 to-cyan-100', iconColor: 'text-teal-700' },
  { name: 'Web Designing', icon: FaGlobe, color: 'from-emerald-100 to-green-100', iconColor: 'text-emerald-700' },
  { name: 'Digital Marketing', icon: FaBullhorn, color: 'from-green-100 to-teal-100', iconColor: 'text-green-700' },
];


const stats = [
  { number: '500+', label: 'Startups Supported' },
  { number: '95%', label: 'Success Rate' },
  { number: '24/7', label: 'Support Available' },
  { number: '50+', label: 'Expert Consultants' },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};


const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      {/* Light overlay with blue-green gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-cyan-50/40 to-emerald-50/50 pointer-events-none" />


      {/* Foreground content */}
      <div className="relative pt-16">
        <Hero />


       {/* Services Section */}
               <section className="py-20 text-center">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8 }}
                     viewport={{ once: true }}
                     className="mb-12"
                   >
                     <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
                       Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600">Services</span>
                     </h2>
                     <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 mx-auto rounded-full shadow-md mb-6"></div>
                     <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                       From compliance to growth, we offer comprehensive solutions to help your startup thrive at every stage.
                     </p>
                   </motion.div>
       
                   <motion.div
                     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                     variants={containerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                   >
                     {services.map((service, idx) => (
                       <motion.div
                         key={service.name}
                         variants={itemVariants}
                         whileHover={{ scale: 1.05, y: -5 }}
                         whileTap={{ scale: 0.95 }}
                       >
                         <div className={`bg-gradient-to-br ${service.color} backdrop-blur-sm rounded-2xl p-6 border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full group cursor-pointer`}>
                           <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-md">
                             <service.icon className={`${service.iconColor} text-2xl`} />
                           </div>
                           <h3 className="text-gray-800 font-semibold text-base leading-tight">
                             {service.name}
                           </h3>
                         </div>
                       </motion.div>
                     ))}
                   </motion.div>
       
                   <motion.div
                     className="mt-12"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.4 }}
                     viewport={{ once: true }}
                   >
                     <a
                       href="/services"
                       className="inline-block bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-cyan-600 hover:via-emerald-600 hover:to-green-600 transition-all duration-300"
                     >
                       View All Services
                     </a>
                   </motion.div>
                 </div>
               </section>
       
               {/* Stats Section */}
               <section className="py-16 bg-white/80 backdrop-blur-md">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                   <motion.div
                     className="grid grid-cols-2 md:grid-cols-4 gap-8"
                     variants={containerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                   >
                     {stats.map((stat, idx) => (
                       <motion.div
                         key={stat.label}
                         variants={itemVariants}
                         className="text-center"
                       >
                         <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600 mb-2">
                           {stat.number}
                         </div>
                         <div className="text-gray-600 font-medium text-sm md:text-base">
                           {stat.label}
                         </div>
                       </motion.div>
                     ))}
                   </motion.div>
                 </div>
               </section>
       
               {/* Why StartupHealer Section */}
               <section className="py-20">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8 }}
                     viewport={{ once: true }}
                     className="text-center mb-12"
                   >
                     <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
                       Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600">StartupHealer?</span>
                     </h2>
                     <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 mx-auto rounded-full shadow-md mb-6"></div>
                   </motion.div>
       
                   <motion.div
                     className="grid md:grid-cols-3 gap-8"
                     variants={containerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                   >
                     {[
                       {
                         title: 'We Care, Not Just Consult',
                         desc: 'We understand your journey and provide clarity, confidence, and practical direction.',
                       },
                       {
                         title: 'End-to-End Support',
                         desc: 'From legal compliance to funding and growth — everything you need under one roof.',
                       },
                       {
                         title: 'Transparent & Ethical',
                         desc: 'No hidden costs, no false promises. Just honest support that delivers real results.',
                       },
                     ].map((item, idx) => (
                       <motion.div
                         key={item.title}
                         variants={itemVariants}
                         whileHover={{ y: -5 }}
                       >
                         <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-lg border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-xl transition-all duration-300 h-full">
                           <h3 className="text-xl font-bold text-gray-800 mb-3">
                             {item.title}
                           </h3>
                           <p className="text-gray-600 leading-relaxed">
                             {item.desc}
                           </p>
                         </div>
                       </motion.div>
                     ))}
                   </motion.div>
                 </div>
               </section>


        {/* 3D Cube */}
        <Cube3D />


        {/* Team */}
        <Team />


        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 rounded-3xl shadow-2xl p-12 text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-cyan-50 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Join 500+ successful startups who chose StartupHealer as their growth partner. 
                Let's build something amazing together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  className="inline-block bg-white text-cyan-600 px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-cyan-50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Today
                </motion.a>
                <motion.a
                  href="/services"
                  className="inline-block bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Services
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};


export default HomePage;
