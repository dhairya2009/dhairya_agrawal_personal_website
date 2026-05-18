"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Ensure this matches your directory structure
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FiArrowRight,
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

export default function AuthenticStudentPortfolio() {
  const [showLoader, setShowLoader] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("journey");
  const [isNameHovered, setIsNameHovered] = useState(false);

  // 1. STATE DRIVERS FOR DYNAMIC REPOSITORIES
  const [profile, setProfile] = useState<any>(null);
  const [journey, setJourney] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [techInventory, setTechInventory] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  // Form input bindings
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // 2. MOUSE SPARK CONFIGURATIONS
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { stiffness: 400, damping: 28 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHoveredClickable, setIsHoveredClickable] = useState(false);

  // 3. ASYNC LIVE DATA STREAM FETCH LOOP
  useEffect(() => {
    setMounted(true);

    const fetchPortfolioData = async () => {
      try {
        // Fetch profile metrics (Get the single first entry row)
        const { data: profileData } = await supabase
          .from("profile")
          .select("*")
          .maybeSingle();
        if (profileData) setProfile(profileData);

        // Fetch journey logs ordered by sorting weights
        const { data: journeyData } = await supabase
          .from("journey_timeline")
          .select("*")
          .order("sort_order", { ascending: true });
        if (journeyData) setJourney(journeyData);

        // Fetch milestone listings
        const { data: milestoneData } = await supabase
          .from("milestones")
          .select("*");
        if (milestoneData) setMilestones(milestoneData);

        // Fetch skills grid index maps
        const { data: skillData } = await supabase
          .from("tech_inventory")
          .select("*")
          .order("sort_order", { ascending: true });
        if (skillData) setTechInventory(skillData);

        // Fetch projects nodes
        const { data: projectData } = await supabase
          .from("real_projects")
          .select("*");
        if (projectData) setProjects(projectData);
      } catch (err) {
        console.error("Critical stream pipeline crash:", err);
      } finally {
        setShowLoader(false);
      }
    };

    fetchPortfolioData();

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
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // 4. SECURE PAYLOAD HANDSHAKE TRANSMISSION
  const triggerSubmitHandshake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    try {
      const { error } = await supabase
        .from("contacts")
        .insert([
          {
            name: formState.name,
            email: formState.email,
            message: formState.message,
          },
        ]);

      if (error) throw error;

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", message: "" });
      }, 4000);
    } catch (err) {
      console.error("Form delivery abort fault:", err);
      alert("Submission error encountered.");
    }
  };

  if (!mounted) return <div className="min-h-screen bg-[#030712]" />;

  // Dynamic fallback strings while resource loading completes
  const profileName = profile?.name || "Dhairya Agrawal";
  const profileBio = profile?.bio || "Loading ecosystem profiles...";
  const profileCollege = profile?.college || "Newton School of Technology";
  const profileStart = profile?.timeline_start || "August 2026";
  const profilePhoto =
    profile?.photo_url ||
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-[#6C63FF]/30 overflow-x-hidden font-sans relative antialiased scroll-smooth">
      {/* GLOWING AMBIENT DOT */}
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

      {/* DYNAMIC CURSOR HOVER IMAGE WINDOW */}
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
              marginLeft: "50px",
              marginTop: "-160px",
            }}
          >
            <img
              src={profilePhoto}
              alt={profileName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* INTRO GLITCH LOADER */}
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
                transition={{ duration: 1.2 }}
                className="h-[2px] bg-gradient-to-r from-[#6C63FF] to-[#4FD1C5] mx-auto"
              />
              <h2 className="text-white font-black uppercase text-xs tracking-widest">
                {profileName}
              </h2>
              <div className="text-[10px] text-[#4FD1C5] tracking-widest animate-pulse mt-1">
                INITIALIZING PORTFOLIO_NODE...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GRID VECTOR ACCENTS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-b from-[#6C63FF]/15 via-[#4FD1C5]/5 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* HEADER SECTION */}
      <nav className="fixed top-0 inset-x-0 h-16 bg-[#030712]/75 backdrop-blur-md border-b border-white/[0.04] z-50">
        <div className="max-w-5xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <a href="#about" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#4FD1C5] flex items-center justify-center font-black text-xs group-hover:rotate-6 transition-transform">
              DA
            </div>
            <div>
              <span className="font-bold text-sm block tracking-tight group-hover:text-[#4FD1C5] transition-colors">
                {profileName}
              </span>
              <span className="text-[9px] text-gray-500 tracking-widest uppercase font-mono block mt-0.5">
                Dynamic Web-Node
              </span>
            </div>
          </a>
          <div className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-lg flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4FD1C5] animate-pulse" />
            <span className="text-[10px] font-mono text-[#4FD1C5] font-bold uppercase tracking-wider">
              CAMPUS INBOUND: {profileStart}
            </span>
          </div>
        </div>
      </nav>

      {/* MAIN HERO LANDING PORT */}
      <section
        id="about"
        className="pt-40 pb-20 px-4 max-w-4xl mx-auto text-center space-y-8 relative z-10 min-h-[90vh] flex flex-col justify-center items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-full text-[10px] font-mono font-bold tracking-wider text-[#818cf8]">
          <FiTerminal size={11} /> Live Runtime Ecosystem Verified
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
          <span className="block">
            Hi, I'm{" "}
            <span
              onMouseEnter={() => setIsNameHovered(true)}
              onMouseLeave={() => setIsNameHovered(false)}
              className="hover-trigger-name text-white hover:text-[#4FD1C5] cursor-crosshair border-b-2 border-dashed border-white/20 transition-colors"
            >
              {profileName}
            </span>
            .
          </span>
          <span className="bg-gradient-to-r from-[#6C63FF] via-[#818cf8] to-[#4FD1C5] bg-clip-text text-transparent block mt-1">
            Exploring Code & Web Architecture.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl font-normal">
          {profileBio}
        </p>

        {/* Academic Card */}
        <div className="p-4 bg-[#090d16] border border-white/[0.04] rounded-xl text-left max-w-xl w-full flex items-start gap-3 shadow-xl">
          <div className="p-2 rounded-lg bg-[#4FD1C5]/10 text-[#4FD1C5] mt-0.5">
            <FiBookOpen size={15} />
          </div>
          <div className="text-xs">
            <span className="font-mono font-bold text-gray-500 uppercase tracking-wide text-[10px] block">
              Academic Destination Node
            </span>
            <p className="text-gray-300 mt-0.5">
              Incoming B.Tech Undergrad student at{" "}
              <span className="text-white font-bold">{profileCollege}</span>{" "}
              starting in{" "}
              <span className="text-amber-400 font-mono font-bold">
                {profileStart}
              </span>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2 font-mono text-xs">
          <a
            href="#dashboard"
            className="h-11 px-5 rounded-xl bg-[#6C63FF] text-white font-bold tracking-wide flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#6C63FF]/20"
          >
            <span>Explore Matrix Timeline</span> <FiArrowRight size={12} />
          </a>
        </div>
      </section>

      {/* DASHBOARD SECTIONS */}
      <section
        id="dashboard"
        className="py-24 max-w-4xl mx-auto px-4 border-t border-white/[0.03] relative z-10"
      >
        <div className="flex justify-center mb-12">
          <div className="p-1 bg-[#090d16] border border-white/5 rounded-xl flex gap-1 font-mono max-w-sm w-full shadow-2xl">
            {["journey", "milestones", "skills"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-[11px] font-bold rounded-lg uppercase tracking-wider transition-all ${activeTab === tab ? "bg-[#6C63FF] text-white" : "text-gray-400 hover:text-white"}`}
              >
                {tab === "skills" ? "Tech Grid" : tab}
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
                {journey.map((node, idx) => (
                  <div key={node.id || idx} className="relative pl-6 group">
                    <div className="absolute -left-[5px] top-2.5 w-2.5 h-2.5 rounded-full bg-[#030712] border-2 border-[#6C63FF] group-hover:border-[#4FD1C5] transition-colors" />
                    <div className="md:absolute md:-left-32 md:top-1.5 md:w-24 text-left md:text-right text-[10px] font-mono font-bold text-[#4FD1C5] uppercase tracking-wider mb-1 md:mb-0">
                      {node.period}
                    </div>
                    <div className="p-5 bg-[#090d16] border border-white/[0.04] rounded-xl transition-all shadow-xl group-hover:translate-x-1">
                      <div className="flex items-center gap-2 text-[#818cf8] text-[9px] font-mono font-bold uppercase">
                        <FiBriefcase size={11} /> <span>// {node.type}</span>
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight mt-1">
                        {node.role}
                      </h3>
                      <span className="text-xs font-mono font-bold text-gray-500 block mt-0.5">
                        {node.institution}
                      </span>
                      <p className="text-xs text-gray-400 mt-3 leading-relaxed">
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
                {milestones.map((mile, idx) => (
                  <div
                    key={mile.id || idx}
                    className="p-5 bg-[#090d16] border border-white/[0.04] rounded-xl flex flex-col justify-between shadow-xl hover:-translate-y-1 group transition-all"
                  >
                    <div className="space-y-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center text-xs">
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
                      <p className="text-xs text-gray-400 leading-relaxed">
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
                    {techInventory.map((skill, idx) => (
                      <div key={skill.id || idx} className="space-y-1.5">
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
                            animate={{ width: skill.bar_width }}
                            transition={{ duration: 1 }}
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

      {/* DYNAMIC CODE PROJECTS REPOSITORIES */}
      <section
        id="projects"
        className="py-24 max-w-5xl mx-auto px-4 border-t border-white/[0.03] relative z-10"
      >
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold font-mono tracking-widest text-[#4FD1C5] uppercase block">
            / repositories
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Things I Have Coded
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {projects.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="p-5 bg-[#090d16] border border-white/[0.04] hover:border-[#6C63FF]/40 rounded-xl flex flex-col justify-between transition-all group shadow-lg hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-gray-500 group-hover:text-[#4FD1C5] transition-all">
                    <FiFolder size={15} />
                  </div>
                  <a
                    href={proj.git_url}
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
                  <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                    {proj.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.03] flex flex-wrap gap-1 font-mono text-[9px] font-semibold text-gray-400 relative z-10">
                {Array.isArray(proj.tech) &&
                  proj.tech.map((t: string, i: number) => (
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

      {/* CONTACT FORM */}
      <section
        id="contact"
        className="py-24 max-w-xl mx-auto px-4 border-t border-white/[0.03] relative z-10 text-center"
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
                className="w-full bg-black/30 border border-white/5 focus:border-[#6C63FF] rounded-xl p-4 text-white focus:outline-none font-sans resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 bg-[#6C63FF] text-white font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#5a52f5] active:scale-[0.99] transition-all shadow-lg cursor-pointer"
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

      {/* FOOTER */}
      <footer className="border-t border-white/[0.04] bg-[#030712] py-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-gray-500">
          <div>
            <span className="font-bold text-white block">
              {profileName} — Live Synchronized Core
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-wider text-gray-600 uppercase">
            DATABASE_ACTIVE // 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
