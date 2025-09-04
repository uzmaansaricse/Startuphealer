import React from "react";
import { Tilt } from "react-tilt";

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Heading */}
        <h2 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
          About Us
        </h2>
        
        {/* Short intro */}
        <p className="text-gray-300 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
          We are a team of passionate professionals helping startups and enterprises 
          achieve success through technology, creativity, and strategy. 
          Our work culture is rooted in <span className="text-indigo-400 font-semibold">innovation</span>, 
          <span className="text-indigo-400 font-semibold"> collaboration</span>, and 
          <span className="text-indigo-400 font-semibold"> excellence</span>.
        </p>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mt-10 text-left">
          {[
            {
              title: "Our Mission",
              desc: "To empower businesses with world-class technology, delivering impactful solutions that drive growth and long-term success.",
            },
            {
              title: "Our Vision",
              desc: "To be a trusted global partner in digital transformation, known for innovation, excellence, and unwavering client success.",
            },
          ].map((item, idx) => (
            <Tilt key={idx} options={{ max: 15, scale: 1.05, speed: 800 }}>
              <div className="bg-gray-800/90 p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300">
                <h3 className="text-2xl font-semibold text-indigo-400 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-base">{item.desc}</p>
              </div>
            </Tilt>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white mb-8">Why Choose Us?</h3>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-left">
            {[
              {
                title: "Expertise",
                desc: "Years of experience delivering scalable and innovative digital solutions.",
              },
              {
                title: "Quality",
                desc: "Commitment to international standards with a focus on performance & security.",
              },
              {
                title: "Innovation",
                desc: "Adopting the latest technologies and creative strategies to stay ahead.",
              },
              {
                title: "Support",
                desc: "Reliable, long-term support and collaboration for your success.",
              },
            ].map((item, idx) => (
              <Tilt key={idx} options={{ max: 20, scale: 1.07, speed: 600 }}>
                <div className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:border-indigo-400 border border-gray-700 transition-all duration-300">
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white mb-8">Our Core Values</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Integrity", "Innovation", "Customer First", "Collaboration", "Excellence"].map(
              (value, idx) => (
                <span
                  key={idx}
                  className="bg-gray-800/80 text-white px-6 py-3 rounded-lg shadow-md text-sm font-medium hover:scale-105 hover:bg-indigo-600 transition-all"
                >
                  {value}
                </span>
              )
            )}
          </div>
        </div>

        {/* Expertise tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {[
            "Web Development",
            "Mobile Apps",
            "UI/UX Design",
            "Cloud Solutions",
            "Digital Marketing",
            "Consulting",
          ].map((skill, idx) => (
            <span
              key={idx}
              className="bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 px-5 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-indigo-600/30 transition-all"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
