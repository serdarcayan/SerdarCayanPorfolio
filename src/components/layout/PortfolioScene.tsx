import { useCallback, useEffect, useRef, useState } from "react";
import Indicator from "./Indicator";
import { sections } from "../../data/sections";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import ExperiencesSection from "../sections/ExperiencesSection";
import ContactSection from "../sections/ContactSection";
import { ChevronDown, ChevronUp } from "lucide-react";
import DataSection from "../sections/DataSection";
import CircularCanvasGrid from "./bgCanvas";

const PortfolioScene = () => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const sectionStackRef = useRef<HTMLDivElement>(null);

  const handleSectionSelect = useCallback((index: number) => {
    const stack = sectionStackRef.current;
    const targetSection = stack?.children[index];

    if (!stack || !(targetSection instanceof HTMLElement)) return;

    setSectionIndex(index);
    stack.scrollTo({
      top:
        stack.scrollTop +
        targetSection.getBoundingClientRect().top -
        stack.getBoundingClientRect().top,
      behavior: "smooth",
    });
  }, []);

  // Scroll konumundan aktif section'ı takip et.
  useEffect(() => {
    const stack = sectionStackRef.current;

    if (!stack) return;

    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;

      const stackCenter =
        stack.getBoundingClientRect().top + stack.clientHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(stack.children).forEach((section, index) => {
        const sectionElement = section as HTMLElement;
        const sectionCenter =
          sectionElement.getBoundingClientRect().top +
          sectionElement.getBoundingClientRect().height / 2;
        const distance = Math.abs(sectionCenter - stackCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setSectionIndex(closestIndex);
    };

    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    scheduleUpdate();
    stack.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      stack.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <main className="relative w-dvw h-dvh overflow-hidden">
      <div className="absolute inset-0 overflow-hidden background-gradient pointer-events-none">
        {/* Top-right chrome rings */}
        <div className="absolute -right-20 -top-24 size-72 rounded-full border border-[#d2d2d7] shadow-[0_0_0_1px_rgba(148,163,184,0.06),inset_0_0_24px_rgba(255,255,255,0.08)]" />

        <div className="absolute -right-12 -top-16 size-56 rounded-full border-[3px] border-[#d2d2d7] shadow-[0_0_18px_rgba(255,255,255,0.08)]" />

        <div className="absolute -right-4 -top-8 size-40 rounded-full border border-slate-500/10" />

        <CircularCanvasGrid/>

        {/* Bottom-left soft rings */}
        <div className="absolute -bottom-24 -left-20 size-64 rounded-full border border-[#d2d2d7] shadow-[0_0_0_1px_rgba(148,163,184,0.06)]" />

        <div className="absolute -bottom-16 -left-12 size-48 rounded-full border-[3px] border-[#d2d2d7]" />

        <div className="absolute -bottom-8 -left-4 size-32 rounded-full border border-slate-500/10" />
      </div>

      <div
        ref={sectionStackRef}
        className="section-stack relative h-full snap-y snap-mandatory overflow-y-auto overscroll-y-none *:scrollbar-thin *:scrollbar-thumb-gray-700/50 *:scrollbar-track-gray-900/50 *:bg-transparent"
      >
        <HomeSection onSectionSelect={handleSectionSelect} />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />

        <ExperiencesSection />

        <ContactSection />

        <DataSection />
        {/* Backend API servisi ile erişime açılacak. */}
      </div>

      <Indicator
        sectionIndex={sectionIndex}
        tabs={sections}
        onSectionSelect={handleSectionSelect}
      />

      <div className="absolute bottom-4 right-3 md:right-1/2 md:translate-x-1/2">
        {sectionIndex < sections.length - 1 ? (
          <button
            className="cursor-pointer animate-pulse rounded-full bg-[#0071e3] p-2 text-white shadow-md shadow-black/10 transition hover:scale-110 hover:bg-[#0066cc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]/40"
            onClick={() => handleSectionSelect(sectionIndex + 1)}
            aria-label="Next section"
          >
            <ChevronDown size={24} strokeWidth={1.5} />
          </button>
        ) : (
          <button
            className="cursor-pointer rounded-full bg-[#0071e3] p-2 text-white shadow-md shadow-black/10 transition hover:scale-110 hover:bg-[#0066cc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]/40"
            onClick={() => handleSectionSelect(0)}
            aria-label="Back to top"
          >
            <ChevronUp size={24} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </main>
  );
};

export default PortfolioScene;
