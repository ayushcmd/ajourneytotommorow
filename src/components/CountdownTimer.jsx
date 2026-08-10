import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Default target — The Batman: Part II (Feb 18, 2028).
// Override via props if you want to point this at a different release
// without editing this file every time.
const DEFAULT_TARGET_DATE = new Date("February 18, 2028 00:00:00");
const DEFAULT_TITLE = "THE BATMAN: PART II";

function getTimeParts(target) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Unit({ value, label }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center min-w-[3.25rem] sm:min-w-[4rem]">
      <div className="relative h-8 sm:h-12 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="block font-mono text-2xl sm:text-4xl font-bold text-amber-400 tabular-nums"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted mt-1">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  targetDate = DEFAULT_TARGET_DATE,
  title = DEFAULT_TITLE,
}) {
  const target = targetDate instanceof Date ? targetDate : new Date(targetDate);
  const [parts, setParts] = useState(() => getTimeParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(getTimeParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!parts) {
    return (
      <div className="text-amber-400 font-display text-3xl tracking-wide">
        NOW IN THEATERS
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {title && (
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted/80">
          {title}
        </span>
      )}
      <div
        className="flex items-center gap-4 sm:gap-6 px-5 py-4 sm:px-8 sm:py-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-lg shadow-black/30"
        aria-live="polite"
      >
        <Unit value={parts.days} label="Days" />
        <span className="text-amber-400/40 text-2xl -mt-4">:</span>
        <Unit value={parts.hours} label="Hrs" />
        <span className="text-amber-400/40 text-2xl -mt-4">:</span>
        <Unit value={parts.minutes} label="Min" />
        <span className="text-amber-400/40 text-2xl -mt-4">:</span>
        <Unit value={parts.seconds} label="Sec" />
      </div>
    </div>
  );
}