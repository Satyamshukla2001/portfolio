import useReveal from '../hooks/useReveal.js';

export default function Section({ id, title, lead, children }) {
  const [ref, seen] = useReveal(0.08);
  return (
    <section id={id} ref={ref} className={`section ${seen ? 'is-seen' : ''}`}>
      <div className="wrap">
        <header className="section__head">
          <h2>{title}</h2>
          {lead && <p>{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
