"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FiArrowRight,
  FiCode,
  FiZap,
  FiTerminal,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiFolder,
  FiMail,
  FiMessageSquare,
  FiTrendingUp,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiCheckCircle,
} from "react-icons/fi";

// ==========================================
//   AUTHENTIC PROFILE DATA (EASY TO EDIT)
// ==========================================
const PROFILE = {
  name: "Dhairya Agrawal",
  college: "Newton School of Technology x S-VYASA",
  timelineStart: "August 2026",
  bio: "Hi! I'm Dhairya, a student web developer passionate about writing code and exploring how things work behind the screen. I started teaching myself programming and have learned how to build clean, responsive websites using JavaScript, React, and Next.js. I'm not a veteran expert yet, but I love building personal projects, figuring out bugs, and constantly expanding what I know. Right now, I am getting ready to start my B.Tech journey in August 2026!",
  // 🌟 Update this URL to point to your real photo file path or static asset!
  photoUrl:
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
};

const JOURNEY_TIMELINE = [
  {
    period: "2010 - 2026",
    role: "Schooling Student",
    institution: "Aryan International School",
    description:
      "Built strong foundational roots in math and science. Outside of classes, I fell down the programming rabbit hole—teaching myself how web browsers render code, studying basic scripting, and building my very first static web pages.",
    type: "school",
  },
  {
    period: "August 2026",
    role: "B.Tech in Computer Science & Systems Engineering",
    institution: "Newton School of Technology x S-VYASA",
    description:
      "The official start of my campus college chapter! I will be studying core data structures, advanced full-stack software loops, and collaborating with fellow student developers.",
    type: "college",
  },
  {
    period: "Jan 2027 - May 2027 (Goal Node)",
    role: "First Target Internship",
    institution: "Tech Industry Placement",
    description:
      "My personal timeline target to secure a student internship, work inside a real engineering environment, and learn how production code is deployed at scale.",
    type: "internship",
  },
];

const MILESTONES = [
  {
    title: "First Hackathon Build",
    award: "Participant & Project Submitter",
    description:
      "Joined a fast-paced coding competition with other developers. We collaborated under a strict timeline to build and present a functional website application.",
    tag: "Hackathon",
  },
  {
    title: "School Technology Fest",
    award: "Web Coding Winner",
    description:
      "Earned a top spot at a regional student science/tech event by demonstrating an original front-end design platform layout built from scratch.",
    tag: "School Fest",
  },
  {
    title: "15+ Personal Projects Coded",
    award: "Self-Driven Progress",
    description:
      "Successfully assembled and launched multiple small responsive web projects, simple calculators, API trackers, and layout clones to test my skills.",
    tag: "Learning Milestone",
  },
];

const TECH_INVENTORY = [
  {
    name: "HTML5 & CSS3 Layouts",
    status: "Comfortable & Confident",
    barWidth: "95%",
  },
  {
    name: "JavaScript (ES6+ basics)",
    status: "Comfortable / Active Projects",
    barWidth: "80%",
  },
  {
    name: "React.js Component Architecture",
    status: "Still Learning & Implementing",
    barWidth: "75%",
  },
  {
    name: "Next.js Framework basics",
    status: "Still Learning & Implementing",
    barWidth: "65%",
  },
  {
    name: "Python Coding / Basic Scripts",
    status: "Familiar / Basic Tasks",
    barWidth: "55%",
  },
];

const REAL_PROJECTS = [
  {
    title: "Personal Portfolio v1",
    desc: "The exact website you are looking at right now. Built to showcase my timeline track record, clean UI animations, and authentic coding skillset.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    gitUrl: "https://github.com",
  },
  {
    title: "Dynamic Responsive Landing Node",
    desc: "A fully optimized, mobile-first product page mockup featuring CSS grid structures, hover transitions, and clean dark theme visual properties.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    gitUrl: "https://github.com",
  },
  {
    title: "Interactive Client Utility Widget",
    desc: "A small web utility app designed to let users interact with real-time state array updates and input modifications inside a web dashboard.",
    tech: ["JavaScript", "React.js", "CSS Modules"],
    gitUrl: "https://github.com",
  },
];

