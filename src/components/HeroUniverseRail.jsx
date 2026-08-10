import { useMemo } from "react";
import movies from "../data/movies.json";
import { UNIVERSE_ORDER, getUniverseMeta } from "../data/universes.js";

function goToUniverse(key) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("dcuniverse:activeUniverse", key ?? "null");
  window.dispatchEvent(new CustomEvent("dcuniverse:selectUniverse", { detail: key }));
  const target = document.getElementById("timeline");
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HeroUniverseRail() {
  const universes = useMemo(() => {
    const counts = {};
    movies.forEach((m) => {
      counts[m.saga] = (counts[m.saga] ?? 0) + 1;
    });
    return UNIVERSE_ORDER.filter((key) => counts[key]).map((key) => ({
      key,
      count: counts[key],
      ...getUniverseMeta(key),
    }));
  }, []);

  return (
    <>
      {/* Desktop — vertical rail pinned to the right edge of the hero */}
      <div className="hidden lg:flex flex-col absolute right-0 top-0 bottom-0 z-10 justify-center">
        {universes.map((u) => (
          <button
            key={u.key}
            type="button"
            onClick={() => goToUniverse(u.key)}
            title={u.label}
            className="group relative flex items-center gap-3 pl-5 pr-7 py-4 bg-black/45 hover:bg-black/65 backdrop-blur-sm border-l-2 transition-colors text-left"
            style={{ borderColor: u.color }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: u.color }}
            />
            <span className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/85 group-hover:text-white whitespace-nowrap">
                {u.short}
              </span>
              <span className="text-[10px] text-muted whitespace-nowrap">
                {u.count} {u.count === 1 ? "entry" : "entries"}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Mobile / tablet — horizontal scrollable chip strip */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar w-full pb-1">
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-muted mr-1">
          Universe
        </span>
        {universes.map((u) => (
          <button
            key={u.key}
            type="button"
            onClick={() => goToUniverse(u.key)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wide text-white/85 hover:border-white/35 transition-colors"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: u.color }}
            />
            {u.short}
          </button>
        ))}
      </div>
    </>
  );
}