import React from 'react';
import BulgeTextEffect from './BulgeTextEffect';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-200 h-screen">
      <div className="container mx-auto px-4 h-full relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">À propos de moi</h2>
        <BulgeTextEffect />
      </div>
    </section>
  );
}

export default About;
