import { pixelPerfectCard } from '../data/siteContent';
import { useInView } from '../hooks/useInView';

export function PixelPerfectCard() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const { eyebrow, title, footnote } = pixelPerfectCard;
  const words = title.split(' ');

  return (
    <article ref={ref} className={`pixel-card${inView ? ' is-active' : ''}`}>
      <div className="pixel-card-grid" aria-hidden="true" />
      <div className="pixel-card-glow" aria-hidden="true" />

      <div className="pixel-card-content">
        <p className="pixel-card-eyebrow">{eyebrow}</p>

        <h3 className="pixel-card-title">
          {words.map((word, index) => (
            <span key={word} className="pixel-card-word" style={{ '--word': index }}>
              {word}
            </span>
          ))}
        </h3>

        {footnote && <p className="pixel-card-footnote">{footnote}</p>}
      </div>
    </article>
  );
}
