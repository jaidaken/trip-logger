/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import path from 'path';
import * as url from 'url';
import placesRouter from './places.router.js';
import usersRouter from './users.router.js';
import tripsRouter from './trips.router.js';

const { NODE_ENV = 'development' } = process.env;
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function setupRoutes(app) {
  const API_ENDPOINT = '/api';
  const API_VERSION = 'v1';

  // Add routers (/api/v1/places + url frag in router)
  app.use(`${API_ENDPOINT}/${API_VERSION}/places`, placesRouter);
  app.use(`${API_ENDPOINT}/${API_VERSION}/users`, usersRouter);
  app.use(`${API_ENDPOINT}/${API_VERSION}/trips`, tripsRouter);

  // Handle non-API gets
  app.get('*', (req, res) => {
    // If AJAX call indicate a miss
    if (req.xhr) {
      return res.sendStatus(404);
    }

    // Always return the SPA file in production (because no SSR)
    if (NODE_ENV === 'production') {
      return res.sendFile(path.join(__dirname, '../../client/', 'dist/index.html'));
    }

    // Last ditch - just redirect to root URL
    res.redirect('/');
  });

  // Handle misses for POST/PUT/PATCH/DELETE, etc.
  app.all('*', (req, res) => {
    res.sendStatus(404);
  });
}
