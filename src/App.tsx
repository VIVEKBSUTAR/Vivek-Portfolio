import { useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { CaseStudy } from "./pages/CaseStudy";
import { ResearchStudy } from "./pages/ResearchStudy";
import { Resume } from "./pages/Resume";

function parseRoute(hash: string) {
  const cleanHash = hash.startsWith("#") ? hash.slice(1) : hash;
  
  if (cleanHash === "resume") {
    return { page: "resume", slug: null };
  }
  if (cleanHash.startsWith("work/")) {
    return { page: "case-study", slug: cleanHash.split("/")[1] || null };
  }
  if (cleanHash.startsWith("research/")) {
    return { page: "research", slug: cleanHash.split("/")[1] || null };
  }
  return { page: "home", slug: cleanHash || null };
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseRoute(window.location.hash);
      setRoute(parsed);

      if (parsed.page !== "home") {
        // Scroll to top when opening a subpage
        window.scrollTo(0, 0);
      } else if (!parsed.slug) {
        // Scroll to top on root home route
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  switch (route.page) {
    case "resume":
      return <Resume />;
    case "case-study":
      return <CaseStudy slug={route.slug || ""} />;
    case "research":
      return <ResearchStudy slug={route.slug || ""} />;
    case "home":
    default:
      return <Home />;
  }
}
