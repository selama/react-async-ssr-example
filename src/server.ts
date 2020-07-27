import * as path from 'path';
import { Router, Request } from 'express';
import { hot } from 'bootstrap-hot-loader';
import wixExpressCsrf from '@wix/wix-express-csrf';
import wixExpressRequireHttps from '@wix/wix-express-require-https';
import * as WixNodeI18nCache from 'wix-node-i18n-cache';
import { renderAppHtmlToString } from './page';
import { FetchersResources } from './hooks/use-fetcher';
import serialize from 'serialize-javascript';

// caches translation files and serves them per request
// https://github.com/wix-private/wix-node-i18n-cache
const localI18NCache = new WixNodeI18nCache({
  localeFilePath: path.join(__dirname, 'statics', 'assets', 'locales'),
});

// This function is the main entry for our server. It accepts an express Router
// (see http://expressjs.com) and attaches routes and middlewares to it.
//
// `context` is an object with built-in services from `wix-bootstrap-ng`. See
// https://github.com/wix-platform/wix-node-platform/tree/master/bootstrap/wix-bootstrap-ng).
export default hot(module, (app: Router, context) => {
  // We load the already parsed ERB configuration (located at /templates folder).
  const config = context.config.load('react-async-ssr-example');

  // Attach CSRF protection middleware. See
  // https://github.com/wix-platform/wix-node-platform/tree/master/express/wix-express-csrf.
  app.use(wixExpressCsrf());

  // Require HTTPS by redirecting to HTTPS from HTTP. Only active in a production environment.
  // See https://github.com/wix-platform/wix-node-platform/tree/master/express/wix-express-require-https.
  app.use(wixExpressRequireHttps);

  // Attach a rendering middleware, it adds the `renderView` method to every request.
  // See https://github.com/wix-private/fed-infra/tree/master/wix-bootstrap-renderer.
  app.use(context.renderer.middleware());

  // Define a route to render our initial HTML.
  app.get('/', async (req, res) => {
    // Extract some data from every incoming request.
    const renderModel = getRenderModel(req);
    const fethchersResources: FetchersResources = { fethchersResources: {} };
    const appHtml = await renderAppHtmlToString(fethchersResources);

    // Send a response back to the client.
    res.renderView('./index.ejs', {
      ...renderModel,
      appHtml,
      fethchersResources: serialize(fethchersResources, { isJSON: true }),
    });
  });

  function getRenderModel(req: Request) {
    const { language, basename, debug } = req.aspects['web-context'];

    return {
      language,
      basename,
      messages: JSON.stringify(localI18NCache.getLocaleData(language)),
      debug: debug || process.env.NODE_ENV === 'development',
      title: 'Wix Full Stack Project Boilerplate',
      staticsDomain: config.clientTopology.staticsDomain,
    };
  }

  return app;
});
