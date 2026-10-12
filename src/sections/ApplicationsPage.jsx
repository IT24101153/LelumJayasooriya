import { useEffect, useState } from 'react';
import { ProjectGrid } from '../components/ProjectGrid';
import { ProjectPreviewModal } from '../components/ProjectPreviewModal';
import { applicationProjects } from '../data/siteContent';

export function ApplicationsPage({ onBack }) {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      document
        .querySelectorAll('.applications-page .scroll-reveal:not(.visible)')
        .forEach((el) => el.classList.add('visible'));
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <section className="section applications-page">
        <div className="container">
          <button
            type="button"
            className="page-back-button scroll-reveal"
            onClick={onBack}
          >
            <span aria-hidden="true">&larr;</span>
            Back to home
          </button>

          <h2 className="section-title scroll-reveal">Applications</h2>

          <ProjectGrid
            projects={applicationProjects}
            onOpen={setSelectedProject}
          />
        </div>
      </section>

      <ProjectPreviewModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        mediaVariant="contain"
        downloadLabel="Download for macOS"
      />
    </>
  );
}
