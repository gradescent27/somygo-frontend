// ScrollToTop.js
//
// React Router does client-side navigation without reloading the page,
// which means the browser's scroll position persists between routes. This
// component listens for pathname changes and scrolls the window to the top.
//
// Placement: inside <Router> in App.js, anywhere before/after <SEO />.
// Renders nothing, it's a side-effect-only component.
//
// Hash links (e.g. /faq#question-3) are intentionally NOT scrolled to top,
// so in-page anchors keep working.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // let the browser handle in-page anchors
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
