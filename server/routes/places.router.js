// import path from 'path';
import express from 'express';

import {
  getPlaces,
  addPlace,
  updatePlace,
  removePlace,
  getUserPlaces,
  // getOwnPlaces,
  // addOwnPlace,
  // updateOwnPlace,
  // removeOwnPlace,
} from "../controllers/places.controller.js";

const router = express.Router();

router
  .get(
    "/:id?",
    getPlaces
  )
  .get(
	"/user/:userid",
	getUserPlaces
  )
//   .post("/", addPlace)
//   .put("/:id", updatePlace)
//   .delete("/:id", removePlace)
  

export default router;
