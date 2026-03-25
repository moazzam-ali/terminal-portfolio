"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CommandLine } from "./CommandLine";
import { CommandOutput } from "./CommandOutput";
import { TerminalIcon, Maximize2, Minimize2 } from "lucide-react";

const WELCOME_ART = `
 ╔══════════════════════════════════════════╗
 ║     __  __                                ║
 ║    |  \\/  | ___   __ _ __________ _ _ __ ___   ║
 ║    | |\\/| |/ _ \\ / _\` |_  /_  / _\` | '_ \` _ \\  ║
 ║    | |  | | (_) | (_| |/ / / / (_| | | | | | | ║
 ║    |_|  |_|\\___/ \\__,_/___/___\\__,_|_| |_| |_| ║
 ║                                          ║
 ╚══════════════════════════════════════════╝

 Welcome! I'm Moazzam Ali — Frontend Engineer.
 Type 'help' to see what I can do. ↵
`;

const COMMANDS = {
    help: `
┌─────────────────────────────────────────┐
│  AVAILABLE COMMANDS                     │
├─────────────────────────────────────────┤
│  about       → Who am I                │
│  skills      → Technical skills         │
│  projects    → Recent work              │
│  experience  → Work history             │
│  education   → Academic background      │
│  contact     → Get in touch             │
│  3d          → 3D & animation skills    │
│  hobbies     → Life outside code        │
│  social      → Social profiles          │
│  resume      → Download resume          │
│  theme       → Toggle scan lines        │
│  clear       → Clear terminal           │
└─────────────────────────────────────────┘`,

    about: `
┌─ ABOUT ──────────────────────────────────┐

  I'm Moazzam Ali, a passionate frontend
  developer building engaging & interactive
  web experiences.

  I thrive on exploring new tech and the
  satisfaction of overcoming challenges.

  My expertise extends to creating immersive
  3D websites, blending web development and
  interactive design to craft unique UX.

└──────────────────────────────────────────┘`,

    skills: `
┌─ TECHNICAL SKILLS ───────────────────────┐
│                                          │
│  ▸ Frontend                              │
│    Next.js · React · Gatsby · TypeScript │
│                                          │
│  ▸ Styling                               │
│    Tailwind CSS · SCSS · Styled-Comp.    │
│                                          │
│  ▸ UI Libraries                          │
│    Ant Design · Shadcn · Chakra UI       │
│                                          │
│  ▸ Backend                               │
│    Node.js · Express.js                  │
│                                          │
│  ▸ 3D & Animation                        │
│    Three.js · Spline · GSAP · Framer     │
│                                          │
│  ▸ Other                                 │
│    Git · Webflow · GraphQL · REST APIs   │
│                                          │
└──────────────────────────────────────────┘`,

    projects: `
┌─ RECENT PROJECTS ────────────────────────┐
│                                          │
│  01  3D Product Showcase                 │
│      Interactive 3D viewer with Three.js │
│      and Next.js                         │
│                                          │
│  02  E-commerce Platform                 │
│      Responsive store with Gatsby +      │
│      Shopify integration                 │
│                                          │
│  03  Portfolio Website                   │
│      Animated transitions with Framer    │
│      Motion                              │
│                                          │
│  04  Dashboard Application               │
│      Data viz with React + D3.js         │
│                                          │
│  05  Blog Platform                       │
│      Performant blog with Next.js + MDX  │
│                                          │
└──────────────────────────────────────────┘`,

    education: `
┌─ EDUCATION ──────────────────────────────┐
│                                          │
│  BS Computer Science                     │
│  University of Engineering & Technology  │
│  Taxila — Graduated with Honors          │
│                                          │
└──────────────────────────────────────────┘`,

    experience: `
┌─ WORK EXPERIENCE ────────────────────────┐
│                                          │
│  ● Senior Frontend Dev @ TechInnovate   │
│    2021 – Present                        │
│    Lead development with React & Next.js │
│    Implemented 3D elements with Three.js │
│    Mentored juniors & conducted reviews  │
│                                          │
│  ● Frontend Dev @ WebSolutions Inc.      │
│    2019 – 2021                           │
│    Built client sites with Gatsby        │
│    Improved performance & SEO rankings   │
│    Pixel-perfect UI implementations      │
│                                          │
│  ● Junior Web Dev @ StartupHub           │
│    2018 – 2019                           │
│    Built interactive startup prototypes  │
│    Contributed to component library      │
│                                          │
└──────────────────────────────────────────┘`,

    contact: `
┌─ CONTACT ────────────────────────────────┐
│                                          │
│  ✉  moazzam435j@gmail.com               │
│  ◆  github.com/moazzam-ali              │
│  ☎  +923165518392                        │
│                                          │
└──────────────────────────────────────────┘`,

    "3d": `
┌─ 3D WEB DEVELOPMENT ────────────────────┐
│                                          │
│  ▸ Three.js — 3D graphics & animations  │
│  ▸ Spline — 3D model integration        │
│  ▸ GSAP — Smooth transitions            │
│  ▸ Framer Motion — React animations     │
│  ▸ WebGL — Custom shader effects        │
│  ▸ Performance optimization for 3D      │
│                                          │
└──────────────────────────────────────────┘`,

    hobbies: `
┌─ HOBBIES & INTERESTS ───────────────────┐
│                                          │
│  ◇ Exploring new web technologies       │
│  ◇ Contributing to open-source          │
│  ◇ Tech meetups & conferences           │
│  ◇ 3D modeling & digital art            │
│  ◇ Reading tech blogs                   │
│  ◇ LeetCode & HackerRank challenges    │
│                                          │
└──────────────────────────────────────────┘`,

    social: `
┌─ SOCIAL PROFILES ────────────────────────┐
│                                          │
│  ▸ LinkedIn  linkedin.com/in/moazzam-ali │
│  ▸ Twitter   twitter.com/moazzam_dev     │
│  ▸ CodePen   codepen.io/moazzam-ali      │
│  ▸ Dev.to    dev.to/moazzam_ali          │
│                                          │
└──────────────────────────────────────────┘`,

    resume: `
┌─ RESUME ─────────────────────────────────┐
│                                          │
│  Download: example.com/moazzam-resume.pdf│
│  (placeholder — update with real link)   │
│                                          │
└──────────────────────────────────────────┘`,
};

