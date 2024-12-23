import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { fetchRepoLanguages } from './githubAPI';
import LangageGithub from './LangageGithub';

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
  const [repos, setRepos] = useState(projects.map(project => ({ ...project, languageData: [] })));

  useEffect(() => {
    const fetchLanguages = async () => {
      const updatedRepos = await Promise.all(
        projects.map(async (project) => {
          if (project.projectURL) {
            const repoName = project.projectURL.split('/').pop();
            const languages = await fetchRepoLanguages(`https://api.github.com/repos/Damien-Cuvillier/${repoName}/languages`);
            console.log('Langues récupérées pour', repoName, languages);

            const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
            const languageData = Object.keys(languages).map(key => ({
              name: key,
              value: parseFloat(((languages[key] / totalBytes) * 100).toFixed(2)),
            }));
            console.log('Données de langages formattées:', languageData);

            return { ...project, languageData };
          }
          return project;
        })
      );
      setRepos(updatedRepos);
    };

    fetchLanguages();
  }, []);

  return (
    <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false}>
      {repos.map((repo, index) => (
        <div className="bg-gray-100 max-w-full flex-col mx-auto h-full" key={index}>
          <div className="relative">
            <img src={repo.imageUrl} alt={repo.title} className="w-full h-64 object-cover rounded-md " />
            {repo.languageData && repo.languageData.length > 0 && (
              <div className="absolute top-0 left-0 m-4 p-2 bg-transparent rounded-md ">
                <LangageGithub data={repo.languageData} />
              </div>
            )}
          </div>
          <div className="legend flex flex-col items-center bg-white p-1 rounded-md shadow-md mt-4 h-24">
            <h3 className="text-xl font-bold text-white">{repo.title}</h3>
            {repo.projectURL && (
              <a className="my-12 py-2 text-sm text-white hover:underline" href={repo.projectURL} target="_blank" rel="noopener noreferrer">
                GitHub <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
            <p className="text-white">{repo.description}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ProjectsCarousel;
