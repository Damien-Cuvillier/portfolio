const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error("GitHub token is missing! Please check your .env file.");
} else {
  console.log("GitHub token loaded:", GITHUB_TOKEN); // Ajouter un log pour vérifier que le token est bien chargé
}

export const fetchRepoLanguages = async (repoUrl) => {
  try {
    // Vérifions que le token est bien chargé
    if (!GITHUB_TOKEN) {
      throw new Error("GitHub token is not configured");
    }

    const response = await fetch(repoUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repo languages:', error.message);
    return {};
  }
};
