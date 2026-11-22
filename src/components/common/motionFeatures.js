/* framer-motion's animation engine, split into its own file so it downloads
   after the first paint (see <LazyMotion> in App.jsx). domMax rather than the
   smaller domAnimation because the Work grid uses layout animations. */
export { domMax as default } from "framer-motion";
