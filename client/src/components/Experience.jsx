import Section from './Section.jsx';
import { experience } from '../data/content.js';

export default function Experience() {
  return (
    <Section id="experience" title="Experience" lead="Three internships in 2024, all remote from Lucknow.">
      <ol className="timeline">
        {experience.map((e) => (
          <li key={e.company} className="timeline__item">
            <div className="timeline__meta">
              <span className="timeline__period">{e.period}</span>
              <span>{e.where}</span>
            </div>
            <div className="timeline__body">
              <h3>{e.role}</h3>
              <p className="timeline__company">{e.company}</p>
              <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
