/**
 * SEO component, single placement inside <Router> in App.js.
 *
 * Reads the current pathname via react-router and injects per-route
 * <title>, <meta description>, and canonical link via react-helmet.
 *
 * Page metadata lives in src/seo.config.js. To change a page's title
 * or description, edit that file, not this component.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { SITE, getPageMeta } from '../seo.config';

const SEO = () => {
  const { pathname } = useLocation();
  const meta = getPageMeta(pathname);

  // Canonical: if the page declares an explicit canonical (duplicate
  // routes pointing to a single source-of-truth URL), use that.
  // Otherwise the canonical is the current pathname.
  const canonicalPath = meta.canonical || pathname;
  const canonicalUrl = `${SITE.domain}${canonicalPath}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
