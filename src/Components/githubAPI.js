// src/Components/githubAPI.js
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const fetchRepoLanguages = async (repoUrl) => {
  const response = await fetch(repoUrl, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  });
  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
