import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: `${profile.name} — Resume` },
      { name: "description", content: `${profile.name}, ${profile.role}. Resume and experience.` },
    ],
  }),
});
