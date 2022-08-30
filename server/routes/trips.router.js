// import path from 'path';
import express from 'express';

import {
  // getTrips,
  // addTrip,
  // updateTrip,
  // removeTrip,
  getUsersTrips,
  // getOwnTrips,
  addOwnTrip,
  // updateOwnTrip,
  removeOwnTrip,
} from '../controllers/trips.controller.js';

import { checkJwt } from '../auth0/authz.middleware.js';

const router = express.Router();

router
  // .get(
  //   "/:id?",
  //   getTrips
  // )
  .get('/', checkJwt, getUsersTrips)
  .post('/', checkJwt, addOwnTrip)
  // .put("/:id", checkJwt, updateTrip)
  .delete('/:id', checkJwt, removeOwnTrip);

export default router;
