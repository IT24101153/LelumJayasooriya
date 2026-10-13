import { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectVisual } from './ProjectGrid';

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectPreviewModal({ project, onClose, mediaVariant = 'cover', downloadLabel = 'Download' }) {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const close = useCallback(() => {
    if (!project || isClosing) return;
    setIsClosing(true);
    window.setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  }, [project, isClosing, onClose]);

  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        close();
        return;
      }

      const modal = modalRef.current;
      if (event.key !== 'Tab' || !modal) return;

      // keep Tab cycling inside the dialog while it is open
      const focusable = modal.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const isOutside = !modal.contains(active);

      if (event.shiftKey && (active === first || isOutside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || isOutside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [project, close]);

  // move focus into the dialog on open, and hand it back to the card that opened it on close
  useEffect(() => {
    if (!project) return undefined;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [project]);

  if (!project) return null;

  const mediaClass = `project-preview-media${
    mediaVariant === 'contain' ? ' project-preview-media--contain' : ''
  }`;

  const facts = [
    project.year && { label: 'Year', value: project.year },
    project.type && { label: 'Type', value: project.type },
    project.role && { label: 'Role', value: project.role }
  ].filter(Boolean);

  const hasLinks = project.liveUrl || project.repoUrl || project.downloadUrl;

  return (
    <div
      className={`project-preview-overlay${isClosing ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onClick={close}
    >
      <div
        ref={modalRef}
        className={`project-preview-modal${isClosing ? ' is-closing' : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="project-preview-close"
          aria-label="Close details"
          onClick={close}
        >
          ×
        </button>

        <div className={mediaClass}>
          <ProjectVisual project={project} />
        </div>

        <div className="project-preview-content">
          <header className="project-detail-header">
            <h3>{project.title}</h3>
            {project.subtitle && <p className="project-detail-subtitle">{project.subtitle}</p>}
          </header>

          {facts.length > 0 && (
            <dl className="project-detail-facts">
              {facts.map((fact) => (
                <div key={fact.label} className="project-detail-fact">
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="project-detail-overview">{project.overview ?? project.description}</p>

          {project.highlights?.length > 0 && (
            <section className="project-detail-block">
              <h4 className="project-detail-heading">What I built</h4>
              <ul className="project-detail-list">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {project.stack?.length > 0 && (
            <section className="project-detail-block">
              <h4 className="project-detail-heading">Tech stack</h4>
              <div className="project-detail-stack">
                {project.stack.map((group) => (
                  <div key={group.group} className="project-detail-stack-group">
                    <span className="project-detail-stack-label">{group.group}</span>
                    <div className="project-preview-tags">
                      {group.items.map((item) => (
                        <span key={item} className="tag tag--soft">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hasLinks && (
            <div className="project-detail-links">
              {project.liveUrl && (
                <a
                  className="project-detail-link project-detail-link--primary"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live site
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.downloadUrl && (
                <a
                  className="project-detail-link project-detail-link--primary"
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span aria-hidden="true">↓</span>
                  {downloadLabel}
                </a>
              )}
              {project.repoUrl && (
                <a
                  className="project-detail-link"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
