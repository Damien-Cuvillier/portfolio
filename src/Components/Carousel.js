import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../App.css'; // Assurez-vous d'avoir les styles appropriés dans votre fichier CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


const projects = [
  {
    title: 'Booki',
    description: 'Création de la page d\'acceuil d\'une agence de voyage en HTML et CSS',
    imageUrl: '../images/Booki.png',
    projectURL:'https://github.com/Damien-Cuvillier/Projet-2-Booki'
  },
  {
    title: 'Sophie Bluel Architecte d\'intérieur',
    description: 'Création de la page web dynamique du site d\'architecte d\'intérieur',
    imageUrl: '../images/Sophie.png',
    projectURL:'https://github.com/Damien-Cuvillier/Projet-3-Sophie-Bluel'
  },
  {
    title: 'Nina Carducci Photographe',
    description: 'Débuggage et optimisation d\'un site de photographe',
    imageUrl: '../images/Nina.webp',
    projectURL:'https://github.com/Damien-Cuvillier/P4-Nina-Carducci'
  },
  {
    title: 'Kasa',
    description: 'Création d\'une application de location immobilière avec React',
    imageUrl: '../images/Kasa.png',
    projectURL:'https://github.com/Damien-Cuvillier/P5_Kasa'
  },
  {
    title: 'Mon vieux grimoire',
    description: 'Développement du back-end d\'un site de notation de livres',
    imageUrl: '../images/Grimoire.png',
    projectURL:'https://github.com/Damien-Cuvillier/P6_Grimoire'
  },
  {
    title: 'Menu Maker by Qwenta',
    description: 'Planification du développement du site de Menu Maker',
    imageUrl: '../images/MenuMaker.png',
    projectURL:''
  },
  // Ajouter plus de projets ici
];

const ProjectsCarousel = () => {
  return (
    <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
      {projects.map((project, index) => (
        <div className='bg-gray-100 max-w-full flex-col mx-auto h-full' key={index}>
          <img src={project.imageUrl} alt={project.title} />
          <div className="legend flex flex-col items-center h-20">
            <h3>{project.title}</h3>
            {project.projectURL && (
              <a className="py-12 text-sm"href={project.projectURL} target="_blank" rel="noopener noreferrer">
                GitHub <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
            <p>{project.description}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ProjectsCarousel;
