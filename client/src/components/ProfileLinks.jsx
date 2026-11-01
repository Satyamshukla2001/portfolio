import { profile } from '../data/content.js';

export const profileLinks = [
  {
    id: 'github',
    label: 'GitHub',
    text: 'Satyamshukla2001',
    href: profile.github,
    external: true,
    brand: true,
    icon: <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.45 4.77 1.73.1-.72.39-1.22.7-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.43 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    text: 'satyam-shukla',
    href: profile.linkedin,
    external: true,
    brand: true,
    icon: <path d="M5.2 7.8a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM3.4 9.4h3.6v11.2H3.4V9.4Zm5.8 0h3.4v1.5h.05a3.75 3.75 0 0 1 3.38-1.86c3.62 0 4.29 2.38 4.29 5.47v6.09h-3.6v-5.4c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5H9.2V9.4Z" />
  },
  {
    id: 'email',
    label: 'Email',
    text: profile.email,
    href: `mailto:${profile.email}`,
    icon: <path d="M3 5.5h18v13H3v-13Zm1.2 1.2 7.8 6.1 7.8-6.1M4.2 17.3l5.1-4m10.5 4-5.1-4" />
  },
  {
    id: 'location',
    label: 'Based in',
    text: profile.location,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.location)}`,
    external: true,
    icon: <><path d="M19 10.1c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>
  }
];

export function ProfileIcon({ link }) {
  return (
    <svg className={link.brand ? 'about__icon--brand' : ''} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {link.icon}
    </svg>
  );
}
