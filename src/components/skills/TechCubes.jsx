import {
  SiPython,
  SiTensorflow,
  SiPandas,
  SiTableau,
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiFigma,
  SiExpo,
} from "react-icons/si";
import "./TechCubes.css";

/**
 * The isometric cube cluster beside the Skills list.
 *
 * Replaces a generated PNG. Three rounds of image generation couldn't produce
 * a correct Expo mark or an accurate Power BI one, and every attempt drifted
 * on the layout. Here the logos are the *official* paths (Simple Icons, via
 * react-icons — already a dependency) and the diamond is exact by
 * construction.
 *
 * scikit-learn was dropped for Tableau: its mark is a wordmark, so at ~40px it
 * renders as a smudge rather than a logo. Tableau is in the same Skills row,
 * keeps the orange in that slot, and its mark is geometric enough to read.
 *
 * `top` / `side` are each brand's real colour, clamped into a lightness band
 * so the near-blacks (pandas #150458, Expo #000020) stay visible on a dark
 * page. `ink` is whichever of white/near-black contrasts better with its own
 * cube — which is also what the real JavaScript and React marks do.
 *
 * `row`/`col` place the cube on a 5x5 lattice, giving the 1-2-3-2-1 diamond.
 */
const CUBES = [
  {
    key: "python",
    name: "Python",
    Icon: SiPython,
    top: "#2f77b3",
    side: "#2b6294",
    ink: "#ffffff",
    row: 1,
    col: 3,
  },
  {
    key: "tensorflow",
    name: "TensorFlow",
    Icon: SiTensorflow,
    top: "#ff6f00",
    side: "#b85000",
    ink: "#15142e",
    row: 2,
    col: 2,
  },
  {
    key: "pandas",
    name: "pandas",
    Icon: SiPandas,
    top: "#7c5cf0",
    side: "#5433c4",
    ink: "#ffffff",
    row: 2,
    col: 4,
  },
  {
    key: "tableau",
    name: "Tableau",
    Icon: SiTableau,
    top: "#f7931e",
    side: "#c76e07",
    icon: "56%",
    ink: "#15142e",
    row: 3,
    col: 1,
  },
  {
    key: "react",
    name: "React",
    Icon: SiReact,
    top: "#60dafb",
    side: "#1ac9f9",
    ink: "#15142e",
    row: 3,
    col: 3,
  },
  {
    key: "javascript",
    name: "JavaScript",
    Icon: SiJavascript,
    top: "#f7df1e",
    side: "#c7b107",
    ink: "#15142e",
    row: 3,
    col: 5,
  },
  {
    key: "node",
    name: "Node.js",
    Icon: SiNodedotjs,
    top: "#4fbc32",
    side: "#378423",
    ink: "#15142e",
    row: 4,
    col: 2,
  },
  {
    key: "figma",
    name: "Figma",
    Icon: SiFigma,
    top: "#f24e1e",
    side: "#be330b",
    ink: "#15142e",
    row: 4,
    col: 4,
  },
  {
    key: "expo",
    name: "Expo",
    Icon: SiExpo,
    top: "#5a6b8c",
    side: "#4c5b78",
    ink: "#ffffff",
    row: 5,
    col: 3,
  },
];

const TechCubes = () => (
  <ul className="tech-cubes" aria-label="Technologies I work with">
    {CUBES.map((cube, i) => {
      const { key, name, top, side, ink, row, col, icon } = cube;
      /* Local, not a destructured param: eslint-plugin-react isn't installed,
         so ESLint can't tell <Icon /> is a use, and the config's
         varsIgnorePattern ^[A-Z_] covers variables but not arguments. */
      const Icon = cube.Icon;
      return (
        <li
          key={key}
          className="tech-cube"
          style={{
            "--top": top,
            "--side": side,
            "--ink": ink,
            ...(icon ? { "--icon": icon } : {}),
            "--row": row,
            "--col": col,
            "--i": i,
          }}
        >
          <span className="tech-cube__body">
            {/* Three real faces in 3D space, not a flat rhombus with a shadow
                under it — the two side planes are what give it volume. */}
            <span className="tech-cube__box">
              <span className="tech-cube__face tech-cube__face--top">
                <Icon aria-hidden="true" />
              </span>
              <span className="tech-cube__face tech-cube__face--front" />
              <span className="tech-cube__face tech-cube__face--right" />
            </span>
          </span>
          <span className="tech-cube__label">{name}</span>
        </li>
      );
    })}
  </ul>
);

export default TechCubes;
