import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
} from "framer-motion";
import {
  Github,
  FileDown,
  ArrowUpRight,
  Star,
  MapPin,
  Terminal,
  Cpu,
  Braces,
  Database,
  BrainCircuit,
  BookOpen,
  Layers,
  Mail,
  Linkedin,
  Briefcase,
  GraduationCap,
  Phone,
  Globe,
  ExternalLink,
} from "lucide-react";
import {
  profile,
  skills,
  projects,
  demos,
  categoryOrder,
  langColors,
  experience,
  education,
  coursework,
  type Project,
} from "./data";
import { useActiveSection, useCountUp, usePrefersReducedMotion, useReveal } from "./hooks";
import {
  BackToTop,
  CursorGlow,
  LocalClock,
  ScrollProgress,
  TiltCard,
} from "./motion";
import { riseItem, staggerParent, wordItem } from "./variants";

const catIcon: Record<string, typeof Cpu> = {
  "Systems & Backend": Cpu,
  "Machine Learning & AI": BrainCircuit,
  "Languages & Compilers": Braces,
  "Data & Databases": Database,
  "Learning & Writing": BookOpen,
};

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience", hideOnMobile: true },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Demos", href: "#demos", hideOnMobile: true },
  { label: "Contact", href: "#contact" },
];

const NAV_IDS = NAV_LINKS.map((l) => l.href.slice(1));

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2.5"
      style={{ color: "var(--teal)" }}
    >
      <span
        className="inline-block w-6 h-px shrink-0"
        style={{ background: "var(--teal)" }}
      />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0f14]/85 backdrop-blur-md border-b border-[#2c3342]"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span
            className="grid place-items-center w-9 h-9 rounded-lg border border-[#2c3342] text-amber font-mono text-sm font-bold transition-colors group-hover:border-[#4a5468]"
            style={{ color: "var(--amber)" }}
          >
            AK
          </span>
          <span className="font-mono text-xs text-[#7c879a] hidden sm:block group-hover:text-[#b7c0d0] transition-colors">
            ~/abhinav-kumar
          </span>
        </a>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {NAV_LINKS.map((l) => {
            const id = l.href.slice(1);
            const on = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                data-active={on}
                className={`relative px-2 sm:px-3 py-2 text-sm transition-colors rounded-md hover:bg-white/5 ${
                  l.hideOnMobile ? "hidden sm:inline" : ""
                } ${on ? "text-white" : "text-[#b7c0d0] hover:text-white"}`}
              >
                {l.label}
                {on && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-px"
                    style={{ background: "var(--amber)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <a
            href={profile.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="ml-1 sm:ml-2 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium text-[#0d0f14] transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--amber)" }}
          >
            <FileDown size={15} />
            <span className="hidden sm:inline">Résumé</span>
          </a>
        </nav>
      </div>

      <ScrollProgress className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#f0a640] via-[#e0703b] to-[#3fd0c9]" />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

type TerminalLine = { k: string; v: string; raw?: boolean };

const TERMINAL_LINES: TerminalLine[] = [
  { k: "school", v: "IIIT Bangalore" },
  { k: "intern", v: "Arista Networks" },
  { k: "langs", v: '["Java","Python","C","Rust"]', raw: true },
  { k: "building", v: "true", raw: true },
];

function terminalLineText(line: TerminalLine, isLast: boolean) {
  return `  "${line.k}": ${line.raw ? line.v : `"${line.v}"`}${isLast ? "" : ","}`;
}

function TerminalCard() {
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState({ lineIdx: 0, charIdx: 0 });

  // Reduced motion: render the finished block straight away, no typing.
  const lineIdx = reduced ? TERMINAL_LINES.length : state.lineIdx;
  const charIdx = reduced ? Number.MAX_SAFE_INTEGER : state.charIdx;

  useEffect(() => {
    if (reduced) return;
    if (lineIdx >= TERMINAL_LINES.length) return;

    const line = TERMINAL_LINES[lineIdx];
    const total = terminalLineText(
      line,
      lineIdx === TERMINAL_LINES.length - 1
    ).length;

    if (charIdx >= total) {
      const t = window.setTimeout(() => {
        setState((s) => ({ lineIdx: s.lineIdx + 1, charIdx: 0 }));
      }, 260);
      return () => window.clearTimeout(t);
    }

    const t = window.setTimeout(
      () => setState((s) => ({ ...s, charIdx: s.charIdx + 1 })),
      26
    );
    return () => window.clearTimeout(t);
  }, [lineIdx, charIdx, reduced]);

  const done = lineIdx >= TERMINAL_LINES.length;

  return (
    <div className="rounded-xl border border-[#2c3342] bg-[#14171f] shadow-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2c3342] bg-[#191d27]">
        <span className="w-3 h-3 rounded-full bg-[#e0703b]" />
        <span className="w-3 h-3 rounded-full bg-[#f0a640]" />
        <span className="w-3 h-3 rounded-full bg-[#b6e04a]" />
        <span className="ml-2 font-mono text-xs text-[#7c879a]">whoami.sh</span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] text-[#4a5468]">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--lime)" }}
          />
          {done ? "idle" : "running"}
        </span>
      </div>

      <div className="p-5 font-mono text-[13px] leading-relaxed">
        <p className="text-[#7c879a]">
          <span style={{ color: "var(--teal)" }}>$</span> cat profile.json
        </p>

        <div className="mt-2">
          {TERMINAL_LINES.map((line, i) => {
            const isLast = i === TERMINAL_LINES.length - 1;
            const keyEnd = line.k.length + 6;
            let content: ReactNode = null;

            if (i < lineIdx) {
              content = (
                <>
                  <span className="text-[#7c879a]">{"  "}</span>
                  <span style={{ color: "var(--amber)" }}>
                    "{line.k}":{" "}
                  </span>
                  <span>{line.raw ? line.v : `"${line.v}"`}</span>
                </>
              );
            } else if (i === lineIdx) {
              const typed = terminalLineText(line, isLast).slice(0, charIdx);
              const keyPart = typed.slice(0, keyEnd);
              const valPart = typed.slice(keyEnd);
              content = (
                <>
                  <span className="text-[#7c879a]">{keyPart.slice(0, 2)}</span>
                  <span style={{ color: "var(--amber)" }}>{keyPart.slice(2)}</span>
                  <span>{valPart}</span>
                  <span
                    className="inline-block w-2 h-3.5 ml-0.5 align-middle animate-blink"
                    style={{ background: "var(--lime)" }}
                  />
                </>
              );
            }

            return (
              <div
                key={line.k}
                className="min-h-[1.4rem] transition-opacity duration-300"
                style={{ opacity: i > lineIdx ? 0 : 1 }}
              >
                {content}
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {done && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3 text-[#7c879a]"
            >
              <span style={{ color: "var(--teal)" }}>$</span> {" "}
              <span
                className="inline-block w-2 h-4 ml-0.5 align-middle animate-blink"
                style={{ background: "var(--lime)" }}
              />
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* backdrop */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -right-32 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-25 animate-float-slow"
          style={{
            background: "radial-gradient(circle, var(--rust), transparent 62%)",
          }}
        />
        <div
          className="absolute top-40 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20 animate-float-slow"
          style={{
            background: "radial-gradient(circle, var(--teal), transparent 62%)",
            animationDelay: "-4.5s",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#8a9bb0 1px, transparent 1px), linear-gradient(90deg, #8a9bb0 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          className="grid lg:grid-cols-[1.6fr_1fr] gap-12 items-center"
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          <div>
            <motion.div
              variants={riseItem}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#2c3342] bg-[#191d27]/60 text-xs font-mono text-[#b7c0d0] mb-7"
            >
              <span className="relative grid place-items-center w-2 h-2 shrink-0">
                <span
                  className="pulse-ring w-2 h-2 rounded-full"
                  style={{ background: "var(--lime)", color: "var(--lime)" }}
                />
              </span>
              Open to systems / ML engineering roles
            </motion.div>

            <motion.h1
              className="font-display text-[3.1rem] leading-[0.98] sm:text-7xl font-semibold text-cream"
              variants={staggerParent}
              initial="hidden"
              animate="show"
            >
              <motion.span variants={wordItem} className="block">
                Abhinav
              </motion.span>
              <motion.span
                variants={wordItem}
                className="block italic"
                style={{ color: "var(--amber)" }}
              >
                Kumar
              </motion.span>
            </motion.h1>

            <motion.p
              variants={riseItem}
              className="mt-6 text-lg sm:text-xl text-[#b7c0d0] max-w-xl leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={riseItem}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-[#0d0f14] transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--cream, #f4efe6)" }}
              >
                <Layers size={17} /> View Projects
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-white border border-[#2c3342] hover:border-[#4a5468] hover:bg-white/5 transition-colors"
              >
                <Github size={17} /> GitHub
              </a>
            </motion.div>

            <motion.div
              variants={riseItem}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#7c879a]"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} /> {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Terminal size={15} /> {profile.stats.repos}+ public repositories
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono">
                @{profile.handle}
              </span>
            </motion.div>
          </div>

          <motion.div variants={riseItem}>
            <TerminalCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

const marqueeItems = [
  "Rust",
  "Distributed Systems",
  "PyTorch",
  "Kubernetes",
  "Kafka",
  "PostgreSQL",
  "Interpreters",
  "MapReduce",
  "Spring Boot",
  "Transformers",
  "gRPC",
  "Performance Engineering",
  "Ocaml",
  "C++",
  "Java",
  "Linux",
];

function Marquee() {
  return (
    <div className="relative py-5 border-y border-[#2c3342] bg-[#14171f] overflow-hidden marquee-mask">
      <div className="flex whitespace-nowrap animate-marquee marquee-track">
        {[...marqueeItems, ...marqueeItems].map((t, i) => (
          <span
            key={i}
            className="mx-6 font-display italic text-xl text-[#7c879a] inline-flex items-center gap-6"
          >
            {t}
            <span style={{ color: "var(--rust)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

const aboutStats = [
  { value: 46, suffix: "+", label: "Repositories" },
  { value: 8, suffix: "", label: "Languages" },
  { value: 50, suffix: "%+", label: "Recovery time cut" },
];

function StatTile({
  value,
  suffix,
  label,
  active,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  delay: number;
}) {
  const n = useCountUp(value, active, 1500 + delay);
  return (
    <div
      className="rounded-xl border border-[#2c3342] bg-[#14171f] p-4 transition-colors hover:border-[#4a5468]"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="font-display text-3xl font-semibold tabular-nums"
        style={{ color: "var(--amber)" }}
      >
        {Math.round(n)}
        {suffix}
      </div>
      <div className="text-xs text-[#7c879a] mt-1">{label}</div>
    </div>
  );
}

function Monogram({ size = 56 }: { size?: number }) {
  return (
    <span
      className="conic-border relative grid place-items-center rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background: "#14171f",
        boxShadow: "0 10px 30px rgba(0,0,0,0.45), 0 0 34px rgba(240,166,64,0.12)",
      }}
    >
      <span
        className="font-mono font-bold tracking-tight"
        style={{ fontSize: size * 0.3, color: "var(--amber)" }}
      >
        AK
      </span>
    </span>
  );
}

function About() {
  const { ref, shown } = useReveal();
  return (
    <section id="about" ref={ref} className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div
            className={`transition-all duration-700 ${
              shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <Monogram />
              <div>
                <Eyebrow>01 — About</Eyebrow>
                <p className="text-xs text-[#7c879a] -mt-2">
                  {profile.role} · {profile.location}
                </p>
              </div>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-cream leading-tight">
              Engineer at the intersection of{" "}
              <span className="italic" style={{ color: "var(--amber)" }}>
                systems
              </span>{" "}
              and{" "}
              <span className="italic" style={{ color: "var(--rust)" }}>
                intelligence
              </span>
              .
            </h2>
          </div>
          <div
            className={`space-y-5 text-[#b7c0d0] text-lg leading-relaxed transition-all duration-700 delay-100 ${
              shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p>
              I'm an Integrated M.Tech CS student at{" "}
              <span className="text-white">IIIT Bangalore</span> and a Software
              Engineer Intern at{" "}
              <span className="text-white">Arista Networks</span>, where I work on
              configuration state management and reliability inside the Arista EOS
              network operating system.
            </p>
            <p>
              I enjoy taking ideas all the way down the stack — from{" "}
              <span className="text-white">building microservice platforms</span>{" "}
              with Spring Boot, Kafka and Kubernetes, to cross-database
              synchronization engines, PostgreSQL benchmarking, and Transformer-based
              neural machine translation.
            </p>
            <p>
              Whether it's socket programming in C, MapReduce over 10k+ documents,
              or comparing Rust and Python runtimes, I like problems where
              correctness and speed both matter.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {aboutStats.map((s, i) => (
                <StatTile
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  active={shown}
                  delay={i * 120}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

function Experience() {
  const { ref, shown } = useReveal();
  return (
    <section id="experience" ref={ref} className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Eyebrow>02 — Experience & Education</Eyebrow>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-cream mb-14 max-w-2xl">
          Where I've been building.
        </h2>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* experience timeline */}
          <div className="space-y-6">
            {experience.map((e, i) => (
              <div
                key={e.org}
                className={`relative rounded-2xl border border-[#2c3342] bg-[#14171f] p-6 sm:p-8 transition-all duration-700 hover:border-[#4a5468] hover:shadow-[0_20px_45px_-24px_rgba(240,166,64,0.55)] ${
                  shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="grid place-items-center w-11 h-11 rounded-xl shrink-0 border border-[#2c3342] relative"
                    style={{ background: "#191d27" }}
                  >
                    <Briefcase size={19} style={{ color: "var(--amber)" }} />
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="font-display text-2xl font-semibold text-cream">
                        {e.role}
                      </h3>
                      <span className="font-mono text-xs text-[#7c879a] shrink-0">
                        {e.period}
                      </span>
                    </div>
                    <p className="text-[#b7c0d0] font-medium mt-0.5">
                      {e.org}{" "}
                      <span className="text-[#7c879a] font-normal">
                        · {e.location}
                      </span>
                    </p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {e.points.map((pt, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[#b7c0d0] leading-relaxed"
                    >
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "var(--rust)" }}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* education + coursework */}
          <div className="space-y-6">
            <div
              className={`rounded-2xl border border-[#2c3342] bg-[#14171f] p-6 sm:p-8 transition-all duration-700 delay-150 hover:border-[#4a5468] ${
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="grid place-items-center w-11 h-11 rounded-xl shrink-0 border border-[#2c3342]"
                  style={{ background: "#191d27" }}
                >
                  <GraduationCap size={19} style={{ color: "var(--teal)" }} />
                </span>
                <h3 className="font-display text-xl font-semibold text-cream">
                  Education
                </h3>
              </div>
              <p className="text-white font-medium leading-snug">
                {education.degree}
              </p>
              <p className="text-sm text-[#b7c0d0] mt-1.5">{education.school}</p>
              <div className="mt-4 flex items-center justify-between font-mono text-xs text-[#7c879a]">
                <span>{education.period}</span>
                <span
                  className="px-2.5 py-1 rounded-md text-[#0d0f14] font-semibold"
                  style={{ background: "var(--lime)" }}
                >
                  CGPA {education.score}
                </span>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-[#2c3342] bg-[#14171f] p-6 sm:p-8 transition-all duration-700 delay-200 hover:border-[#4a5468] ${
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="font-display text-xl font-semibold text-cream mb-4">
                Relevant Coursework
              </h3>
              <div className="flex flex-wrap gap-2">
                {coursework.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-lg text-sm text-[#b7c0d0] border border-[#2c3342] bg-[#0d0f14] hover:border-[#4a5468] hover:text-white transition-colors"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

function Skills() {
  const { ref, shown } = useReveal();
  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 sm:py-28 bg-[#14171f] border-y border-[#2c3342]"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Eyebrow>03 — Toolkit</Eyebrow>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-cream mb-14 max-w-2xl">
          Things I build with.
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {skills.map((s, i) => (
            <div
              key={s.group}
              className={`rounded-2xl border border-[#2c3342] bg-[#191d27] p-6 transition-all duration-700 hover:border-[#4a5468] ${
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <h3 className="font-sans font-semibold text-white mb-4 flex items-center gap-2">
                <span
                  className="w-1.5 h-5 rounded-full"
                  style={{
                    background: [
                      "var(--rust)",
                      "var(--teal)",
                      "var(--amber)",
                      "var(--lime)",
                    ][i % 4],
                  }}
                />
                {s.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="px-3 py-1.5 rounded-lg text-sm font-mono text-[#b7c0d0] border border-[#2c3342] bg-[#0d0f14] hover:border-[#4a5468] hover:text-white transition-colors"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Work                                                                */
/* ------------------------------------------------------------------ */

function ProjectCard({ p }: { p: Project }) {
  const color = langColors[p.lang] || "#8a9bb0";
  return (
    <TiltCard className="group h-full">
      <a
        href={p.url}
        target="_blank"
        rel="noreferrer"
        className="flex h-full flex-col rounded-2xl border border-[#2c3342] bg-[#14171f] p-6 hover:border-[#4a5468] hover:shadow-[0_20px_45px_-26px_rgba(240,166,64,0.5)] transition-colors duration-300 overflow-hidden"
      >
        {p.highlight && (
          <span
            className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-bl-lg z-20"
            style={{ background: "var(--amber)", color: "#0d0f14" }}
          >
            Featured
          </span>
        )}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display text-xl font-semibold text-cream group-hover:text-white pr-6">
            {p.display}
          </h3>
          <ArrowUpRight
            size={18}
            className="text-[#7c879a] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
          />
        </div>
        <p className="text-sm text-[#b7c0d0] leading-relaxed flex-1">{p.desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-[11px] font-mono text-[#7c879a] bg-[#0d0f14] border border-[#242a37]"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#242a37] flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1.5 font-mono text-[#b7c0d0]">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: color }}
            />
            {p.lang}
          </span>
          {p.stars > 0 && (
            <span className="inline-flex items-center gap-1 text-[#7c879a]">
              <Star size={12} /> {p.stars}
            </span>
          )}
        </div>
      </a>
    </TiltCard>
  );
}

function Work() {
  const cats = ["All", ...categoryOrder] as const;
  const [active, setActive] = useState<(typeof cats)[number]>("All");
  const { ref, shown } = useReveal();
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" ref={ref} className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Eyebrow>04 — Selected Work</Eyebrow>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-cream max-w-xl">
            Projects across the stack.
          </h2>
          <p className="text-sm text-[#7c879a] max-w-xs">
            A curated slice of {projects.length} builds from{" "}
            {profile.stats.repos}+ repositories — filter by domain.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {cats.map((c) => {
            const Icon = c === "All" ? Layers : catIcon[c];
            const on = active === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  on
                    ? "text-[#0d0f14] border-transparent"
                    : "text-[#b7c0d0] border-[#2c3342] hover:border-[#4a5468] hover:text-white"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "var(--amber)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <Icon size={15} />
                  {c}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={false}
          animate={shown ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 14 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Demos — published, live artifacts                                   */
/* ------------------------------------------------------------------ */

function Demos() {
  const { ref, shown } = useReveal();
  return (
    <section
      id="demos"
      ref={ref}
      className="py-24 sm:py-28 bg-[#14171f] border-y border-[#2c3342]"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Eyebrow>05 — Live Artifacts</Eyebrow>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-cream max-w-xl">
            Things I published and left running.
          </h2>
          <p className="text-sm text-[#7c879a] max-w-xs">
            Books, sites and experiments that live on GitHub Pages — open any of
            them, or read the source.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {demos.map((d, i) => (
            <div
              key={d.title}
              className={`group relative flex flex-col rounded-2xl border border-[#2c3342] bg-[#191d27] p-6 transition-all duration-700 hover:-translate-y-1 hover:border-[#4a5468] ${
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: d.accent }}
              />
              <div className="flex items-start justify-between gap-3">
                <span
                  className="grid place-items-center w-10 h-10 rounded-xl border border-[#2c3342] shrink-0"
                  style={{ background: "#0d0f14" }}
                >
                  <Globe size={18} style={{ color: d.accent }} />
                </span>
                <div className="flex items-center gap-3 text-[#7c879a]">
                  <a
                    href={d.repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${d.title} source`}
                    className="hover:text-white transition-colors"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${d.title} live site`}
                    className="hover:text-white transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-cream mt-4 group-hover:text-white transition-colors">
                {d.title}
              </h3>
              <p className="text-sm text-[#b7c0d0] leading-relaxed mt-2 flex-1">
                {d.desc}
              </p>

              <div className="mt-4 pt-4 border-t border-[#242a37] flex flex-wrap gap-1.5">
                {d.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded text-[11px] font-mono text-[#7c879a] bg-[#0d0f14] border border-[#242a37]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 border-t border-[#2c3342] overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, var(--rust), transparent 65%)",
          }}
        />
      </div>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="conic-border rounded-3xl bg-[#14171f]/90 backdrop-blur px-6 py-14 sm:px-14 text-center">
          <Eyebrow>06 — Let's talk</Eyebrow>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-cream leading-tight">
            Building something that needs to be{" "}
            <span className="italic" style={{ color: "var(--amber)" }}>
              fast
            </span>{" "}
            and{" "}
            <span className="italic" style={{ color: "var(--teal)" }}>
              correct
            </span>
            ?
          </h2>
          <p className="mt-6 text-lg text-[#b7c0d0]">
            I'm open to systems, backend and machine-learning engineering
            opportunities. Let's connect.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-medium text-[#0d0f14] transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--cream, #f4efe6)" }}
            >
              <Mail size={18} /> {profile.email}
            </a>
            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-medium text-white border border-[#2c3342] hover:border-[#4a5468] hover:bg-white/5 transition-colors"
            >
              <FileDown size={18} /> Download Résumé
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-5 text-[#7c879a]">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Phone size={16} /> {profile.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-[#2c3342] py-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#7c879a]">
        <p className="font-mono">
          © {new Date().getFullYear()} Abhinav Kumar
        </p>
        <p className="flex items-center gap-1.5">
          IIIT Bangalore · React + Tailwind
          <span style={{ color: "var(--rust)" }}>✦</span>
          <LocalClock />
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Mail size={14} /> {profile.email}
        </a>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-[#0d0f14]">
        <CursorGlow />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Experience />
          <Skills />
          <Work />
          <Demos />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}
