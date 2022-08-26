// import path from 'path';
import express from 'express';

import {
  getUsers,
  addUser,
  updateUser,
  removeUser,
  getUserUsers,
  // getOwnUsers,
  // addOwnUser,
  // updateOwnUser,
  // removeOwnUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router
  .get(
    "/:id?",
    getUsers
  )
  .get(
	"/user/:userid",
	getUserUsers
  )
//   .post("/", addUser)
//   .put("/:id", updateUser)
//   .delete("/:id", removeUser)
  

export default router;
