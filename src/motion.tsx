import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "./hooks";

/* ------------------------------------------------------------------ */
/* Cursor glow — a soft light that trails the pointer                 */
/* ------------------------------------------------------------------ */

export function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 70, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 70, damping: 22, mass: 0.6 });
  const seen = useRef(false);

  useEffect(() => {
    if (reduced) return;
    if (typeof window.matchMedia !== "function") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!seen.current) {
        seen.current = true;
        document.documentElement.classList.add("has-pointer");
      }
    };
    const onLeave = () => {
      seen.current = false;
      document.documentElement.classList.remove("has-pointer");
      x.set(-600);
      y.set(-600);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[2] h-0 w-0"
      style={{ x: sx, y: sy }}
    >
      <div
        className="absolute h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,166,64,0.05) 0%, rgba(63,208,201,0.028) 42%, transparent 70%)",
          mixBlendMode: "plus-lighter",
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Tilt + spotlight card                                               */
/* ------------------------------------------------------------------ */

export function TiltCard({
  children,
  className = "",
  tilt = 4,
  glow = "rgba(240,166,64,0.22)",
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  glow?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [hover, setHover] = useState(false);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 160, damping: 20, mass: 0.4 });

  const tX = useTransform(sy, [0, 1], [tilt, -tilt]);
  const tY = useTransform(sx, [0, 1], [-tilt, tilt]);
  const rotateX = useSpring(tX, { stiffness: 200, damping: 22, mass: 0.4 });
  const rotateY = useSpring(tY, { stiffness: 200, damping: 22, mass: 0.4 });

  const pxPct = useTransform(sx, (v) => `${v * 100}%`);
  const pyPct = useTransform(sy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${pxPct} ${pyPct}, ${glow}, transparent 70%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const style = reduced
    ? undefined
    : {
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d" as const,
      };

  return (
    <motion.div
      className={className}
      style={style}
      animate={reduced ? undefined : { y: hover ? -4 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        onLeave();
      }}
      onMouseMove={onMove}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl"
        style={{
          background: spotlight,
          opacity: hover ? 1 : 0,
          transition: "opacity 350ms ease",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll progress (used by the header)                                */
/* ------------------------------------------------------------------ */

export function ScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ scaleX, transformOrigin: "left center" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Back to top                                                         */
/* ------------------------------------------------------------------ */

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="fixed bottom-6 right-6 z-40 grid place-items-center w-11 h-11 rounded-full border border-[#2c3342] bg-[#14171f]/90 backdrop-blur text-[#b7c0d0] hover:text-white hover:border-[#4a5468] transition-colors"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Live clock                                                          */
/* ------------------------------------------------------------------ */

export function LocalClock({
  timeZone = "Asia/Kolkata",
  label = "IST",
}: {
  timeZone?: string;
  label?: string;
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  let time = "";
  try {
    time = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
  } catch {
    time = "";
  }

  return (
    <span className="font-mono tabular-nums">
      {time} {label}
    </span>
  );
}
