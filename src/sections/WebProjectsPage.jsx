import { useEffect, useMemo, useRef, useState } from 'react';
import { ProjectGrid } from '../components/ProjectGrid';
import { ProjectPreviewModal } from '../components/ProjectPreviewModal';
import { projectFilters, webProjects } from '../data/siteContent';

export function WebProjectsPage({ onBack }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const isFirstFilterRun = useRef(true);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') return webProjects;
    return webProjects.filter((project) => project.category?.includes(activeFilter));
  }, [activeFilter]);

  useEffect(() => {
    if (isFirstFilterRun.current) {
      isFirstFilterRun.current = false;
      return;
    }
    const id = window.requestAnimationFrame(() => {
      document
        .querySelectorAll('.bento-grid .bento-item.scroll-reveal:not(.visible)')
        .forEach((el) => el.classList.add('visible'));
    });
    return () => window.cancelAnimationFrame(id);
  }, [activeFilter]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      document
        .querySelectorAll('.web-projects-page .scroll-reveal:not(.visible)')
        .forEach((el) => el.classList.add('visible'));
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <section className="section web-projects-page">
        <div className="container">
          <button
            type="button"
            className="page-back-button scroll-reveal"
            onClick={onBack}
          >
            <span aria-hidden="true">&larr;</span>
            Back to home
          </button>

          <h2 className="section-title scroll-reveal">All Web Projects</h2>

          <div className="project-filters scroll-reveal" role="tablist" aria-label="Project filters">
            {projectFilters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`project-filter${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <ProjectGrid
            projects={visibleProjects}
            onOpen={setSelectedProject}
            eagerFirstImage
          />
        </div>
      </section>

      <ProjectPreviewModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
