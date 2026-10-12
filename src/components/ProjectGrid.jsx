export function ProjectGrid({ projects, onOpen, eagerFirstImage = false }) {
  return (
    <div className="bento-grid">
      {projects.length === 0 && (
        <p className="bento-empty">No projects in this category yet.</p>
      )}
      {projects.map((project, index) => (
        <button
          key={project.slug}
          className={`bento-item ${project.size} scroll-reveal`}
          type="button"
          aria-label={`Open details for ${project.title}`}
          onClick={() => onOpen(project)}
        >
          <div className="bento-top">
            {(project.year || project.type) && (
              <span className="bento-meta">
                {[project.year, project.type].filter(Boolean).join(' · ')}
              </span>
            )}
          </div>

          <div className="bento-content">
            <h3>{project.title}</h3>
            {project.subtitle && <p className="bento-subtitle">{project.subtitle}</p>}
            <p>{project.description}</p>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <span className="bento-cta">
              View details
              <span aria-hidden="true">&rarr;</span>
            </span>
          </div>

          <div className="bento-visual">
            <ProjectVisual
              project={project}
              eager={eagerFirstImage && index === 0}
            />
          </div>
        </button>
      ))}
    </div>
  );
}

export function ProjectVisual({ project, eager = false }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  }

  const placeholder = project.placeholder ?? {};
  const from = placeholder.from ?? '#1f2937';
  const to = placeholder.to ?? '#0b0f17';
  const label = placeholder.label ?? project.title;

  return (
    <div
      className="bento-placeholder"
      role="img"
      aria-label={`${project.title} placeholder`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      <span className="bento-placeholder-label">{label}</span>
    </div>
  );
}
