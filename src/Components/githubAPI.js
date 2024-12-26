const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error("GitHub token is missing! Please check your .env file.");
} else {
  console.log("GitHub token loaded:", GITHUB_TOKEN); // Ajouter un log pour vérifier que le token est bien chargé
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
    return {}; // Retourne un objet vide en cas d'erreur
  }
};
