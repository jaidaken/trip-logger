/* eslint-disable no-unused-vars */
// import path from 'path';
import express from 'express';

import {
  getPlaces,
  addPlace,
  updatePlace,
  removePlace,
  getUsersPlaces,
  // getOwnPlaces,
  // addOwnPlace,
  // updateOwnPlace,
  // removeOwnPlace,
} from '../controllers/places.controller';

const router = express.Router();

router.get('/:id?', getPlaces).get('/user/:userid', getUsersPlaces);
// .post("/", addPlace)
// .put("/:id", updatePlace)
// .delete("/:id", removePlace)

export default router;