export default function AuthenticStudentPortfolio() {
  const [showLoader, setShowLoader] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "journey" | "milestones" | "skills" | string
  >("journey");

  // Custom Name Photo Hover State Matrices
  const [isNameHovered, setIsNameHovered] = useState(false);

  // Contact form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // 1. SMART CUSTOM MOUSE SPARK TRACKER
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { stiffness: 400, damping: 28 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHoveredClickable, setIsHoveredClickable] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowLoader(false), 2400);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = target.closest(
        'a, button, [role="button"], input, textarea, .hover-trigger-name',
      );
      setIsHoveredClickable(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const triggerSubmitHandshake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  if (!mounted) return <div className="min-h-screen bg-[#030712]" />;

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-[#6C63FF]/30 overflow-x-hidden font-sans relative antialiased scroll-smooth">
      {/* 🟢 CUSTOM CURSOR GLOW DOT */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border border-[#6C63FF]/50 mixed-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          transform: "translate(-50%, -50%)",
          backgroundColor: isHoveredClickable
            ? "rgba(108, 99, 255, 0.2)"
            : "rgba(79, 209, 197, 0.03)",
          scale: isHoveredClickable ? 1.5 : 1,
        }}
      />

      {/* 🪐 DYNAMIC CURSOR-FOLLOWING IMAGE POPUP */}
      <AnimatePresence>
        {isNameHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed top-0 left-0 pointer-events-none z-[999] w-48 h-60 rounded-2xl overflow-hidden border-2 border-[#4FD1C5] bg-[#090d16] shadow-2xl"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              // Offsets the picture slightly upper-right of the pointer path
              marginLeft: "10px",
              marginTop: "-160px",
            }}
          >
            <img
              src={PROFILE.photoUrl}
              alt={PROFILE.name}
              className="w-full h-full object-cover animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🪐 TECH WEBPAGE GLITCH INTRO LOADER SCREEN */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="fixed inset-0 bg-[#030712] z-[99999] flex flex-col items-center justify-center font-mono"
            exit={{
              y: "-100vh",
              transition: { ease: [0.76, 0, 0.24, 1], duration: 0.8 },
            }}
          >
            <div className="space-y-3 text-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "160px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-[2px] bg-gradient-to-r from-[#6C63FF] to-[#4FD1C5] mx-auto"
              />
              <motion.h2
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                transition={{ duration: 1 }}
                className="text-white font-black uppercase text-xs pl-[0.5em]"
              >
                {PROFILE.name}
              </motion.h2>
              <div className="text-[10px] text-[#4FD1C5] tracking-widest animate-pulse mt-1">
                INITIALIZING PORTFOLIO_NODE...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREMIUM CYBERGRID METRIC LINES OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-b from-[#6C63FF]/15 via-[#4FD1C5]/5 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 inset-x-0 h-16 bg-[#030712]/75 backdrop-blur-md border-b border-white/[0.04] z-50">
        <div className="max-w-5xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <a href="#about" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#4FD1C5] flex items-center justify-center font-black text-xs shadow-lg group-hover:rotate-6 transition-transform">
              DA
            </div>
            <div>
              <span className="font-bold text-sm block tracking-tight group-hover:text-[#4FD1C5] transition-colors">
                {PROFILE.name}
              </span>
              <span className="text-[9px] text-gray-500 tracking-widest uppercase font-mono block mt-0.5">
                Student Portfolio
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 text-[11px] font-bold font-mono text-gray-400">
            <a
              href="#about"
              className="hover:text-white transition-colors relative group py-1"
            >
              /about
            </a>
            <a
              href="#dashboard"
              className="hover:text-white transition-colors relative group py-1"
            >
              /dashboard
            </a>
            <a
              href="#projects"
              className="hover:text-white transition-colors relative group py-1"
            >
              /projects
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors relative group py-1"
            >
              /contact
            </a>
          </div>

          <div className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-lg flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5] animate-pulse" />
            <span className="text-[10px] font-mono text-[#4FD1C5] font-bold uppercase tracking-wider">
              CAMPUS INBOUND: 2026
            </span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION WITH LUXURY HOVER TRIGGERS */}
      <section
        id="about"
        className="pt-40 pb-20 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-8 relative z-10 min-h-[90vh] flex flex-col justify-center items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-full text-[10px] font-mono font-bold tracking-wider text-[#818cf8]"
        >
          <FiTerminal size={11} /> Learning & Coding Active Loop
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              className="block select-none"
            >
              Hi, I'm{" "}
              <span
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
                className="hover-trigger-name relative text-white hover:text-[#4FD1C5] transition-colors cursor-crosshair border-b-2 border-dashed border-white/20 hover:border-[#4FD1C5]"
              >
                {PROFILE.name}
              </span>
              .
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="bg-gradient-to-r from-[#6C63FF] via-[#818cf8] to-[#4FD1C5] bg-clip-text text-transparent block mt-1"
            >
              Exploring Code & Web Architecture.
            </motion.span>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl font-normal font-sans"
        >
          {PROFILE.bio}
        </motion.p>

        {/* Academic Target Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2, duration: 0.5 }}
          className="p-4 bg-[#090d16] border border-white/[0.04] hover:border-[#6C63FF]/20 rounded-xl text-left max-w-xl w-full flex items-start gap-3 shadow-xl hover:shadow-[#6C63FF]/5 transition-all duration-300"
        >
          <div className="p-2 rounded-lg bg-[#4FD1C5]/10 text-[#4FD1C5] mt-0.5 shrink-0">
            <FiBookOpen size={15} />
          </div>
          <div className="text-xs">
            <span className="font-mono font-bold text-gray-500 uppercase tracking-wide text-[10px] block">
              Future Campus Destination
            </span>
            <p className="text-gray-300 mt-0.5 leading-relaxed font-sans">
              Incoming B.Tech Undergrad student at{" "}
              <span className="text-white font-bold">{PROFILE.college}</span>{" "}
              starting in{" "}
              <span className="text-amber-400 font-mono font-bold">
                {PROFILE.timelineStart}
              </span>
              .
            </p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4 }}
          className="flex items-center gap-4 pt-2 font-mono text-xs"
        >
          <a
            href="#dashboard"
            className="h-11 px-5 rounded-xl bg-[#6C63FF] hover:bg-[#5a52f5] text-white font-bold tracking-wide flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#6C63FF]/20"
          >
            <span>Explore Matrix Timeline</span> <FiArrowRight size={12} />
          </a>
        </motion.div>
      </section>

      {/* TRACK RECORD INTERACTIVE CONTROL TABS */}
      <section
        id="dashboard"
        className="py-24 max-w-4xl mx-auto px-4 sm:px-6 border-t border-white/[0.03] relative z-10"
      >
        <div className="flex justify-center mb-12">
          <div className="p-1 bg-[#090d16] border border-white/5 rounded-xl flex gap-1 font-mono max-w-sm w-full shadow-2xl">
            {[
              { id: "journey", text: "Journey" },
              { id: "milestones", text: "Milestones" },
              { id: "skills", text: "Tech Grid" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 text-[11px] font-bold rounded-lg uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#6C63FF] text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.text}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            {activeTab === "journey" && (
              <motion.div
                key="journey"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="relative border-l border-white/10 ml-2 md:ml-28 space-y-6 text-left"
              >
                {JOURNEY_TIMELINE.map((node, idx) => (
                  <div key={idx} className="relative pl-6 group">
                    <div className="absolute -left-[5px] top-2.5 w-2.5 h-2.5 rounded-full bg-[#030712] border-2 border-[#6C63FF] group-hover:border-[#4FD1C5] transition-colors duration-300" />
                    <div className="md:absolute md:-left-32 md:top-1.5 md:w-24 text-left md:text-right text-[10px] font-mono font-bold text-[#4FD1C5] uppercase tracking-wider mb-1 md:mb-0">
                      {node.period}
                    </div>
                    <div className="p-5 bg-[#090d16] border border-white/[0.04] rounded-xl hover:border-[#6C63FF]/30 transition-all duration-300 shadow-xl group-hover:translate-x-1">
                      <div className="flex items-center gap-2 text-[#818cf8] text-[9px] font-mono font-bold uppercase tracking-wider">
                        <FiBriefcase size={11} /> <span>// {node.type}</span>
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight mt-1">
                        {node.role}
                      </h3>
                      <span className="text-xs font-mono font-bold text-gray-500 block mt-0.5">
                        {node.institution}
                      </span>
                      <p className="text-xs text-gray-400 mt-3 leading-relaxed font-sans font-normal">
                        {node.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "milestones" && (
              <motion.div
                key="milestones"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left"
              >
                {MILESTONES.map((mile, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-[#090d16] border border-white/[0.04] rounded-xl flex flex-col justify-between hover:border-[#4FD1C5]/30 transition-all duration-300 shadow-xl hover:-translate-y-1 group"
                  >
                    <div className="space-y-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                        <FiAward />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold bg-white/[0.03] text-gray-400 border border-white/5 px-2 py-0.5 rounded uppercase">
                          {mile.tag}
                        </span>
                        <h4 className="text-sm font-bold text-white tracking-tight mt-2">
                          {mile.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans font-normal">
                        {mile.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-2.5 border-t border-white/[0.03] flex items-center gap-1.5 text-[11px] font-mono font-semibold text-amber-400">
                      <FiTrendingUp size={11} /> <span>{mile.award}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 text-left max-w-xl mx-auto"
              >
                <div className="bg-[#090d16] border border-white/[0.04] rounded-xl p-6 space-y-4 shadow-2xl">
                  <span className="text-[10px] font-mono font-bold text-[#4FD1C5] uppercase tracking-widest block border-b border-white/[0.04] pb-2">
                    // Level Baseline Checklist
                  </span>
                  <div className="space-y-4 font-mono text-xs">
                    {TECH_INVENTORY.map((skill, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-gray-200">
                            {skill.name}
                          </span>
                          <span className="text-gray-500 font-bold text-[10px]">
                            {skill.status}
                          </span>
                        </div>
                        <div className="h-[6px] w-full bg-black/40 rounded-full overflow-hidden border border-white/[0.02]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: skill.barWidth }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="h-full bg-gradient-to-r from-[#6C63FF] to-[#4FD1C5]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* PROJECTS BLOCK */}
      <section
        id="projects"
        className="py-24 max-w-5xl mx-auto px-4 sm:px-6 border-t border-white/[0.03] relative z-10"
      >
        <div className="text-center space-y-2 mb-12 max-w-md mx-auto">
          <span className="text-xs font-bold font-mono tracking-widest text-[#4FD1C5] uppercase block">
            / repositories
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Things I Have Coded
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {REAL_PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#090d16] border border-white/[0.04] hover:border-[#6C63FF]/40 rounded-xl flex flex-col justify-between transition-all duration-300 group shadow-lg hover:shadow-[#6C63FF]/5 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#6C63FF]/10 rounded-full blur-xl" />
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-gray-500 group-hover:text-[#4FD1C5] transition-all">
                    <FiFolder size={15} />
                  </div>
                  <a
                    href={proj.gitUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-white transition-colors text-xs flex items-center gap-1 font-mono font-bold"
                  >
                    <FiGithub size={13} /> <span>Code Base</span>
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-[#6C63FF] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1.5 font-sans font-normal">
                    {proj.desc}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.03] flex flex-wrap gap-1 font-mono text-[9px] font-semibold text-gray-400 relative z-10">
                {proj.tech.map((t, i) => (
                  <span
                    key={i}
                    className="bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HANDSHAKE CONTACT FORM INTERFACE */}
      <section
        id="contact"
        className="py-24 max-w-xl mx-auto px-4 sm:px-6 border-t border-white/[0.03] relative z-10 text-center"
      >
        <div className="space-y-2 mb-10">
          <span className="text-xs font-bold font-mono tracking-widest text-[#4FD1C5] uppercase block">
            / communication
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Let's Connect!
          </h2>
        </div>
        <div className="bg-[#090d16] border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative text-left">
          <form
            onSubmit={triggerSubmitHandshake}
            className="space-y-4 font-mono text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-gray-500 font-bold block">
                  Your Identity Name:
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  placeholder="Your label name..."
                  className="w-full h-11 bg-black/30 border border-white/5 focus:border-[#6C63FF] rounded-xl px-4 text-white focus:outline-none font-sans"
                />
              </div>
              <div className="space-y-1">
                <label className="text-gray-500 font-bold block">
                  Email Target Route:
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  placeholder="Return handshake mailbox..."
                  className="w-full h-11 bg-black/30 border border-white/5 focus:border-[#6C63FF] rounded-xl px-4 text-white focus:outline-none font-sans"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-gray-500 font-bold block">
                Message Payload Block:
              </label>
              <textarea
                rows={4}
                required
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                placeholder="Write your note sequence here..."
                className="w-full bg-black/30 border border-white/5 focus:border-[#6C63FF] rounded-xl p-4 text-white focus:outline-none font-sans resize-none tool-scrollbar"
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 bg-[#6C63FF] hover:bg-[#5a52f5] text-white font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] shadow-lg cursor-pointer"
            >
              <FiMessageSquare size={13} /> <span>Transmit Payload</span>
            </button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#090d16]/98 rounded-2xl flex flex-col items-center justify-center text-center p-4 border border-emerald-500/20"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                  <FiCheckCircle />
                </div>
                <h4 className="text-xs font-bold font-mono text-white uppercase">
                  Payload Handshake Successful
                </h4>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SOCIAL MEDIA NETWORKING FOOTPRINT */}
      <section className="py-14 border-t border-white/[0.02] max-w-5xl mx-auto px-4 text-center space-y-5 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono">
          {[
            {
              name: "GitHub",
              url: "https://github.com",
              icon: <FiGithub />,
              hoverColor:
                "hover:border-white/20 hover:text-white hover:bg-white/[0.02]",
            },
            {
              name: "LinkedIn",
              url: "https://linkedin.com",
              icon: <FiLinkedin />,
              hoverColor:
                "hover:border-blue-500/20 hover:text-blue-400 hover:bg-blue-500/[0.02]",
            },
            {
              name: "Twitter",
              url: "https://x.com",
              icon: <FiTwitter />,
              hoverColor:
                "hover:border-slate-400/20 hover:text-slate-200 hover:bg-slate-400/[0.02]",
            },
            {
              name: "Instagram",
              url: "https://instagram.com",
              icon: <FiInstagram />,
              hoverColor:
                "hover:border-pink-500/20 hover:text-pink-400 hover:bg-pink-500/[0.02]",
            },
            {
              name: "YouTube",
              url: "https://youtube.com",
              icon: <FiYoutube />,
              hoverColor:
                "hover:border-red-500/20 hover:text-red-400 hover:bg-red-500/[0.02]",
            },
          ].map((soc, idx) => (
            <a
              key={idx}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 bg-[#090d16] border border-white/[0.04] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group cursor-pointer ${soc.hoverColor}`}
            >
              <div className="text-xs text-gray-500 group-hover:scale-110 transition-transform">
                {soc.icon}
              </div>
              <span className="text-xs font-bold text-gray-400 group-hover:text-white">
                {soc.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.04] bg-[#030712] py-8 text-center sm:text-left relative z-10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-gray-500">
          <div>
            <span className="font-bold text-white block">
              {PROFILE.name} — Personal Node
            </span>
            <span className="text-[10px] mt-0.5 block">
              Configured with Next.js 15 App Layout structures, Tailwind, and
              Framer Motion.
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-wider text-gray-600 uppercase">
            LOCAL_BUILD // 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
