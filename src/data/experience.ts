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
    company: "Northlight AI",
    title: "Senior ML Engineer",
    period: "2024 — present",
    location: "Remote",
    outcomes: [
      "Led retrieval + evaluation for the flagship enterprise assistant.",
      "Reduced hallucination rate 54% via hybrid retrieval + judge alignment.",
      "Mentored two engineers into first-owner roles.",
    ],
    stack: ["PyTorch", "vLLM", "Rust", "DuckDB"],
  },
  {
    company: "Meridian Labs",
    title: "ML Engineer",
    period: "2022 — 2024",
    location: "Bengaluru",
    outcomes: [
      "Shipped a real-time CV pipeline serving 220 cameras with 99.9% uptime.",
      "Co-authored two papers on efficient retrieval.",
    ],
    stack: ["PyTorch", "TensorRT", "Go"],
  },
  {
    company: "Ferrite Robotics",
    title: "ML Engineer, Intern → Full-time",
    period: "2020 — 2022",
    location: "Hyderabad",
    outcomes: [
      "Built the first on-device inference pipeline for a wearable sensor product.",
      "Owned the eval harness that became the team standard.",
    ],
    stack: ["PyTorch", "Core ML", "Swift"],
  },
];
