"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type ServiceItem = {
  id: string;
  code: string;
  title: string;
  body: string;
  image: string;
};

const serviceItems: ServiceItem[] = [
  {
    id: "study",
    code: "01",
    title: "Study\nAbroad",
    body: "End-to-end educational pathways and visa assistance for the next generation of global citizens.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "travel",
    code: "02",
    title: "Travel &\nLogistics",
    body: "Flawless execution of complex itineraries. From private charters to global ground transport.",
    image:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "holidays",
    code: "03",
    title: "Holidays &\nLeisure",
    body: "Curated escapes to the world's most exclusive sanctuaries. Every detail arranged, nothing left to chance.",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1400",
  },
  {
    id: "corporate",
    code: "04",
    title: "Corporate\n& MICE",
    body: "Bespoke corporate retreats, offsites, and incentive trips handled with precision.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "visas",
    code: "05",
    title: "Visas &\nServices",
    body: "High-priority documentation handled with discretion. Tourist, business, and student visas.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
  },
];

const journeySteps = [
  {
    step: "01",
    title: "You Reach Out",
    body: "A call, a message, a referral. That's all it takes.",
    side: "left-card",
    top: "30vh",
  },
  {
    step: "02",
    title: "We Listen",
    body: "One-on-one. Your family, your preferences, your budget. No forms, no bots.",
    side: "right-card",
    top: "39.5vh",
  },
  {
    step: "03",
    title: "We Build It",
    body: "Flights, hotels, visas, transport, insurance. Every detail. From scratch.",
    side: "left-card",
    top: "49vh",
  },
  {
    step: "04",
    title: "We Beat The Price",
    body: "Same hotels, same flights, 90% of the time, cheaper than any OTA.",
    side: "right-card",
    top: "58.5vh",
  },
  {
    step: "05",
    title: "Everything Confirmed",
    body: "Tickets issued, visas processed, transfers booked. You just pack.",
    side: "left-card",
    top: "68vh",
  },
  {
    step: "06",
    title: "We Travel With You",
    body: "24/7 on-call support. Delays, changes, emergencies, we are there.",
    side: "right-card",
    top: "77.5vh",
  },
  {
    step: "07",
    title: "Safe Return",
    body: "Our job ends when you are home. That is why 90% come back to us.",
    side: "left-card",
    top: "86vh",
    isGold: true,
  },
] as const;
type JourneyStep = {
  step: string;
  title: string;
  body: string;
  side: "left-card" | "right-card";
  top: string;
  isGold?: boolean;
};
const typedJourneySteps: JourneyStep[] = [...journeySteps];

const journeyThresholds = [0.07, 0.21, 0.36, 0.5, 0.64, 0.79, 0.93];

const brandItems = [
  "BMW Group",
  "Samsung",
  "Amway",
  "Ryan International",
  "SBI Card",
  "Golden Grande",
];

function clampProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const scrollable = section.offsetHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return Math.max(0, Math.min(1, -rect.top / scrollable));
}

