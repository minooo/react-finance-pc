const next = require("next");
const Koa = require("koa");
const router = require("koa-route");
const LRUCache = require("lru-cache");

const port = parseInt(process.env.PORT, 10) || 8868;
const dev = process.env.NODE_ENV !== "production";
const test = process.env.NODE_TEST === "test";
const app = next({ dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(ctx) {
  return ctx.url;
}

function renderAndCache(ctx, pagePath, noCache, queryParams = null) {
  if (dev || test) ssrCache.reset();
  if (noCache === "noCache") {
    return app
      .renderToHTML(ctx.req, ctx.res, pagePath, queryParams)
      .then(html => {
        // Let's cache this page
        console.info("no cache");
        ctx.body = html;
      })
      .catch(err => {
        console.info("ERRR", err);
        return app.renderError(err, ctx.req, ctx.res, pagePath, queryParams);
      });
  }

  const key = getCacheKey(ctx.req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.info(`CACHE HIT: ${key}`);
    ctx.body = ssrCache.get(key);
    return Promise.resolve();
  }

  // If not let's render the page into HTML
  return app
    .renderToHTML(ctx.req, ctx.res, pagePath, queryParams)
    .then(html => {
      // Let's cache this page
      console.info(`CACHE MISS: ${key}`);
      ssrCache.set(key, html);
      ctx.body = html;
    })
    .catch(err => {
      console.info("ERRR", err);
      return app.renderError(err, ctx.req, ctx.res, pagePath, queryParams);
    });
}
app.prepare().then(() => {
  const server = new Koa();

  server.use(router.get("/", ctx => renderAndCache(ctx, "/index")));
  server.use(router.get("/loan", ctx => renderAndCache(ctx, "/1-loan/1-home")));
<<<<<<< HEAD
  server.use(
    router.get("/loan/speed", ctx =>
      renderAndCache(ctx, "/1-loan/2-home-speed")
    )
  );
  server.use(
    router.get("/loan/apply", ctx =>
      renderAndCache(ctx, "/1-loan/4-apply-loan")
    )
  );
  server.use(
    router.get("/loan/:id", (ctx, id) =>
      renderAndCache(ctx, "/1-loan/3-detail", null, { id })
    )
  );
=======
  server.use(router.get("/loan/speed", ctx => renderAndCache(ctx, "/1-loan/2-home-speed")));
  server.use(router.get("/loan/apply", ctx => renderAndCache(ctx, "/1-loan/4-apply-loan")));
  server.use(router.get("/loan/city", ctx => renderAndCache(ctx, "/1-loan/5-city-apply-loan")));
  server.use(router.get("/loan/:id", (ctx, id) => renderAndCache(ctx, "/1-loan/3-detail", null, { id })));
>>>>>>> master
  server.use(router.get("/card", ctx => renderAndCache(ctx, "/2-card/1-home")));
  server.use(router.get("/new", ctx => renderAndCache(ctx, "/3-new/1-home")));
  server.use(
    router.get("/new/:id", (ctx, id) =>
      renderAndCache(ctx, "/3-new/2-detail", null, { id })
    )
  );
  server.use(
    router.get("/downloadApp", ctx => renderAndCache(ctx, "/downloadApp"))
  );
  server.use(router.get("/login", ctx => renderAndCache(ctx, "/4-me/1-login")));
  server.use(router.get("/about", ctx => renderAndCache(ctx, "/about")));
  server.use(router.get("/me", ctx => renderAndCache(ctx, "/4-me/2-home")));
  server.use(
    router.get("/me/other", ctx => renderAndCache(ctx, "/4-me/3-other-data"))
  );
  server.use(
    router.get("/me/loan-apply", ctx =>
      renderAndCache(ctx, "/4-me/4-loan-apply")
    )
  );
  server.use(
    router.get("/me/card-apply", ctx =>
      renderAndCache(ctx, "/4-me/5-card-apply")
    )
  );
  server.use(
    router.get("/me/system-message", ctx =>
      renderAndCache(ctx, "/4-me/6-system-message")
    )
  );
  server.use(
    router.get("/me/apply-message", ctx =>
      renderAndCache(ctx, "/4-me/7-apply-message")
    )
  );
  server.use(router.get("/city", ctx => renderAndCache(ctx, "/city")));

  server.use(async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.listen(port, err => {
    if (err) throw err;
    console.info(`> Ready on http://localhost:${port}`);
  });
});
