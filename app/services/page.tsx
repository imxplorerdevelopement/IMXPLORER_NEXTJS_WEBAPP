import type { Metadata } from "next";
import Link from "next/link";
import TravelParticleBackground from "@/components/ambient/TravelParticleBackground";

export const metadata: Metadata = {
  title: "Services | IMxplorer — The Travel Co.",
  description:
    "From international holidays and honeymoon escapes to corporate MICE and visa support — IMxplorer architects every journey around your outcome, not a fixed package.",
  keywords: [
    "international holidays",
    "domestic holidays India",
    "honeymoon travel packages",
    "golf tourism",
    "senior citizen travel",
    "multi-country itinerary",
    "corporate MICE travel",
    "study abroad consultancy",
    "visa assistance India",
    "IMxplorer services",
  ],
};

// ── Data ──────────────────────────────────────────────────────────────────────

const pillars = [
  {
    code: "01",
    title: "Holidays & Leisure",
    tagline: "Every kind of getaway, crafted to the last detail.",
    body:
      "From sprawling international itineraries to weekend escapes within India — we build each holiday around your pace, comfort, and intent, not a brochure.",
    accentColor: "#c8922a",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    services: [
      {
        name: "International Holidays",
        desc: "Fully managed overseas travel — flights, hotels, transfers, guided experiences, and 24/7 on-trip support across every continent.",
      },
      {
        name: "Domestic Holidays",
        desc: "Curated India itineraries from Himalayan treks to Kerala backwaters, with local expertise and seamless ground logistics.",
      },
      {
        name: "Multi-Country Itineraries",
        desc: "Seamlessly connected multi-destination trips — visa sequencing, transit logistics, and consistent comfort across every border.",
      },
      {
        name: "Honeymoon & Romantic Getaways",
        desc: "Private villas, candlelit dining, surprise experiences, and absolute discretion — designed for couples who want more than a hotel booking.",
      },
      {
        name: "Senior Citizen Friendly Travel",
        desc: "Pace-adjusted itineraries with accessibility-first accommodation, medical-grade travel insurance, and dedicated escorts when needed.",
      },
      {
        name: "Golf Tourism",
        desc: "Tee-times at world-ranked courses, club access, accommodation at resort properties, and itineraries built around your handicap and destinations.",
      },
    ],
  },
  {
    code: "02",
    title: "Study Abroad",
    tagline: "Mobility support from shortlist to departure.",
    body:
      "Advisory and documentation support for students targeting international universities — covering visa preparation, pre-departure orientation, and in-country logistics.",
    accentColor: "#3a6ea5",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    services: [
      {
        name: "University Pathway Planning",
        desc: "Destination and institution matching based on academic profile, budget, and long-term career goals.",
      },
      {
        name: "Student Visa Assistance",
        desc: "Document checklists, application support, and interview preparation for study visas across the UK, USA, Canada, Australia, and Europe.",
      },
      {
        name: "Pre-Departure Logistics",
        desc: "Flights, accommodation, forex, insurance, and orientation kits — everything handled before day one in a new country.",
      },
    ],
  },
  {
    code: "03",
    title: "Corporate & MICE",
    tagline: "Group movements built for outcomes, not headcount.",
    body:
      "Conferences, incentive trips, offsites, and large-format group movements handled with the operational discipline that corporate travel demands.",
    accentColor: "#8f2f2f",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    services: [
      {
        name: "Incentive Travel",
        desc: "High-value reward trips for sales teams and top performers — exclusive destinations, premium stays, and memorable group experiences.",
      },
      {
        name: "Conferences & Offsites",
        desc: "End-to-end management of venue sourcing, delegate travel, accommodation, F&B, and AV — across domestic and international locations.",
      },
      {
        name: "Group Movements",
        desc: "Coordinated air and ground logistics for large delegations, with real-time support and contingency planning built in.",
      },
    ],
  },
  {
    code: "04",
    title: "Travel & Logistics",
    tagline: "Every operational layer of travel, executed right.",
    body:
      "Flights, travel insurance, cruises, and ground coordination — the infrastructure behind every trip, handled with precision and genuine care.",
    accentColor: "#2d7a5e",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2C4.3 5.1 3.9 5.4 3.8 5.8l-.4 1.5c-.1.4.1.8.5 1l8.3 3.2-2.4 4.3-2.1-.8c-.4-.1-.8 0-1 .3l-.8 1.3c-.2.4-.1.8.2 1l5.9 3.9c.3.2.7.1 1-.1l.6-.7c.2-.3.2-.7 0-.9l-1-1.7 4.5-2.4 3.2 8.3c.2.4.6.6 1 .5l1.5-.4c.4-.1.7-.5.6-1z" />
      </svg>
    ),
    services: [
      {
        name: "Flight Bookings",
        desc: "Economy to business class across all carriers — with fare monitoring, flexible ticketing, and managed changes when plans shift.",
      },
      {
        name: "Travel Insurance",
        desc: "Comprehensive coverage for medical emergencies, trip cancellations, baggage, and adventure activities.",
      },
      {
        name: "Cruises",
        desc: "Ocean and river cruise bookings across all major lines — stateroom selection, shore excursions, and onboard experience planning.",
      },
    ],
  },
  {
    code: "05",
    title: "Visas & Services",
    tagline: "Less paperwork. Less risk. More time to focus on the trip.",
    body:
      "Tourist and business visa assistance, documentation review, and service workflows that cut delay risk for clients with time-sensitive travel.",
    accentColor: "#6b4ea0",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    services: [
      {
        name: "Tourist Visa Assistance",
        desc: "Application support, document checklists, and appointment coordination for short-stay visas across all major destinations.",
      },
      {
        name: "Business Visa Support",
        desc: "Fast-track documentation support for business travellers with tight timelines and complex multi-entry requirements.",
      },
      {
        name: "Forex & Travel Essentials",
        desc: "Currency exchange at competitive rates, travel SIMs, and pre-trip checklists so nothing gets missed before departure.",
      },
    ],
  },
];

