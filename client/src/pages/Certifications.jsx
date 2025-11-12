// src/pages/Certifications.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaFileAlt, FaCertificate } from 'react-icons/fa';
import bgimage from '../assets/StartupHealer.png';

// Certification images - replace with your actual image imports
const startupIndiaImg = 'https://udyogsuvidhakendra.in/dist/img/products/startupcertificate.jpg';
const gstImg = "https://www.indiafilings.com/learn/wp-content/uploads/2017/07/Sample-Provisional-GST-Registration-Certificate.png";
const gemImg = 'https://powwow.co.in/wp-content/uploads/2022/07/85B1172A-8D0B-436F-B303-CCFDFF38493A.jpeg';
const trademarkImg = 'https://imgv2-1-f.scribdassets.com/img/document/694797344/original/2078746fde/1?v=1';
const isoImg = 'https://5.imimg.com/data5/TestImages/SF/OW/LQ/SELLER-42249117/iso-9001-2005-certification.JPG';
const msmeImg = 'https://5.imimg.com/data5/SELLER/Default/2022/5/OG/XX/HB/23447209/msme-services-500x500.jpg';
const fssaiImg = 'https://inventiontax.com/wp-content/uploads/2023/10/BABA-Biryani-Fssai-Certificate-1.jpg';

const CERTIFICATIONS_DATA = [
  {
    id: 1,
    name: 'Startup India Certification',
    image: startupIndiaImg,
    shortDesc: 'Government recognition for innovative startups',
    description: 'Startup India is a flagship initiative of the Government of India, intended to build a strong ecosystem for nurturing innovation and startups in the country. This certification provides tax benefits, easier compliance, IPR fast-tracking, and access to funding opportunities.',
    benefits: [
      'Tax exemption for 3 consecutive years',
      '80% reduction in patent filing fees',
      'Self-certification under labor and environment laws',
      'Access to government tenders',
      'Funding support and incubation facilities'
    ],
    documents: [
      'Certificate of Incorporation/Registration',
      'Brief about nature of business and innovative solution',
      'Pitch deck or business plan',
      'PAN card of the entity',
      'Directors/Partners details with ID proof',
      'Website/app details (if applicable)',
      'Recommendation letter from incubator/accelerator (optional)'
    ],
    eligibility: [
      'Entity should be incorporated as Private Limited, Partnership, or LLP',
      'Should not be more than 10 years old',
      'Annual turnover should not exceed ₹100 crores',
      'Working towards innovation/improvement of products/services'
    ]
  },
  {
    id: 2,
    name: 'GST Registration',
    image: gstImg,
    shortDesc: 'Goods and Services Tax registration',
    description: 'GST Registration is mandatory for businesses with turnover exceeding the prescribed threshold. It enables businesses to collect tax on behalf of the government and claim input tax credit, making it essential for legal business operations in India.',
    benefits: [
      'Legal recognition as a supplier',
      'Claim input tax credit',
      'Nationwide business operations',
      'Easy interstate transactions',
      'Enhanced business credibility'
    ],
    documents: [
      'PAN card of the business',
      'Aadhaar card of promoters/directors',
      'Certificate of Incorporation/Registration',
      'Identity and address proof of promoters',
      'Address proof of business premises',
      'Bank account statement/cancelled cheque',
      'Digital signature (for companies)',
      'Board resolution authorizing signatory'
    ],
    eligibility: [
      'Turnover exceeds ₹40 lakhs (₹20 lakhs for special category states)',
      'Interstate supply of goods/services',
      'E-commerce operators',
      'Casual taxable persons',
      'Agents and distributors'
    ]
  },
  {
    id: 3,
    name: 'GeM Registration',
    image: gemImg,
    shortDesc: 'Government e-Marketplace certification',
    description: 'GeM (Government e-Marketplace) is an online platform for procurement of goods and services by government departments, PSUs, and autonomous bodies. Registration enables businesses to participate in government tenders and supply products/services directly.',
    benefits: [
      'Direct access to government buyers',
      'Transparent and efficient procurement',
      'Reduced marketing costs',
      'Timely payments',
      'Level playing field for MSMEs'
    ],
    documents: [
      'PAN card of the business',
      'GST registration certificate',
      'Aadhaar card of authorized signatory',
      'Bank account details with cancelled cheque',
      'Certificate of Incorporation (for companies)',
      'Partnership deed/LLP agreement (if applicable)',
      'Product/service catalogs with specifications',
      'OEM authorization (if applicable)'
    ],
    eligibility: [
      'Valid GST registration',
      'Indian entity (registered in India)',
      'Active bank account',
      'Valid email and mobile number',
      'Digital signature (recommended)'
    ]
  },
  {
    id: 4,
    name: 'Trademark Registration',
    image: trademarkImg,
    shortDesc: 'Protect your brand identity legally',
    description: 'Trademark Registration provides legal protection to your brand name, logo, or slogan. It grants exclusive rights to use the mark and prevents others from using identical or confusingly similar marks, establishing brand identity and trust.',
    benefits: [
      'Exclusive rights to use the trademark',
      'Legal protection against infringement',
      'Brand value and recognition',
      'Asset creation for the business',
      'Valid for 10 years (renewable)',
      'Use ® symbol for registered marks'
    ],
    documents: [
      'Applicant details (name, address, nationality)',
      'Logo/wordmark in JPG format (high resolution)',
      'Business details and nature',
      'PAN card and Aadhaar card',
      'Trademark search report',
      'Power of attorney (if filed through agent)',
      'Priority document (if claiming priority)',
      'User affidavit (if mark is already in use)'
    ],
    eligibility: [
      'Individual, proprietorship, partnership, LLP, or company',
      'Mark should be unique and distinctive',
      'Should not be identical to existing registered marks',
      'Should not be generic or descriptive',
      'Must not violate public morality or decency'
    ]
  },
  {
    id: 5,
    name: 'ISO Certification',
    image: isoImg,
    shortDesc: 'International quality management standards',
    description: 'ISO Certification demonstrates that your organization meets international standards for quality management, environmental management, information security, or other specific industry standards. It enhances credibility and opens doors to global markets.',
    benefits: [
      'International recognition and credibility',
      'Improved quality and efficiency',
      'Enhanced customer satisfaction',
      'Access to global markets',
      'Competitive advantage',
      'Better risk management'
    ],
    documents: [
      'Company registration certificate',
      'PAN and GST certificates',
      'Organization chart and employee list',
      'Product/service catalogs',
      'Quality manual and procedures',
      'Process flowcharts',
      'Calibration certificates of equipment',
      'Customer feedback records',
      'Supplier evaluation records'
    ],
    eligibility: [
      'Registered business entity',
      'Defined quality management system',
      'Documented processes and procedures',
      'Minimum 3 months of operational history',
      'Management commitment to quality standards'
    ]
  },
  {
    id: 6,
    name: 'MSME Registration',
    image: msmeImg,
    shortDesc: 'Udyog Aadhaar for MSMEs',
    description: 'MSME (Micro, Small & Medium Enterprises) Registration, also known as Udyam Registration, provides government recognition and various benefits to small businesses. It offers easier access to credit, subsidies, and protection against delayed payments.',
    benefits: [
      'Easy access to credit and loans',
      'Lower interest rates on loans',
      'Preference in government tenders',
      'Protection against delayed payments',
      'Subsidies on patent registration',
      'Concession on electricity bills',
      'Tax benefits and exemptions'
    ],
    documents: [
      'Aadhaar number of entrepreneur',
      'Business PAN card',
      'Business name and type',
      'Bank account details',
      'Investment in plant & machinery/equipment',
      'Turnover details',
      'Number of employees',
      'GST number (if registered)'
    ],
    eligibility: [
      'Investment in plant & machinery up to ₹50 crore',
      'Annual turnover up to ₹250 crore',
      'Must be manufacturing or service enterprise',
      'Only Aadhaar-based registration allowed',
      'Self-declaration basis - no documents upload needed'
    ]
  },
  {
    id: 7,
    name: 'FSSAI License',
    image: fssaiImg,
    shortDesc: 'Food Safety and Standards Authority',
    description: 'FSSAI License is mandatory for all food business operators in India. It ensures that food products meet safety standards and are fit for human consumption. The license builds consumer trust and is essential for legal food business operations.',
    benefits: [
      'Legal permission to operate food business',
      'Consumer trust and credibility',
      'Expansion to retail chains and e-commerce',
      'Export opportunities',
      'Protection from legal issues',
      'Quality assurance badge'
    ],
    documents: [
      'Form B (application form)',
      'Photo of proprietor/partners/directors',
      'Identity proof (Aadhaar/PAN/Voter ID)',
      'Address proof of business premises',
      'Business registration certificate',
      'Partnership deed/MOA-AOA (if applicable)',
      'NOC from municipality/local authority',
      'Food safety management system plan',
      'List of food products to be manufactured',
      'Water test report',
      'Layout plan of premises'
    ],
    eligibility: [
      'Any person engaged in food business',
      'Manufacturers, traders, distributors',
      'Restaurants, cafes, cloud kitchens',
      'E-commerce food operators',
      'Food storage and transportation units'
    ]
  }
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div
      className="min-h-screen relative overflow-hidden mt-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-cyan-50/40 to-emerald-50/50" />

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <FaCertificate className="text-4xl md:text-5xl text-cyan-600" />
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Business Certifications
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto"
          >
            Essential certifications to establish credibility, ensure compliance, and unlock growth opportunities for your startup
          </motion.p>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {CERTIFICATIONS_DATA.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCert(cert)}
                className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 md:p-6 border-2 border-cyan-200 cursor-pointer hover:border-cyan-400 transition-all group"
              >
                {/* Certificate Image */}
                <div className="w-full h-40 md:h-48 bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden border-2 border-cyan-100 group-hover:border-cyan-300 transition-all">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                {/* Certificate Name */}
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors">
                  {cert.name}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-gray-600 mb-4">
                  {cert.shortDesc}
                </p>

                {/* View Details Button */}
                <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-full text-sm hover:from-cyan-600 hover:to-emerald-600 transition-all">
                  View Details →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificationModal
            certification={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal Component
const CertificationModal = ({ certification, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 border-cyan-200"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-cyan-100 to-emerald-100 px-6 md:px-8 py-6 border-b-2 border-cyan-200 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-xl p-2 border-2 border-cyan-300">
              <img
                src={certification.image}
                alt={certification.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {certification.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-all"
          >
            <FaTimes className="text-2xl text-gray-600 hover:text-cyan-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 md:px-8 py-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FaFileAlt className="text-cyan-600" />
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {certification.description}
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FaCheckCircle className="text-emerald-600" />
              Key Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {certification.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 bg-emerald-50/70 px-4 py-3 rounded-xl border border-emerald-200"
                >
                  <FaCheckCircle className="text-emerald-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Eligibility Criteria
            </h3>
            <div className="bg-cyan-50/70 rounded-xl border border-cyan-200 p-4">
              <ul className="space-y-2">
                {certification.eligibility.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-cyan-600 font-bold mt-0.5">•</span>
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Documents Required */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Documents Required
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {certification.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200"
                >
                  <FaFileAlt className="text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold rounded-full shadow-lg hover:from-cyan-600 hover:to-emerald-600 transition-all"
            >
              Apply for {certification.name}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Certifications;
