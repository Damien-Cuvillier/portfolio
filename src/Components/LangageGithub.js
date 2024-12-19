// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const fetchGitHubRepos = async (username) => {
//   const response = await fetch(`https://api.github.com/users/Damien-Cuvillier/repos`);
//   const data = await response.json();
//   return data;
// };

// const fetchRepoLanguages = async (repoUrl) => {
//   const response = await fetch(repoUrl);
//   const data = await response.json();
//   return data;
// };

// const LanguageChart = ({ languages }) => {
//   const data = {
//     labels: Object.keys(languages),
//     datasets: [{
//       label: 'Languages',
//       data: Object.values(languages),
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderWidth: 1,
//     }]
//   };

//   return (
//     <div>
//       <Bar data={data} />
//     </div>
//   );
// };

// const Langage = ({ username }) => {
//   const [repos, setRepos] = useState([]);

//   useEffect(() => {
//     const getRepos = async () => {
//       const reposData = await fetchGitHubRepos(username);
//       const reposWithLanguages = await Promise.all(
//         reposData.map(async (repo) => {
//           const languages = await fetchRepoLanguages(repo.languages_url);
//           return { ...repo, languages };
//         })
//       );
//       setRepos(reposWithLanguages);
//     };

//     getRepos();
//   }, [username]);

//   return (
//     <div className="language">
//       {repos.map((repo) => (
//         <div key={repo.id} className="language-item">
//           <img src={repo.owner.avatar_url} alt={repo.name} />
//           <h3 className='text-xl font-bold mt-4'>{repo.name}</h3>
//           <LanguageChart languages={repo.languages} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Langage;
