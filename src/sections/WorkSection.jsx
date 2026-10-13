import { applicationProjects, webProjects } from '../data/siteContent';

export function WorkSection({ onViewAllWeb, onViewAllApps }) {
  const entries = [
    {
      title: 'Web Projects',
      description: 'Hand-coded sites, WordPress platforms, and e-commerce builds — all live in production.',
      count: webProjects.length,
      onOpen: onViewAllWeb,
      accent: 'web'
    },
    {
      title: 'Applications',
      description: 'Native macOS applications written in Swift, designed and built end to end.',
      count: applicationProjects.length,
      onOpen: onViewAllApps,
      accent: 'app'
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title scroll-reveal">Projects</h2>

        <div className="projects-entry-grid">
          {entries.map((entry) => (
            <button
              key={entry.title}
              type="button"
              className={`projects-entry-card projects-entry-card--${entry.accent} scroll-reveal`}
              onClick={entry.onOpen}
            >
              {/* phrasing content only: block elements are not allowed inside a button */}
              <span className="projects-entry-top">
                <span className="projects-entry-count">
                  {entry.count} {entry.count === 1 ? 'project' : 'projects'}
                </span>
                <span className="projects-entry-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </span>
              <span className="projects-entry-body">
                <span className="projects-entry-title">{entry.title}</span>
                <span className="projects-entry-description">{entry.description}</span>
              </span>
              <span className="projects-entry-cta">View all</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
