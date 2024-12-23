import React from 'react';
import Carousel from './Carousel'
import Langage from './LangageGithub';

function Projects() {
  return (
    <section id="projects" className='py-20 w-full bg-gray-200'>

      <h2 className='mx-auto w-32 text-3xl font-bold text-gray-800 py-1 my-2 border-t-2 border-gray-800'>Projets</h2>
      <Carousel />
      <Langage />
    </section>
  );
}

export default Projects;