import SectionTemplate from "../layout/SectionTemplate";

const ContactSection = () => {
  return (
    <SectionTemplate className="bg-transparent">
      <div className="my-auto mx-auto flex w-full max-w-7xl flex-col gap-6 py-4 sm:gap-8 md:flex-row md:items-center md:gap-10">
        <div className="w-full min-w-0 md:w-auto md:flex-1 md:basis-0">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.22em] text-cyan-800 sm:text-xs">
            BANA ULAŞIN
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            İletişime geçin
          </h2>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-lg">
            Yeni fırsatlar ve iş birlikleri için her zaman açıktım. Proje
            fikirleri, ortaklıklar veya sadece merhaba demek isteyenler için
            benimle iletişime geçebilirsiniz. Sizden haber almak isterim!
          </p>
          <div className="my-2 flex items-center justify-center gap-4 border-t border-cyan-900/15 py-2">
            <a href="" className="p-3 font-bold">
              LinkedIn
            </a>
            <a href="" className="p-3 font-bold">
              <img
                src={`${import.meta.env.BASE_URL}svg/TurkishEngineering.svg`}
                alt="github"
                className="w-10 h-10"
              />
            </a>
            <a href="" target="_blank" className="p-3 font-bold">
              <img
                src={`${import.meta.env.BASE_URL}svg/github.svg`}
                alt="github"
                className="w-10 h-10"
              />
            </a>
            <a
              href=""
              className="rounded border-2 border-cyan-800 p-1 font-bold text-cyan-900"
            ></a>
          </div>
        </div>

        <aside className="w-full min-w-0 rounded-2xl border border-cyan-900/10 bg-linear-to-br from-white/95 via-sky-50 to-cyan-50/70 p-5 shadow-[0_12px_36px_rgba(15,52,78,0.1)] transition-shadow duration-300 hover:shadow-[0_18px_48px_rgba(15,52,78,0.16)] sm:rounded-3xl sm:p-7 md:w-auto md:flex-1 md:basis-0 lg:p-8">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <div>
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-cyan-800">
                E-POSTA
              </h3>
              <p className="mt-2 text-sm font-medium text-neutral-900 sm:text-base">
                <a
                  href="mailto:serdarcayan.sc@gmail.com"
                  className="hover:underline"
                >
                  serdarcayan.sc@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-cyan-800">
                TELEFON
              </h3>
              <p className="mt-2 text-sm font-medium text-neutral-900 sm:text-base">
                <a href="tel:+905555555555" className="hover:underline">
                  +90 555 555 55 55
                </a>
              </p>
            </div>

            <div className="sm:col-span-2">
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-cyan-800">
                KONUM
              </h3>
              <p className="mt-2 text-sm font-medium text-neutral-900 sm:text-base">
                Çiğli, İzmir, Türkiye
              </p>
              <div className="mt-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49964.88061491714!2d26.960191712630596!3d38.492140414093164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbc53c2533dfdb%3A0x73b8a6786a94168f!2zw4dpxJ9saS_EsHptaXIsIFTDvHJraXll!5e0!3m2!1str!2sus!4v1791054161221!5m2!1str!2sus"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </SectionTemplate>
  );
};

export default ContactSection;
