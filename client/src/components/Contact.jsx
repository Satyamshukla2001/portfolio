import { useState } from 'react';
import Section from './Section.jsx';
import { sendMessage } from '../api.js';
import { ProfileIcon, profileLinks } from './ProfileLinks.jsx';

const empty = { name: '', email: '', message: '', website: '' };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [state, setState] = useState({ status: 'idle', error: '' });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: 'sending', error: '' });
    try {
      await sendMessage(form);
      setForm(empty);
      setState({ status: 'sent', error: '' });
    } catch (err) {
      setState({ status: 'error', error: err.message });
    }
  };

  return (
    <Section id="contact" title="Let us talk" lead="I am open to SDE, full-stack and AI/ML roles. Send a message and I will reply by email.">
      <div className="contact">
        <ul className="contact__links">
          {profileLinks.map((link) => (
            <li key={link.id}>
              <a
                className="contact__icon"
                href={link.href}
                aria-label={link.id === 'location' ? `Open map for ${link.text}` : link.label}
                title={link.label}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                <ProfileIcon link={link} />
              </a>
            </li>
          ))}
        </ul>

        <form className="form" onSubmit={submit} noValidate>
          <label>Name
            <input value={form.name} onChange={set('name')} autoComplete="name" required />
          </label>
          <label>Email
            <input type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
          </label>
          <label>Message
            <textarea rows="5" value={form.message} onChange={set('message')} required />
          </label>
          <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} name="website" />
          <button className="btn btn--gold" disabled={state.status === 'sending'}>
            {state.status === 'sending' ? 'Sending' : 'Send message'}
          </button>
          <p className="form__status" role="status">
            {state.status === 'sent' && 'Message sent. Thank you, I will get back to you soon.'}
            {state.status === 'error' && <span className="form__error">{state.error}</span>}
          </p>
        </form>
      </div>
    </Section>
  );
}
