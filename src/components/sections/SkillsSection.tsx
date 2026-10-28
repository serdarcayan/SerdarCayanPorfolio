import { useState } from "react";
import { buildSteps } from "../../data/buildSteps";
import { skillCategories } from "../../data/skills";
import SectionTemplate from "../layout/SectionTemplate";
import { Plus } from "lucide-react";
import { techStacks } from "../../data/techStack";

const formatItemIndex = (value: number | string | undefined) =>
  String((Number(value) || 0) + 1).padStart(2, "0");

const SkillsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

  return (
    <SectionTemplate
      hasHeader={true}
      hasJourney={true}
      sectionTitle={"Yetenekler"}
      smallText={"UZMANLIK"}
      journey={skillCategories.length}
    >
      <div className="flex w-full flex-col gap-7 sm:gap-9">
        <section className="w-full">
          <p className="mb-4 max-w-xl border-l-2 border-[#0071e3]/50 pl-3 text-xs leading-relaxed text-[#6e6e73] sm:mb-5 sm:text-sm">
            Elektronik, gömülü sistemler ve yazılım geliştirme alanındaki temel
            yetkinliklerim.
          </p>

          <div className="mx-auto flex w-full flex-col divide-y divide-[#d2d2d7] border-y border-[#d2d2d7]">
            {skillCategories.map((category, index) => (
              <SkillsCard
                key={category.title}
                category={category}
                index={index}
                isOpen={expandedIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </section>

        <section className="border-t border-[#d2d2d7] pt-6 sm:pt-8">
          <header className="mb-4 sm:mb-5">
            <p className="mb-1.5 text-[9px] font-semibold tracking-[0.2em] text-[#0071e3] sm:text-[10px]">
              TEKNOLOJİLER / 02
            </p>
            <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f] sm:text-2xl">
              Teknoloji yığını<span className="text-[#6e6e73]">.</span>
            </h3>
            <p className="mt-1 text-xs text-[#6e6e73] sm:text-sm">
              Çalıştığım teknolojiler ve araçlar.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {techStacks.map((stack, index) => (
              <article
                key={stack.title}
                className="min-w-0 rounded-xl border border-[#d2d2d7] bg-white/70 hover:bg-white/90 p-3 transition-colors hover:border-[#d2d2d7] sm:rounded-2xl sm:p-4"
              >
                <header className="mb-3 flex items-center justify-between gap-2">
                  <h4 className="text-[9px] font-bold tracking-[0.12em] text-[#0071e3] sm:text-[10px]">
                    {stack.title}
                  </h4>
                  <span className="shrink-0 font-mono text-[9px] text-[#6e6e73]">
                    {formatItemIndex(index)}
                  </span>
                </header>

                <div className="flex flex-wrap gap-1.5">
                  {stack.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md bg-[#0071e3]/10 px-2 py-1 text-[10px] font-medium leading-snug text-[#0071e3] sm:text-[11px]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-[#d2d2d7] pt-6 sm:pt-8">
          <header className="mb-4 sm:mb-5">
            <p className="mb-1.5 text-[9px] font-semibold tracking-[0.2em] text-[#0071e3] sm:text-[10px]">
              ÇALIŞMA YÖNTEMİ
            </p>
            <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f] sm:text-2xl">
              Nasıl çalışırım<span className="text-[#6e6e73]">.</span>
            </h3>
            <p className="mt-1 max-w-lg text-xs leading-relaxed text-[#6e6e73] sm:text-sm">
              Problemi anlamaktan test ve sürekli iyileştirmeye kadar olan
              süreç.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {buildSteps.map((step) => (
              <article
                key={step.number}
                className="relative flex min-h-32 flex-col justify-between overflow-hidden rounded-xl border border-[#d2d2d7] bg-white/70 hover:bg-white/90 p-3 transition-colors hover:border-[#d2d2d7] sm:min-h-36 sm:rounded-2xl sm:p-4"
              >
                <span className="mb-3 font-mono text-[10px] tracking-[0.14em] text-[#0071e3]">
                  {step.number}
                </span>
                <h4 className="mb-1.5 text-xs font-semibold leading-snug tracking-tight text-[#1d1d1f] sm:text-sm">
                  {step.title}
                </h4>

                <p className="text-[11px] leading-relaxed text-[#6e6e73] sm:text-xs">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-[#d2d2d7] pt-4 pb-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-[#6e6e73] sm:text-xs">
            Donanım, yazılımla buluşur; Teknoloji eksosisteminin çalışması
            amaçlanır.
          </p>
          <span className="font-mono text-[9px] tracking-[0.14em] text-[#6e6e73]">
            YETENEKLER / TEKNOLOJİLER / İŞ AKIŞI
          </span>
        </footer>
      </div>
    </SectionTemplate>
  );
};

export default SkillsSection;

type SkillCategory = {
  title: string;
  skills: string[];
};

interface SkillsCardType {
  category: SkillCategory;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const SkillsCard = ({ category, index, isOpen, onToggle }: SkillsCardType) => {
  const panelId = `skill-panel-${index}`;

  return (
    <article
      className={`overflow-hidden transition-colors p-2 ${
        isOpen ? "bg-white/70 hover:bg-white/90 shadow-inner rounded" : "bg-transparent"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-12 w-full items-center justify-between gap-3 py-3 text-left sm:py-3.5"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-mono text-[9px] font-medium tracking-[0.12em] text-[#0071e3]">
            {formatItemIndex(index)}
          </span>

          <h3 className="text-left text-[13px] font-medium leading-snug tracking-tight text-[#1d1d1f] sm:text-sm">
            {category.title}
          </h3>
        </div>

        <span
          className={`inline-flex size-6 shrink-0 items-center justify-center text-[#0071e3] transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <Plus size={16} strokeWidth={1.5} />
        </span>
      </button>

      <div
        id={panelId}
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col gap-2 border-t border-[#d2d2d7] pb-3 pl-7 pr-2 pt-3">
            {category.skills.map((skill) => (
              <li
                key={skill}
                className="flex items-start gap-2 text-xs leading-relaxed text-[#6e6e73] sm:text-[13px]"
              >
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#0071e3]/60" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};
