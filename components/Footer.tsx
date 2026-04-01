import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-black/90 text-white/50 backdrop-blur-[24px]"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-8 pt-32 pb-16 md:px-16">
        <div className="mb-32 grid grid-cols-1 items-start gap-16 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col items-start md:col-span-4 md:pr-8">
            <Image
              src="/assets/images/logo_white.png"
              alt="IMxplorer — The Travel Co."
              width={160}
              height={40}
              className="mb-10 h-10 w-auto opacity-90 transition-opacity duration-500 hover:opacity-100"
              style={{ width: "auto" }}
            />

            <p className="mb-8 max-w-[340px] font-sans text-xs leading-loose tracking-[0.2em] text-white/40 uppercase md:text-sm">
              <span className="font-semibold text-imxRed">First Floor,</span> Galaxy
              Blue Sapphire Plaza,
              <br />
              Greater Noida West, UP, India
            </p>

            <a
              href="https://www.google.com/maps/dir//Gate+No.+1,+IMxplorer+The+Travel+Co.,+Galaxy+Blue+Sapphire+Plaza,+F-37B,+First+Floor,+Greater+Noida+W+Rd,+near+Xero+Degree,+Noida,+Uttar+Pradesh+201309/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x390d03e4ace55555:0x2e3bc39574ba2419?sa=X&ved=1t:57443&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-sans text-[10px] tracking-[0.25em] text-white/50 uppercase transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Find us on a map
            </a>
          </div>

          <div className="flex flex-col border-t border-white/10 pt-12 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <h5 className="mb-10 font-sans text-[10px] tracking-[0.3em] text-imxGold uppercase">
              For Inquiries
            </h5>
            <div className="flex flex-col space-y-5">
              <a
                href="tel:+919811099951"
                className="block w-fit font-serif text-4xl text-white/90 transition-all duration-500 hover:translate-x-2 hover:text-imxGold md:text-5xl"
              >
                +91 98110 99951
              </a>
              <a
                href="tel:+919211736232"
                className="block w-fit font-serif text-4xl text-white/90 transition-all duration-500 hover:translate-x-2 hover:text-imxGold md:text-5xl"
              >
                +91 92117 36232
              </a>
              <a
                href="mailto:contact@imxplorer.com"
                className="mt-6 block w-fit border-b border-transparent pb-1 font-sans text-sm tracking-[0.15em] text-white/50 uppercase transition-colors duration-500 hover:border-white/30 hover:text-white md:text-base"
              >
                contact@imxplorer.com
              </a>
            </div>
          </div>

          <div className="flex flex-col border-t border-white/10 pt-12 md:col-span-3 md:items-end md:border-transparent md:border-t-0 md:pt-0">
            <h5 className="mb-10 font-sans text-[10px] tracking-[0.3em] text-imxGold uppercase">
              Connect
            </h5>
            <div className="flex gap-5">
              <a
                href="https://www.instagram.com/imxplorer_global/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-500 hover:border-imxRed hover:bg-imxRed/10 hover:text-imxRed"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="transition-transform duration-500 group-hover:scale-110"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/imxplorer/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-500 hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
                aria-label="LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="transition-transform duration-500 group-hover:scale-110"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=919811099951&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-500 hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
                aria-label="WhatsApp"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="transition-transform duration-500 group-hover:scale-110"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-10 font-sans text-[10px] tracking-[0.2em] text-white/30 uppercase md:flex-row md:gap-0 md:text-xs">
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
            <p>&copy; 2026 IMxplorer. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a
                href="#"
                className="block border-b border-transparent pb-1 transition-colors duration-300 hover:border-white/30 hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block border-b border-transparent pb-1 transition-colors duration-300 hover:border-white/30 hover:text-white"
              >
                Terms of Service
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded border border-white/5 bg-white/[0.01] px-4 py-2 shadow-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-imxGold shadow-[0_0_8px_rgba(184,148,63,0.8)]" />
            <p className="font-bold tracking-[0.25em] text-imxGold">IATA Accredited</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
