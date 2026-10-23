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
  "rounded-xl border border-cyan-900/10 bg-white/65 p-4 sm:rounded-2xl sm:p-5";

const labelClass =
  "font-mono text-[9px] font-semibold tracking-[0.14em] text-cyan-800 sm:text-[10px]";

const AboutSection = () => {
  return (
    <SectionTemplate
      className="bg-transparent"
      sectionTitle="Hakkımda"
      smallText="KISACA BEN"
      hasJourney={false}
      hasHeader={true}
    >
      <div className="mx-auto flex w-full flex-col gap-5 py-2 sm:gap-7">
        <div className="w-full border-l-2 border-cyan-700/40 pl-4 text-[13px] leading-relaxed text-neutral-600 sm:pl-5 sm:text-sm">
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
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800">
                <Cpu size={17} strokeWidth={1.7} />
              </div>
              <span className={labelClass}>DONANIM</span>
            </div>

            <h3 className="text-sm font-semibold tracking-tight text-[#12243a] sm:text-base">
              Elektronik & Donanım
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 sm:text-[13px]">
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
                  className="rounded-md bg-cyan-50/80 px-2 py-1 text-[10px] font-medium text-cyan-950"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className={cardClass}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800">
                <Code2 size={17} strokeWidth={1.7} />
              </div>
              <span className={labelClass}>YAZILIM</span>
            </div>

            <h3 className="text-sm font-semibold tracking-tight text-[#12243a] sm:text-base">
              Yazılım & Yapay Zekâ
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 sm:text-[13px]">
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
                  className="rounded-md bg-cyan-50/80 px-2 py-1 text-[10px] font-medium text-cyan-950"
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
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800">
                <Workflow size={17} strokeWidth={1.7} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#12243a]">
                  Mühendislik yaklaşımım
                </h3>
                <p className="text-[11px] text-neutral-500">
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
                <div className="flex aspect-square w-full max-w-12 items-center justify-center rounded-lg border border-cyan-900/10 bg-white/80 font-mono text-xs font-medium text-cyan-800 transition-colors group-hover:border-cyan-700/30 group-hover:bg-cyan-50 sm:max-w-14 sm:rounded-xl sm:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <span className="text-center text-[9px] font-medium text-neutral-600 sm:text-xs">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-3 sm:grid-cols-2">
          <article className={cardClass}>
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800">
                <GraduationCap size={17} strokeWidth={1.7} />
              </div>

              <div>
                <p className={labelClass}>EĞİTİM</p>
                <h3 className="mt-0.5 text-sm font-semibold text-[#12243a]">
                  Elektronik Teknolojisi
                </h3>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-neutral-600">
              Elektronik, devreler ve donanım sistemleri üzerine teknik altyapı.
            </p>
          </article>

          <article className={cardClass}>
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-800">
                <Layers3 size={17} strokeWidth={1.7} />
              </div>

              <div>
                <p className={labelClass}>ÇALIŞMA ALANI</p>
                <h3 className="mt-0.5 text-sm font-semibold text-[#12243a]">
                  Donanım + Yazılım
                </h3>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-neutral-600">
              Farklı teknolojileri bir araya getirerek bütüncül sistemler
              geliştirme ve entegrasyon.
            </p>
          </article>
        </div>

        <article className="border-t border-cyan-900/10 pt-4">
          <div className="mb-3">
            <div>
              <h3 className="text-sm font-semibold text-[#12243a]">
                Teknik ilgi alanları
              </h3>
              <p className="mt-0.5 text-[11px] text-neutral-500">
                Keşfettiğim ve geliştirdiğim alanlar
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-md border border-cyan-800/10 bg-white/70 px-2.5 py-1 text-[10px] font-medium text-cyan-950 transition-colors hover:border-cyan-700/30 hover:bg-cyan-50 sm:text-[11px]"
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
