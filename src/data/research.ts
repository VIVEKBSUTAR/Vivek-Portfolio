export type ResearchEntry = {
  slug: string;
  title: string;
  venue: string;
  year: string;
  abstract: string;
  href?: string;
};

export const research: ResearchEntry[] = [
  {
    slug: "agent-architectures",
    title: "AI Agent Architectures for Autonomous Software Systems",
    venue: "Independent Research",
    year: "2026",
    abstract:
      "Exploring how autonomous AI agents can plan, reason, use external tools, maintain long-term memory, and collaborate to solve complex real-world tasks. This research investigates multi-agent orchestration, context management, memory systems, and reliable agent execution for production environments.",
  },
  {
    slug: "self-healing-software",
    title: "Self-Healing Software Systems",
    venue: "Major Project Research",
    year: "2026",
    abstract:
      "Investigating intelligent software capable of detecting failures, diagnosing root causes, and autonomously recovering without human intervention. The research combines AI agents, observability, system monitoring, anomaly detection, and automated remediation to improve reliability and reduce operational downtime.",
  },
  {
    slug: "graph-intelligence",
    title: "Graph Intelligence for Urban Route Resilience",
    venue: "ISRO Hackathon Research",
    year: "2026",
    abstract:
      "Research focused on analyzing transportation networks using graph algorithms and network science to identify critical infrastructure nodes and improve urban resilience. The work explores concepts such as betweenness centrality, route optimization, failure simulation, and AI-assisted infrastructure planning to support resilient smart city transportation systems.",
  },
  {
    slug: "llm-cost-optimization",
    title: "AI Infrastructure & LLM Cost Optimization",
    venue: "Independent Research",
    year: "2026",
    abstract:
      "Exploring techniques to reduce the operational cost of deploying large language models without compromising response quality. Research areas include intelligent model routing, prompt optimization, semantic caching, token efficiency, provider selection, and adaptive inference strategies across multiple AI platforms.",
  },
  {
    slug: "wearable-ai-accessibility",
    title: "Intelligent Accessibility through Wearable AI",
    venue: "Embedded AI Research",
    year: "2025",
    abstract:
      "Researching wearable systems that translate sign language into natural speech and text using sensor fusion, embedded hardware, and machine learning. The work investigates gesture recognition, real-time inference, embedded optimization, and human-centered design for assistive technologies.",
  },
  {
    slug: "ai-developer-tools",
    title: "AI Developer Tools & Intelligent Software Engineering",
    venue: "Personal Research",
    year: "2025",
    abstract:
      "Exploring how AI can enhance the software development lifecycle through intelligent code analysis, automated debugging, security validation, documentation generation, and autonomous development assistants. Current investigations include AI code credibility analysis, developer copilots, autonomous debugging workflows, and software quality evaluation systems.",
  },
];
