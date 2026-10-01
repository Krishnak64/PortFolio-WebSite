import { useState, useEffect, useRef } from "react";
import { profile, modes, skills, experience, projects, resumes, stats } from "./data.js";

const base = import.meta.env.BASE_URL;
const phrases = { fs: ["MERN apps", "real-time products", "secure REST APIs", "payment-ready platforms"], ai: ["LLM agents", "RAG pipelines", "computer vision apps", "reinforcement learning agents"] };
const tech = ["React", "Node.js", "Express", "MongoDB", "LangGraph", "LangChain", "RAG", "PyTorch", "Qdrant", "Redis", "Docker", "OpenCV", "Streamlit", "Socket.IO"];
const spot = e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px"); e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px"); };
const links = ["about", "skills", "experience", "projects", "resume", "contact"];

export default function App() {
  const [mode, setMode] = useState(() => { try { return localStorage.getItem("mode") || "fs"; } catch { return "fs"; } });
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const LIMIT = 5;
  const typed = useTyped(phrases[mode]);
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
          <Network />
          <p className="meta">B.Tech IT, 2027 · {profile.location}</p>
          <h1>Krishna<span className="dot">.</span></h1>
          <p className="line" key={mode}>{modes[mode].line}</p>
          <p className="typed">I build <span>{typed}</span><i className="caret" aria-hidden="true" /></p>
          <div className="cta">
            <a className="btn solid" href="#projects">See projects</a>
            <a className="btn" href={`${base}${resumes.find(r => r.mode === mode).file}`} download>Download {modes[mode].label} resume</a>
          </div>
          <dl className="stats">{stats.map(([n, l]) => <div key={l}><dt><Count v={n} /></dt><dd>{l}</dd></div>)}</dl>
        </section>

        <div className="marq" aria-hidden="true"><div>{[...tech, ...tech].map((x, i) => <span key={i}>{x}</span>)}</div></div>

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
              <article key={p.id} className={`card ${p.featured ? "feat" : ""}`} onMouseMove={spot}>
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
            <a key={r.file} onMouseMove={spot} className={`resc ${r.mode === mode ? "on" : ""}`} href={`${base}${r.file}`} download>
              <strong>{r.title}</strong><span>{r.note}</span><em>Download PDF</em>
            </a>))}</div>
        </Section>

        <Section id="contact" title="Contact">
          <p className="lead">Open to internships and full-time roles. The fastest way to reach me is email.</p>
          <div className="cta">
            <a className="btn solid" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="btn" href={`tel:${profile.phone}`}>{profile.phone}</a>
          </div>
          <p className="soc"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a><a href={profile.gfg} target="_blank" rel="noreferrer">GFG</a></p>
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

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useTyped(words) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (calm()) { setText(words[0]); return; }
    let i = 0, j = 0, del = false, id;
    const tick = () => {
      const w = words[i % words.length];
      j += del ? -1 : 1; setText(w.slice(0, j));
      let d = del ? 35 : 75;
      if (!del && j === w.length) { del = true; d = 1400; } else if (del && j === 0) { del = false; i++; d = 300; }
      id = setTimeout(tick, d);
    };
    tick();
    return () => clearTimeout(id);
  }, [words]);
  return text;
}

function Count({ v }) {
  const m = v.match(/^([\d.]+)(.*)$/), target = parseFloat(m[1]), suf = m[2], dec = m[1].includes(".") ? 1 : 0;
  const [n, setN] = useState(calm() ? target : 0);
  const ref = useRef(null);
  useEffect(() => {
    if (calm()) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const s = performance.now();
      const f = now => { const p = Math.min((now - s) / 1400, 1); setN(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{n.toFixed(dec)}{suf}</span>;
}

function Network() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d"), still = calm();
    let w, h, raf, nodes = [], frame = 0, col = "#5b8cff"; const mouse = { x: -999, y: -999 };
    const size = () => {
      const r = cv.parentElement.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      nodes = Array.from({ length: Math.round(Math.min(70, (w * h) / 16000)) }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
    };
    const draw = () => {
      if (frame++ % 15 === 0) col = getComputedStyle(document.documentElement).getPropertyValue("--a1").trim() || col;
      ctx.clearRect(0, 0, w, h);
      for (const p of nodes) {
        if (!still) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          if (dx * dx + dy * dy < 22000) { p.x += dx * 0.004; p.y += dy * 0.004; }
        }
        ctx.globalAlpha = 0.8; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 6.283); ctx.fill();
      }
      ctx.strokeStyle = col;
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, dd = dx * dx + dy * dy;
        if (dd < 14400) { ctx.globalAlpha = (1 - dd / 14400) * 0.35; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      if (!still) raf = requestAnimationFrame(draw);
    };
    const resize = () => { size(); if (still) draw(); };
    const move = e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    size(); draw();
    window.addEventListener("resize", resize); window.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} className="net" aria-hidden="true" />;
<<<<<<< HEAD
}
=======
}
>>>>>>> 32bdd1467784e08667befa01a8280fa08b053d0e
