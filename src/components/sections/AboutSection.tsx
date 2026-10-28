import { Cpu, Code2, Workflow, GraduationCap, Layers3 } from "lucide-react";
import SectionTemplate from "../layout/SectionTemplate";

const focusAreas = [
  "Gömülü Sistemler",
  "Güç Elektroniği",
  "Full Stack",
  "Yapay Zekâ",
  "IoT",
  "PCB Tasarımı",
  "Donanım-Yazılım Entegrasyonu",
  "Sistem Tasarımı",
];

const engineeringSteps = [
  "Araştır",
  "Tasarla",
  "Geliştir",
  "Test Et",
  "İyileştir",
];

const cardClass =
  "rounded-xl border border-[#d2d2d7] bg-white/70 hover:bg-white/90 p-4 sm:rounded-2xl sm:p-5";

const labelClass =
  "font-mono text-[9px] font-semibold tracking-[0.14em] text-[#0071e3] sm:text-[10px]";

const AboutSection = () => {
  return (
    <SectionTemplate
      sectionTitle="Hakkımda"
      smallText="KISACA BEN"
      hasJourney={false}
      hasHeader={true}
    >
      <div className="mx-auto flex w-full flex-col gap-5 py-2 sm:gap-7">
        <div className="w-full border-l-2 border-[#0071e3]/40 pl-4 text-[13px] leading-relaxed text-[#6e6e73] sm:pl-5 sm:text-sm">
          <div className="space-y-2.5">
            <p>
              Elektronik ve yazılımı birbirinden bağımsız alanlar olarak değil,
              aynı mühendislik probleminin birbirini tamamlayan parçaları olarak
              görüyorum.
            </p>

            <p>
              Elektronik Teknolojisi altyapımı; gömülü sistemler, güç
              elektroniği, PCB tasarımı ve full-stack yazılım geliştirme
              çalışmalarım ile birleştiriyorum. Amacım, donanımdan yazılıma
              uzanan sistemler tasarlamak ve gerçek problemlere işlevsel
              çözümler üretmek.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <article className={cardClass}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#0071e3]/10 text-[#0071e3]">
                <Cpu size={17} strokeWidth={1.7} />
              </div>
              <span className={labelClass}>DONANIM</span>
            </div>

            <h3 className="text-sm font-semibold tracking-tight text-[#1d1d1f] sm:text-base">
              Elektronik & Donanım
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-[#6e6e73] sm:text-[13px]">
              Elektronik devreler, mikrodenetleyiciler ve güç elektroniği
              üzerine odaklanıyorum. Donanımın çalışma prensiplerini anlayarak
              kontrol, ölçüm ve otomasyon sistemleri geliştirmeyi önemsiyorum.
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                "Gömülü Sistemler",
                "Güç Elektroniği",
                "PCB Tasarımı",
                "Mikrodenetleyiciler",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-[#0071e3]/10 px-2 py-1 text-[10px] font-medium text-[#0071e3]"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className={cardClass}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#0071e3]/10 text-[#0071e3]">
                <Code2 size={17} strokeWidth={1.7} />
              </div>
              <span className={labelClass}>YAZILIM</span>
            </div>

            <h3 className="text-sm font-semibold tracking-tight text-[#1d1d1f] sm:text-base">
              Yazılım & Yapay Zekâ
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-[#6e6e73] sm:text-[13px]">
              Modern web teknolojileriyle kullanıcı odaklı uygulamalar
              geliştiriyor; API, sistem entegrasyonu ve yerel yapay zekâ
              çözümleri üzerine çalışıyorum. Hedefim, yazılımı gerçek dünya
              sistemleriyle buluşturmak.
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                "React",
                "TypeScript",
                "API Geliştirme",
                "Yerel Yapay Zekâ",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-[#0071e3]/10 px-2 py-1 text-[10px] font-medium text-[#0071e3]"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>

        <article className={cardClass}>
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#0071e3]/10 text-[#0071e3]">
                <Workflow size={17} strokeWidth={1.7} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#1d1d1f]">
                  Mühendislik yaklaşımım
                </h3>
                <p className="text-[11px] text-[#6e6e73]">
                  Fikirden doğrulanmış çözüme
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
            {engineeringSteps.map((step, index) => (
              <div
                key={step}
                className="group flex min-w-0 flex-col items-center gap-2"
              >
                <div className="flex aspect-square w-full max-w-12 items-center justify-center rounded-lg border border-[#d2d2d7] bg-white/70 hover:bg-white/90 font-mono text-xs font-medium text-[#0071e3] transition-colors group-hover:border-[#0071e3]/30 group-hover:bg-[#0071e3]/10 sm:max-w-14 sm:rounded-xl sm:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <span className="text-center text-[9px] font-medium text-[#6e6e73] sm:text-xs">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-3 sm:grid-cols-2">
          <article className={cardClass}>
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#0071e3]/10 text-[#0071e3]">
                <GraduationCap size={17} strokeWidth={1.7} />
              </div>

              <div>
                <p className={labelClass}>EĞİTİM</p>
                <h3 className="mt-0.5 text-sm font-semibold text-[#1d1d1f]">
                  Elektronik Teknolojisi
                </h3>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[#6e6e73]">
              Elektronik, devreler ve donanım sistemleri üzerine teknik altyapı.
            </p>
          </article>

          <article className={cardClass}>
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#0071e3]/10 text-[#0071e3]">
                <Layers3 size={17} strokeWidth={1.7} />
              </div>

              <div>
                <p className={labelClass}>ÇALIŞMA ALANI</p>
                <h3 className="mt-0.5 text-sm font-semibold text-[#1d1d1f]">
                  Donanım + Yazılım
                </h3>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[#6e6e73]">
              Farklı teknolojileri bir araya getirerek bütüncül sistemler
              geliştirme ve entegrasyon.
            </p>
          </article>
        </div>

        <article className="border-t border-[#d2d2d7] pt-4">
          <div className="mb-3">
            <div>
              <h3 className="text-sm font-semibold text-[#1d1d1f]">
                Teknik ilgi alanları
              </h3>
              <p className="mt-0.5 text-[11px] text-[#6e6e73]">
                Keşfettiğim ve geliştirdiğim alanlar
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-md border border-[#d2d2d7] bg-white/70 hover:bg-white/90 px-2.5 py-1 text-[10px] font-medium text-[#0071e3] transition-colors hover:border-[#0071e3]/30 hover:bg-[#0071e3]/10 sm:text-[11px]"
              >
                {area}
              </span>
            ))}
          </div>
        </article>
      </div>
    </SectionTemplate>
  );
};

export default AboutSection;
