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
    <section className="section-scroll-track relative flex h-dvh w-full items-center justify-center snap-start bg-transparent p-2 text-[#12243a] sm:p-3">
      <div
        className={`section-scroll-panel relative flex h-full w-full flex-col items-center overflow-hidden rounded-2xl border text-[#12243a] backdrop-blur-sm sm:rounded-3xl ${className} transform-3d`}
      >
        <div className="flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-x-hidden overflow-y-auto custom-scrollbar px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pb-6 lg:px-8 items-center">
          {hasHeader && (
            <header className="mb-4 flex w-full shrink-0 items-end justify-between gap-3 sm:mb-6">
              <div>
                <p className="mb-1 text-[9px] font-semibold tracking-[0.18em] text-cyan-800 sm:text-[10px]">
                  {smallText}
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-[#12243a] sm:text-2xl">
                  {sectionTitle}
                </h2>
              </div>
              {hasJourney && (
                <span className="pb-0.5 text-[10px] text-neutral-500 sm:text-xs">
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
