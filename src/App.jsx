import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Where from "./components/where/Where";
import Skills from "./components/skills/Skills";
import Featured from "./components/featured/Featured";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Seo from "./components/Seo";

/* Components use the slim `m.*` elements; the engine that animates them loads
   separately, after the page is on screen. `strict` makes a stray `motion.*`
   (which would pull the whole engine back into the main bundle) an error. */
const loadMotionFeatures = () =>
  import("./components/common/motionFeatures").then((mod) => mod.default);

/* Admin is lazy: visitors never load it. */
const Admin = lazy(() => import("./components/admin/Admin"));
/* Catch-all. vercel.json rewrites every path to index.html, so without
   this an unknown URL renders a blank page with HTTP 200. */
const NotFound = lazy(() => import("./components/NotFound"));

/**
 * The whole portfolio is one continuous page. The old category pages
 * (/projects/web …) and the separate /pages/hero "More about me" page used to
 * take visitors off it with no shared navigation; those URLs still work, but
 * now land on the homepage — a category opens the Work grid on that filter.
 */
const Home = ({ category }) => (
  <>
    <Seo />
    <Navbar />
    <main>
      <Hero />
      <About />
      <Where />
      <Skills />
      <Featured initialCategory={category} />
      <Services />
      <Contact />
    </main>
    <Footer />
  </>
);

const CATEGORIES = ["web", "mobile", "design", "ai"];

const CategoryRoute = () => {
  const { category } = useParams();
  if (!CATEGORIES.includes(category)) return <Navigate to="/" replace />;
  return <Home category={category} />;
};

function App() {
  return (
    /* framer-motion animates in JS, so the CSS reduced-motion reset in
       index.css can't reach it. "user" makes it follow the OS setting. */
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <ScrollToTop />
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:category" element={<CategoryRoute />} />
            <Route
              path="/pages/hero"
              element={<Navigate to="/#about" replace />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