export default function Day3Homepage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const servicesNavScrollRef = useRef<HTMLDivElement | null>(null);
  const journeySectionRef = useRef<HTMLElement | null>(null);
  const journeyRoadWrapRef = useRef<HTMLDivElement | null>(null);
  const journeyPathRef = useRef<SVGPathElement | null>(null);
  const journeyHeadlightRef = useRef<SVGCircleElement | null>(null);
  const journeyPathLengthRef = useRef<number>(0);
  const serviceTimerRef = useRef<number | null>(null);
  const hasInteractedWithServicesRef = useRef(false);

  const [activeService, setActiveService] = useState(0);
  const [journeyProgress, setJourneyProgress] = useState(0);

  const activeJourneyIndex = useMemo(() => {
    let index = -1;
    for (let i = 0; i < journeyThresholds.length; i += 1) {
      if (journeyProgress >= journeyThresholds[i]) {
        index = i;
      }
    }
    return index;
  }, [journeyProgress]);

  useEffect(() => {
    const cleanupTimers: number[] = [];
    let heroRan = false;

    const runHeroIntro = () => {
      if (heroRan || !rootRef.current) return;
      heroRan = true;

      rootRef.current.querySelectorAll<HTMLElement>(".hero-word").forEach((word) => {
        const delay = Number(word.dataset.delay ?? 0);
        const timerId = window.setTimeout(() => word.classList.add("visible"), delay);
        cleanupTimers.push(timerId);
      });

      cleanupTimers.push(
        window.setTimeout(() => {
          rootRef.current?.querySelector(".hero-divider")?.classList.add("visible");
        }, 560),
      );

      cleanupTimers.push(
        window.setTimeout(() => {
          rootRef.current?.querySelectorAll(".hero-fade").forEach((el) => el.classList.add("visible"));
        }, 620),
      );
    };

    const updateScrollDrivenStates = () => {
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
        philosophySection
          .querySelector<HTMLElement>(".wc-support")
          ?.classList.toggle("lit", philosophyProgress > 0.88);
      }

      const journeySection = journeySectionRef.current;
      const path = journeyPathRef.current;
      if (!journeySection || !path || !journeyPathLengthRef.current) return;

      const sectionRect = journeySection.getBoundingClientRect();
      const scrollable = journeySection.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -sectionRect.top / scrollable));
      setJourneyProgress(progress);

      const totalLength = journeyPathLengthRef.current;
      path.style.strokeDashoffset = String(totalLength * (1 - progress));

      const headlight = journeyHeadlightRef.current;
      if (headlight) {
        try {
          const point = path.getPointAtLength(totalLength * progress);
          headlight.setAttribute("cx", String(point.x));
          headlight.setAttribute("cy", String(point.y));
        } catch {
          // ignore path sampling issues
        }
      }
    };

    const onPreloaderDone = () => runHeroIntro();
    window.addEventListener("imx:preloader-done", onPreloaderDone);
    window.addEventListener("scroll", updateScrollDrivenStates, { passive: true });
    window.addEventListener("resize", updateScrollDrivenStates);

    if (!document.getElementById("preloader")) runHeroIntro();

    if (journeyRoadWrapRef.current && window.innerWidth < 768) {
      journeyRoadWrapRef.current.style.width = "60px";
    }

    if (journeyPathRef.current) {
      try {
        const length = journeyPathRef.current.getTotalLength();
        journeyPathLengthRef.current = length;
        journeyPathRef.current.style.strokeDasharray = String(length);
        journeyPathRef.current.style.strokeDashoffset = String(length);
      } catch {
        // no-op
      }
    }

    updateScrollDrivenStates();

    return () => {
      window.removeEventListener("imx:preloader-done", onPreloaderDone);
      window.removeEventListener("scroll", updateScrollDrivenStates);
      window.removeEventListener("resize", updateScrollDrivenStates);
      cleanupTimers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const navWrap = servicesNavScrollRef.current;
    if (!navWrap) return;

    const buttons = navWrap.querySelectorAll<HTMLButtonElement>(".service-nav-btn");
    const btn = buttons[activeService];
    if (!btn) return;

    const btnLeft = btn.offsetLeft;
    const containerWidth = navWrap.clientWidth;
    navWrap.scrollTo({
      left: btnLeft - containerWidth / 2 + btn.clientWidth / 2,
      behavior: "smooth",
    });
  }, [activeService]);

  useEffect(() => {
    const startAutoplay = () => {
      if (hasInteractedWithServicesRef.current || activeService >= serviceItems.length - 1) return;

      if (serviceTimerRef.current) window.clearInterval(serviceTimerRef.current);
      serviceTimerRef.current = window.setInterval(() => {
        setActiveService((prev) => {
          if (prev >= serviceItems.length - 1) {
            if (serviceTimerRef.current) window.clearInterval(serviceTimerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    };

    const stopAutoplay = () => {
      if (serviceTimerRef.current) {
        window.clearInterval(serviceTimerRef.current);
        serviceTimerRef.current = null;
      }
    };

    const section = servicesSectionRef.current;
    if (!section) return () => stopAutoplay();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAutoplay();
          else stopAutoplay();
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      stopAutoplay();
    };
  }, [activeService]);

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
            className="hero-bg-img object-cover object-[center_40%]"
          />
        </div>
        <div className="hero-overlay-main absolute inset-0 z-[1]" />
        <div className="hero-overlay-bottom absolute right-0 bottom-0 left-0 z-[1] h-[200px]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-8 md:px-16">
          <div className="flex-1" />
          <div className="grid grid-cols-1 items-end gap-2 md:grid-cols-2 md:gap-8">
            <div>
              <h1 className="hero-heading-main font-serif font-light tracking-tight text-white leading-[1] md:leading-[0.88]">
                <span className="hero-word" data-delay="0">The</span>{" "}
                <span className="hero-word" data-delay="130">Art</span>{" "}
                <span className="hero-word" data-delay="260">of</span>
              </h1>
            </div>
            <div className="flex md:items-end md:justify-end">
              <h2 className="hero-heading-main font-serif text-white tracking-tight italic font-light text-left leading-[1] md:leading-[0.88] md:text-right">
                <span className="hero-word" data-delay="80">Custom</span>{" "}
                <span className="hero-word" data-delay="210">Travel.</span>
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
                No algorithms. No ready-made packages. 100% customised travel from first call to safe return.
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
                <span className="font-sans text-[8px] tracking-[0.4em] text-white uppercase">Scroll</span>
                <div className="scroll-line h-8 w-[1px] bg-gradient-to-b from-white to-transparent" />
              </div>
            </div>
          </div>
          <div className="h-10 md:h-12" />
        </div>
      </section>

      <section id="wc-section" className="relative" style={{ height: "280vh", background: "#0a0a0a" }}>
        <div className="wc-sticky flex h-screen items-center overflow-hidden px-8 md:px-16">
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="wc-big-text select-none font-serif font-light leading-none tracking-tight">
              <span className="wc-word">We</span> <span className="wc-word">Care</span><span className="wc-word wc-dot">.</span>
            </p>
          </div>
        </div>
        <div className="wc-bleed pointer-events-none absolute right-0 bottom-0 left-0 z-[5] h-[22vh]" />
      </section>

      <section id="philosophy" className="relative bg-imxLight text-imxDark" style={{ height: "250vh" }}>
        <div className="phi-sticky flex h-screen items-center overflow-hidden px-8 pt-20 md:px-16">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-start gap-6 md:gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="mb-4 block font-sans text-[10px] font-bold tracking-[0.3em] text-imxRed uppercase">
                Our Differentiator
              </span>
              <h2 className="font-serif text-4xl leading-tight">We are not a tech platform.</h2>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <h3 className="mb-8 select-none font-serif text-[2.2rem] leading-[1.1] tracking-tight font-light md:mb-12 md:text-7xl lg:text-[5.5rem]">
                <span className="wc-word wc-dark">We</span> <span className="wc-word wc-dark">are</span>{" "}
                <span className="wc-word wc-dark">a</span> <span className="wc-word wc-dark">people</span>{" "}
                <span className="wc-word wc-dark">business.</span>{" "}
                <span className="wc-word wc-dark">One-on-one</span>{" "}
                <span className="wc-word wc-dark">consultation,</span>{" "}
                <span className="wc-word wc-dark">flawless</span>{" "}
                <span className="wc-word wc-dark">execution.</span>
              </h3>
              <p className="wc-support max-w-2xl font-sans text-lg font-light text-black/60 md:text-2xl">
                Luxury is not just a tier; it is the care we pour into every itinerary. We stay with you from the first call
                until you return home safely.
                <span className="mt-8 block font-serif text-3xl text-imxDark italic">The care is the luxury.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services-section"
        ref={servicesSectionRef}
        className="relative flex min-h-[100dvh] flex-col bg-imxDark pt-32 pb-24 md:pb-32"
      >
        <div className="mx-auto mb-10 w-full max-w-[1400px] px-8 md:mb-16 md:px-16">
          <div className="glass-badge">
            <span className="block h-px w-4 flex-shrink-0 bg-imxRed" />
            Our Services - The Five Pillars
          </div>
        </div>

        <div className="mx-auto mb-12 w-full max-w-[1400px] overflow-x-auto px-8 md:px-16 hide-scrollbar" ref={servicesNavScrollRef}>
          <div id="services-nav" className="flex w-max items-center gap-6 pb-4 md:gap-8">
            {serviceItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`service-nav-btn ${activeService === idx ? "active" : ""}`}
                onClick={() => {
                  hasInteractedWithServicesRef.current = true;
                  if (serviceTimerRef.current) window.clearInterval(serviceTimerRef.current);
                  setActiveService(idx);
                }}
              >
                {item.code}
                <br />
                <span>{item.title.replace("\n", " ")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex-1 w-full max-w-[1400px] px-8 md:px-16">
          <div id="services-cards" className="absolute inset-0 mx-8 mb-0 md:mx-16">
            {serviceItems.map((item, idx) => (
              <article key={item.id} className={`services-card ${activeService === idx ? "active" : ""}`}>
                <div className="absolute inset-0">
                  <Image src={item.image} alt={item.title.replace("\n", " ")} fill sizes="100vw" className="object-cover" />
                </div>
                <div className="services-card__glass">
                  <span className="mb-4 block font-brand font-bold text-imxRed text-[0.6rem] tracking-[0.28em]">
                    {item.code}
                  </span>
                  <h3 className="font-serif text-white tracking-tight leading-[1.0] whitespace-pre-line">{item.title}</h3>
                  <div className="mt-5 mb-4 h-px w-10 bg-imxRed" />
                  <p className="max-w-[280px] font-sans text-xs leading-loose tracking-wider text-white/50 uppercase">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
      </section>

      <section
        id="journey-section"
        ref={journeySectionRef}
        className="relative bg-[#0a0a0a]"
        style={{ height: "320vh" }}
      >
        <div id="journey-sticky" className="relative h-screen overflow-hidden" style={{ position: "sticky", top: 0 }}>
          <div aria-hidden className="journey-particle left-[14%] top-[19%] h-[3px] w-[3px] bg-[rgba(201,168,76,0.22)]" />
          <div aria-hidden className="journey-particle right-[11%] top-[52%] h-[2px] w-[2px] bg-[rgba(201,168,76,0.18)]" />
          <div aria-hidden className="journey-particle left-[21%] top-[74%] h-[4px] w-[4px] bg-[rgba(201,168,76,0.13)]" />
          <div aria-hidden className="journey-particle right-[24%] top-[33%] h-[2px] w-[2px] bg-[rgba(201,168,76,0.17)]" />

          <div className="pointer-events-none absolute top-[7vh] right-0 left-0 z-20 text-center">
            <span className="mb-3 block font-sans text-[10px] font-bold tracking-[0.3em] text-imxRed uppercase">
              The Journey
            </span>
            <h2 className="font-serif text-white italic leading-[1.2] text-[clamp(1.5rem,3vw,2.8rem)]">
              From First Call to Safe Return.
            </h2>
          </div>

          <div
            id="journey-road-wrap"
            ref={journeyRoadWrapRef}
            className="journey-road-wrap pointer-events-none absolute left-1/2 top-[23vh] h-[70vh] w-[200px] -translate-x-1/2"
          >
            <svg viewBox="0 0 200 700" preserveAspectRatio="none" width="100%" height="100%" className="block">
              <defs>
                <linearGradient id="jGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D6052B" />
                  <stop offset="100%" stopColor="rgba(201,168,76,0.85)" />
                </linearGradient>
                <filter id="jGlow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="7" in="SourceGraphic" />
                </filter>
              </defs>

              <path
                className="road-stroke"
                d="M 100 10 C 100 38 100 58 100 70 C 100 97 50 138 50 165 C 50 192 150 233 150 260 C 150 287 50 328 50 355 C 50 382 150 423 150 450 C 150 477 50 518 50 545 C 50 572 100 603 100 630 L 100 700"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="22"
                fill="none"
                strokeLinecap="round"
              />
              <path
                className="road-stroke"
                d="M 100 10 C 100 38 100 58 100 70 C 100 97 50 138 50 165 C 50 192 150 233 150 260 C 150 287 50 328 50 355 C 50 382 150 423 150 450 C 150 477 50 518 50 545 C 50 572 100 603 100 630 L 100 700"
                stroke="rgba(201,168,76,0.13)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="7 11"
                strokeLinecap="round"
              />

              <circle ref={journeyHeadlightRef} id="j-headlight" cx="100" cy="10" r="18" fill="rgba(214,5,43,0.12)" filter="url(#jGlow)" />

              <path
                id="journey-progress-path"
                ref={journeyPathRef}
                className="road-stroke"
                d="M 100 10 C 100 38 100 58 100 70 C 100 97 50 138 50 165 C 50 192 150 233 150 260 C 150 287 50 328 50 355 C 50 382 150 423 150 450 C 150 477 50 518 50 545 C 50 572 100 603 100 630 L 100 700"
                stroke="url(#jGrad)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />

              {typedJourneySteps.map((step, i) => {
                const positions = [
                  ["100", "70", "5"],
                  ["50", "165", "5"],
                  ["150", "260", "5"],
                  ["50", "355", "5"],
                  ["150", "450", "5"],
                  ["50", "545", "5"],
                  ["100", "630", "7"],
                ] as const;
                const [cx, cy, r] = positions[i];
                return (
                  <circle
                    key={step.step}
                    className={`journey-dot ${activeJourneyIndex >= i ? "active" : ""}`}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={step.isGold ? "rgba(201,168,76,0.9)" : "#D6052B"}
                  />
                );
              })}
            </svg>
          </div>

          {typedJourneySteps.map((step, i) => (
            <div
              key={step.step}
              className={`journey-card ${step.side} ${activeJourneyIndex >= i ? "active" : ""}`}
              style={{ top: step.top }}
            >
              <span className="j-step" style={step.isGold ? { color: "rgba(201,168,76,0.9)" } : undefined}>
                {step.step}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}

          <div id="journey-finish" className={activeJourneyIndex >= 6 ? "active" : ""}>
            <span className="journey-finish-dot" />
            <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-[rgba(201,168,76,0.7)] uppercase">
              Home.
            </span>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden bg-[#f0ece9] py-20 text-imxDark">
        <div className="pointer-events-none absolute top-0 right-0 left-0 h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent" />

        <div className="mx-auto w-full max-w-[1400px] flex-shrink-0 px-8 pb-14 md:px-16 md:pb-20">
          <span className="mb-4 block font-sans text-[10px] font-bold tracking-[0.3em] text-imxRed uppercase">Trusted By</span>
          <h3 className="font-serif text-3xl text-black/60 italic md:text-5xl">
            &quot;Trust is the only currency that matters.&quot;
          </h3>
        </div>

        <div className="w-full flex-shrink-0 overflow-hidden bg-black/8">
          <div className="marquee-track gap-[1px]">
            {[...brandItems, ...brandItems].map((brand, idx) => (
              <div key={`${brand}-${idx}`} className="brand-tile">
                <span
                  className={`text-black/85 ${
                    brand === "Samsung"
                      ? "font-sans text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl"
                      : brand === "Ryan International" || brand === "Golden Grande"
                        ? "font-serif text-2xl italic md:text-3xl lg:text-4xl"
                        : "font-brand text-base font-bold tracking-[0.2em] uppercase md:text-xl lg:text-2xl"
                  }`}
                >
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-32 w-full flex-shrink-0 md:h-48" />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-[220px] bg-gradient-to-b from-transparent to-[#0d0b08]"
        />
      </section>
    </div>
  );
}
