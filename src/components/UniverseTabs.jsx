import { useMemo } from "react";
import movies from "../data/movies.json";
import { UNIVERSE_ORDER, getUniverseMeta } from "../data/universes.js";

export default function UniverseTabs({ activeUniverse, onSelect }) {
  // Only show tabs for universes that actually have movies in movies.json,
  // in the fixed UNIVERSE_ORDER so new sagas slot in predictably.
  const universes = useMemo(() => {
    const present = new Set(movies.map((m) => m.saga));
    return UNIVERSE_ORDER.filter((key) => present.has(key));
  }, []);

  return (
    <div id="universes" className="scroll-mt-24 max-w-5xl mx-auto px-4 sm:px-6 pt-6">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => onSelect(null)}
          aria-pressed={activeUniverse === null}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-colors ${
            activeUniverse === null
              ? "bg-accent text-white border-accent"
              : "bg-white/5 text-muted border-white/10 hover:border-white/25 hover:text-white"
          }`}
        >
          All Universes
        </button>

        {universes.map((key) => {
          const meta = getUniverseMeta(key);
          const active = activeUniverse === key;
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              aria-pressed={active}
              title={meta.label}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-colors ${
                active
                  ? "text-white border-transparent"
                  : "bg-white/5 text-muted border-white/10 hover:border-white/25 hover:text-white"
              }`}
              style={active ? { backgroundColor: meta.color } : undefined}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
              {meta.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
