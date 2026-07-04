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
    slug: "retrieval-atlas",
    title: "Retrieval Atlas",
    role: "Hybrid retrieval system for long-context LLM agents",
    year: "2025",
    summary:
      "A hybrid sparse–dense retrieval layer that halved hallucinations on an enterprise assistant serving 40k daily users.",
    stack: ["Python", "PyTorch", "Qdrant", "vLLM", "Rust"],
    cover: "atlas",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Write-up", href: "#" },
    ],
    problem:
      "Long-context agents were confidently answering from stale or unrelated chunks. Existing dense-only retrieval missed exact identifiers; sparse-only missed paraphrase.",
    approach:
      "Reranker cascade with a BM25 first pass, contrastive dense fusion, and a small distilled cross-encoder for the top-k. Everything wrapped in an offline eval harness with drift alarms.",
    results: [
      { label: "Hallucination rate", value: "−54%" },
      { label: "P95 latency", value: "180ms" },
      { label: "Recall@10", value: "0.92" },
    ],
  },
  {
    slug: "neural-compendium",
    title: "Neural Compendium",
    role: "Interactive explainer for transformer internals",
    year: "2025",
    summary:
      "A learning surface that lets you scrub through attention heads and see representations shift, live.",
    stack: ["TypeScript", "WebGPU", "React", "PyTorch"],
    cover: "compendium",
    links: [{ label: "Live demo", href: "#" }, { label: "GitHub", href: "https://github.com" }],
  },
  {
    slug: "evalkit",
    title: "EvalKit",
    role: "Evaluation harness for LLM applications",
    year: "2024",
    summary:
      "Deterministic + LLM-judge evaluations, versioned datasets, and CI gates. Used across three teams.",
    stack: ["Python", "DuckDB", "OpenTelemetry", "Modal"],
    cover: "evalkit",
    links: [{ label: "GitHub", href: "https://github.com" }],
  },
  {
    slug: "sightline",
    title: "Sightline",
    role: "Real-time computer vision for warehouse safety",
    year: "2024",
    summary:
      "YOLO-based edge inference on 220 cameras, reduced near-miss incidents 38% in the first quarter.",
    stack: ["PyTorch", "ONNX", "TensorRT", "Go", "Kafka"],
    cover: "sightline",
  },
  {
    slug: "polyphony",
    title: "Polyphony",
    role: "Multi-modal search over research paper corpora",
    year: "2023",
    summary:
      "Joint text + figure embeddings that let you search a corpus by sketch, equation, or prose.",
    stack: ["CLIP", "FAISS", "FastAPI", "SvelteKit"],
    cover: "polyphony",
  },
  {
    slug: "cadence",
    title: "Cadence",
    role: "On-device inference for wearables",
    year: "2023",
    summary:
      "Compressed a 350M-param model to 42M with quantization-aware training, ran at 30 Hz on-device.",
    stack: ["PyTorch", "Core ML", "Swift", "C++"],
    cover: "cadence",
  },
];
