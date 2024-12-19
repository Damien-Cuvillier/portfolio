import React from 'react';
import Carousel from './Carousel'

function Projects() {
  return (
    <section id="projects" className='py-20 w-full'>
      <h2 className='mx-auto w-32 text-3xl font-bold text-gray-800 py-2 border-t-2 border-gray-800'>Projects</h2>
      <Carousel />
    </section>
  );
}

export default Projects;