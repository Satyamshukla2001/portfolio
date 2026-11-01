import { useEffect, useState } from 'react';
import Constellation from './Constellation.jsx';
import { profile } from '../data/content.js';

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="hero">
      <Constellation />
      <div className="wrap hero__grid">
        <div className="hero__text">
          <p className="hero__hello">Hi, I am Satyam, a full-stack engineer from {profile.location.split(',')[0]}.</p>
          <h1 className="hero__title">
            I build<br />
            <span key={i} className="hero__role">{profile.roles[i]}</span>
          </h1>
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__cta">
            <a className="btn btn--gold" href="#work">See my work</a>
            <a className="btn btn--ghost" href="#contact">Get in touch</a>
          </div>
        </div>

        <div className="arch" aria-hidden="true">
          <svg viewBox="0 0 320 400" className="arch__svg">
            <defs>
              <radialGradient id="sunCore">
                <stop offset="0" stopColor="#fff8d8" />
                <stop offset=".24" stopColor="#ffd0b5" />
                <stop offset=".58" stopColor="#ff4770" />
                <stop offset="1" stopColor="#c90040" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="rubyText" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fffbe8" />
                <stop offset=".48" stopColor="#ffd4bc" />
                <stop offset="1" stopColor="#ff5578" />
              </linearGradient>
              <filter id="sunGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="160" cy="200" r="118" fill="url(#sunCore)" opacity=".34" />
            <ellipse cx="160" cy="200" rx="136" ry="38" fill="none" stroke="#ff8fa8" strokeOpacity=".4" strokeWidth="1.4" transform="rotate(-24 160 200)" />
            <ellipse cx="160" cy="200" rx="108" ry="27" fill="none" stroke="#55e6a5" strokeOpacity=".32" strokeWidth="1" transform="rotate(28 160 200)" />
            <circle cx="160" cy="200" r="72" fill="url(#sunCore)" opacity=".72" />
            <g strokeLinecap="round">
              <path d="M160 99v-24M160 325v-24M59 200H35M285 200h-24M89 129l-17-17M248 288l-17-17M231 129l17-17M72 288l17-17" stroke="#ff9aaf" strokeOpacity=".65" strokeWidth="2" />
              <path d="M160 108v-12M160 304v-12M68 200H54M266 200h-14M94 134l-10-10M236 276l-10-10M226 134l10-10M84 276l10-10" stroke="#a6ffd7" strokeOpacity=".5" strokeWidth="1.2" />
            </g>
            <circle cx="70" cy="183" r="3" fill="#a6ffd7" />
            <circle cx="243" cy="235" r="2.5" fill="#ffb0bf" />
            <circle cx="195" cy="97" r="2" fill="#a6ffd7" />
            <text x="160" y="238" textAnchor="middle" className="arch__letters" filter="url(#sunGlow)">SS</text>
          </svg>
          <span className="chip chip--a">React</span>
          <span className="chip chip--b">FastAPI</span>
          <span className="chip chip--c">YOLO</span>
          <span className="chip chip--d">MongoDB</span>
        </div>
      </div>
    </section>
  );
}
