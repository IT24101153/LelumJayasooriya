import { FaGithub } from 'react-icons/fa';
import { githubProfileUrl, githubRepos } from '../data/siteContent';

const languageColors = {
  Swift: '#F05138',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  React: '#61DAFB',
  Python: '#3776AB',
  Java: '#E76F00',
  PHP: '#777BB4',
  HTML: '#E34F26',
  CSS: '#1572B6',
  C: '#555555'
};

export function GithubSection() {
  return (
    <section id="github" className="section github-section">
      <div className="container">
        <div className="github-header scroll-reveal">
          <div>
            <p className="github-kicker">Open source</p>
            <h2 className="section-title github-title">On GitHub.</h2>
          </div>
          <a
            className="github-profile-link"
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
            View profile
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <ol className="gh-flow">
          {githubRepos.map((repo) => (
            <li key={repo.name} className="gh-flow-item scroll-reveal">
              <div className="gh-flow-rail" aria-hidden="true">
                <span className="gh-flow-year">{repo.year}</span>
                <span className="gh-flow-dot" />
              </div>

              <a
                className="gh-card"
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="gh-card-main">
                  <span className="gh-card-name">
                    <FaGithub className="gh-card-icon" aria-hidden="true" />
                    {repo.name}
                  </span>
                  <p className="gh-card-description">{repo.description}</p>
                  <span className="gh-card-meta">
                    {repo.language && (
                      <span className="gh-card-language">
                        <span
                          className="gh-card-language-dot"
                          style={{ background: languageColors[repo.language] ?? '#8b949e' }}
                          aria-hidden="true"
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="gh-card-year">{repo.year}</span>
                  </span>
                </div>
                <span className="gh-card-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
