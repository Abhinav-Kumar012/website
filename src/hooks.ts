import { useEffect, useRef, useState } from "react";

/**
 * True when the OS asks for reduced motion. Opt-out signal for the
 * non-essential flourishes (typing, pointer glow, tilt).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Reveal-on-scroll: flips `shown` once the element enters the viewport.
 *
 * Uses a 0 threshold on purpose — a percentage threshold never fires for
 * sections that are taller than the viewport (the Work grid on mobile, for
 * one), which would leave their contents stuck at opacity 0.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, shown };
}

/**
 * Eased count-up used for the stat tiles. Animates from 0 to `target`
 * once `active` becomes true.
 */
export function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(() =>
    typeof requestAnimationFrame === "undefined" ? target : 0
  );

  useEffect(() => {
    if (!active || typeof requestAnimationFrame === "undefined") return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}

/**
 * Scroll-spy: returns the id of the section currently closest to the
 * middle of the viewport.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>("");
  const key = ids.join("|");

  useEffect(() => {
    const list = key.split("|").filter(Boolean);
    const els = list
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    if (typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [key]);

  return active;
}

/**
 * Types text one character at a time. Returns the visible prefix.
 */
export function useTypewriter(
  text: string,
  { speed = 24, active = true }: { speed?: number; active?: boolean } = {}
) {
  const [state, setState] = useState(() => ({
    text,
    out: active ? "" : text,
  }));

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setState({ text, out: text.slice(0, i) });
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, active]);

  if (!active) return text;
  return state.text === text ? state.out : "";
}
