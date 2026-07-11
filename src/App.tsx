import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { CaseStudy } from "./pages/CaseStudy";
import { ResearchStudy } from "./pages/ResearchStudy";
import { Resume } from "./pages/Resume";

function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 text-center">
      <div className="max-w-md">
        <div className="eyebrow mb-4">404</div>
        <h1 className="font-display text-4xl tracking-tight text-fg">
          This corner is empty.
        </h1>
        <p className="mt-3 text-sm text-fg-muted">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-0.5"
          >
            Return home
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/research/:slug" element={<ResearchStudy />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
