import LanguageChart from "./LanguageChart";
import { useEffect, useState } from "react";

function RepoCard({ repo }) {
  const [languages, setLanguages] = useState({});
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    async function loadExtra() {
      const lang = await fetch(repo.languages_url).then((r) => r.json());
      setLanguages(lang);

      const contrib = await fetch(repo.contributors_url).then((r) =>
        r.json()
      );
      setContributors(contrib.slice(0, 5));
    }

    loadExtra();
  }, [repo]);

  return (
    <div className="repo-card">
      <h2>{repo.full_name}</h2>

      <img
        src={repo.owner.avatar_url}
        width={80}
        style={{ borderRadius: "50%" }}
        alt="avatar"
      />

      <p>{repo.description || "Sem descrição"}</p>

      <div className="info-grid">
        <p><strong>🌐 Linguagem principal:</strong> {repo.language}</p>
        <p><strong>⭐ Stars:</strong> {repo.stargazers_count}</p>
        <p><strong>🍴 Forks:</strong> {repo.forks_count}</p>
        <p><strong>🐞 Issues abertas:</strong> {repo.open_issues_count}</p>
        <p><strong>🔄 Atualizado em:</strong> {new Date(repo.updated_at).toLocaleString()}</p>
      </div>

      <a href={repo.html_url} target="_blank" rel="noreferrer">
        🔗 Abrir no GitHub
      </a>

      <h3 style={{ marginTop: 20 }}>Distribuição de Linguagens</h3>
      <LanguageChart languages={languages} />

      <h3 style={{ marginTop: 20 }}>Top Contribuidores</h3>

      <div className="contributors">
        {contributors.map((c) => (
          <div key={c.id} className="contributor">
            <img src={c.avatar_url} width={50} alt="" />
            <p>{c.login}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RepoCard;
