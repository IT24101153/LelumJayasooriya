import { MdVerified } from 'react-icons/md';
import { heroProfile } from '../data/siteContent';

export function HeroSection({ onNavigate }) {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-portrait fade-in-up">
          <div className="hero-portrait-aurora" aria-hidden="true" />
          <div className="hero-portrait-frame">
            <img
              src={heroProfile.image}
              alt={`${heroProfile.name} portrait`}
              className="hero-portrait-image"
            />
          </div>
        </div>

        <div className="hero-identity fade-in-up delay-1">
          <span className="hero-name">{heroProfile.name}</span>
          {heroProfile.verified && (
            <MdVerified className="hero-verified" aria-label="Verified" />
          )}
        </div>

        <h1 className="hero-title fade-in-up delay-1">{heroProfile.title}</h1>

        <a
          href={heroProfile.ctaTarget}
          className="hero-cta fade-in-up delay-2"
          onClick={(event) => onNavigate(event, heroProfile.ctaTarget)}
        >
          {heroProfile.ctaLabel}
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </div>
      <div className="hero-background-gradient" />
    </section>
  );
}
