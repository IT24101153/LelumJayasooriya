import { CleanCodeCard } from '../components/CleanCodeCard';
import { DurationCard } from '../components/DurationCard';
import { PixelPerfectCard } from '../components/PixelPerfectCard';
import { aboutIntro } from '../data/siteContent';

export function AboutStatsSection() {
  return (
    <section className="section about-stats-section">
      <div className="container">
        <div className="about-stats-grid">
          <article className="about-card-large scroll-reveal">
            <h2 className="about-card-heading">{aboutIntro.heading}</h2>
            {aboutIntro.body.map((paragraph) => (
              <p key={paragraph} className="about-card-body">{paragraph}</p>
            ))}
          </article>

          <CleanCodeCard />
          <DurationCard />
          <PixelPerfectCard />
        </div>
      </div>
    </section>
  );
}
