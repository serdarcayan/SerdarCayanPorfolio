import { useEffect, useState } from "react";
import SectionTemplate from "../layout/SectionTemplate";
import SiteIcon from "../../assets/SiteIcon.svg";

const professions = [
  "Elektronik Teknikeri",
  "Full Stack Developer",
  "Embedded Systems & IoT",
  "AI & Hardware Integration",
  "E-Ticaret ve Yönetimi",
];

type HomeSectionProps = {
  onSectionSelect: (index: number) => void;
};

const HomeSection = ({ onSectionSelect }: HomeSectionProps) => {
  const [professionIndex, setProfessionIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProfessionIndex((current) => (current + 1) % professions.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <SectionTemplate className="bg-transparent">
      <header className="flex w-full items-center justify-between">
        {SiteIcon ? (
          <img
            src={SiteIcon}
            alt="Serdar Çayan site ikonu"
            className="block h-auto w-8 max-w-full object-contain sm:w-10 md:w-11"
          />
        ) : (
          <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-800 sm:text-xs">
            SC
          </span>
        )}

        <span className="text-[10px] font-medium tracking-[0.2em] text-slate-500 sm:text-xs">
          V0.6
        </span>
      </header>

      <div className="my-auto flex w-full max-w-5xl flex-col justify-center py-16 sm:py-20">
        <div className="mb-10 sm:mb-14">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-800 sm:text-xs">
            Planlar · Tasarlar · Somutlaştırır
          </p>

          <h1 className="text-[clamp(3rem,14vw,7rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#12243a]">
            SERDAR
            <br />
            <span className="text-cyan-800">ÇAYAN</span>
          </h1>
        </div>

        <div className="mb-10 border-y border-cyan-900/15 py-5 sm:mb-12 sm:py-6">
          <div
            className="h-5 overflow-hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 sm:h-6 sm:text-sm"
            style={{ perspective: "500px" }}
          >
            <ul
              className="relative h-full"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {professions.map((profession, index) => {
                const offset =
                  (index - professionIndex + professions.length) %
                  professions.length;

                const rotation =
                  offset === 0
                    ? 0
                    : offset === 1
                      ? 90
                      : offset === professions.length - 1
                        ? -90
                        : 180;

                return (
                  <li
                    key={profession}
                    className="absolute inset-0 flex items-center transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `rotateX(${rotation}deg)`,
                      transformOrigin: "center center",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {profession}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-base">
            Donanım ve yazılımı bir bütün olarak ele alıyor; elektronik
            sistemlerden gömülü sistem çözümlerinden, yapay zekâdan web
            uygulamalarına kadar fikirleri çalışan sistemlere dönüştürüyorum.
          </p>

          <button
            onClick={() => onSectionSelect(3)}
            className="group flex w-fit items-center gap-4 border-b-2 border-cyan-700 pb-2 text-sm font-semibold text-cyan-900 transition-all duration-300 hover:gap-6 hover:text-cyan-700"
          >
            <span>Projeleri keşfet</span>

            <span className="text-amber-600 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>

      <div className="w-full border-t border-cyan-900/15 pt-3">
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:text-[10px]">
          Elektronik · Yazılım · Gömülü sistemler · AI
        </p>
      </div>
    </SectionTemplate>
  );
};

export default HomeSection;
