import { useState } from "react";
import RepoCard from "./components/RepoCard";
import "./App.css";

function App() {
  const [repoName, setRepoName] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState("");

  async function fetchRepo() {
    setError("");
    setRepoData(null);

    if (!repoName.includes("/")) {
      setError("Use o formato: usuario/repo");
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${repoName}`);
      if (!response.ok) {
        throw new Error("Repositório não encontrado.");
      }

      const data = await response.json();
      setRepoData(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h1>GitHub Repository Viewer</h1>

      <div className="search-box">
        <input
          placeholder="Ex: facebook/react"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />

        <button onClick={fetchRepo}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {repoData && <RepoCard repo={repoData} />}
    </div>
  );
}

export default App;
