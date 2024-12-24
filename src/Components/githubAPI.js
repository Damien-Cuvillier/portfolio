// src/Components/githubAPI.js
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error("GitHub token is missing! Please check your .env file.");
}

export const fetchRepoLanguages = async (repoUrl) => {
  try {
    const response = await fetch(repoUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