export function Terminal() {
    const [history, setHistory] = useState([{ type: "output", text: WELCOME_ART }]);
    const [inputValue, setInputValue] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [scanLines, setScanLines] = useState(true);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const terminalRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    // Focus input when clicking anywhere in terminal
    const handleTerminalClick = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = (command) => {
        const trimmed = command.trim();
        if (!trimmed) return;

        // Add to command history for arrow key navigation
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);

        // Show the command in output
        setHistory((prev) => [...prev, { type: "command", text: trimmed }]);

        const cmd = trimmed.toLowerCase();

        if (cmd === "clear") {
            setHistory([]);
            return;
        }

        if (cmd === "theme") {
            setScanLines((prev) => !prev);
            setHistory((prev) => [
                ...prev,
                { type: "output", text: `Scan lines ${!scanLines ? "enabled" : "disabled"}.` },
            ]);
            return;
        }

        if (COMMANDS[cmd]) {
            setHistory((prev) => [...prev, { type: "output", text: COMMANDS[cmd] }]);
        } else {
            setHistory((prev) => [
                ...prev,
                {
                    type: "error",
                    text: `Command not found: '${trimmed}'. Type 'help' for available commands.`,
                },
            ]);
        }
    };

    const handleHistoryNavigation = (direction) => {
        if (commandHistory.length === 0) return;

        let newIndex;
        if (direction === "up") {
            newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        } else {
            newIndex = historyIndex === -1 ? -1 : historyIndex + 1;
            if (newIndex >= commandHistory.length) newIndex = -1;
        }

        setHistoryIndex(newIndex);
        setInputValue(newIndex === -1 ? "" : commandHistory[newIndex]);
    };

    return (
        <div
            onClick={handleTerminalClick}
            className={`terminal-container ${isFullscreen ? "terminal-fullscreen" : "terminal-windowed"}`}
        >
            {/* Scan line overlay */}
            {scanLines && <div className="scan-lines" />}

            {/* Terminal header bar */}
            <div className="terminal-header">
                <div className="flex items-center gap-2">
                    {/* Traffic light dots */}
                    <div className="flex items-center gap-1.5 mr-3">
                        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block opacity-40" />
                        <span className="w-3 h-3 rounded-full bg-green-500 inline-block opacity-40" />
                    </div>
                    <TerminalIcon size={16} className="text-red-500" />
                    <span className="text-sm font-mono text-neutral-400 select-none">
                        moazzam@portfolio:~$
                    </span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFullscreen((f) => !f);
                    }}
                    className="terminal-toggle-btn"
                    title={isFullscreen ? "Minimize" : "Maximize"}
                >
                    {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
            </div>

            {/* Terminal body */}
            <div ref={terminalRef} className="terminal-body">
                {history.map((item, index) => (
                    <CommandOutput key={index} item={item} />
                ))}
            </div>

            {/* Input line */}
            <div className="terminal-input-area">
                <CommandLine
                    ref={inputRef}
                    value={inputValue}
                    onChange={setInputValue}
                    onSubmit={(value) => {
                        handleCommand(value);
                        setInputValue("");
                    }}
                    onHistoryNav={handleHistoryNavigation}
                />
            </div>
        </div>
    );
}
