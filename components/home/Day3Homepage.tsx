"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

function clampProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const scrollable = section.offsetHeight - window.innerHeight;
  if (scrollable <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(1, -rect.top / scrollable));
}

export default function Day3Homepage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cleanupTimers: number[] = [];
    let heroRan = false;

    const runHeroIntro = () => {
      if (heroRan || !rootRef.current) {
        return;
      }
      heroRan = true;

      rootRef.current.querySelectorAll<HTMLElement>(".hero-word").forEach((word) => {
        const delay = Number(word.dataset.delay ?? 0);
        const timerId = window.setTimeout(() => {
          word.classList.add("visible");
        }, delay);
        cleanupTimers.push(timerId);
      });

      cleanupTimers.push(
        window.setTimeout(() => {
          rootRef.current?.querySelector(".hero-divider")?.classList.add("visible");
        }, 560),
      );

      cleanupTimers.push(
        window.setTimeout(() => {
          rootRef.current
            ?.querySelectorAll(".hero-fade")
            .forEach((el) => el.classList.add("visible"));
        }, 620),
      );
    };

    const updateScrollWords = () => {
      const wcSection = document.getElementById("wc-section");
      if (wcSection) {
        const wcProgress = clampProgress(wcSection);
        const words = wcSection.querySelectorAll<HTMLElement>(".wc-word");
        words.forEach((word, i) => {
          word.classList.toggle("lit", wcProgress >= (i + 0.5) / words.length);
        });
      }

      const philosophySection = document.getElementById("philosophy");
      if (philosophySection) {
        const philosophyProgress = clampProgress(philosophySection);
        const words = philosophySection.querySelectorAll<HTMLElement>(".wc-word");
        words.forEach((word, i) => {
          word.classList.toggle("lit", philosophyProgress >= (i + 0.5) / words.length);
        });

        const support = philosophySection.querySelector<HTMLElement>(".wc-support");
        support?.classList.toggle("lit", philosophyProgress > 0.88);
      }
    };

    const onPreloaderDone = () => runHeroIntro();
    window.addEventListener("imx:preloader-done", onPreloaderDone);
    window.addEventListener("scroll", updateScrollWords, { passive: true });
    window.addEventListener("resize", updateScrollWords);

    if (!document.getElementById("preloader")) {
      runHeroIntro();
    }
    updateScrollWords();

    return () => {
      window.removeEventListener("imx:preloader-done", onPreloaderDone);
      window.removeEventListener("scroll", updateScrollWords);
      window.removeEventListener("resize", updateScrollWords);
      cleanupTimers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div ref={rootRef} className="relative z-10 flex w-full flex-col">
      <section className="relative flex h-[100dvh] w-full flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=85&w=2400"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-bg-img object-cover object-center"
          />
        </div>
        <div className="hero-overlay-main absolute inset-0 z-[1]" />
        <div className="hero-overlay-bottom absolute right-0 bottom-0 left-0 z-[1] h-[200px]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-8 md:px-16">
          <div className="flex-1" />

          <div className="grid grid-cols-1 items-end gap-2 md:grid-cols-2 md:gap-8">
            <div>
              <h1 className="hero-heading-main font-serif font-light tracking-tight text-white leading-[1] md:leading-[0.88]">
                <span className="hero-word" data-delay="0">
                  The
                </span>{" "}
                <span className="hero-word" data-delay="130">
                  Art
                </span>{" "}
                <span className="hero-word" data-delay="260">
                  of
                </span>
              </h1>
            </div>
            <div className="flex md:items-end md:justify-end">
              <h2 className="hero-heading-main font-serif text-white tracking-tight italic font-light text-left leading-[1] md:leading-[0.88] md:text-right">
                <span className="hero-word" data-delay="80">
                  Custom
                </span>{" "}
                <span className="hero-word" data-delay="210">
                  Travel.
                </span>
              </h2>
            </div>
          </div>

          <div className="h-12 md:h-20" />

          <div className="hero-divider h-[1px] w-full bg-white/20" />
          <div className="h-6 md:h-8" />

          <div className="flex flex-col items-start gap-6 md:grid md:grid-cols-2 md:items-end md:gap-8">
            <div className="hero-fade" style={{ transitionDelay: "0s" }}>
              <p className="mb-3 font-serif text-lg font-light text-white/90 italic md:text-2xl">
                Your freedom to explore the world.
              </p>
              <p className="max-w-md font-sans text-xs leading-relaxed tracking-wide text-white/50 md:text-sm">
                No algorithms. No ready-made packages. 100% customised travel
                from first call to safe return.
              </p>
            </div>

            <div
              className="hero-fade flex flex-row items-center justify-between gap-4 md:flex-col md:items-end md:justify-between md:gap-8"
              style={{ transitionDelay: "0.15s" }}
            >
              <Link
                href="#contact"
                className="group inline-flex items-center gap-4 border border-white/30 px-7 py-3 font-sans text-[10px] tracking-[0.3em] text-white uppercase transition-all duration-500 hover:bg-white hover:text-black md:px-8 md:py-4"
              >
                <span>Plan Your Journey</span>
                <span className="block h-[1px] w-5 bg-white/60 transition-colors group-hover:bg-black" />
              </Link>

              <div className="hidden flex-col items-end gap-2 opacity-40 md:flex">
                <span className="font-sans text-[8px] tracking-[0.4em] text-white uppercase">
                  Scroll
                </span>
                <div className="scroll-line h-8 w-[1px] bg-gradient-to-b from-white to-transparent" />
              </div>
            </div>
          </div>

          <div className="h-10 md:h-12" />
        </div>
      </section>

      <section
        id="wc-section"
        className="relative"
        style={{ height: "280vh", background: "#0a0a0a" }}
      >
        <div className="flex h-screen items-center overflow-hidden px-8 md:px-16 wc-sticky">
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="wc-big-text select-none font-serif font-light leading-none tracking-tight">
              <span className="wc-word">We</span>{" "}
              <span className="wc-word">Care</span>
              <span className="wc-word wc-dot">.</span>
            </p>
          </div>
        </div>

        <div className="wc-bleed absolute right-0 bottom-0 left-0 z-[5] h-[22vh] pointer-events-none" />
      </section>

      <section
        id="philosophy"
        className="relative bg-imxLight text-imxDark"
        style={{ height: "250vh" }}
      >
        <div className="flex h-screen items-center overflow-hidden px-8 pt-20 md:px-16 phi-sticky">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-start gap-6 md:gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="mb-4 block font-sans text-[10px] font-bold tracking-[0.3em] text-imxRed uppercase">
                Our Differentiator
              </span>
              <h2 className="font-serif text-4xl leading-tight">
                We are not a tech platform.
              </h2>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <h3 className="mb-8 select-none font-serif text-[2.2rem] leading-[1.1] tracking-tight font-light md:mb-12 md:text-7xl lg:text-[5.5rem]">
                <span className="wc-word wc-dark">We</span>{" "}
                <span className="wc-word wc-dark">are</span>{" "}
                <span className="wc-word wc-dark">a</span>{" "}
                <span className="wc-word wc-dark">people</span>{" "}
                <span className="wc-word wc-dark">business.</span>{" "}
                <span className="wc-word wc-dark">One-on-one</span>{" "}
                <span className="wc-word wc-dark">consultation,</span>{" "}
                <span className="wc-word wc-dark">flawless</span>{" "}
                <span className="wc-word wc-dark">execution.</span>
              </h3>
              <p className="wc-support max-w-2xl font-sans text-lg font-light text-black/60 md:text-2xl">
                Luxury is not just a tier; it is the care we pour into every
                itinerary. We stay with you from the first call until you
                return home safely.
                <span className="mt-8 block font-serif text-3xl text-imxDark italic">
                  The care is the luxury.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
