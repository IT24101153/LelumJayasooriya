import { aboutCards } from '../data/siteContent';

export function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-intro scroll-reveal">
            <p className="about-kicker">About</p>
            <h2 className="section-title">Designing products with clarity and momentum.</h2>
          </div>
          <div className="about-cards scroll-reveal">
            {aboutCards.map((card) => (
              <article key={card.title} className="about-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
