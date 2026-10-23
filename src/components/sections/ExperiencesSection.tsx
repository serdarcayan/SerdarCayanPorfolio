import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import SectionTemplate from "../layout/SectionTemplate";
import { journey } from "../../data/experiences";

const ExperiencesSection = () => {
  return (
    <SectionTemplate
      className="bg-transparent"
      hasHeader={true}
      hasJourney={true}
      sectionTitle={"Gelişim Yolculuğu"}
      smallText={"KARİYER & EĞİTİM"}
      journey={journey.length}
    >
      <div className="relative mx-auto w-full max-w-3xl">
        <div
          aria-hidden="true"
          className="absolute bottom-3 left-[11px] top-3 z-0 w-px bg-cyan-800/15"
        />
        <ol className="relative">
          {journey.map(({ title, role, description, date }, index) => {
            const isCurrent = date.includes("Devam");
            const isEducation = role === "Öğrenci";
            const MarkerIcon = isEducation ? GraduationCap : BriefcaseBusiness;

            return (
              <li
                key={title}
                className={`relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-2.5 py-2.5 sm:py-3 ${
                  index < journey.length - 1
                    ? "border-b border-cyan-900/[0.07]"
                    : ""
                }`}
              >
                <div
                  className={`relative z-10 mt-0.5 flex size-[23px] items-center justify-center justify-self-center rounded-full border bg-[#f5f9fb] ${
                    isCurrent
                      ? "border-cyan-800/40 text-cyan-800"
                      : "border-cyan-900/10 text-cyan-700/70"
                  }`}
                  aria-hidden="true"
                >
                  <MarkerIcon size={12} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <h3 className="text-[13px] font-semibold leading-snug text-[#12243a] sm:text-sm">
                      {title}
                    </h3>
                    <span className="shrink-0 font-mono text-[10px] text-neutral-500">
                      {date}
                    </span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2">
                    <p className="text-[11px] font-medium text-cyan-800">
                      {role}
                    </p>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-700">
                        <span className="size-1 rounded-full bg-emerald-500" />
                        Devam ediyor
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
                    {description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionTemplate>
  );
};

export default ExperiencesSection;
