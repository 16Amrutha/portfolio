import { useEffect, useState } from "react";
import {
  Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Sparkles, Brain,
  ShieldCheck, LineChart, Fish, Send, HeartPulse, GraduationCap, Trophy,
  Award, Medal, Rocket, Cpu, Database, Code2, Palette, Wrench, Users,
  ExternalLink, ChevronRight,
} from "lucide-react";

/* ---------------- Data ---------------- */

const NAME = "Amrutha";
const ROLE = "AI & Data Science Engineer";
const LOCATION = "Udupi, Karnataka";
const EMAIL = "amruthashripad@gmail.com";
const PHONE = "+91 80739 72157";
const GITHUB = "https://github.com/16Amrutha";
const LINKEDIN = "https://www.linkedin.com/in/amrutha-s-90465528b";

type Project = {
  name: string;
  tagline: string;
  category: "AI" | "Healthcare" | "Finance" | "Environment" | "Cybersecurity" | "Research" | "IoT";
  stack: string[];
  year: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // css color
  device: "phone" | "laptop" | "dashboard" | "terminal";
};

const PROJECTS: Project[] = [
  {
    name: "AI Placement Predictor",
    tagline: "Forecasts placement outcomes from academic, aptitude and skill signals using ensemble ML.",
    category: "AI",
    stack: ["Python", "scikit-learn", "Pandas", "React", "Flask"],
    year: "2025",
    icon: Brain,
    accent: "oklch(0.75 0.2 260)",
    device: "dashboard",
  },
  {
    name: "Stock Predictor AI",
    tagline: "Time-series LSTM engine with sentiment overlay for intraday & swing forecasting.",
    category: "Finance",
    stack: ["TensorFlow", "LSTM", "yfinance", "Streamlit"],
    year: "2025",
    icon: LineChart,
    accent: "oklch(0.78 0.18 150)",
    device: "dashboard",
  },
  {
    name: "Coral Reef Guard",
    tagline: "Predicts bleaching risk from temperature, pH, turbidity & oxygen — protecting marine ecosystems.",
    category: "Environment",
    stack: ["Python", "IoT", "Random Forest", "Firebase"],
    year: "2025",
    icon: Fish,
    accent: "oklch(0.78 0.16 200)",
    device: "phone",
  },
  {
    name: "SafeSend",
    tagline: "Lightweight, end-to-end encrypted file transfer built for low-bandwidth regions.",
    category: "Cybersecurity",
    stack: ["AES", "RSA", "Node.js", "React"],
    year: "2025",
    icon: Send,
    accent: "oklch(0.75 0.2 30)",
    device: "laptop",
  },
  {
    name: "SafeHer",
    tagline: "Women safety companion with SOS mesh, geofenced alerts and offline distress escalation.",
    category: "Healthcare",
    stack: ["React Native", "Firebase", "Maps", "Twilio"],
    year: "2025",
    icon: HeartPulse,
    accent: "oklch(0.72 0.24 340)",
    device: "phone",
  },
  {
    name: "Nose-Wear Prediction of Tool Tip",
    tagline: "CNN + LSTM predictive-maintenance model for single-point cutting tools using sensor + vision fusion.",
    category: "Research",
    stack: ["CNN", "LSTM", "PyTorch", "OpenCV"],
    year: "2025",
    icon: Cpu,
    accent: "oklch(0.78 0.18 60)",
    device: "terminal",
  },
  {
    name: "Elephas Maximus Intelligence Platform",
    tagline: "Multi-feature AI for age, disease, musth and behaviour analysis of Asian elephants — human-conflict prevention.",
    category: "Research",
    stack: ["YOLOv8", "Vision Transformers", "PyTorch", "FastAPI"],
    year: "2026",
    icon: Sparkles,
    accent: "oklch(0.72 0.2 290)",
    device: "dashboard",
  },
];

