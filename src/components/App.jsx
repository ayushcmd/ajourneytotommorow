import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import movies from "../data/movies.json";
import MovieCard from "./MovieCard.jsx";
import ProgressBar from "./ProgressBar.jsx";
import PhaseTabs from "./PhaseTabs.jsx";
import UniverseTabs from "./UniverseTabs.jsx";
import { useWatched } from "../hooks/useWatched.js";

const VIEW_STORAGE_KEY = "dcuniverse:view";
const SORT_STORAGE_KEY = "dcuniverse:sortMode";
const UNIVERSE_STORAGE_KEY = "dcuniverse:activeUniverse";
const FILTERS = [
  { key: "all", label: "All" },
  { key: "movie", label: "Movies" },
  { key: "series", label: "Series" },
];

function loadView() {
  if (typeof window === "undefined") return "timeline";
  const saved = window.localStorage.getItem(VIEW_STORAGE_KEY);
  return saved === "grid" || saved === "timeline" ? saved : "timeline";
}

function loadSortMode() {
  if (typeof window === "undefined") return "story";
  const saved = window.localStorage.getItem(SORT_STORAGE_KEY);
  return saved === "story" || saved === "release" ? saved : "story";
}

function loadUniverse() {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(UNIVERSE_STORAGE_KEY);
  return saved && saved !== "null" ? saved : null;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activePhase, setActivePhase] = useState(null); // null = all chapters
  const [activeUniverse, setActiveUniverse] = useState(loadUniverse); // null = all universes
  const [view, setView] = useState(loadView);
  const [sortMode, setSortMode] = useState(loadSortMode);
  const { watchedMap, toggleWatched } = useWatched();

  const setViewPersisted = (v) => {
    setView(v);
    window.localStorage.setItem(VIEW_STORAGE_KEY, v);
  };

  const setSortModePersisted = (s) => {
    setSortMode(s);
    window.localStorage.setItem(SORT_STORAGE_KEY, s);
  };

  const setUniversePersisted = (u) => {
    setActiveUniverse(u);
    setActivePhase(null); // reset chapter filter when switching universe
    window.localStorage.setItem(UNIVERSE_STORAGE_KEY, u ?? "null");
  };

  // HeroUniverseRail lives in a separate Astro island — it writes to
  // localStorage directly and dispatches this event so App (already
  // hydrated) picks up the change without a full page reload.
  useEffect(() => {
    function handleExternalSelect(e) {
      setUniversePersisted(e.detail ?? null);
    }
    window.addEventListener("dcuniverse:selectUniverse", handleExternalSelect);
    return () => window.removeEventListener("dcuniverse:selectUniverse", handleExternalSelect);
  }, []);

  const sorted = useMemo(() => {
    const key = sortMode === "story" ? "chronologicalYear" : "year";
    return [...movies].sort((a, b) => a[key] - b[key]);
  }, [sortMode]);

  // Movies scoped to the active universe only — feeds PhaseTabs so
  // "Chapter" options shown are relevant to whichever universe is selected.
  const universeScopedMovies = useMemo(() => {
    if (!activeUniverse) return sorted;
    return sorted.filter((item) => item.saga === activeUniverse);
  }, [sorted, activeUniverse]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return universeScopedMovies.filter((item) => {
      if (typeFilter !== "all" && item.type !== typeFilter) return false;
      if (activePhase !== null && item.phase !== activePhase) return false;
      if (!q) return true;
      const haystack = `${item.title} ${item.desc} ${item.cast} ${item.year}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [universeScopedMovies, query, typeFilter, activePhase]);

  const watchedCount = useMemo(
    () => sorted.filter((item) => watchedMap[item.id]).length,
    [sorted, watchedMap]
  );

  return (
    <div id="timeline" className="w-full scroll-mt-24">
      {/* Controls row — glass panel */}
      <div className="sticky top-3 z-30 max-w-6xl mx-auto px-4 sm:px-6 mb-4">
        <div className="flex flex-wrap items-center gap-3 justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/40 px-3 py-3">
          <div className="flex items-center gap-3 flex-wrap flex-1 min-w-[260px]">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 min-w-[260px] flex-1 max-w-sm shadow-inner shadow-black/40">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted shrink-0">
                <path d="M21 21l-4.35-4.35" />
                <circle cx="11" cy="11" r="6" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, year, cast..."
                aria-label="Search timeline"
                className="bg-transparent outline-none text-sm w-full placeholder:text-muted/70"
              />
            </div>

            <div className="relative flex items-center gap-1 flex-wrap" role="list" aria-label="Type filters">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setTypeFilter(f.key)}
                  className={`relative text-xs font-bold uppercase tracking-wide px-3 py-2 rounded-full transition-colors ${
                    typeFilter === f.key ? "text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {typeFilter === f.key && (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-accent shadow shadow-accent/30"
                    />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center gap-1 bg-white/10 rounded-xl p-1">
            {["story", "release"].map((s) => (
              <button
                key={s}
                onClick={() => setSortModePersisted(s)}
                aria-pressed={sortMode === s}
                title={
                  s === "story"
                    ? "Sort by DCU in-universe chronology"
                    : "Sort by real-world release date"
                }
                className={`relative px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors ${
                  sortMode === s ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {sortMode === s && (
                  <motion.span
                    layoutId="sort-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-accent"
                  />
                )}
                <span className="relative">{s === "story" ? "Story Order" : "Release Order"}</span>
              </button>
            ))}
          </div>

          <div className="relative flex items-center gap-1 bg-white/10 rounded-xl p-1">
            {["timeline", "grid"].map((v) => (
              <button
                key={v}
                onClick={() => setViewPersisted(v)}
                aria-pressed={view === v}
                className={`relative px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors ${
                  view === v ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {view === v && (
                  <motion.span
                    layoutId="view-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-accent"
                  />
                )}
                <span className="relative">{v === "timeline" ? "Timeline" : "Grid"}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Universe tabs — Nolanverse / DCEU / DCU / etc. */}
      <UniverseTabs activeUniverse={activeUniverse} onSelect={setUniversePersisted} />

      {/* Chapter tabs — scoped to the active universe */}
      <PhaseTabs activePhase={activePhase} onSelect={setActivePhase} movies={universeScopedMovies} />

      {/* Progress */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <ProgressBar watchedCount={watchedCount} total={sorted.length} />
      </div>

      {/* Section heading */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/15" />
          <h2 className="font-display text-lg tracking-[0.3em] text-muted uppercase whitespace-nowrap">
            Timeline
          </h2>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/15" />
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-center text-muted py-16">
          Nothing matches "{query}". Try a different title, year, or cast member.
        </p>
      )}

      {/* Timeline view */}
      {view === "timeline" && filtered.length > 0 && (
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-accent-bright to-accent rounded-full shadow-[0_0_20px_rgba(212,160,23,0.25)]"
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {filtered.map((item, i) => (
              <div key={item.id} className="relative grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-accent z-10" />

                {i % 2 === 0 ? (
                  <>
                    <MovieCard item={item} watched={!!watchedMap[item.id]} onToggleWatched={toggleWatched} sortMode={sortMode} />
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <MovieCard item={item} watched={!!watchedMap[item.id]} onToggleWatched={toggleWatched} sortMode={sortMode} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && filtered.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              watched={!!watchedMap[item.id]}
              onToggleWatched={toggleWatched}
              layout="grid"
              sortMode={sortMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}