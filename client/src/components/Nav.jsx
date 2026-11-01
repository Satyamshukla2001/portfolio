import { useEffect, useState } from 'react';

const links = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['work', 'Work'],
  ['skills', 'Skills'],
  ['contact', 'Contact']
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
        <span className="nav__mark" aria-hidden="true" />
        Satyam Shukla
      </a>
      <button
        className={`nav__toggle ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-controls="menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        <span /><span />
      </button>
      <nav id="menu" className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Main">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
