import type { Variants } from "framer-motion";

/**
 * Shared entrance variants. Kept in their own module so the component files
 * only export components (keeps React Fast Refresh working).
 */

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const riseItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export const wordItem: Variants = {
  hidden: { opacity: 0, y: "0.55em", filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: "easeOut" },
  },
};
