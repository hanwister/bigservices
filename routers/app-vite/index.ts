import { createServer } from "vite";
import path from "path";

let createViteServer = async () => {
  const vite = await createServer({
    root: path.join(__dirname, './apps'), // Make sure apps/ contains Vite project
    server: { middlewareMode: true },
    mode: "development",
    // mode: "production",
    // appType: "custom",
  });
  return vite;
}

let createViteRouter = async () => {
    const vite = await createViteServer();
    let router = (req, res, next) => {
        // req.originalUrl = req.originalUrl.replace(/^\/apps/, '/apps/') || '/apps/';
        // req.originalUrl = req.originalUrl.replace(/^\/nested/, '/apps/nested') || '/apps/nested/';
        req.url = req.url.replace(/^\/dist/, '/nested/dist') || '/apps/nested/';
        req.url = req.url.replace(/^\/2/, '/apps/2') || '/apps/nested/';
        // req.baseUrl = req.baseUrl.replace(/^\/nested/, '/apps') || '/apps';
        // req.href = req.href.replace(/^\/nested/, '/apps/nested') || '/apps/nested/';
        console.log('Vite handling request for:', req.url);
        vite.middlewares(req, res, next);
    }
    return router;
}

export { createViteServer, createViteRouter };