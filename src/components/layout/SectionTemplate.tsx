import type { ReactNode } from "react";

interface SectionTemplateProps {
  children: ReactNode;
  className?: string;
}

const SectionTemplate = ({
  children,
  className = "",
}: SectionTemplateProps) => {
  return (
    <section className="section-scroll-track relative flex h-dvh w-full items-center justify-center snap-start bg-transparent p-2 text-[#12243a] sm:p-3">
      <div
        className={`section-scroll-panel relative flex h-full w-full flex-col items-center overflow-hidden rounded-2xl border text-[#12243a] backdrop-blur-sm sm:rounded-3xl ${className} transform-3d`}
      >
        <div className="flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-x-hidden overflow-y-auto custom-scrollbar px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pb-6 lg:px-8">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionTemplate;
