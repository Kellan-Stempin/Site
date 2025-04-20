// page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function Home() {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [commandInput, setCommandInput] = useState("");
  const [currentPath, setCurrentPath] = useState("~");
  const [terminalOutput, setTerminalOutput] = useState<{ prompt: string; command?: string; output?: (string | JSX.Element)[] }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [pathHistory, setPathHistory] = useState<string[]>([]);

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
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleCommand = (
    command: string,
    output: (string | JSX.Element)[],
    newPath: string
  ) => {
    setTerminalOutput([]);
    setIsTyping(true);
    setCommandInput("");
    let i = 0;
    let typed = "";
    const interval = setInterval(() => {
      typed += command[i];
      setCommandInput(typed);
      i++;
      if (i >= command.length) {
        clearInterval(interval);
        setTimeout(() => {
          setTerminalOutput(prev => [
            ...prev,
            { prompt: `kellan@portfolio:${currentPath}`, command, output }
          ]);
          setCurrentPath(newPath);
          setPathHistory(prev => [...prev, newPath]);
          setCommandInput("");
          setIsTyping(false);
        }, 300);
      }
    }, 50);
  };

  const goHome = () => {
    handleCommand("cd ~", [], "~");
    setPathHistory([]);
  };

    const goBack = () => {
    // Compute parent path by trimming last segment
    let parentPath: string;
    if (currentPath === "~") {
      parentPath = "~";
    } else {
      const parts = currentPath.split("/");
      parts.pop();
      parentPath = parts.length > 1 ? parts.join("/") : "~";
    }
    // Show project tree again if returning to projects
    const output = parentPath === "~/projects" ? projectEntries : [];
    handleCommand("cd ..", output, parentPath);
  };

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: "#0d0d0d" },
    particles: {
      number: { value: 60 },
      color: { value: "#d1d5db" },
      size: { value: 1.4 },
      move: { enable: true, speed: 0.25 },
      links: { enable: true, color: "#4b5563", distance: 100, opacity: 0.15 },
    },
  };

  const projectEntries = [
    "projects",
    <div key="portfolio" className="ml-4">├── <button className="text-blue-400 hover:underline" onClick={() =>
      handleCommand("cd projects/portfolio-website && cat README.md", [
        "This is a placeholder for portfolio-website"
      ], "~/projects/portfolio-website")}>portfolio-website</button></div>,
    <div key="canvas" className="ml-4">├── <button className="text-blue-400 hover:underline" onClick={() =>
      handleCommand("cd projects/canvas-scraper && cat README.md", [
        "This is a placeholder for canvas-scraper"
      ], "~/projects/canvas-scraper")}>canvas-scraper</button></div>,
    <div key="godmode" className="ml-4">├── <button className="text-blue-400 hover:underline" onClick={() =>
      handleCommand("cd projects/godmode-mod.py && cat README.md", [
        "This is a placeholder for godmode-mod.py"
      ], "~/projects/godmode-mod.py")}>godmode-mod.py</button></div>,
    <div key="optimizer" className="ml-4">└── <button className="text-blue-400 hover:underline" onClick={() =>
      handleCommand("cd projects/power-optimizer.sh && cat README.md", [
        "This is a placeholder for power-optimizer.sh"
      ], "~/projects/power-optimizer.sh")}>power-optimizer.sh</button></div>
  ];

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-gray-300 font-mono overflow-hidden">
      <Particles init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 py-10">
        <div className="w-full max-w-5xl bg-black border border-[#666] rounded-md shadow-lg text-sm">
          <div className="flex justify-between items-center bg-[#2e2e2e] px-4 py-2 border-b border-gray-700 text-xs font-semibold text-white">
            <span>Terminal — bash</span>
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </div>
          <div className="text-white text-sm relative">
            <div className="flex justify-between items-center min-h-[300px]">
              <div className="absolute top-5 left-5">
                <div className="text-green-400">&gt; <span className="text-white">Kellan Stempin //</span></div>
                <div className="mt-2 text-white">Computer Science & Cybersecurity Student</div>
              </div>
              <div className="w-2/3 p-5 flex flex-col justify-center h-full">
                <div className="mb-2 mt-12 text-gray-500">Click a command below:</div>
                <div className="space-y-2">
                  <button onClick={() => handleCommand("cd about_me && cat bio.txt", [
                    "I'm Kellan Stempin, a Computer Science and Cybersecurity student at the University of Montana.",
                    "I enjoy building sleek tools and hacking things (ethically, of course)."
                  ], "~/about_me")} className="block text-blue-400 hover:underline">
                    about_me <span className="text-gray-500">// who am I?</span>
                  </button>
                  <button onClick={() => handleCommand("cd projects && ls", projectEntries, "~/projects")} className="block text-blue-400 hover:underline">
                    projects <span className="text-gray-500">// what I’ve built</span>
                  </button>
                  <button onClick={() => handleCommand("cd goals && cat future.md", [
                    "I’m aiming for impactful work in cybersecurity and software engineering."
                  ], "~/goals")} className="block text-blue-400 hover:underline">
                    goals <span className="text-gray-500">// what I’m aiming for</span>
                  </button>
                  <button onClick={() => handleCommand("cd contact && cat contact.md", [
                    "Email: kellanstempin10@gmail.com",
                    "LinkedIn: linkedin.com/in/kellan-stempin/"
                  ], "~/contact")} className="block text-blue-400 hover:underline">
                    contact_me <span className="text-gray-500">// how to reach me</span>
                  </button>
                  {currentPath !== "~" && (
                    <>
                      <button onClick={goBack} className="block text-yellow-400 hover:underline">
                        back <span className="text-gray-500">// go back</span>
                      </button>
                      <button onClick={goHome} className="block text-red-500 hover:underline">
                        home <span className="text-gray-500">// go home</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden md:block w-1/3 p-5 text-gray-400 font-mono text-sm whitespace-pre leading-none -translate-x-28">
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
                      <span className="text-green-400">{userPrompt}:</span><span className="text-purple-400">{pathPrompt}</span><span className="text-purple-400">$</span>{" "}
                      <span className="text-green-300">{entry.command}</span>
                    </div>
                    {entry.output && entry.output.length > 0 && (
                      <div className="mt-2 rounded border border-gray-700 bg-[#111] p-4 text-gray-300">
                        <div className="mb-2 text-gray-500">&gt; Output</div>
                        {entry.output.map((line, j) => <div key={j}>{line}</div>)}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="mt-4">
                <span className="text-green-400">kellan@portfolio</span>:<span className="text-purple-400">{currentPath}</span>$ <span className="text-green-400">{commandInput}</span>{cursorVisible && <span className="text-white">█</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
