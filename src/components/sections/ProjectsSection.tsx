import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  Cpu,
  ExternalLink,
  ShoppingBasket,
  X,
} from "lucide-react";
import { projects, type Project } from "../../data/projects";
import SectionTemplate from "../layout/SectionTemplate";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <SectionTemplate
      hasHeader={true}
      hasJourney={true}
      journey={projects.length}
      sectionTitle={"Projeler"}
      smallText={"SEÇİLİ ÇALIŞMALAR"}
    >
      <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onViewDetails={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <div className="mt-4 mb-16 flex w-full max-w-7xl items-center justify-center gap-2 p-2 text-sm text-slate-400 sm:flex-row sm:gap-4">
        <div className="flex-1 border-t border-white/25"></div>
        <div className="font-medium text-[#91b9bd] transition-colors hover:text-[#d9b486]">
          <a href="#TurkishEngineering">Daha fazla proje görüntüle</a>
        </div>
        <div className="flex-1 border-t border-white/25"></div>
      </div>

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </SectionTemplate>
  );
};

export default ProjectsSection;

//---
//---
//---

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  const isPowerProject = project.category.includes("POWER");
  const isMobileProject = project.category.includes("MOBILE");
  const ProjectIcon = isPowerProject
    ? Cpu
    : isMobileProject
      ? ShoppingBasket
      : Code2;
  const visualStyle = isPowerProject
    ? {
      background: "from-amber-950 via-orange-950 to-slate-900",
      accent: "text-amber-300",
        label: "GÜÇ / GÖMÜLÜ",
      }
    : isMobileProject
      ? {
          background: "from-cyan-950 via-teal-950 to-slate-900",
          accent: "text-cyan-300",
          label: "MOBİL UYGULAMA",
        }
      : {
          background: "from-sky-950 via-blue-950 to-slate-900",
          accent: "text-blue-300",
          label: "WEB PLATFORMU",
        };

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] shadow-[0_8px_30px_rgba(15,52,78,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_20px_45px_rgba(15,52,78,0.16)] sm:rounded-3xl sm:hover:-translate-y-1.5">
      <div
        className={`relative m-2.5 mb-0 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br sm:m-3 sm:mb-0 sm:h-44 sm:rounded-2xl ${visualStyle.background}`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute -right-8 -top-12 size-44 rounded-full border border-black/5" />
            <div className="absolute -right-2 -top-6 size-32 rounded-full border border-black/5" />
            <div className="absolute -bottom-16 -left-6 size-40 rounded-full border border-black/5" />
            <ProjectIcon
              aria-hidden="true"
              className={`size-14 stroke-[1.25] ${visualStyle.accent} transition-transform duration-500 group-hover:scale-110`}
            />
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/35 to-transparent px-4 pb-3 pt-10">
          <span className="text-[10px] font-semibold tracking-[0.18em] text-white">
            {visualStyle.label}
          </span>
          <span className="font-mono text-xs text-white/80">
            {project.number}
          </span>
        </div>
        {project.featured && (
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-[10px] font-semibold tracking-wider text-slate-300 shadow-sm backdrop-blur">
            ÖNE ÇIKAN
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 pt-3.5 sm:p-5 sm:pt-4">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#91b9bd]">
          {project.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-slate-100">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.slice(0, 3).map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-white/10 bg-[#7fc2d4]/10 px-2.5 py-1 text-xs text-[#91b9bd]"
            >
              {technology}
            </li>
          ))}
          {project.technologies.length > 3 && (
            <li className="rounded-full border border-amber-700/15 bg-amber-50 px-2.5 py-1 text-xs text-amber-800">
              +{project.technologies.length - 3}
            </li>
          )}
        </ul>

        <footer className="mt-5 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onViewDetails}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition-colors hover:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-300"
          >
            Detayları gör
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </footer>
      </div>
    </article>
  );
};

//---
//---
//---

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailsModal = ({
  project,
  onClose,
}: ProjectDetailsModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="project-dialog-title"
        aria-modal="true"
        className="relative max-h-[calc(100dvh-2rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-2xl sm:max-h-[min(85dvh,800px)] sm:rounded-3xl sm:p-9"
        role="dialog"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Proje detaylarını kapat"
          autoFocus
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition-colors hover:bg-[#20242b] hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <p className="pr-12 text-xs font-semibold tracking-[0.2em] text-slate-400">
          {project.number} / {project.category}
        </p>
        <h2
          id="project-dialog-title"
          className="mt-3 pr-10 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {project.title}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
          {project.overview}
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <DetailSection title="Zorluk" content={project.problem} />
          <DetailSection title="Çözüm" content={project.solution} />
          <DetailSection title="Mimari" content={project.architecture} />
          <DetailSection title="Sonuç" content={project.result} />
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold">Öne çıkan özellikler</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-slate-500"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <h3 className="text-sm font-semibold">Teknolojiler</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#10141b] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#344950] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-300"
          >
            GitHub'da görüntüle
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </section>
    </div>
  );
};

//---
//---
//---

interface DetailSectionProps {
  title: string;
  content: string;
}

const DetailSection = ({ title, content }: DetailSectionProps) => (
  <div>
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-slate-300">{content}</p>
  </div>
);
