import { durationCard } from '../data/siteContent';
import { useInView } from '../hooks/useInView';

export function DurationCard() {
  const [ref, inView] = useInView();

  return (
    <article ref={ref} className={`duration-card${inView ? ' is-active' : ''}`}>
      <p className="card-kicker">{durationCard.title}</p>

      <p className="duration-swap">
        <span className="duration-word duration-word--from">
          {durationCard.from}
          <span className="duration-strike" aria-hidden="true" />
        </span>
        <span className="duration-word duration-word--to">{durationCard.to}</span>
      </p>
    </article>
  );
}
