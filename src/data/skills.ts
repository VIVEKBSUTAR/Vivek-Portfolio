// Skills constellation — each skill lists the projects (by slug) that prove it.
export type SkillNode = {
  name: string;
  group: "modeling" | "systems" | "product" | "research";
  projects: string[]; // project slugs
};

export const skills: SkillNode[] = [
  // AI Engineering (modeling)
  { name: "Large Language Models", group: "modeling", projects: ["sentinel-ai", "api-cost-optimizer", "navio"] },
  { name: "AI Agents", group: "modeling", projects: ["navio", "sentinel-ai"] },
  { name: "Agentic Workflows", group: "modeling", projects: ["navio", "sentinel-ai"] },
  { name: "Retrieval-Augmented Generation", group: "modeling", projects: ["sentinel-ai", "api-cost-optimizer"] },
  { name: "Prompt Engineering", group: "modeling", projects: ["api-cost-optimizer", "sentinel-ai"] },
  { name: "Model Evaluation", group: "modeling", projects: ["devguard", "sentinel-ai"] },
  { name: "Vector Databases", group: "modeling", projects: ["navio", "api-cost-optimizer"] },

  // Software Development (product)
  { name: "Python", group: "product", projects: ["sentinel-ai", "api-cost-optimizer", "trading-engine", "devguard", "silentbridge"] },
  { name: "Node.js", group: "product", projects: ["navio", "devguard"] },
  { name: "TypeScript", group: "product", projects: ["navio", "devguard", "api-cost-optimizer"] },
  { name: "React", group: "product", projects: ["navio", "api-cost-optimizer", "trading-engine"] },
  { name: "Next.js", group: "product", projects: ["api-cost-optimizer"] },
  { name: "FastAPI", group: "product", projects: ["sentinel-ai", "api-cost-optimizer", "trading-engine"] },

  // Data & Infrastructure (systems)
  { name: "PostgreSQL", group: "systems", projects: ["navio", "sentinel-ai", "api-cost-optimizer", "trading-engine"] },
  { name: "MongoDB", group: "systems", projects: ["navio"] },
  { name: "Redis", group: "systems", projects: ["sentinel-ai", "api-cost-optimizer"] },
  { name: "Docker", group: "systems", projects: ["navio", "sentinel-ai", "trading-engine", "devguard"] },
  { name: "Git", group: "systems", projects: ["navio", "sentinel-ai", "trading-engine", "devguard", "silentbridge"] },

  // Engineering (research)
  { name: "System Design", group: "research", projects: ["navio", "trading-engine", "devguard", "sentinel-ai"] },
  { name: "Software Architecture", group: "research", projects: ["navio", "sentinel-ai", "devguard"] },
  { name: "API Development", group: "research", projects: ["navio", "sentinel-ai", "api-cost-optimizer", "trading-engine"] },
  { name: "Cloud Integrations", group: "research", projects: ["navio", "sentinel-ai"] },
  { name: "AI Automation", group: "research", projects: ["navio", "sentinel-ai", "devguard"] },
  { name: "Technical Research", group: "research", projects: ["silentbridge", "navio"] },
];
