import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/sparkle.css';

function Header({ interactiveMode, setInteractiveMode }) {
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  useEffect(() => {
    const projectsSection = document.getElementById('projects');
    
    if (projectsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log('Intersection ratio:', entry.intersectionRatio);
            console.log('Is intersecting:', entry.isIntersecting);
            setIsProjectVisible(entry.isIntersecting);
          });
        },
        {
          // Déclencher quand la section est visible à 10%
          threshold: 0.1,
          // Commencer à observer avant que la section soit visible
          rootMargin: '100px 0px'
        }
      );
  
      console.log('Starting observation of projects section');
      observer.observe(projectsSection);
  
      return () => {
        if (projectsSection) {
          observer.unobserve(projectsSection);
        }
      };
    } else {
      console.log('Projects section not found');
    }
  }, []);

  return (
    <header className="bg-white shadow fixed w-full z-10 top-0 left-0">
      <nav className="flex justify-between items-center px-4 py-2 max-w-7xl mx-auto">
        <div className="flex items-center">
          <a href="/dashboard" className="font-bold text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            <img src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt="Accueil" className="w-8 h-8 object-contain rounded-full"/>
          </a>
          <a href="#about" className="font-bold text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 px-3 py-2 mx-12">A propos</a>
          <a href="#Competences" className="font-bold text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 px-3 py-2 mx-36">Compétences</a>
          <a href="#projects" className="font-bold text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 px-3 py-2 mx-72">Projets</a>
          <a href="#contacts" className="font-bold text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 px-3 py-2 mx-96">Contacts</a>
        </div>
        <div className="flex items-center">
          <a href="https://www.linkedin.com/in/damien-cuvillier-46b6691b1/" className="text-slate-700 hover:text-slate-900 mx-12">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/Damien-Cuvillier" className="text-slate-700 hover:text-slate-900 mr-18">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <button
  className={`ml-20 px-4 py-2 text-black rounded transition-all duration-300 ${
    isProjectVisible 
      ? 'sparkle-effect font-bold' 
      : 'bg-blue-400 hover:bg-blue-600'
  }`}
  onClick={() => setInteractiveMode(prev => !prev)}
>
  {interactiveMode ? 'Mode classique' : 'Mode interactif'}
</button>
        </div>
      </nav>
    </header>
  ); 
}

export default Header;