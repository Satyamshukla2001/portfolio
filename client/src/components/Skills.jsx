import Section from './Section.jsx';
import { skills } from '../data/content.js';

export default function Skills() {
  return (
    <Section id="skills" title="Skills" lead="The tools I reach for most.">
      <div className="skills">
        {skills.map((s) => (
          <div key={s.group} className="skills__group">
            <h3>{s.group}</h3>
            <ul className="tags">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
