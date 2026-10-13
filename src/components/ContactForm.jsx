import { useState } from 'react';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    // no key configured yet (see .env.example): fail clearly instead of posting a bad request
    if (!ACCESS_KEY) {
      setStatus('error');
      setMessage('The contact form is not connected yet. Please reach out by email or WhatsApp below.');
      return;
    }

    setStatus('sending');
    setMessage('');

    const formData = new FormData(event.target);
    formData.append('access_key', ACCESS_KEY);
    formData.append('subject', 'New message from lelumjayasooriya.com');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage("Thanks! I'll get back to you shortly.");
        event.target.reset();
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again or use email.');
    }
  };

  const isSending = status === 'sending';

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-form-row">
        <div className="contact-field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            required
            disabled={isSending}
          />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            disabled={isSending}
          />
        </div>
      </div>
      <div className="contact-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          placeholder="Tell me about the role or project you have in mind."
          required
          disabled={isSending}
        />
      </div>

      <input
        type="checkbox"
        name="botcheck"
        className="contact-honeypot"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="contact-form-actions">
        <button type="submit" className="btn-primary large" disabled={isSending}>
          {isSending ? 'Sending…' : 'Send Message'}
        </button>
        {message && (
          <p
            className={`contact-form-status is-${status}`}
            role={status === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
