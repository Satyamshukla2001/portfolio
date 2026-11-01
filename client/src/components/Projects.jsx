import { useEffect, useMemo, useState } from 'react';
import Section from './Section.jsx';
import { getProjects, getRepos } from '../api.js';
import { fallbackProjects } from '../data/content.js';

const filters = [
  ['all', 'All'],
  ['fullstack', 'Full-stack'],
  ['ai', 'AI and vision'],
  ['mobile', 'Mobile'],
  ['data', 'Data']
];

function ProjectCard({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`card ${open ? 'is-open' : ''}`}>
      <div className="card__top">
        <h3>{p.title}</h3>
        {p.featured && <span className="badge">Featured</span>}
      </div>
      <p className="card__sub">{p.subtitle}</p>
      <p className="card__summary">{p.summary}</p>

      {p.highlights?.length > 0 && (
        <>
          <ul className="card__more" hidden={!open}>
            {p.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <button className="linkbtn" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? 'Show less' : 'What I built'}
          </button>
        </>
      )}

      <ul className="tags">{p.stack?.map((s) => <li key={s}>{s}</li>)}</ul>

      <div className="card__links">
        {p.repoUrl ? (
          <a href={p.repoUrl} target="_blank" rel="noreferrer">View code on GitHub</a>
        ) : (
          <span className="muted">Code available on request</span>
        )}
        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer">Live demo</a>}
      </div>
    </article>
  );
}

function timeAgo(iso) {
  const days = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (days < 1) return 'today';
  if (days < 31) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [repos, setRepos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let alive = true;
    getProjects().then((d) => alive && d.length && setProjects(d)).catch(() => {});
    getRepos().then((d) => alive && setRepos(d)).catch(() => {});
    return () => { alive = false; };
  }, []);

  const shown = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  return (
    <Section id="work" title="Selected work" lead="Products, APIs and models I have built. Repositories link to GitHub where the code is public.">
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map(([key, label]) => (
          <button key={key} className={filter === key ? 'is-active' : ''} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid">
        {shown.map((p) => <ProjectCard key={p._id || p.title} p={p} />)}
      </div>

      {repos.length > 0 && (
        <div className="repos">
          <h3>Live from GitHub</h3>
          <ul>
            {repos.map((r) => (
              <li key={r.name}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  <strong>{r.name}</strong>
                  <span>{r.description || 'No description yet.'}</span>
                  <em>{[r.language, `updated ${timeAgo(r.updatedAt)}`].filter(Boolean).join(', ')}</em>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
