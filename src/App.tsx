import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import {
  profile,
  skills,
  projects,
  categoryOrder,
  langColors,
  experience,
  education,
  coursework,
  type Project,
} from "./data";

const catIcon: Record<string, typeof Cpu> = {
  "Systems & Backend": Cpu,
  "Machine Learning & NLP": BrainCircuit,
  "Languages & Compilers": Braces,
  "Data & Databases": Database,
  "Learning & Writing": BookOpen,
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, shown };
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];
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
            className="grid place-items-center w-9 h-9 rounded-lg border border-[#2c3342] text-amber font-mono text-sm font-bold"
            style={{ color: "var(--amber)" }}
          >
            AK
          </span>
          <span className="font-mono text-xs text-[#7c879a] hidden sm:block group-hover:text-[#b7c0d0] transition-colors">
            ~/abhinav-kumar
          </span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-[#b7c0d0] hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
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
    </header>
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
            background:
              "radial-gradient(circle, var(--rust), transparent 62%)",
          }}
        />
        <div
          className="absolute top-40 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--teal), transparent 62%)",
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
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2c3342] bg-[#191d27]/60 text-xs font-mono text-[#b7c0d0] mb-7 fade-up"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--lime)" }} />
              Open to systems / ML engineering roles
            </div>

            <h1
              className="font-display text-[3.1rem] leading-[0.98] sm:text-7xl font-semibold text-cream fade-up"
              style={{ animationDelay: "0.12s" }}
            >
              Abhinav
              <br />
              <span className="italic" style={{ color: "var(--amber)" }}>
                Kumar
              </span>
            </h1>

            <p
              className="mt-6 text-lg sm:text-xl text-[#b7c0d0] max-w-xl leading-relaxed fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              {profile.tagline}
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3 fade-up"
              style={{ animationDelay: "0.28s" }}
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
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#7c879a] fade-up"
              style={{ animationDelay: "0.36s" }}
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
            </div>
          </div>

          {/* terminal card */}
          <div
            className="fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="rounded-xl border border-[#2c3342] bg-[#14171f] shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2c3342] bg-[#191d27]">
                <span className="w-3 h-3 rounded-full bg-[#e0703b]" />
                <span className="w-3 h-3 rounded-full bg-[#f0a640]" />
                <span className="w-3 h-3 rounded-full bg-[#b6e04a]" />
                <span className="ml-2 font-mono text-xs text-[#7c879a]">
                  whoami.sh
                </span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-relaxed">
                <p className="text-[#7c879a]">
                  <span style={{ color: "var(--teal)" }}>$</span> cat profile.json
                </p>
                <pre className="mt-2 text-[#b7c0d0] whitespace-pre-wrap">
{`{
  `}<span style={{ color: "var(--amber)" }}>"school"</span>{`: "IIIT Bangalore",
  `}<span style={{ color: "var(--amber)" }}>"intern"</span>{`: "Arista Networks",
  `}<span style={{ color: "var(--amber)" }}>"langs"</span>{`: ["Java","Python",
            "C","Rust"],
  `}<span style={{ color: "var(--amber)" }}>"building"</span>{`: true
}`}
                </pre>
                <p className="mt-3 text-[#7c879a]">
                  <span style={{ color: "var(--teal)" }}>$</span> _
                  <span className="inline-block w-2 h-4 ml-0.5 align-middle animate-pulse" style={{ background: "var(--lime)" }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
];

function Marquee() {
  return (
    <div className="relative py-5 border-y border-[#2c3342] bg-[#14171f] overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
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
            <p
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--teal)" }}
            >
              01 — About
            </p>
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
              {[
                { n: "45+", l: "Repositories" },
                { n: "8", l: "Languages" },
                { n: ">50%", l: "Recovery time cut" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-[#2c3342] bg-[#14171f] p-4"
                >
                  <div
                    className="font-display text-3xl font-semibold"
                    style={{ color: "var(--amber)" }}
                  >
                    {s.n}
                  </div>
                  <div className="text-xs text-[#7c879a] mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const { ref, shown } = useReveal();
  return (
    <section id="experience" ref={ref} className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--teal)" }}
        >
          02 — Experience & Education
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-cream mb-14 max-w-2xl">
          Where I've been building.
        </h2>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          {/* experience timeline */}
          <div className="space-y-6">
            {experience.map((e, i) => (
              <div
                key={e.org}
                className={`relative rounded-2xl border border-[#2c3342] bg-[#14171f] p-6 sm:p-8 transition-all duration-700 ${
                  shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="grid place-items-center w-11 h-11 rounded-xl shrink-0 border border-[#2c3342]"
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
              className={`rounded-2xl border border-[#2c3342] bg-[#14171f] p-6 sm:p-8 transition-all duration-700 delay-150 ${
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
              className={`rounded-2xl border border-[#2c3342] bg-[#14171f] p-6 sm:p-8 transition-all duration-700 delay-200 ${
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
                    className="px-3 py-1.5 rounded-lg text-sm text-[#b7c0d0] border border-[#2c3342] bg-[#0d0f14]"
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

function Skills() {
  const { ref, shown } = useReveal();
  return (
    <section id="skills" ref={ref} className="py-24 sm:py-28 bg-[#14171f] border-y border-[#2c3342]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--teal)" }}
        >
          03 — Toolkit
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-cream mb-14 max-w-2xl">
          Things I build with.
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {skills.map((s, i) => (
            <div
              key={s.group}
              className={`rounded-2xl border border-[#2c3342] bg-[#191d27] p-6 transition-all duration-700 ${
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

function ProjectCard({ p }: { p: Project }) {
  const color = langColors[p.lang] || "#8a9bb0";
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col rounded-2xl border border-[#2c3342] bg-[#14171f] p-6 hover:border-[#4a5468] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {p.highlight && (
        <span
          className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-bl-lg"
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
        <p
          className="font-mono text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--teal)" }}
        >
          04 — Selected Work
        </p>
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
                onClick={() => setActive(c)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border transition-all ${
                  on
                    ? "text-[#0d0f14] border-transparent"
                    : "text-[#b7c0d0] border-[#2c3342] hover:border-[#4a5468] hover:text-white"
                }`}
                style={on ? { background: "var(--amber)" } : undefined}
              >
                <Icon size={15} />
                {c}
              </button>
            );
          })}
        </div>

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-500 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
        >
          {filtered.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-5"
          style={{ color: "var(--teal)" }}
        >
          05 — Let's talk
        </p>
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
    </section>
  );
}

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

export default function App() {
  return (
    <div className="grain min-h-screen bg-[#0d0f14]">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
