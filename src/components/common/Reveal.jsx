import { m } from "framer-motion";

/**
 * The site's one entrance animation: fade in and rise 24px as it scrolls into
 * view, once. Every section uses this instead of its own variant, so motion
 * feels like one system. <MotionConfig reducedMotion="user"> in App.jsx turns
 * it off for people who ask for less motion.
 */
const Reveal = ({ as = "div", delay = 0, y = 24, amount = 0.25, children, ...rest }) => {
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
