import type { ReactNode } from "react";

interface SectionTemplateProps {
  children: ReactNode;
  className?: String;
  hasHeader: Boolean;
  smallText?: String;
  sectionTitle?: String;
  hasJourney: Boolean;
  journey?: number;
}
//shadow-[5px_5px_8px_rgba(30,30,30,0.34)]
const SectionTemplate = ({
  children,
  className = "",
  hasHeader = true,
  smallText = "",
  sectionTitle = "",
  hasJourney,
  journey,
}: SectionTemplateProps) => {
  return (
    <section className="section-scroll-track relative flex h-dvh w-full items-center justify-center snap-start bg-transparent p-2 text-[#1d1d1f] sm:p-3">
      <div
        className={`section-scroll-panel relative flex h-full w-full flex-col items-center overflow-hidden rounded-2xl border-t-2 border-l-2 border-[#d2d2d7] bg-transparent text-[#1d1d1f] shadow-lg shadow-black/5 backdrop-blur-xs sm:rounded-3xl ${className} transform-3d`}
      >
        <div className="flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-x-hidden overflow-y-auto custom-scrollbar px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pb-6 lg:px-8 items-center">
          {hasHeader && (
            <header className="mb-4 flex w-full shrink-0 items-end justify-between gap-3 sm:mb-6">
              <div>
                <p className="mb-1 text-[9px] font-semibold tracking-[0.18em] text-[#0071e3] sm:text-[10px]">
                  {smallText}
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-[#424245] sm:text-2xl">
                  {sectionTitle}
                </h2>
              </div>
              {hasJourney && (
                <span className="pb-0.5 text-[10px] text-[#6e6e73] sm:text-xs">
                  {String(journey).padStart(2, "0")} kayıt
                </span>
              )}
            </header>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionTemplate;