const SKILLS = [
  { group: "Languages", icon: Code2, items: ["Python", "Java", "C++", "C"] },
  { group: "Web", icon: Palette, items: ["HTML", "CSS", "JavaScript", "React.js"] },
  { group: "Data / ML", icon: Brain, items: ["Machine Learning", "Deep Learning", "PyTorch", "TensorFlow", "scikit-learn"] },
  { group: "Databases", icon: Database, items: ["MongoDB", "MySQL", "Firebase"] },
  { group: "Tools", icon: Wrench, items: ["VS Code", "Colab", "Android Studio", "Power BI", "Canva"] },
  { group: "Domains", icon: ShieldCheck, items: ["AI", "Cybersecurity", "Web & App Dev", "IoT"] },
  { group: "Core CS", icon: Cpu, items: ["DSA", "DBMS", "AI", "ML"] },
  { group: "Soft Skills", icon: Users, items: ["Leadership", "Teamwork", "Communication", "Problem Solving"] },
];

const EDUCATION = {
  degree: "B.E. — Artificial Intelligence & Data Science",
  college: "Shri Madhwa Vadiraja Institute of Technology & Management, Bantakal, Udupi",
  university: "Visvesvaraya Technological University (VTU)",
  cgpa: "8.9 / 10",
  duration: "2023 — 2027 (Expected)",
  sgpa: [
    { sem: "Sem 1", value: 9.2, stack: "C Programming, Engg. Maths I, Physics, Basic Electrical" },
    { sem: "Sem 2", value: 9.0, stack: "Python, Engg. Maths II, Chemistry, EG" },
    { sem: "Sem 3", value: 8.6, stack: "DSA, DBMS, OOP with Java, Discrete Math" },
    { sem: "Sem 4", value: 8.95, stack: "OS, Design & Analysis of Algorithms, Statistics for AI, DAA Lab" },
    { sem: "Sem 5", value: 9.14, stack: "Artificial Intelligence, Machine Learning, Web Tech, Computer Networks" },
    { sem: "Sem 6", value: 9.44, stack: "Deep Learning, NLP, Big Data Analytics, Cloud, Cybersecurity" },
  ],
};

const ACHIEVEMENTS = [
  { title: "Winner — Infosys Mudipu Hackathon", meta: "Pre-final Year Recognition", icon: Trophy },
  { title: "Winner — Project Exhibition, MITE Mangalore", meta: "Best Project", icon: Trophy },
  { title: "Winner — Poster Presentation, MIT Manipal", meta: "& Poorna Prajna College", icon: Award },
  { title: "Runner-Up — 36 hr Hackathon, Sahyadri", meta: "Sahyadri College of Engg.", icon: Medal },
  { title: "Runner-Up — Ideation, JNNCE Shivamogga", meta: "Ideation Competition", icon: Medal },
  { title: "Runner-Up — Paper Presentation", meta: "Canara Engineering College", icon: Medal },
  { title: "2nd Runner — Project Exhibition, Mandya", meta: "Adichunchanagiri Math", icon: Medal },
  { title: "Best Animation — Reva Gamethon", meta: "36hr Gamethon", icon: Award },
  { title: "IEEE WIE Branch Chair", meta: "SMVITM Student Branch", icon: Users },
  { title: "IEEE Student Branch MDC Coordinator", meta: "SMVITM", icon: Users },
  { title: "IEEE Bangalore Section — $500 Award", meta: "Arduino outreach for Govt. School Students", icon: Award },
  { title: "Best Student Award — SMVITM", meta: "2024–25 & 2025–26", icon: Trophy },
];

const CERT_CATEGORIES = [
  {
    label: "Winning Certificates",
    tone: "oklch(0.78 0.2 60)",
    icon: Trophy,
    count: "12+",
    url: "https://drive.google.com/drive/folders/1ea0kaZbVLEblJhBVXicCFzAHiyrlhZlH",
  },
  {
    label: "Participation Certificates",
    tone: "oklch(0.75 0.18 200)",
    icon: Medal,
    count: "20+",
    url: "https://drive.google.com/drive/folders/1cqAsWW1aLRW8uAADhEKNYZZnt7HJwzNP",
  },
  {
    label: "Volunteering Certificates",
    tone: "oklch(0.72 0.22 320)",
    icon: Users,
    count: "10+",
    url: "https://drive.google.com/drive/folders/1fwYNDZ55-RITtjTtsc8XdYFOqf0qW6pV",
  },
  {
    label: "Workshop Certificates",
    tone: "oklch(0.75 0.2 150)",
    icon: Sparkles,
    count: "15+",
    url: "https://drive.google.com/drive/folders/1diwJAOMXjTgfv8U8KXcjwqD9d8p-RbVT",
  },
  {
    label: "Internship Certificates",
    tone: "oklch(0.78 0.2 30)",
    icon: Rocket,
    count: "3+",
    url: "https://drive.google.com/drive/folders/1URnj-sniKC-jLtMGQj8NdrkxZByKGv19",
  },
];

