Drop your poster/banner images here using the exact filenames referenced
in src/data/movies.json and src/data/characters.js, e.g.:

  PLACEHOLDER_Superman.jpg
  PLACEHOLDER_Peacemaker_S2.jpg
  PLACEHOLDER_Supergirl.jpg
  PLACEHOLDER_Clayface.jpg
  PLACEHOLDER_Lanterns.jpg
  PLACEHOLDER_Man_of_Tomorrow.jpg
  PLACEHOLDER_Dynamic_Duo.jpg
  PLACEHOLDER_Creature_Commandos.jpg

Until a file exists, the site shows a nice "Poster goes here" placeholder
box instead of a broken image, so it's safe to add these one at a time.
Once you add a real file, EITHER keep the "PLACEHOLDER_" filename prefix
(simplest) OR rename the file and update the matching "poster" path in
movies.json / characters.js to drop the "PLACEHOLDER_" text, that's what
tells the components to render the real image instead of the placeholder.
