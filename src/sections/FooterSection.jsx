import { ContactForm } from '../components/ContactForm';
import { socialLinks } from '../data/siteContent';
import { siteConfig } from '../data/siteConfig';

export function FooterSection({ whatsappHref, onNavigate }) {
  return (
    <footer id="contact">
      <div className="container footer-content">
        <div className="footer-cta scroll-reveal">
          <h2>Let&apos;s build something together.</h2>
          <p className="footer-cta-subtitle">
            Open to internship opportunities and interesting problems. Send a message and I&apos;ll
            reply within one business day.
          </p>

          <ContactForm />

          <div className="footer-cta-divider" aria-hidden="true">
            <span>or reach out directly</span>
          </div>
          <div className="footer-cta-actions">
            <a href={`mailto:${siteConfig.email}`} className="btn-secondary large">
              Send Email
            </a>
            {whatsappHref && (
              <a
                href={whatsappHref}
                className="btn-secondary large js-whatsapp-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>
          <p className="contact-meta">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <span>|</span>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>
          </p>
        </div>
        <div className="footer-links">
          <p>&copy; 2026 {siteConfig.name}. All rights reserved.</p>
          <div className="socials">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                onClick={social.href.startsWith('#') ? (event) => onNavigate(event, social.href) : undefined}
                target={social.href.startsWith('#') ? undefined : '_blank'}
                rel={social.href.startsWith('#') ? undefined : 'noopener noreferrer'}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