/* ---------------- Reveal on scroll ---------------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) e.target.classList.add("in");
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------------- Nav ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "#about"], ["Skills", "#skills"], ["Projects", "#projects"],
    ["Achievements", "#achievements"], ["Education", "#education"], ["Contact", "#contact"],
  ] as const;
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-3" : "py-6"}`}>
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl glass-strong grid place-items-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-70"
                 style={{ background: "conic-gradient(from 0deg, oklch(0.85 0.17 200), oklch(0.7 0.22 290), oklch(0.72 0.24 340), oklch(0.85 0.17 200))",
                          animation: "orbit 8s linear infinite" }} />
            <span className="relative font-display font-bold text-sm">A</span>
          </div>
          <span className="font-display font-semibold tracking-tight">Amrutha<span className="text-primary">.</span></span>
        </a>
        <nav className={`hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5 transition-all ${scrolled ? "scale-100" : "scale-105"}`}>
          {links.map(([l, h]) => (
            <a key={h} href={h}
               className="px-4 py-1.5 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition">
              {l}
            </a>
          ))}
        </nav>
        <a href="#contact"
           className="magnetic-btn glass rounded-full px-5 py-2 text-sm font-medium inline-flex items-center gap-2">
          Let's talk <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-32 pb-24 hero-grad">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-8">
          <div className="reveal inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for internships & research collabs
          </div>
          <h1 className="reveal mt-6 font-display font-bold leading-[0.9] tracking-tight text-[clamp(3rem,9vw,7.5rem)]">
            <span className="block text-white/90">Building</span>
            <span className="block text-gradient">intelligent</span>
            <span className="block text-white/90">experiences.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg text-white/70 leading-relaxed">
            I'm <span className="text-white">{NAME}</span> — an {ROLE.toLowerCase()} crafting
            AI, ML and secure systems that bridge <em className="text-white/90 not-italic">technology</em> and
            <em className="text-white/90 not-italic"> human impact</em>.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="magnetic-btn rounded-full px-6 py-3 text-sm font-medium inline-flex items-center gap-2 glow-ring bg-white text-black">
              Explore projects <ArrowUpRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="glass rounded-full px-6 py-3 text-sm font-medium inline-flex items-center gap-2 hover:bg-white/10 transition">
              Get in touch
            </a>
          </div>
          <div className="reveal mt-14 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { k: "8.9", v: "CGPA / 10" },
              { k: "12+", v: "Hackathon wins" },
              { k: "7", v: "Live projects" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl p-4">
                <div className="text-3xl font-display font-semibold text-gradient">{s.k}</div>
                <div className="text-xs text-white/60 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual - orbiting badge */}
        <div className="lg:col-span-4 relative hidden lg:block">
          <div className="reveal relative w-full aspect-square">
            <div className="absolute inset-0 rounded-full glass-strong grid place-items-center overflow-hidden">
              <div className="absolute inset-0 opacity-60"
                   style={{ background: "conic-gradient(from 0deg, oklch(0.85 0.17 200 / 0.3), oklch(0.7 0.22 290 / 0.5), oklch(0.72 0.24 340 / 0.3), oklch(0.85 0.17 200 / 0.3))",
                            animation: "orbit 20s linear infinite" }} />
              <div className="relative text-center">
                <div className="text-6xl font-display font-bold text-gradient">AI/DS</div>
                <div className="mt-2 text-xs uppercase tracking-[0.35em] text-white/70">Engineer</div>
              </div>
            </div>
            {["Python","PyTorch","React","IoT","LLM","CNN"].map((t,i) => (
              <div key={t} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                   style={{ ["--r" as string]: `${170}px`, animation: `orbit ${20 + i * 3}s linear infinite`, animationDelay: `${i * -2}s` }}>
                <div className="glass rounded-full px-3 py-1 text-xs font-mono whitespace-nowrap">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="absolute bottom-6 inset-x-0 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16 text-white/30 text-sm uppercase tracking-[0.35em]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-16">
              <span>Machine Learning</span><span>·</span>
              <span>Deep Learning</span><span>·</span>
              <span>Computer Vision</span><span>·</span>
              <span>Cybersecurity</span><span>·</span>
              <span>IoT Systems</span><span>·</span>
              <span>Research</span><span>·</span>
              <span>Full-Stack</span><span>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="reveal text-xs uppercase tracking-[0.3em] text-white/50">01 — About</div>
          <h2 className="reveal mt-4 text-5xl md:text-6xl font-display font-bold leading-tight">
            Curious mind,<br/><span className="text-gradient">systematic builder.</span>
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-6 text-white/75 text-lg leading-relaxed">
          <p className="reveal">
            I'm a third-year AI & Data Science engineer at VTU with a
            fascination for how <span className="text-white">intelligent systems</span> can solve grounded,
            human problems — from women's safety to coral reef conservation to industrial predictive maintenance.
          </p>
          <p className="reveal">
            I move between <span className="text-white">deep learning research</span>, secure application engineering
            and interactive product design. I lead as IEEE WIE Branch Chair, mentor at hackathons, and
            spend late nights training models on datasets nobody else has bothered to label.
          </p>
          <div className="reveal grid sm:grid-cols-3 gap-4 pt-6">
            {[
              { k: "Focus", v: "AI · CV · IoT" },
              { k: "Role", v: "IEEE WIE Chair" },
              { k: "Base", v: LOCATION },
            ].map((x) => (
              <div key={x.k} className="glass rounded-2xl p-5">
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">{x.k}</div>
                <div className="mt-2 font-display text-lg">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */
function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <div className="reveal text-xs uppercase tracking-[0.3em] text-white/50">02 — Toolbox</div>
            <h2 className="reveal mt-4 text-5xl md:text-6xl font-display font-bold">
              The <span className="text-gradient">stack</span> I ship with.
            </h2>
          </div>
          <p className="reveal max-w-md text-white/60">
            A curated set of languages, frameworks and platforms I use daily — from prototyping neural nets in Colab to shipping React apps.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map((s, i) => (
            <div key={s.group}
                 className="reveal glass rounded-3xl p-6 card-hover group relative overflow-hidden"
                 style={{ transitionDelay: `${i * 40}ms` }}>
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-40 blur-2xl group-hover:opacity-70 transition"
                   style={{ background: "radial-gradient(circle, oklch(0.7 0.22 290 / 0.6), transparent 70%)" }} />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl glass-strong grid place-items-center mb-4">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-display text-lg mb-3">{s.group}</div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Device Mockups ---------------- */
function DeviceMockup({ project }: { project: Project }) {
  const { device, accent, name, category, icon: Icon } = project;
  const grad = `linear-gradient(135deg, ${accent}, oklch(0.5 0.15 280))`;

  if (device === "phone") {
    return (
      <div className="relative aspect-[9/16] max-w-[220px] mx-auto">
        <div className="absolute inset-0 rounded-[2.2rem] bg-black border-[10px] border-neutral-900 shadow-2xl overflow-hidden"
             style={{ boxShadow: `0 30px 80px -20px ${accent}66, 0 0 40px ${accent}33` }}>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black z-10" />
          <div className="absolute inset-0" style={{ background: grad }}>
            <div className="absolute inset-0 opacity-30"
                 style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
            <div className="relative p-4 pt-8 text-white h-full flex flex-col">
              <div className="flex items-center justify-between text-[9px] opacity-80">
                <span>9:41</span><span>●●●</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 grid place-items-center backdrop-blur">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold">{name.split(" ").slice(0,2).join(" ")}</div>
                  <div className="text-[9px] opacity-70">{category}</div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[70, 45, 90, 60].map((w,i) => (
                  <div key={i} className="h-2 rounded-full bg-white/15 overflow-hidden">
                    <div className="h-full bg-white/70 rounded-full" style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-auto grid grid-cols-4 gap-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-white/10 backdrop-blur" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (device === "terminal") {
    return (
      <div className="relative w-full max-w-md mx-auto">
        <div className="rounded-2xl bg-neutral-950 border border-white/10 overflow-hidden shadow-2xl"
             style={{ boxShadow: `0 30px 80px -20px ${accent}66` }}>
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-neutral-900/60">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-3 text-[10px] font-mono text-white/50">~/{name.toLowerCase().replace(/\s+/g,"-")}</span>
          </div>
          <div className="p-4 font-mono text-[11px] leading-relaxed space-y-1.5">
            <div className="text-white/50">$ python train.py --epochs 50</div>
            <div style={{ color: accent }}>▸ Loading dataset ... ✓ 12,540 samples</div>
            <div className="text-white/80">Epoch 32/50 ━━━━━━━━━━━━━━━━━━ 96%</div>
            <div className="text-white/60">loss: 0.0184  ·  acc: 0.9721</div>
            <div style={{ color: accent }}>✓ Model saved → checkpoints/best.pt</div>
            <div className="text-emerald-400">▸ MAE: 0.031  ·  R²: 0.984</div>
            <div className="mt-3 flex items-center gap-1 text-white/80">
              <span>$</span><span className="w-2 h-3 bg-white/80 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (device === "dashboard") {
    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div className="rounded-2xl bg-neutral-950 border border-white/10 overflow-hidden shadow-2xl"
             style={{ boxShadow: `0 30px 80px -20px ${accent}66` }}>
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <div className="ml-3 text-[10px] font-mono text-white/50 truncate">{name.toLowerCase().replace(/\s+/g,"-")}.app</div>
          </div>
          <div className="p-4" style={{ background: `linear-gradient(180deg, ${accent}18, transparent)` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg grid place-items-center" style={{ background: grad }}>
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="text-xs font-semibold">{name}</div>
              </div>
              <div className="text-[10px] font-mono text-white/50">LIVE</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { k: "Accuracy", v: "97.2%" },
                { k: "Latency", v: "42ms" },
                { k: "Signals", v: "1.2k" },
              ].map((s) => (
                <div key={s.k} className="rounded-lg bg-white/5 p-2 border border-white/5">
                  <div className="text-[9px] text-white/50 uppercase">{s.k}</div>
                  <div className="text-sm font-display font-semibold" style={{ color: accent }}>{s.v}</div>
                </div>
              ))}
            </div>
            {/* Chart */}
            <div className="rounded-lg bg-white/5 p-3 border border-white/5 h-28 relative overflow-hidden">
              <svg viewBox="0 0 200 80" className="w-full h-full">
                <defs>
                  <linearGradient id={`g-${name}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={accent} stopOpacity="0.6"/>
                    <stop offset="1" stopColor={accent} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,60 C20,50 30,20 50,25 C70,30 90,60 110,45 C130,30 150,10 180,20 L200,25 L200,80 L0,80 Z"
                      fill={`url(#g-${name})`} />
                <path d="M0,60 C20,50 30,20 50,25 C70,30 90,60 110,45 C130,30 150,10 180,20 L200,25"
                      fill="none" stroke={accent} strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // laptop
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="rounded-t-2xl bg-neutral-950 border border-white/10 overflow-hidden shadow-2xl"
           style={{ boxShadow: `0 30px 80px -20px ${accent}66` }}>
        <div className="h-6 bg-neutral-900/80 flex items-center gap-1.5 px-3 border-b border-white/10">
          <span className="w-2 h-2 rounded-full bg-red-500/80" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <span className="w-2 h-2 rounded-full bg-green-500/80" />
        </div>
        <div className="aspect-video relative" style={{ background: grad }}>
          <div className="absolute inset-0 opacity-20"
               style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="absolute inset-0 p-5 text-white flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur grid place-items-center">
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xs uppercase tracking-widest opacity-70">{category}</div>
            </div>
            <div className="mt-3 text-2xl font-display font-semibold leading-tight">{name}</div>
            <div className="mt-auto flex items-end justify-between">
              <div className="grid grid-cols-4 gap-1.5 flex-1 mr-4">
                {[40,70,55,90,60,80,35,65].map((h,i) => (
                  <div key={i} className="bg-white/50 rounded-t" style={{ height: h * 0.5 }} />
                ))}
              </div>
              <div className="text-right">
                <div className="text-[10px] opacity-70">v2.1</div>
                <div className="text-xs font-mono">encrypted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-2 bg-neutral-800 rounded-b-lg mx-[-8px]" />
      <div className="h-1 bg-neutral-900 rounded-b-2xl mx-[-16px]" />
    </div>
  );
}

/* ---------------- Projects ---------------- */
function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="reveal text-xs uppercase tracking-[0.3em] text-white/50">03 — Selected work</div>
            <h2 className="reveal mt-4 text-5xl md:text-6xl font-display font-bold">
              Projects that <span className="text-gradient">shipped.</span>
            </h2>
          </div>
          <p className="reveal max-w-md text-white/60">
            Hackathon winners, university research and open-source builds — spanning AI, security, healthcare and the environment.
          </p>
        </div>

        <div className="space-y-24">
          {PROJECTS.map((p, i) => (
            <div key={p.name}
                 className={`reveal grid lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="lg:col-span-6">
                <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-40"
                       style={{ background: p.accent }} />
                  <div className="relative">
                    <DeviceMockup project={p} />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50">
                  <span className="px-2.5 py-1 rounded-full border border-white/15" style={{ color: p.accent }}>{p.category}</span>
                  <span>{p.year}</span>
                  <span>· 0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-4xl md:text-5xl font-display font-bold leading-tight">{p.name}</h3>
                <p className="mt-5 text-lg text-white/70 leading-relaxed max-w-xl">{p.tagline}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10">{s}</span>
                  ))}
                </div>
                <div className="mt-8 flex gap-4">
                  <a href={GITHUB} target="_blank" rel="noreferrer"
                     className="magnetic-btn glass rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2 hover:bg-white/10 transition">
                    View code <Github className="w-4 h-4" />
                  </a>
                  <button className="rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2 text-white/60 hover:text-white transition">
                    Case study <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Achievements ---------------- */
function Achievements() {
  return (
    <section id="achievements" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <div className="reveal text-xs uppercase tracking-[0.3em] text-white/50">04 — Recognition</div>
            <h2 className="reveal mt-4 text-5xl md:text-6xl font-display font-bold">
              A wall of <span className="text-gradient">wins.</span>
            </h2>
          </div>
          <p className="reveal max-w-md text-white/60">
            60+ certificates across hackathons, workshops, volunteering and internships. Browse the full archives below.
          </p>
        </div>

        {/* Certificate categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14">
          {CERT_CATEGORIES.map((c) => (
            <a key={c.label} href={c.url} target="_blank" rel="noreferrer"
               className="reveal glass rounded-3xl p-6 card-hover group relative overflow-hidden">
              <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition"
                   style={{ background: `radial-gradient(circle at 50% 0%, ${c.tone}55, transparent 60%)` }} />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl grid place-items-center mb-4"
                     style={{ background: `linear-gradient(135deg, ${c.tone}, oklch(0.4 0.1 280))`, boxShadow: `0 10px 30px -10px ${c.tone}` }}>
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl font-display font-bold" style={{ color: c.tone }}>{c.count}</div>
                <div className="mt-1 text-sm text-white/80">{c.label}</div>
                <div className="mt-4 text-xs text-white/50 inline-flex items-center gap-1 group-hover:text-white transition">
                  Open drive <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Achievement list */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={a.title}
                 className="reveal glass rounded-2xl p-5 flex items-start gap-4 card-hover"
                 style={{ transitionDelay: `${i * 30}ms` }}>
              <div className="w-10 h-10 shrink-0 rounded-xl glass-strong grid place-items-center">
                <a.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium leading-snug">{a.title}</div>
                <div className="text-xs text-white/50 mt-1">{a.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Education ---------------- */
function Education() {
  const max = 10;
  return (
    <section id="education" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal text-xs uppercase tracking-[0.3em] text-white/50">05 — Education</div>
        <h2 className="reveal mt-4 text-5xl md:text-6xl font-display font-bold mb-14">
          Academic <span className="text-gradient">trajectory.</span>
        </h2>

        <div className="glass-strong rounded-3xl p-8 md:p-10 mb-10 reveal">
          <div className="flex flex-wrap items-start gap-6 justify-between">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl glass grid place-items-center">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/50">{EDUCATION.duration}</div>
                <h3 className="mt-1 text-2xl md:text-3xl font-display font-semibold">{EDUCATION.degree}</h3>
                <p className="mt-2 text-white/70">{EDUCATION.college}</p>
                <p className="text-white/50 text-sm">{EDUCATION.university}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">Cumulative</div>
              <div className="text-5xl font-display font-bold text-gradient">{EDUCATION.cgpa}</div>
            </div>
          </div>
        </div>

        {/* SGPA timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EDUCATION.sgpa.map((s, i) => {
            const pct = (s.value / max) * 100;
            return (
              <div key={s.sem}
                   className="reveal glass rounded-3xl p-6 card-hover relative overflow-hidden group"
                   style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition"
                     style={{ background: `oklch(0.7 0.22 ${200 + i * 25})` }} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/50">{s.sem}</div>
                    <div className="text-3xl font-display font-bold text-gradient">{s.value.toFixed(2)}</div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-4">
                    <div className="h-full rounded-full"
                         style={{ width: `${pct}%`,
                                  background: `linear-gradient(90deg, oklch(0.85 0.17 200), oklch(0.7 0.22 ${290 + i * 10}))` }} />
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">{s.stack}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="glass-strong rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden reveal">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40"
               style={{ background: "oklch(0.7 0.22 290 / 0.6)" }} />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-40"
               style={{ background: "oklch(0.85 0.17 200 / 0.5)" }} />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">06 — Contact</div>
            <h2 className="mt-4 text-5xl md:text-7xl font-display font-bold leading-tight">
              Let's build<br /><span className="text-gradient">something rare.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Open to research collaborations, internships, hackathon teams and product engineering roles.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-4">
              <a href={`mailto:${EMAIL}`}
                 className="glass rounded-2xl p-5 flex items-center gap-4 card-hover group">
                <div className="w-11 h-11 rounded-xl glass-strong grid place-items-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/50">Email</div>
                  <div className="font-mono text-sm mt-0.5">{EMAIL}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition" />
              </a>
              <a href={`tel:${PHONE.replace(/\s/g,"")}`}
                 className="glass rounded-2xl p-5 flex items-center gap-4 card-hover group">
                <div className="w-11 h-11 rounded-xl glass-strong grid place-items-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/50">Phone</div>
                  <div className="font-mono text-sm mt-0.5">{PHONE}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition" />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4" /> {LOCATION}
              </div>
              <div className="ml-auto flex gap-3">
                <a href={GITHUB} target="_blank" rel="noreferrer"
                   aria-label="GitHub"
                   className="w-12 h-12 rounded-2xl glass-strong grid place-items-center card-hover hover:text-primary transition relative group">
                  <Github className="w-5 h-5" />
                  <span className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition"
                        style={{ boxShadow: "0 0 30px oklch(0.85 0.17 200 / 0.6)" }} />
                </a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer"
                   aria-label="LinkedIn"
                   className="w-12 h-12 rounded-2xl glass-strong grid place-items-center card-hover hover:text-primary transition relative group">
                  <Linkedin className="w-5 h-5" />
                  <span className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition"
                        style={{ boxShadow: "0 0 30px oklch(0.7 0.22 290 / 0.6)" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 flex items-center justify-between text-xs text-white/40 flex-wrap gap-4">
          <div>© {new Date().getFullYear()} {NAME} — Crafted with obsession.</div>
          <div className="font-mono">v1.0 · designed & built in India</div>
        </footer>
      </div>
    </section>
  );
}

/* ---------------- Root ---------------- */
export default function Portfolio() {
  useReveal();
  return (
    <div className="relative">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Education />
      <Contact />
    </div>
  );
}
