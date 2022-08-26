// import path from 'path';
import express from 'express';

import {
  getTrips,
  addTrip,
  updateTrip,
  removeTrip,
  getUserTrips,
  // getOwnTrips,
  // addOwnTrip,
  // updateOwnTrip,
  // removeOwnTrip,
} from "../controllers/trips.controller.js";

const router = express.Router();

router
  .get(
    "/:id?",
    getTrips
  )
  .get(
	"/user/:userid",
	getUserTrips
  )
//   .post("/", addTrip)
//   .put("/:id", updateTrip)
//   .delete("/:id", removeTrip)
  

export default router;
