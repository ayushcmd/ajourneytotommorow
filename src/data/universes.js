// Central place to describe every "saga" value used in movies.json.
// Add a new universe here whenever you add a new saga to a movie entry —
// the UI (UniverseTabs + MovieCard badge) will pick it up automatically.

export const UNIVERSE_ORDER = [
  "nolan",
  "dceu",
  "dcu",
  "elseworlds",
  "joker",
  "animated",
];

export const UNIVERSE_META = {
  nolan: {
    label: "The Dark Knight Trilogy",
    short: "Nolanverse",
    color: "#9ca3af", // grey
  },
  dceu: {
    label: "DC Extended Universe",
    short: "DCEU",
    color: "#38bdf8", // sky blue
  },
  dcu: {
    label: "DC Universe (Gods & Monsters)",
    short: "DCU",
    color: "#d4a017", // accent gold — matches site theme
  },
  elseworlds: {
    label: "Elseworlds",
    short: "Elseworlds",
    color: "#ef4444", // red — Matt Reeves' Batman etc.
  },
  joker: {
    label: "Joker Universe",
    short: "Joker",
    color: "#a855f7", // purple
  },
  animated: {
    label: "Animated Universe",
    short: "Animated",
    color: "#22c55e", // green
  },
};

export function getUniverseMeta(key) {
  return UNIVERSE_META[key] ?? { label: key, short: key, color: "#6b7280" };
}
