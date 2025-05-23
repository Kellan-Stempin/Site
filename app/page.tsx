"use client";
import React, { useEffect, useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

type TerminalEntry = { prompt: string; command?: string; output?: React.ReactNode[] };

export default function Home() {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [commandInput, setCommandInput] = useState("");
  const [currentPath, setCurrentPath] = useState("~");
  const [terminalOutput, setTerminalOutput] = useState<TerminalEntry[]>([]);

  const asciiArt = [
    "                                          _.oo.",
    "                   _.u[[/;:,.         .odMMMMMM'",
    "                .o888UU[[[/;:-.  .o@P^    MMM^",
    "               oN88888UU[[[/;::-.        dP^",
    "              dNMMNN888UU[[[/;:--.   .o@P^",
    "             ,MMMMMMN888UU[[/;::-. o@^",
    "             NNMMMNN888UU[[[/~.o@P^",
    "             888888888UU[[[/o@^-..",
    "            oI8888UU[[[/o@P^:--..",
    "         .@^  YUU[[[/o@^;::---..",
    "       oMP     ^/o@P^;:::---..",
    "    .dMMM    .o@^ ^;::---...",
    "   dMMMMMMM@^`       `^^^^",
    "  YMMMUP^",
    "   ^^"
  ];

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(blink);
  }, []);

  const handleCommand = (
    command: string,
    output: React.ReactNode[],
    newPath: string
  ) => {
    setCommandInput("");
    let i = 0;
    let typed = "";
    const typer = setInterval(() => {
      typed += command[i];
      setCommandInput(typed);
      i++;
      if (i >= command.length) {
        clearInterval(typer);
        setTimeout(() => {
          setTerminalOutput([{ prompt: `kellan@portfolio:${newPath}`, command, output }]);
          setCurrentPath(newPath);
          setCommandInput("");
        }, 300);
      }
    }, 50);
  };

  const goBack = () => {
    const parts = currentPath === "~" ? ["~"] : currentPath.split("/");
    if (parts.length > 1) parts.pop();
    const parent = parts.length > 1 ? parts.join("/") : "~";
    const output = parent === "~/projects" ? projectEntries : [];
    handleCommand("cd ..", output, parent);
  };

  const particlesInit = useCallback((engine: Engine) => loadSlim(engine), []);
  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: "#0d0d0d" },
    particles: {
      number: { value: 60 },
      color: { value: "#d1d5db" },
      size: { value: 1.4 },
      move: { enable: true, speed: 0.25 },
      links: { enable: true, color: "#4b5563", distance: 100, opacity: 0.15 }
    }
  };

  // ─── PROJECT TREE ────────────────────────────────────────────────────────────
  const projectEntries = [
    "projects",
    <div key="portfolio-website" className="ml-4">
      ├──{" "}
      <button
        className="text-blue-400 hover:text-blue-300 text-base"
        onClick={() =>
          handleCommand(
            "cd projects/portfolio-website && cat README.md",
            [
              "Personal Webpage",
              "----------",
              <div key="website-img" className="my-3">
                <img
                  src="/website.png"
                  alt="Portfolio page Screenshot"
                  className="max-w-full rounded-md border border-gray-700"
                />
              </div>,
              <div key="website-desc" className="my-2">
                Wanted to make a personal portfolio for myself almost
                immediately after starting Web Design and Programming, I have
                enjoyed working on this for the past month or so. Written using
                Next.js with an interactive React frontend, this project has
                been quite the challenge for me.
              </div>,
              <div key="website-link" className="mt-3">
                <a
                  href="https://github.com/Kellan-Stempin/Site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Project
                </a>
              </div>,
              <div key="back" className="mt-3">
                <button
                  onClick={goBack}
                  className="block text-yellow-400 hover:text-yellow-300"
                >
                  back <span className="text-gray-500">{"// go back"}</span>
                </button>
              </div>,
            ],
            "~/projects/portfolio-website"
          )
        }
      >
        portfolio-website
      </button>
    </div>,
    <div key="halloween-store" className="ml-4">
      ├──{" "}
      <button
        className="text-blue-400 hover:text-blue-300 text-base"
        onClick={() =>
          handleCommand(
            "cd projects/halloween-store && cat README.md",
            [
              "Halloween Store Website",
              "----------",
              <div key="halloween-img" className="my-3">
                <img
                  src="/halloween-store.png"
                  alt="Halloween Store Screenshot"
                  className="max-w-full rounded-md border border-gray-700"
                />
              </div>,
              <div key="halloween-desc" className="my-2">
                This assignment was also made for my Web Design and Programming
                class. We learned CSS in more depth for this assignment and I
                wanted a transparent main content space with a moving black hole
                in the background. It was challenging to figure out how to get
                this to work, but after further research on gifs and svgs.
              </div>,
              <div key="halloween-link" className="mt-3">
                <a
                  href="http://students.cs.umt.edu/~ks235279/halloween-shop-black-hole/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Project
                </a>
              </div>,
              <div key="back" className="mt-3">
                <button
                  onClick={goBack}
                  className="block text-yellow-400 hover:text-yellow-300"
                >
                  back <span className="text-gray-500">{"// go back"}</span>
                </button>
              </div>,
            ],
            "~/projects/halloween-store"
          )
        }
      >
        halloween-store
      </button>
    </div>,
    <div key="enhanced-godmode" className="ml-4">
      ├──{" "}
      <button
        className="text-blue-400 hover:text-blue-300 text-base"
        onClick={() =>
          handleCommand(
            "cd projects/enhanced-godmode && cat README.md",
            [
              "Enhanced Godmode Mod",
              "----------",
              <div key="Enhanced God Mode-img" className="my-3">
                <img
                  src="/enhancedgodmode.png"
                  alt="Mod Page Screenshot"
                  className="max-w-full rounded-md border border-gray-700"
                />
              </div>,
              <div key="Enhanced God Mode-desc" className="my-2">
                Noticed the difficulty of the game R.E.P.O and decided to create
                a mod which allows for infinite upgrades, no-clip, god mode, and
                more. Had to learn C# and the Unity engine for this project
                while on spring break, and had a blast with it! The mod is
                sitting just over 35,000 downloads.
              </div>,
              <div key="Enhanced-link" className="mt-3">
                <a
                  href="https://thunderstore.io/c/repo/p/REPODEMON/EnhancedGodMode/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Project
                </a>
              </div>,
              <div key="back" className="mt-3">
                <button
                  onClick={goBack}
                  className="block text-yellow-400 hover:text-yellow-300"
                >
                  back <span className="text-gray-500">{"// go back"}</span>
                </button>
              </div>,
            ],
            "~/projects/enhanced-godmode"
          )
        }
      >
        enhanced-godmode
      </button>
    </div>,
    <div key="pyslots" className="ml-4">
      ├──{" "}
      <button
        className="text-blue-400 hover:text-blue-300 text-base"
        onClick={() =>
          handleCommand(
            "cd projects/pyslots && cat README.md",
            [
              "PySlots",
              "----------",
              <div key="PySlots-img" className="my-3">
                <img
                  src="/pyslots.png"
                  alt="PySlots Runtime"
                  className="max-w-full rounded-md border border-gray-700"
                />
              </div>,
              <div key="Pyslots-desc" className="my-2">
                This project was originally for my Introduction to Computer
                Science class and is written in Python. shortly after the
                semester ended I decided to revisit it. I added an ascii slot
                machine, colored text based on win/loss, and the ability to
                replay the game.
              </div>,
              <div key="Pyslots-link" className="mt-3">
                <a
                  href="https://github.com/Kellan-Stempin/PySlots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Project
                </a>
              </div>,
              <div key="back" className="mt-3">
                <button
                  onClick={goBack}
                  className="block text-yellow-400 hover:text-yellow-300"
                >
                  back <span className="text-gray-500">{"// go back"}</span>
                </button>
              </div>,
            ],
            "~/projects/pyslots"
          )
        }
      >
        pyslots
      </button>
    </div>,
    <div key="BlackJack" className="ml-4">
      └──{" "}
      <button
        className="text-blue-400 hover:text-blue-300 text-base"
        onClick={() =>
          handleCommand(
            "cd projects/Blackjack && cat README.md",
            [
              "PySlots",
              "----------",
              <div key="Blackjack-img" className="my-3">
                <img
                  src="/blackjack.png"
                  alt="blackjack Runtime"
                  className="max-w-full rounded-md border border-gray-700"
                />
              </div>,
              <div key="blackjack-desc" className="my-2">
                This project was written for my Interdisciplinary Computer
                Science class. Written in python we were instructed to create a
                game of blackjack, I decided to use ascii art for the cards. Had
                a lot of fun with this one as it seemed like I was finally able
                to put everything together confidently.
              </div>,
              <div key="blackjack-link" className="mt-3">
                <a
                  href="https://github.com/Kellan-Stempin/blackjack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Project
                </a>
              </div>,
              <div key="back" className="mt-3">
                <button
                  onClick={goBack}
                  className="block text-yellow-400 hover:text-yellow-300"
                >
                  back <span className="text-gray-500">{"// go back"}</span>
                </button>
              </div>,
            ],
            "~/projects/Blackjack"
          )
        }
      >
        Blackjack
      </button>
    </div>,
  ];

  // ─── CONTACT TREE ────────────────────────────────────────────────────────────
  const contactEntries = [
    "contact",
    <div key="email" className="ml-4">├── <button className="text-blue-400 hover:text-blue-300 text-base" onClick={() => window.location.href = "mailto:kstemp.work@gmail.com"}>email</button></div>,
    <div key="linkedin" className="ml-4">├── <button className="text-blue-400 hover:text-blue-300 text-base" onClick={() => window.open("https://www.linkedin.com/in/kellan-stempin-8a2424342/", "_blank")}>LinkedIn</button></div>,
    <div key="github" className="ml-4">└── <button className="text-blue-400 hover:text-blue-300 text-base" onClick={() => window.open("https://github.com/Kellan-Stempin", "_blank")}>GitHub</button></div>
  ];

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-gray-300 font-mono overflow-hidden">
      <Particles init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 py-10">
        <div className="w-full max-w-5xl bg-black border border-[#666] rounded-md shadow-lg text-base">
          <div className="flex justify-between items-center bg-[#2e2e2e] px-4 py-2 border-b border-gray-700 text-xs font-semibold text-white">
            <span>Terminal — bash</span>
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </div>
          <div className="text-white text-base relative">
            <div className="flex justify-between items-center min-h-[300px]">
              <div className="absolute top-5 left-5">
                <div className="text-green-400">&gt; <span className="text-white">Kellan Stempin //</span></div>
                <div className="mt-2 text-white">Computer Science & Cybersecurity Student</div>
              </div>
              <div className="w-2/3 p-5 flex flex-col justify-center h-full">
                <div className="mb-2 mt-12 text-gray-500">Click a command below:</div>
                <div className="space-y-2">
                  <button onClick={() => handleCommand("cd about_me && cat bio.txt", ["Hello! My name is Kellan Stempin, and I'm a sophomore level Computer Science student at the University of Montana. Computer Science is a subject that I find beyond intriguing and exciting to learn about, and I feel incredibly fortunate to be able to explore such a fascinating field in a place as gorgeous as Montana. Living here grants me the ability to exercise some of my biggest passions outside of my studies. I love to snowboard, fish, hike, and climb--and when I have down time I love to play music, mainly on guitar, anything from prog metal to classical.", <h1 key="notable" className="mt-4 text-green-400 font-semibold text-lg mb-2">Notable Projects</h1>, <div key="curricular" className="text-purple-400 font-semibold mt-2">Curricular</div>, <ul key="curricular-list" className="list-disc list-inside ml-4 space-y-2"><li>Python, HTML, CSS, and JavaScript</li></ul>, <div key="extracurricular" className="text-purple-400 font-semibold mt-4">Extracurricular</div>, <ul key="extracurricular-list" className="list-disc list-inside ml-4 space-y-2"><li>Collaborating with a friend on building a mod in C# with over 25 thousand downloads</li><li>Experimenting with reverse engineering with IDA in x86 Assembly</li><li>Creating this terminal website hosted on Vercel using React, TypeScript, and Tailwind CSS</li><li>Occasionally working through a textbook on C in hopes of learning a low-level language</li></ul>], "~/about_me")} className="block text-blue-400 hover:text-blue-300">about_me <span className="text-gray-500">{'// who am I?'}</span></button>
                  <button onClick={() => handleCommand("cd projects && ls", projectEntries, "~/projects")} className="block text-blue-400 hover:text-blue-300">projects <span className="text-gray-500">{'// what I’ve built'}</span></button>
                  <button onClick={() => handleCommand("cd goals && cat future.md", ["Work in progress", "----------"], "~/goals")} className="block text-blue-400 hover:text-blue-300">goals <span className="text-gray-500">{'// what I\'m aiming for'}</span></button>
                  <button onClick={() => handleCommand("cd contact && ls", contactEntries, "~/contact")} className="block text-blue-400 hover:text-blue-300">contact_me <span className="text-gray-500">{'// how to reach me'}</span></button>
                  <button onClick={goBack} className="block text-yellow-400 hover:text-yellow-300">back <span className="text-gray-500">{'// go back'}</span></button>
                </div>
              </div>
              <div className="hidden md:block w-1/3 p-5 text-gray-400 font-mono text-base whitespace-pre leading-none -translate-x-28">
                {asciiArt.map((line, i) => <div key={i}>{line}</div>)}
              </div>
            </div>
            <hr className="mx-5 border-t border-gray-700 -mt-6" />
            <div className="px-5 pt-4 pb-5">
              {terminalOutput.map((entry, i) => {
                const [userPrompt, pathPrompt] = entry.prompt.split(":");
                return (
                  <div key={i} className="mb-4">
                    <div>
                      <span className="text-green-400">{userPrompt}:</span><span className="text-purple-400">{pathPrompt}</span><span className="text-purple-400">$</span> <span className="text-green-300">{entry.command}</span>
                    </div>
                    {entry.output && entry.output.length > 0 && (
                      <div className="mt-2 rounded border border-gray-700 bg-[#111] p-4 text-gray-300">
                        {entry.output.map((line, j) => <div key={j}>{line}</div>)}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="mt-4 h-6 leading-6 flex items-center">
                <span className="text-green-400">kellan@portfolio</span>:<span className="text-purple-400">{currentPath}</span><span className="text-purple-400">$</span> <span className="text-green-400">{commandInput}</span>{cursorVisible && <span className="text-green-400 ml-1">█</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

