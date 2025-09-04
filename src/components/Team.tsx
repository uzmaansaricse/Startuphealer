import React from 'react';

const teamMembers = [
  { name: 'Amit Kumar', role: 'Co-Founder & Operations', img: '/logo512.png' },
  { name: 'Priya Singh', role: 'Startup Consultant', img: '/logo192.png' },
];

const Team: React.FC = () => (
  <section id="team" className="py-16 bg-gray-900 text-center">
    <h2 className="text-3xl font-bold mb-8 text-white">Meet the Team</h2>
    <div className="flex flex-wrap justify-center gap-8">
      {teamMembers.map((member, idx) => (
        <div key={idx} className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow w-56">
          <img src={member.img} alt={member.name} className="h-20 w-20 rounded-full mb-4 border-4 border-blue-600 object-cover bg-white" />
          <div className="text-lg font-semibold text-white">{member.name}</div>
          <div className="text-blue-400 text-sm mb-2">{member.role}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Team; 