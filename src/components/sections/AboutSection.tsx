import SectionTemplate from "../layout/SectionTemplate";

const focusAreas = [
  "Gömülü Sistemler",
  "Güç Elektroniği",
  "Full Stack Geliştirme",
  "Yapay Zekâ",
  "IoT",
  "PCB Tasarımı",
  "Donanım-Yazılım Entegrasyonu",
];

const AboutSection = () => {
  return (
    <SectionTemplate className="bg-transparent">
      <div className="my-auto mx-auto flex w-full max-w-7xl flex-col gap-6 py-4 sm:gap-8 md:flex-row md:items-center md:gap-10">
        <div className="w-full min-w-0 md:w-auto md:flex-1 md:basis-0">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.22em] text-cyan-800 sm:text-xs">
            KISACA BEN
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-[#12243a] sm:text-4xl lg:text-5xl">
            Hakkımda
          </h2>

          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-lg">
            Elektronik ve yazılımı ortak bir mühendislik yaklaşımıyla ele
            alıyor, farklı teknolojileri bir araya getirerek gerçek problemlere
            çözüm üretmeye odaklanıyorum. Elektronik Teknolojisi alanındaki
            altyapımı; gömülü sistemler, güç elektroniği, PCB tasarımı ve
            full stack geliştirme çalışmalarım ile birleştiriyorum. Yapay zekâ
            ve nesnelerin interneti gibi alanları da keşfederek donanımdan
            yazılıma uzanan bütüncül sistemler geliştirmeyi hedefliyorum.
            Benim için her proje; araştırma, tasarım, uygulama, test ve
            sürekli iyileştirme sürecinden oluşan bir öğrenme fırsatı.
          </p>
        </div>

        <aside className="w-full min-w-0 rounded-2xl border border-cyan-900/10 bg-linear-to-br from-white/95 via-sky-50 to-cyan-50/70 p-5 shadow-[0_12px_36px_rgba(15,52,78,0.1)] transition-shadow duration-300 hover:shadow-[0_18px_48px_rgba(15,52,78,0.16)] sm:rounded-3xl sm:p-7 md:w-auto md:flex-1 md:basis-0 lg:p-8">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <div>
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-cyan-800">
                TEKNİK TEMEL
              </h3>

              <p className="mt-2 text-sm font-medium text-neutral-900 sm:text-base">
                Elektronik Teknolojisi
              </p>
            </div>

            <div>
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-cyan-800">
                YAKLAŞIM
              </h3>

              <p className="mt-2 text-sm font-medium text-neutral-900 sm:text-base">
                Tasarla <span className="text-neutral-400">→</span> Geliştir{" "}
                <span className="text-neutral-400">→</span> Test Et{" "}
                <span className="text-neutral-400">→</span> İyileştir
              </p>
            </div>

            <div className="sm:col-span-2">
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-cyan-800">
                ODAK ALANLARI
              </h3>

              <ul className="mt-3 flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-cyan-800/15 bg-white/80 px-3 py-1.5 text-xs font-medium text-cyan-950 sm:text-sm"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </SectionTemplate>
  );
};

export default AboutSection;