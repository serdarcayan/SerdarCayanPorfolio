import { useState } from "react";
import { buildSteps } from "../../data/buildSteps";
import { skillCategories } from "../../data/skills";
import SectionTemplate from "../layout/SectionTemplate";
import { Plus } from "lucide-react";

const formatItemIndex = (value: number | string | undefined) =>
  String((Number(value) || 0) + 1).padStart(2, "0");

const SkillsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);


  const handleToggle = (index: number) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

  return (
    <SectionTemplate className="bg-[#f7f7f5]/80">
      <div className="flex w-full max-w-7xl flex-col gap-8 sm:gap-10 lg:gap-14">
        <section>
          <header className="mb-5 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-semibold tracking-[0.25em] text-cyan-800 sm:text-xs">
                UZMANLIK
              </p>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Yetenekler
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-600">
                Elektronik, gömülü sistemler ve yazılım geliştirme alanındaki
                temel yetkinliklerim.
              </p>
            </div>

            <span className="self-start rounded-full border border-cyan-800/20 bg-cyan-50/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-cyan-900 sm:self-auto">
              {String(skillCategories.length).padStart(2, "0")} KATEGORİ
            </span>
          </header>

          <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:gap-2">
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

        {/* <section className="border-t border-cyan-900/15 pt-7 sm:pt-10">
          <header className="mb-5 sm:mb-6">
            <p className="mb-2 text-[10px] font-semibold tracking-[0.25em] text-cyan-800 sm:text-xs">
              TEKNOLOJİLER / 02
            </p>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Teknoloji yığını<span className="text-neutral-400">.</span>
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Çalıştığım teknolojiler ve araçlar.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {techStacks.map((stack, index) => (
              <article
                key={stack.title}
                className="rounded-2xl border border-cyan-900/10 bg-white/80 p-4 shadow-[0_10px_25px_rgba(15,52,78,0.05)] sm:p-5"
              >
                <header className="mb-4 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold tracking-[0.18em] text-cyan-800">
                    {stack.title}
                  </h4>
                  <span className="font-mono text-[10px] text-neutral-500">
                    {formatItemIndex(index)}
                  </span>
                </header>

                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-cyan-900/10 bg-cyan-50/70 px-2.5 py-1.5 text-[11px] font-medium text-cyan-950 transition-colors"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section> */}

        <section className="border-t border-cyan-900/15 pt-7 sm:pt-10">
          <header className="mb-5 sm:mb-6">
            <p className="mb-2 text-[10px] font-semibold tracking-[0.25em] text-cyan-800 sm:text-xs">
              ÇALIŞMA YÖNTEMİ
            </p>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Nasıl çalışırım<span className="text-neutral-400">.</span>
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-600">
              Problemi anlamaktan test ve sürekli iyileştirmeye kadar olan
              süreç.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {buildSteps.map((step) => (
              <article
                key={step.number}
                className="relative flex flex-col justify-between rounded-2xl border border-cyan-900/10 bg-white/80 p-4 shadow-[0_10px_28px_rgba(15,52,78,0.05)] transition-all duration-300 sm:p-5 lg:hover:-translate-y-1 lg:hover:border-cyan-800/25"
              >
                <div className="absolute inset-0 ">
                  <span className="absolute  right-0 top-0 p-4 font-mono text-7xl font-medium tracking-[0.12em] text-neutral-500/10 ">
                    {step.number}
                  </span>
                </div>

                <h4 className="mb-2 text-base font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                  {step.title}
                </h4>

                <p className="text-sm leading-relaxed text-neutral-600">
                  {step.description}
                </p>

                <div className="mt-5 h-1 w-10 rounded-full bg-linear-to-r from-cyan-700 to-blue-600" />
              </article>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-cyan-900/15 pt-5 pb-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            Donanım, yazılımla buluşur; Teknoloji eksosisteminin çalışması
            amaçlanır.
          </p>
          <span className="font-mono text-[10px] tracking-[0.18em] text-neutral-400">
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
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-300 lg:hover:border-neutral-300 lg:hover:shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-medium tracking-[0.12em] text-neutral-500">
            {formatItemIndex(index)}
          </span>

          <h3 className="text-sm font-semibold leading-snug tracking-[-0.02em] text-[#1d1d1f] sm:text-base">
            {category.title}
          </h3>
        </div>

        <span
          className={`inline-flex h-7 w-7 p-1 items-center justify-center rounded-full border border-neutral-200 text-sm font-medium text-neutral-600 transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <Plus />
        </span>
      </button>

      <div
        id={panelId}
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col gap-2.5 border-t border-neutral-200 px-4 pb-4 pt-4 sm:px-5">
            {category.skills.map((skill) => (
              <li
                key={skill}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-600"
              >
                <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};
