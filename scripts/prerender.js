/**
 * Post-build prerender script (multi-route).
 *
 * For each public route in scripts/routes.js, spins up a local static
 * server, opens the route in headless Chromium via Puppeteer, waits for
 * React (and react-helmet) to render, and writes the fully rendered HTML
 * to build/{route}/index.html.
 *
 * This gives search-engine crawlers per-route HTML with the correct
 * <title>, <meta description>, and body content for every page.
 *
 * The static server uses an SPA rewrite so any path falls back to
 * index.html, letting React Router resolve nested routes during the
 * Puppeteer visit.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const { PUBLIC_ROUTES } = require('./routes');

const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const PORT = 45678; // unlikely to collide

/**
 * Convert a route path to its on-disk index.html target.
 *   '/'                -> build/index.html
 *   '/about'           -> build/about/index.html
 *   '/services/canada' -> build/services/canada/index.html
 */
function routeToIndexPath(route) {
  if (route === '/') {
    return path.join(BUILD_DIR, 'index.html');
  }
  return path.join(BUILD_DIR, route.replace(/^\//, ''), 'index.html');
}

async function prerender() {
  let server;
  let browser;

  try {
    const puppeteer = require('puppeteer');
    const handler = require('serve-handler');

    // SPA fallback: any unknown path serves index.html so React Router
    // can take over on the client during the Puppeteer visit.
    server = http.createServer((req, res) =>
      handler(req, res, {
        public: BUILD_DIR,
        rewrites: [{ source: '**', destination: '/index.html' }],
      })
    );

    await new Promise((resolve) => server.listen(PORT, resolve));
    console.log(`[prerender] Static server running on port ${PORT}`);

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    let okCount = 0;
    let failCount = 0;

    for (const route of PUBLIC_ROUTES) {
      try {
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 30000,
        });

        const html = await page.content();
        const target = routeToIndexPath(route);

        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, html, 'utf-8');

        const sizeKb = (Buffer.byteLength(html) / 1024).toFixed(1);
        console.log(`[prerender] ✓ ${route.padEnd(50)} ${sizeKb} KB`);
        okCount++;
      } catch (routeError) {
        console.error(`[prerender] ✗ ${route}, ${routeError.message}`);
        failCount++;
      }
    }

    // Also write build/200.html as a Netlify SPA fallback (uses homepage HTML).
    const homepageHtml = fs.readFileSync(
      path.join(BUILD_DIR, 'index.html'),
      'utf-8'
    );
    fs.writeFileSync(path.join(BUILD_DIR, '200.html'), homepageHtml, 'utf-8');

    console.log(
      `\n[prerender] Done. ${okCount} ok, ${failCount} failed, ${PUBLIC_ROUTES.length} total.`
    );
  } catch (error) {
    console.error('[prerender] Error:', error.message);
    console.error(
      "[prerender] Build will still work, pages just won't be pre-rendered."
    );
    // Don't fail the build if prerendering fails
  } finally {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.close();
    }
  }
}

prerender();
