import React from "react";
import { Tilt } from "react-tilt";
import { TESTIMONIALS } from "../utils/constants";

const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We take pride in delivering high-quality solutions. 
            Here’s what our clients have to say about working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {TESTIMONIALS.map((testimonial) => (
            <Tilt
              key={testimonial.id}
              options={{ max: 15, scale: 1.05, speed: 800 }}
              className="w-full"
            >
              <div className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700 hover:border-indigo-500 transition-all duration-300 h-full flex flex-col justify-between">
                
                {/* Avatar + Name */}
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 text-3xl mr-4 shadow-inner">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-indigo-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  “{testimonial.content}”
                </p>

                {/* Rating */}
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
