import SectionTemplate from "../layout/SectionTemplate";

const ContactSection = () => {
  return (
    <SectionTemplate
      hasHeader={true}
      hasJourney={false}
      sectionTitle={"İletişime geçin"}
      smallText={"BANA ULAŞIN"}
    >
      <section className="my-auto mx-auto flex w-full max-w-7xl flex-col gap-6 py-4 sm:gap-8 md:gap-10">
        <aside className="flex flex-col items-center justify-center">
          <article className="w-full min-w-0 md:w-auto md:flex-1 md:basis-0">
            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">
              Yeni fırsatlar ve iş birlikleri için her zaman açıktım. Proje
              fikirleri, ortaklıklar veya sadece merhaba demek isteyenler için
              benimle iletişime geçebilirsiniz. Sizden haber almak isterim!
            </p>
            <div className="my-2 flex items-center justify-center gap-4 border-t border-white/15 py-2">
              <a href="" className="p-3 font-bold">
                <img
                  src={`${import.meta.env.BASE_URL}png/LI-In-Bug.png`}
                  alt="github"
                  className="w-10"
                />
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
                className="rounded border-2 border-[#7fc2d4]/40 p-1 font-bold text-[#91b9bd]"
              ></a>
            </div>
          </article>

          <article className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#151920] p-5 shadow-[0_12px_36px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_18px_48px_rgba(0,0,0,0.45)] sm:rounded-3xl sm:p-7 md:w-auto md:flex-1 md:basis-0 lg:p-8">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[#91b9bd]">
                  E-POSTA
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-100 sm:text-base">
                  <a
                    href="mailto:serdarcayan.sc@gmail.com"
                    className="hover:underline"
                  >
                    serdarcayan.sc@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[#91b9bd]">
                  TELEFON
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-100 sm:text-base">
                  <a href="tel:+905555555555" className="hover:underline">
                    +90 555 555 55 55
                  </a>
                </p>
              </div>

              <div className="sm:col-span-2">
                <h3 className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[#91b9bd]">
                  KONUM
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-100 sm:text-base">
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
          </article>
        </aside>
        <section></section>
      </section>
      <footer className="w-full">
        <div className="w-full max-w-7xl m-auto flex items-center gap-4 border-t border-white/15 p-2">
          <p className="text-sm text-slate-400 whitespace-nowrap">
            Altyapısında
          </p>
          <div className="flex items-center gap-4">
            <img
              src={`${import.meta.env.BASE_URL}svg/react.svg`}
              alt="react"
              className="h-6 w-6"
            />
            <img
              src={`${import.meta.env.BASE_URL}svg/vite.svg`}
              alt="vite"
              className="h-6 w-6"
            />
            <img
              src={`${import.meta.env.BASE_URL}svg/tailwindcss.svg`}
              alt="vite"
              className="h-6 w-6"
            />
            <img
              src={`${import.meta.env.BASE_URL}svg/ts-logo-128.svg`}
              alt="vite"
              className="h-6 w-6"
            />
            <img
              src={`${import.meta.env.BASE_URL}svg/GitHub_Invertocat_Black.svg`}
              alt="vite"
              className="h-6 w-6 brightness-0 invert"
            />
          </div>
        </div>
      </footer>
    </SectionTemplate>
  );
};

export default ContactSection;
