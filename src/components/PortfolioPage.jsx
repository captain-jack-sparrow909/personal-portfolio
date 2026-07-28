"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { portfolio } from "../data";

const pad = (value) => String(value).padStart(2, "0");

function useClock() {
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    [],
  );
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    setTime(formatter.format(new Date()));
    const timer = window.setInterval(
      () => setTime(formatter.format(new Date())),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [formatter]);

  return time;
}

function Frame({ className = "" }) {
  return (
    <div className={`frame ${className}`} aria-hidden="true">
      <span className="frame__corner frame__corner--tl">+</span>
      <span className="frame__corner frame__corner--tr">+</span>
      <span className="frame__corner frame__corner--bl">+</span>
      <span className="frame__corner frame__corner--br">+</span>
    </div>
  );
}

function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame;
    let width = 0;
    let height = 0;
    let stars = [];
    let pointerX = 0;
    let pointerY = 0;

    const makeStars = () => {
      const count = Math.min(190, Math.floor((width * height) / 9000));
      stars = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: index % 17 === 0 ? 1.5 : Math.random() * 0.9 + 0.25,
        alpha: Math.random() * 0.65 + 0.12,
        speed: Math.random() * 0.06 + 0.01,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
    };

    const onPointer = (event) => {
      pointerX = (event.clientX / width - 0.5) * 7;
      pointerY = (event.clientY / height - 0.5) * 7;
    };

    const draw = (timestamp = 0) => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = reduced
          ? 1
          : 0.62 + Math.sin(timestamp * 0.0012 + star.phase) * 0.38;
        const drift = reduced ? 0 : (timestamp * star.speed) % (height + 20);
        const y = (star.y + drift) % (height + 20) - 10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(235, 239, 255, ${star.alpha * twinkle})`;
        ctx.arc(
          star.x + pointerX * star.speed,
          y + pointerY * star.speed,
          star.size,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas className="starfield" ref={canvasRef} aria-hidden="true" />;
}

function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const update = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      ref.current?.style.setProperty(
        "--progress",
        `${Math.min(window.scrollY / total, 1)}`,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}

function CursorOrb() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let frame;

    const onMove = (event) => {
      tx = event.clientX;
      ty = event.clientY;
      ref.current?.classList.add("is-visible");
    };
    const render = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      frame = window.requestAnimationFrame(render);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    frame = window.requestAnimationFrame(render);
    return () => {
      document.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-orb" ref={ref} aria-hidden="true" />;
}

function OrbitMark() {
  return (
    <div className="orbit-mark" aria-hidden="true">
      <div className="orbit-mark__axis orbit-mark__axis--x" />
      <div className="orbit-mark__axis orbit-mark__axis--y" />
      <div className="orbit-mark__ring orbit-mark__ring--outer">
        <span>PRODUCT · SYSTEMS · INTERACTION · AI · MOTION ·</span>
      </div>
      <div className="orbit-mark__ring orbit-mark__ring--mid" />
      <div className="orbit-mark__ring orbit-mark__ring--inner" />
      <div className="orbit-mark__core">
        <i />
        <i />
        <i />
      </div>
      <span className="orbit-mark__node orbit-mark__node--one" />
      <span className="orbit-mark__node orbit-mark__node--two" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Work", "#work"],
    ["About", "#about"],
    ["Expertise", "#expertise"],
    ["Contact", "#contact"],
  ];

  return (
    <header className={`site-header ${open ? "is-open" : ""}`}>
      <a className="brand" href="#top" aria-label="Back to top">
        <span>{portfolio.shortName}</span>
        <small>PORTFOLIO / 26</small>
      </a>
      <nav aria-label="Primary navigation">
        {links.map(([label, href], index) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            <span>{pad(index + 1)}</span>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-status" href={`mailto:${portfolio.email}`}>
        <i />
        {portfolio.availability}
      </a>
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
    </header>
  );
}

function Hero() {
  const time = useClock();

  return (
    <section className="hero" id="top">
      <Frame />
      <div className="hero__meta hero__meta--location">
        <span>{portfolio.location}</span>
        <span>{portfolio.coordinates[0]}</span>
        <span>{portfolio.coordinates[1]}</span>
      </div>
      <div className="hero__meta hero__meta--time">
        <span>LOCAL TIME</span>
        <span>{time} GST</span>
      </div>
      <div className="hero__signal">
        <span>SIGNAL</span>
        <i />
        <small>ONLINE</small>
      </div>
      <OrbitMark />
      <p className="hero__microcopy">DESIGNING INTELLIGENT<br />DIGITAL EXPERIENCES</p>
      <div className="hero__identity">
        <span className="hero__index">EST. / 2018</span>
        <h1 aria-label={portfolio.name}>
          {portfolio.name.split(" ").map((word) => (
            <span key={word}>{word}</span>
          ))}
        </h1>
        <div className="hero__roles" aria-label={portfolio.roleLines.join(" ")}>
          {portfolio.roleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
      <a className="scroll-cue" href="#about">
        <span>Scroll to explore</span>
        <i>↓</i>
      </a>
    </section>
  );
}

function SectionLabel({ index, children }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <i />
      <span>{children}</span>
    </div>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <Frame />
      <SectionLabel index="01">Profile / Approach</SectionLabel>
      <div className="about__statement reveal">
        <span>I BUILD</span>
        <span className="about__offset">INTELLIGENT</span>
        <span>DIGITAL</span>
        <span className="about__offset">EXPERIENCES</span>
      </div>
      <div className="about__lower">
        <p className="about__intro reveal">{portfolio.intro}</p>
        <div className="about__services reveal">
          <span>FOCUS AREAS</span>
          <ul>
            {portfolio.services.map((service, index) => (
              <li key={service}>
                <span>{pad(index + 1)}</span>
                {service}
              </li>
            ))}
          </ul>
        </div>
        <div className="about__telemetry" aria-hidden="true">
          <span>CREATIVE SIGNAL</span>
          <div>
            {Array.from({ length: 22 }, (_, index) => (
              <i
                key={index}
                style={{ "--height": `${18 + ((index * 19) % 78)}%` }}
              />
            ))}
          </div>
          <small>98.6%</small>
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ type }) {
  return (
    <div className={`project-visual project-visual--${type}`} aria-hidden="true">
      {type === "signal" && (
        <>
          <div className="signal-grid" />
          <div className="signal-sphere" />
          <div className="signal-label">SIGNAL / ACTIVE</div>
        </>
      )}
      {type === "nexus" && (
        <>
          <div className="nexus-cross" />
          <div className="nexus-rings">
            <i />
            <i />
            <i />
          </div>
          <div className="nexus-code">01:0110:AI<br />SYS.CONNECT</div>
        </>
      )}
      {type === "arc" && (
        <>
          <div className="arc-form arc-form--one" />
          <div className="arc-form arc-form--two" />
          <div className="arc-form arc-form--three" />
          <div className="arc-caption">GENERATIVE FORM / 03</div>
        </>
      )}
      {type === "orbit" && (
        <>
          <div className="orbit-planet" />
          <div className="orbit-path orbit-path--one" />
          <div className="orbit-path orbit-path--two" />
          <div className="orbit-pulse" />
        </>
      )}
      <div className="project-visual__scanline" />
    </div>
  );
}

function Work() {
  return (
    <section className="work" id="work">
      <SectionLabel index="02">Selected work / 2025—26</SectionLabel>
      <div className="work__header">
        <h2 className="reveal">SELECTED<br />MISSIONS</h2>
        <div className="work__counter">
          <span>ARCHIVE SIZE</span>
          <strong>{pad(portfolio.projects.length)}</strong>
        </div>
      </div>
      <div className="projects">
        {portfolio.projects.map((project) => (
          <article className="project reveal" key={project.title}>
            <a href={project.url} aria-label={`View ${project.title} project`}>
              <ProjectVisual type={project.visual} />
              <div className="project__meta">
                <span>{project.number}</span>
                <span>{project.year}</span>
              </div>
              <div className="project__copy">
                <p>{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <span className="project__arrow">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="expertise" id="expertise">
      <Frame />
      <SectionLabel index="03">Capabilities / Toolkit</SectionLabel>
      <div className="expertise__title reveal">
        <span>SYSTEMS</span>
        <span>CRAFT</span>
        <span>IMPACT</span>
      </div>
      <div className="capabilities">
        {portfolio.capabilities.map((item) => (
          <article className="capability reveal" key={item.index}>
            <span>{item.index}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <i>✦</i>
          </article>
        ))}
      </div>
      <div className="toolkit" aria-label="Technology toolkit">
        <div className="toolkit__track">
          {[...portfolio.tools, ...portfolio.tools].map((tool, index) => (
            <span key={`${tool}-${index}`}>{tool} <i>✦</i></span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto">
      <SectionLabel index="04">Working principle</SectionLabel>
      <blockquote className="reveal">
        “{portfolio.manifesto}”
      </blockquote>
      <div className="manifesto__orb" aria-hidden="true">
        <span>IDEA</span>
        <span>CODE</span>
        <span>FEELING</span>
        <i />
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${portfolio.email}`;
    }
  };

  return (
    <footer className="contact" id="contact">
      <Frame />
      <SectionLabel index="05">Open channel / Contact</SectionLabel>
      <div className="contact__headline reveal">
        <span>LET'S BUILD</span>
        <span>SOMETHING</span>
        <span>REMARKABLE</span>
      </div>
      <div className="contact__grid">
        <button className="contact-orb" type="button" onClick={copyEmail}>
          <span>{copied ? "COPIED" : "COPY EMAIL"}</span>
          <i />
        </button>
        <div className="contact__details">
          <span>START A CONVERSATION</span>
          <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
          <p>Have a product, system, or strange idea in mind? Send a note and tell me what you’re building.</p>
        </div>
        <nav className="socials" aria-label="Social links">
          {portfolio.socials.map((social, index) => (
            <a href={social.href} key={social.label}>
              <span>{pad(index + 1)}</span>
              {social.label}
              <i>↗</i>
            </a>
          ))}
        </nav>
      </div>
      <div className="contact__footer">
        <span>© {new Date().getFullYear()} {portfolio.name}</span>
        <span>Designed + engineered with intention</span>
        <a href="#top">Back to orbit ↑</a>
      </div>
    </footer>
  );
}

export default function PortfolioPage() {
  useEffect(() => {
    document.documentElement.classList.add("has-js");
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#work">Skip to work</a>
      <Starfield />
      <ScrollProgress />
      <CursorOrb />
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Expertise />
        <Manifesto />
      </main>
      <Contact />
    </>
  );
}
