import Section from './Section.jsx';
import { profile, achievements } from '../data/content.js';
import { ProfileIcon, profileLinks } from './ProfileLinks.jsx';

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="about">
        <div className="about__copy">
          {profile.about.map((p) => <p key={p}>{p}</p>)}
          <nav className="about__socials" aria-label="Contact and profile links">
            {profileLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                aria-label={link.id === 'location' ? `Location: ${profile.location}` : link.label}
                title={link.id === 'location' ? `Location: ${profile.location}` : link.label}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                <ProfileIcon link={link} />
              </a>
            ))}
          </nav>
        </div>
        <ul className="wins">
          {achievements.map((a) => (
            <li key={a.title}>
              <strong>{a.title}</strong>
              <span>{a.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
