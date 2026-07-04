// Skills constellation — each skill lists the projects (by slug) that prove it.
export type SkillNode = {
  name: string;
  group: "modeling" | "systems" | "product" | "research";
  projects: string[]; // project slugs
};

export const skills: SkillNode[] = [
  { name: "PyTorch", group: "modeling", projects: ["retrieval-atlas", "neural-compendium", "sightline", "cadence"] },
  { name: "LLM systems", group: "modeling", projects: ["retrieval-atlas", "evalkit", "neural-compendium"] },
  { name: "Retrieval / RAG", group: "modeling", projects: ["retrieval-atlas", "polyphony"] },
  { name: "Computer vision", group: "modeling", projects: ["sightline", "polyphony"] },
  { name: "Quantization", group: "modeling", projects: ["cadence"] },
  { name: "Distributed inference", group: "systems", projects: ["retrieval-atlas", "sightline"] },
  { name: "Rust / Go", group: "systems", projects: ["retrieval-atlas", "sightline"] },
  { name: "Evaluation infra", group: "systems", projects: ["evalkit", "retrieval-atlas"] },
  { name: "TypeScript / React", group: "product", projects: ["neural-compendium", "evalkit"] },
  { name: "WebGPU", group: "product", projects: ["neural-compendium"] },
  { name: "Applied research", group: "research", projects: ["retrieval-atlas", "cadence"] },
  { name: "Paper writing", group: "research", projects: [] },
];
