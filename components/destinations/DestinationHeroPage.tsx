"use client";

import { useEffect, useState } from "react";

type DestinationCard = {
  title: string;
  body: string;
};

type DestinationHeroPageProps = {
  name: string;
  description: string;
  backgrounds: string[];
  cards: DestinationCard[];
};

export default function DestinationHeroPage({
  name,
  description,
  backgrounds,
  cards,
}: DestinationHeroPageProps) {
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
    if (backgrounds.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveBg((prev) => (prev + 1) % backgrounds.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [backgrounds]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-4 pb-16 pt-32 sm:px-7 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        {backgrounds.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms] ${
              index === activeBg ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url("${image}")` }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(4,6,10,0.78)_0%,rgba(7,9,14,0.66)_42%,rgba(8,10,14,0.86)_100%)]" />

      <div className="relative mx-auto w-full max-w-[1120px]">
        <p className="font-brand text-[0.58rem] tracking-[0.28em] text-imxGold uppercase">
          Destination
        </p>
        <h1 className="mt-4 font-serif text-[clamp(2.1rem,4.2vw,4rem)] leading-[0.98] text-white">
          {name}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">{description}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="font-serif text-2xl text-white/92">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
