export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  outcomes: string[];
  stack?: string[];
};

export const experience: Role[] = [
  {
    company: "Artificial Intelligence & Machine Learning Engineering",
    title: "Independent Projects & Research",
    period: "2025 — Present",
    location: "Self-Driven",
    outcomes: [
      "Developing production-oriented AI applications and developer tools.",
      "Building end-to-end systems using Python, TypeScript, React, Node.js, and FastAPI.",
      "Researching autonomous AI agents, intelligent workflows, and scalable AI architectures.",
      "Continuously experimenting with modern LLM frameworks and AI integrations.",
    ],
    stack: ["Python", "TypeScript", "React", "Node.js", "FastAPI", "LLMs", "AI Agents"],
  },
  {
    company: "Major Engineering Projects",
    title: "Academic & Personal Projects",
    period: "2025 — Present",
    location: "Pune, India",
    outcomes: [
      "Leading the design and development of ambitious software systems ranging from AI platforms to embedded AI solutions.",
      "Designed and delivered Navio, Sentinel AI, API Cost Optimizer, Trading Engine, DevGuard, and SilentBridge.",
    ],
    stack: ["System Architecture", "Backend Engineering", "AI Integration", "Full Stack Development", "Product Design"],
  },
  {
    company: "ISRO Route Resilience Challenge",
    title: "National Hackathon",
    period: "2025",
    location: "India",
    outcomes: [
      "Worked on intelligent transportation network analysis using graph algorithms and AI-assisted infrastructure planning.",
      "Performed network resilience analysis and critical node detection to map out route optimization strategies.",
    ],
    stack: ["Python", "Graph Theory", "Network Analysis", "AI"],
  },
  {
    company: "Open Source & Continuous Learning",
    title: "Self-Driven Engineering",
    period: "2024 — Present",
    location: "Global",
    outcomes: [
      "Actively learning modern AI technologies while building real-world projects, participating in hackathons, and exploring emerging AI systems.",
      "Exploring AI Agents, LLM Applications, Intelligent Automation, Developer Tools, AI Infrastructure, and Software Architecture.",
    ],
    stack: ["Git", "GitHub", "Docker", "REST APIs", "Cloud APIs", "Modern AI Frameworks"],
  },
];
