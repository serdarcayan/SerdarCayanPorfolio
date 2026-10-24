import { useEffect, useState } from "react";
import packageJson from "../../../package.json";
import SectionTemplate from "../layout/SectionTemplate";
import SiteIcon from "../../assets/SiteIconLight.svg";

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
    <SectionTemplate
      hasHeader={false}
      hasJourney={false}
    >
      <header className="flex w-full items-center justify-between">
        {SiteIcon ? (
          <img
            src={SiteIcon}
            alt="Serdar Çayan site ikonu"
            className="block h-auto w-8 max-w-full object-contain sm:w-10 md:w-11"
          />
        ) : (
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#91b9bd] sm:text-xs">
            SC
          </span>
        )}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/serdarcayan/SerdarCayanPorfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${import.meta.env.BASE_URL}svg/github.svg`}
              alt="GitHub"
              className="h-6 w-6 brightness-0 invert opacity-75 transition-opacity hover:opacity-100"
            />
          </a>
          <span className="text-[10px] font-medium tracking-[0.2em] text-slate-400 sm:text-xs">
            |
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-slate-400 sm:text-xs">
            V{packageJson.version}
          </span>
        </div>
      </header>

      <div className="my-auto flex w-full max-w-5xl flex-col justify-center py-16 sm:py-20">
        <div className="mb-10 sm:mb-14">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#91b9bd] sm:text-xs">
            Planlar · Tasarlar · Somutlaştırır
          </p>

          <h1 className="text-[clamp(3rem,14vw,7rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-slate-100">
            SERDAR
            <br />
            <span className="text-[#91b9bd]">ÇAYAN</span>
          </h1>
        </div>

        <div className="mb-10 border-y border-white/15 py-5 sm:mb-12 sm:py-6">
          <div
            className="h-5 overflow-hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 sm:h-6 sm:text-sm"
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
          {/* <p className="max-w-md text-sm leading-7 text-slate-400 sm:text-base">
            Donanım ve yazılımı bir bütün olarak ele alıyor; elektronik
            sistemlerden gömülü sistem çözümlerinden, yapay zekâdan web
            uygulamalarına kadar fikirleri çalışan sistemlere dönüştürüyorum.
          </p> */}

          <button
            onClick={() => onSectionSelect(3)}
            className="group flex w-fit items-center gap-4 border-b-2 border-[#7fc2d4] pb-2 text-sm font-semibold text-[#91b9bd] transition-all duration-300 hover:gap-6 hover:text-[#91b9bd]"
          >
            <span>Projeleri keşfet</span>

            <span className="text-[#d9b486] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>

      <div className="w-full border-t border-white/15 pt-3">
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
          Elektronik · Yazılım · Gömülü sistemler · AI
        </p>
      </div>
    </SectionTemplate>
  );
};

export default HomeSection;