const stats = [
  { value: "500+", label: "Trips Designed" },
  { value: "32+", label: "Countries Covered" },
  { value: "98%", label: "Repeat Clients" },
  { value: "5", label: "Service Pillars" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden bg-[#0c0c0e] text-imxLight">
      <TravelParticleBackground className="opacity-35" particleCount={55} maxLinkDistance={145} />

      {/* Ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 85% 10%, rgba(184,148,63,0.10), transparent 55%), radial-gradient(ellipse 50% 35% at 10% 80%, rgba(143,47,47,0.12), transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <section className="pt-44 pb-20 md:pt-56 md:pb-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-brand text-[0.58rem] tracking-[0.42em] text-imxGold uppercase mb-5">
                What We Do
              </p>
              <h1
                className="font-serif font-light text-white"
                style={{ fontSize: "clamp(3rem, 7vw, 5.6rem)", lineHeight: 1.03, letterSpacing: "-0.015em" }}
              >
                Every kind of journey.
                <br />
                <span className="italic" style={{ color: "rgba(246,242,233,0.45)" }}>
                  One team behind it.
                </span>
              </h1>
              <p className="mt-7 font-sans text-sm leading-relaxed text-white/55 md:text-base" style={{ fontWeight: 300, maxWidth: "52ch" }}>
                IMxplorer does not sell fixed packages. We design and execute each travel
                program around your objectives, timeline, and comfort standard — across five
                integrated service pillars.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full border px-6 py-3 font-sans text-[0.65rem] tracking-[0.22em] text-imxGold uppercase transition-all duration-300 hover:bg-imxGold/10"
                style={{ borderColor: "rgba(184,148,63,0.45)" }}
              >
                Start planning
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p className="font-sans text-[0.58rem] tracking-[0.14em] text-white/25 text-center">No commitment required</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 gap-px md:grid-cols-4" style={{ background: "rgba(255,255,255,0.05)" }}>
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-6 py-6 md:px-8" style={{ background: "#0c0c0e" }}>
                <span className="font-serif font-light text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.02em" }}>
                  {s.value}
                </span>
                <span className="font-brand text-[0.55rem] tracking-[0.28em] text-white/35 uppercase">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Thin rule */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(184,148,63,0.2) 30%, rgba(184,148,63,0.2) 70%, transparent)" }} />

        {/* ══ PILLARS ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="mb-12 flex items-center gap-5">
            <p className="font-brand text-[0.55rem] tracking-[0.38em] text-white/25 uppercase whitespace-nowrap">Five pillars</p>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          <div className="flex flex-col gap-0">
            {pillars.map((pillar, idx) => (
              <article
                key={pillar.code}
                className="group relative"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Pillar header row */}
                <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-12">
                  {/* Left: number + icon */}
                  <div className="flex items-start gap-4 md:col-span-1 md:flex-col md:gap-3 md:pt-1">
                    <span
                      className="font-brand text-[0.52rem] tracking-[0.3em] uppercase"
                      style={{ color: pillar.accentColor + "cc" }}
                    >
                      {pillar.code}
                    </span>
                    <span style={{ color: pillar.accentColor + "99" }}>{pillar.icon}</span>
                  </div>

                  {/* Center: title + tagline + body */}
                  <div className="md:col-span-5">
                    <h2
                      className="font-serif font-light text-white group-hover:text-white transition-colors duration-300"
                      style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.01em", lineHeight: 1.12 }}
                    >
                      {pillar.title}
                    </h2>
                    <p
                      className="mt-2 font-sans text-[0.7rem] tracking-[0.12em] uppercase"
                      style={{ color: pillar.accentColor + "bb", fontWeight: 500 }}
                    >
                      {pillar.tagline}
                    </p>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-white/50 md:text-[0.9rem]" style={{ fontWeight: 300, maxWidth: "46ch" }}>
                      {pillar.body}
                    </p>
                  </div>

                  {/* Right: sub-service list */}
                  <div className="md:col-span-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {pillar.services.map((svc) => (
                        <div
                          key={svc.name}
                          className="rounded-xl border p-4 transition-all duration-300 hover:border-opacity-60"
                          style={{
                            borderColor: "rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.025)",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = pillar.accentColor + "44";
                            (e.currentTarget as HTMLDivElement).style.background = pillar.accentColor + "0a";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)";
                          }}
                        >
                          <div className="mb-1.5 flex items-center gap-2">
                            <span
                              className="h-1 w-1 rounded-full shrink-0"
                              style={{ background: pillar.accentColor }}
                            />
                            <p className="font-brand text-[0.55rem] tracking-[0.22em] text-white/80 uppercase">
                              {svc.name}
                            </p>
                          </div>
                          <p className="font-sans text-[0.78rem] leading-relaxed text-white/40" style={{ fontWeight: 300 }}>
                            {svc.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Accent line — bottom of each pillar */}
                {idx === pillars.length - 1 && (
                  <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ══ BESPOKE STRIP ════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden rounded-3xl border mb-8"
          style={{ borderColor: "rgba(184,148,63,0.15)", background: "rgba(184,148,63,0.04)" }}
        >
          {/* Corner accent */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse 60% 55% at 90% 50%, rgba(184,148,63,0.09), transparent 65%)",
            }}
          />
          <div className="relative z-10 grid grid-cols-1 gap-10 p-8 md:grid-cols-2 md:items-center md:p-14">
            <div>
              <p className="font-brand text-[0.55rem] tracking-[0.38em] text-imxGold uppercase mb-4">
                Bespoke by default
              </p>
              <h2
                className="font-serif font-light text-white"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.01em" }}
              >
                Most clients use more than one pillar.
              </h2>
              <p className="mt-4 font-sans text-sm leading-relaxed text-white/50 md:text-[0.9rem]" style={{ fontWeight: 300, maxWidth: "44ch" }}>
                A student going abroad needs study advisory, visa support, and flight logistics.
                A family holiday often combines leisure planning, multi-country routing, and insurance.
                Tell us the outcome — we will architect the right combination.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full border px-8 py-4 font-sans text-[0.68rem] tracking-[0.25em] text-imxGold uppercase transition-all duration-300 hover:bg-imxGold/15"
                style={{ borderColor: "rgba(184,148,63,0.5)", background: "rgba(184,148,63,0.08)" }}
              >
                Talk to a consultant
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p className="font-sans text-[0.58rem] tracking-[0.14em] text-white/20 md:text-right">
                Free first consultation. No obligation.
              </p>
            </div>
          </div>
        </section>

        {/* ══ BOTTOM SPACER ════════════════════════════════════════════════════ */}
        <div className="pb-16" />

      </div>
    </main>
  );
}
