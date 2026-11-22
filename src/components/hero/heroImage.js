/* How wide the hero portrait is drawn at each breakpoint. Its height is
   0.97 x --stage-h (see Hero.css), so the width follows from the photo's
   638:1404 shape. Shared with the <link rel="preload"> that vite.config.js
   writes into index.html: if the two disagree, the browser downloads the
   photo twice. */
export const HERO_SIZES =
  "(max-width: 520px) 194px, (max-width: 900px) 230px, (max-width: 1100px) 282px, 343px";
