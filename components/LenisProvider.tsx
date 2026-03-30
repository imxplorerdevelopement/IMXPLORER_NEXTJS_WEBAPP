"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.75,
      smoothWheel: true,
      syncTouch: false,
    });

    (window as unknown as { __IMX_LENIS?: Lenis }).__IMX_LENIS = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __IMX_LENIS?: Lenis }).__IMX_LENIS;
    };
  }, []);

  return null;
}
