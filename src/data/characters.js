// Curated: DCU characters with the most confirmed appearances, and every
// movie/series (by id, matching movies.json) they appear in — used to build
// each character's dedicated playlist page.
export const CHARACTERS = [
  {
    slug: "superman",
    name: "Superman",
    actor: "David Corenswet",
    tagline: "2 films strong",
    poster: "/posters/Superman.jpg",
    movieIds: ["superman", "man-of-tomorrow"],
  },
  {
    slug: "peacemaker",
    name: "Peacemaker",
    actor: "John Cena",
    tagline: "2 entries strong",
    poster: "/posters/Peacemaker.jpg",
    movieIds: ["peacemaker-s2", "man-of-tomorrow"],
  },
  {
    slug: "supergirl",
    name: "Supergirl",
    actor: "Milly Alcock",
    tagline: "1 film strong",
    poster: "/posters/Supergirl.jpg",
    movieIds: ["supergirl"],
  },
  {
    slug: "green-lantern",
    name: "Green Lantern",
    actor: "Kyle Chandler / Aaron Pierre",
    tagline: "1 series strong",
    poster: "/posters/Lantern.jpg",
    movieIds: ["lanterns"],
  },
  {
    slug: "lex-luthor",
    name: "Lex Luthor",
    actor: "Nicholas Hoult",
    tagline: "2 films strong",
    poster: "/posters/Luthor.jpg",
    movieIds: ["superman", "man-of-tomorrow"],
  },
];
