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
    slug: "sparse-attention-long-context",
    title: "Learned sparse attention for million-token contexts",
    venue: "Workshop on Efficient ML",
    year: "2025",
    abstract:
      "We propose a routing objective that learns which heads to keep dense and which to sparsify, holding perplexity within 0.3 of dense baselines at 4× throughput.",
  },
  {
    slug: "eval-drift",
    title: "Detecting silent evaluation drift in LLM pipelines",
    venue: "arXiv preprint",
    year: "2024",
    abstract:
      "A lightweight statistical test that flags eval-set contamination and judge drift before a regression hits production.",
  },
  {
    slug: "contrastive-fusion",
    title: "Contrastive fusion for hybrid retrieval",
    venue: "SIGIR short paper",
    year: "2024",
    abstract:
      "A training objective that unifies BM25 and dense retrievers under a shared score, without a separate reranker pass.",
  },
  {
    slug: "wearable-quantization",
    title: "Wearable-scale quantization-aware training",
    venue: "Practitioner report",
    year: "2023",
    abstract:
      "Notes on the practical tricks that make 4-bit inference tolerable on ARM cores with tight memory budgets.",
  },
];
