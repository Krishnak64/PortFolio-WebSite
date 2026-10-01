import { useState, useEffect } from "react";
import { profile, modes, skills, experience, projects, resumes, stats } from "./data.js";

const base = import.meta.env.BASE_URL;
const links = ["about", "skills", "experience", "projects", "resume", "contact"];

export default function App() {
  const [mode, setMode] = useState(() => { try { return localStorage.getItem("mode") || "fs"; } catch { return "fs"; } });
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const LIMIT = 5;
  useEffect(() => { document.documentElement.dataset.mode = mode; try { localStorage.setItem("mode", mode); } catch {} }, [mode]);
  const sorted = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const list = sorted.filter(p => filter === "all" || p.tags.includes(filter));
  const shown = showAll ? list : list.slice(0, LIMIT);
  const count = k => projects.filter(p => k === "all" || p.tags.includes(k)).length;

  return (
    <>
      <header className="bar">
        <a href="#top" className="logo">Krishna</a>
        <nav aria-label="Sections">{links.map(l => <a key={l} href={`#${l}`}>{l}</a>)}</nav>
        <Toggle mode={mode} setMode={setMode} />
      </header>

      <main id="top">
        <section className="hero wrap">
          <p className="meta">B.Tech IT, 2027 · {profile.location}</p>
          <h1>Krishna<span className="dot">.</span></h1>
          <p className="line" key={mode}>{modes[mode].line}</p>
          <div className="cta">
            <a className="btn solid" href="#projects">See projects</a>
            <a className="btn" href={`${base}${resumes.find(r => r.mode === mode).file}`} download>Download {modes[mode].label} resume</a>
          </div>
          <dl className="stats">{stats.map(([n, l]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}</dl>
        </section>

        <Section id="about" title="About">
          <p className="lead">{modes[mode].about}</p>
          <p className="muted">Switch the toggle at the top to view this portfolio as a full stack developer or in AI/ML. Skills and projects reorder to match.</p>
        </Section>

        <Section id="skills" title="Skills">
          <div className="skills">{skills[mode].map(([k, v]) => <div key={k}><h3>{k}</h3><p>{v}</p></div>)}</div>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="tl">{experience.map(e => (
            <li key={e.role}><span className="when">{e.when}</span><h3>{e.role}</h3><p className="org">{e.org}</p><p>{e.text}</p></li>))}</ol>
        </Section>

        <Section id="projects" title="Projects">
          <div className="filters" role="group" aria-label="Filter projects">
            {[["all", "All"], ["fs", "Full Stack"], ["ai", "AI/ML"]].map(([k, l]) => (
              <button key={k} aria-pressed={filter === k} className={filter === k ? "act" : ""} onClick={() => { setFilter(k); setShowAll(false); }}>{l} <span>{count(k)}</span></button>))}
          </div>
          <div className="grid">{shown.map(p => {
            const isOpen = open === p.id || p.featured;
            return (
              <article key={p.id} className={`card ${p.featured ? "feat" : ""}`}>
                <div className="chips">
                  {p.tags.map(t => <span key={t} className={`chip ${t}`}>{modes[t].label}</span>)}
                  {p.live && <span className="chip live">Live</span>}
                </div>
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
                {isOpen && <ul className={p.featured ? "two" : ""}>{p.features.map(f => <li key={f}>{f}</li>)}</ul>}
                {p.readmeDemo && <p className="muted">Video demo: available in the project README on GitHub.</p>}
                <p className="stack">{p.stack.join(", ")}</p>
                <div className="row">
                  {!p.featured && <button className="link" aria-expanded={isOpen} onClick={() => setOpen(open === p.id ? null : p.id)}>{isOpen ? "Hide details" : "Show details"}</button>}
                  {p.readmeDemo && <a className="link" href={p.repo + "#readme"} target="_blank" rel="noreferrer">Watch video demo (in README)</a>}
                  {typeof p.live === "string" && <a className="link" href={p.live} target="_blank" rel="noreferrer">Live demo</a>}
                  {p.demo && <a className="link" href={p.demo} target="_blank" rel="noreferrer">Streamlit demo</a>}
                  <a className="link" href={p.repo} target="_blank" rel="noreferrer">View code on GitHub</a>
                </div>
              </article>);
          })}</div>
          {list.length > LIMIT && (
            <div className="more">
              <p className="muted">Showing {shown.length} of {list.length} projects</p>
              <button className="btn" onClick={() => setShowAll(!showAll)}>{showAll ? "Show fewer projects" : `Show all ${list.length} projects`}</button>
            </div>)}
        </Section>

        <Section id="resume" title="Resume">
          <p className="muted">Two versions, each tuned to a role. Download the one that fits.</p>
          <div className="res">{resumes.map(r => (
            <a key={r.file} className={`resc ${r.mode === mode ? "on" : ""}`} href={`${base}${r.file}`} download>
              <strong>{r.title}</strong><span>{r.note}</span><em>Download PDF</em>
            </a>))}</div>
        </Section>

        <Section id="contact" title="Contact">
          <p className="lead">Open to internships and full-time roles. The fastest way to reach me is email.</p>
          <div className="cta">
            <a className="btn solid" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="btn" href={`tel:${profile.phone}`}>{profile.phone}</a>
          </div>
          <p className="soc"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a><a href={profile.gfg} target="_blank" rel="noreferrer">GeeksforGeeks</a></p>
        </Section>
      </main>
      <footer className="wrap foot">© {new Date().getFullYear()} Krishna. Built with React.</footer>
    </>
  );
}

function Section({ id, title, children }) {
  return <section id={id} className="wrap sec"><h2>{title}</h2>{children}</section>;
}
function Toggle({ mode, setMode }) {
  return (
    <div className="tog" role="group" aria-label="Portfolio view">
      {Object.entries(modes).map(([k, m]) => (
        <button key={k} aria-pressed={mode === k} className={mode === k ? "act" : ""} onClick={() => setMode(k)}>{m.label}</button>))}
    </div>
  );
}
