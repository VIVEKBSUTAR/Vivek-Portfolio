import { TopBar } from "@/components/nav/TopBar";
import { SectionIndicators } from "@/components/nav/SectionIndicators";
import { Footer } from "@/components/nav/Footer";
import { AmbientEnvironment } from "@/components/motion/AmbientEnvironment";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Research } from "@/sections/Research";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";

export function Home() {
  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <AmbientEnvironment />
      <TopBar />
      <SectionIndicators />
      <main>
        <Hero />
        <About />
        <Projects />
        <Research />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
