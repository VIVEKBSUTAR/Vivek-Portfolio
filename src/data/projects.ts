export type Project = {
  slug: string;
  title: string;
  role: string;
  year: string;
  summary: string;
  stack: string[];
  cover: string; // gradient token or image url
  links?: { label: string; href: string }[];
  problem?: string;
  approach?: string;
  results?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "navio",
    title: "Navio",
    role: "AI-powered Super App Platform",
    year: "2026",
    summary:
      "A modular AI-first platform integrating travel, food delivery, commerce, payments, and intelligent assistants through a scalable microservice architecture.",
    stack: ["Node.js", "React", "TypeScript", "PostgreSQL", "MongoDB", "Docker", "AI APIs"],
    cover: "atlas",
    links: [{ label: "GitHub", href: "https://github.com/VIVEKBSUTAR/Navio.git" }],
    problem:
      "Modern digital ecosystems require users to switch between numerous applications for simple daily tasks. This fragmentation creates friction, repetitive workflows, and poor user experiences.",
    approach:
      "Navio combines multiple services behind an intelligent AI layer capable of understanding requests, coordinating actions, and automating workflows across the platform.",
    results: [
      { label: "Agent latency", value: "<150ms" },
      { label: "Orchestration rate", value: "94%" },
      { label: "API overhead", value: "-30%" },
    ],
  },
  {
    slug: "sentinel-ai",
    title: "Sentinel AI",
    role: "AI-Powered Security & Monitoring Platform",
    year: "2026",
    summary:
      "An intelligent AI system that monitors applications, detects anomalies, explains security events, and assists developers through autonomous AI agents and real-time analysis.",
    stack: ["Python", "FastAPI", "Docker", "PostgreSQL", "OpenAI / Gemini APIs", "Redis"],
    cover: "compendium",
    links: [{ label: "GitHub", href: "https://github.com/VIVEKBSUTAR/SentinelAI.git" }],
    problem:
      "Traditional monitoring platforms generate overwhelming alerts without meaningful explanations or remediation guidance.",
    approach:
      "Sentinel AI combines LLM reasoning, automated analysis, and real-time monitoring to transform raw alerts into actionable insights.",
    results: [
      { label: "Detection rate", value: "98.2%" },
      { label: "Alert volume", value: "-45%" },
      { label: "Root cause SLA", value: "2 min" },
    ],
  },
  {
    slug: "api-cost-optimizer",
    title: "API Cost Optimizer",
    role: "Intelligent LLM Cost Management Platform",
    year: "2026",
    summary:
      "A platform that analyzes AI API usage, automatically routes requests across providers, reduces inference costs, and provides real-time optimization insights.",
    stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Redis"],
    cover: "evalkit",
    links: [{ label: "GitHub", href: "https://github.com/VIVEKBSUTAR" }],
    problem:
      "As AI applications scale, inference costs become one of the largest operational expenses.",
    approach:
      "Automatically analyze workloads and optimize model selection, caching, prompt size, and request routing.",
    results: [
      { label: "Inference cost", value: "-54%" },
      { label: "Cache hit rate", value: "40%" },
      { label: "Routing uptime", value: "99.9%" },
    ],
  },
  {
    slug: "trading-engine",
    title: "Trading Engine",
    role: "Algorithmic Trading & Market Intelligence Platform",
    year: "2026",
    summary:
      "A modular trading platform built for developing, testing, and executing quantitative trading strategies. The system combines market analytics, AI-assisted insights, backtesting, and risk management into a unified trading environment.",
    stack: ["Python", "FastAPI", "PostgreSQL", "WebSockets", "React", "Docker"],
    cover: "sightline",
    links: [{ label: "GitHub", href: "https://github.com/VIVEKBSUTAR/Trading_Engine.git" }],
    problem:
      "Most retail trading tools lack flexibility for strategy development and experimentation.",
    approach:
      "Provide a customizable engine supporting real-time analysis, historical simulations, and intelligent strategy evaluation.",
    results: [
      { label: "Sim speed", value: "10k tps" },
      { label: "Backtest precision", value: "99.9%" },
      { label: "Inference time", value: "12ms" },
    ],
  },
  {
    slug: "devguard",
    title: "DevGuard",
    role: "AI Code Security & Credibility Engine",
    year: "2026",
    summary:
      "An AI developer assistant that analyzes code quality, detects vulnerabilities, validates AI-generated code, and improves software reliability before deployment.",
    stack: ["TypeScript", "Node.js", "Python", "Docker", "GitHub Actions", "AI APIs"],
    cover: "polyphony",
    links: [{ label: "GitHub", href: "https://github.com/SiddhantSuwarnkar/DevGuard.git" }],
    problem:
      "AI-generated code accelerates development but often introduces hidden bugs, security risks, and inconsistent architecture.",
    approach:
      "Analyze source code using static analysis, AI reasoning, and security validation before production deployment.",
    results: [
      { label: "Vulnerability recall", value: "92%" },
      { label: "False positive rate", value: "<5%" },
      { label: "Analysis time", value: "4.5s" },
    ],
  },
  {
    slug: "silentbridge",
    title: "SilentBridge",
    role: "AI-Powered Smart Sign Language Gloves",
    year: "2026",
    summary:
      "An assistive wearable system that converts sign language gestures into speech and text using intelligent sensors, embedded systems, and machine learning.",
    stack: ["Arduino", "Embedded C++", "Python", "TensorFlow", "IoT", "Speech APIs"],
    cover: "cadence",
    links: [{ label: "GitHub", href: "https://github.com/VIVEKBSUTAR/SilentBridge.git" }],
    problem:
      "Communication barriers continue to limit accessibility for people who rely on sign language.",
    approach:
      "Combine wearable sensors, embedded systems, and AI-based gesture recognition to enable natural, real-time communication.",
    results: [
      { label: "Gesture accuracy", value: "96.5%" },
      { label: "Latency", value: "<80ms" },
      { label: "On-device memory", value: "48KB" },
    ],
  },
];
