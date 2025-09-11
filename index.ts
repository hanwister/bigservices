import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { chdir } from 'node:process';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { createViteRouter } from './routers/app-vite/index.ts';

chdir(__dirname); // Optional unless you're changing working dir

const app = express();
const PORT = process.env.PORT || 3000;


// Wrap everything inside an async IIFE
const startServer = async () => {
  
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const viteRouter = await createViteRouter();
  // Mount Vite dev middleware under "/apps"
  app.use('/nested', viteRouter);
  app.use('/apps', viteRouter);
  // app.use('/2', viteRouter);

  // Example: serve static files from a different path
  // app.use('/app', express.static('app'));
  // Example: proxy API requests

  // Root route
  app.get('/', (req, res) => {
    res.send('Home Page');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Vite dev server available at http://localhost:${PORT}/apps`);
  });
};

startServer();
