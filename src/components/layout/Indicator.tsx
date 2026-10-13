import { ChevronDown, ChevronUp } from "lucide-react";

interface IndicatorProps {
  sectionIndex: number;
  onSectionSelect: (index: number) => void;
  tabs: { title: string }[];
}

const Indicator = ({
  sectionIndex,
  onSectionSelect,
  tabs,
}: IndicatorProps) => {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-6"
    >
      <button
        type="button"
        aria-label="Previous section"
        disabled={sectionIndex === 0}
        onClick={() => onSectionSelect(sectionIndex - 1)}
        className="flex h-7 w-7 items-center justify-center text-cyan-800 transition hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700/40 disabled:cursor-not-allowed disabled:opacity-25"
      >
        <ChevronUp size={16} strokeWidth={1.5} />
      </button>

      <div className="flex flex-col items-center gap-2.5" role="group" aria-label="Sections">
        {tabs.map((tab, index) => {
          const isActive = index === sectionIndex;

          return (
            <button
              type="button"
              key={tab.title}
              aria-label={`Go to ${tab.title}`}
              aria-current={isActive ? "page" : undefined}
              title={tab.title}
              onClick={() => onSectionSelect(index)}
              className={`group flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700/40 ${
                isActive
                  ? "bg-cyan-800 shadow-[0_0_16px_rgba(8,145,178,0.35)]"
                  : "bg-slate-400/60 hover:scale-125 hover:bg-cyan-700"
              }`}
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive ? "h-3.5 w-1.5 bg-white/90" : "h-1.5 w-1.5 bg-white/80"
                }`}
              >
                <span className="sr-only">{tab.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Next section"
        disabled={sectionIndex === tabs.length - 1}
        onClick={() => onSectionSelect(sectionIndex + 1)}
        className="flex h-7 w-7 items-center justify-center text-cyan-800 transition hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700/40 disabled:cursor-not-allowed disabled:opacity-25"
      >
        <ChevronDown size={16} strokeWidth={1.5} />
      </button>
    </nav>
  );
};

export default Indicator;
