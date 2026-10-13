import { ChevronUp } from "lucide-react";
import SectionTemplate from "../layout/SectionTemplate";
import { journey } from "../../data/experiences";


const ExperiencesSection = () => {
  return (
    <SectionTemplate className="bg-transparent">
      <header className="mb-5 flex w-full max-w-7xl shrink-0 items-end justify-between gap-3 sm:mb-6 sm:gap-4">
        <div>
          <p className="mb-1.5 text-[10px] font-semibold tracking-[0.2em] text-cyan-800 sm:mb-2 sm:text-xs sm:tracking-[0.25em]">
            GELİŞİM YOLCULUĞU
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
            Gelişim Yolculuğu
          </h2>
        </div>
        <span className="pb-1 text-xs text-neutral-500 sm:text-sm">
          {String(journey.length).padStart(2, "0")} aşama
        </span>
      </header>
      <div className="relative flex-1">
        <div
          aria-hidden="true"
          className="absolute bottom-4 left-4 top-4 z-0 w-px -translate-x-1/2 bg-cyan-800/30 sm:left-1/2"
        />
        <ol className="relative space-y-7 sm:space-y-8">
          {journey.map(({ title, role, description, date }, index) => (
            <li
              key={title}
              className="relative grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-4 sm:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] sm:gap-x-5 "
            >
              <div
                className={`relative z-10 col-start-1 row-start-1 flex h-8 w-8 justify-self-center items-center justify-center rounded-full border shadow-sm ring-4 ring-white/75 sm:col-start-2 ${
                  index === 0
                    ? "animate-bounce border-cyan-900 bg-cyan-900 text-white"
                    : "border-cyan-800/30 bg-white text-cyan-800"
                }`}
                aria-hidden="true"
              >
                <ChevronUp size={24} strokeWidth={1.5} />
              </div>

              <div
                className={`col-start-2 row-start-1 min-w-0 ${
                  index % 2 === 0
                    ? "sm:col-start-3 sm:max-w-xl"
                    : "sm:col-start-1 sm:ml-auto sm:max-w-xl sm:text-right"
                }`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-neutral-900 sm:text-lg">
                    {title}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-800">{role}</p>
                  <p className="text-xs text-neutral-500">{date}</p>
                </div>

                <p className="mt-2 border-b border-cyan-900/15 pb-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionTemplate>
  );
};

export default ExperiencesSection;
