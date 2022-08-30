/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Trip from '../models/trip.model.js';
import User from '../models/user.model.js';
// const { errorHandler } = require("./utils");
// const logger = require("./../logger");

function errorHandler(res, err) {
  console.log(err);
  res.status(500).send(err);
}

export function getTrips(req, res) {
  const query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Trip.find(query)
    // .populate("items")
    .exec((err, trips) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && trips.length === 0) return res.status(404).send({ message: 'No trip with that ID' });
      return res.status(200).json(trips);
    });
}

export function getUsersTrips(req, res) {
  console.log(req.user);
  const query = {
    sub: req.user.sub, // ensure own trips only
  };

  if (req.params.id) {
    query._id = req.params.id;
  }

  Trip.find(query)
    .populate('place')
    .exec((err, trips) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && trips.length === 0) return res.status(404).send({ message: 'No trip with that ID' });
      return res.status(200).json(trips);
    });
}

export function getOwnTrips(req, res) {
  const query = {
    sub: req.user.sub, // ensure own trips only
  };

  if (req.params.id) {
    query._id = req.params.id;
  }
  Trip.find(query)
    .populate('place')
    .exec((err, trips) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && trips.length === 0) return res.status(404).send({ message: 'No trip with that ID' });
      return res.status(200).json(trips);
    });
}

export async function addTrip(req, res) {
  // get the user (create if not exist)
  if (!req.user) return errorHandler(res, new Error('No user provided'));
  const Auth0ID = req.user.sub;

  let user = await User.findOne({ sub: Auth0ID });

  if (!user) {
    user = await User.create({ sub: Auth0ID });
  }
  // create a trip
  const trip = await Trip.create({
    user: user._id,
    ...req.body,
  });

  // await trip.populate(["place"]);
  // put OID into user trips array and save
  user.trips.push(trip._id);
  user.save((err) => {
    if (err) return errorHandler(res, err);

    return res.status(201).json(trip);
  });
}

export async function addOwnTrip(req, res) {
  // get the user (create if not exist)
  console.log('req.user', req.user);
  if (!req.user) return errorHandler(res, 'No user provided');
  const Auth0ID = req.user.sub;
  console.log('🚀 ~ file: trips.controller.js ~ line 91 ~ addOwnTrip ~ Auth0ID', Auth0ID);

  let user = await User.findOne({ sub: Auth0ID });
  console.log('🚀 ~ file: trips.controller.js ~ line 94 ~ addOwnTrip ~ user', user);

  if (!user) {
    console.log('creating user');
    user = await User.create({ sub: Auth0ID });
  }

  // create a trip
  const trip = await Trip.create({
    user: user._id,
    ...req.body,
  });
  console.log(trip);
  // put OID into user trips array and save
  user.trips.push(trip._id);

  // await trip.populate(["place"]);
  user.save((err) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(trip);
  });
  console.log('updated user with new trip', user);
}

export function updateTrip(req, res) {
  Trip.updateOne({ _id: req.params.id }, req.body, (err, result) => {
    if (err) return errorHandler(res, err);
    /// change the object
    // obj.save()
    console.log(`result ${result}`);
    if (result.nModified === 0) return res.status(404).send({ message: 'No trip with that ID' });
    res.sendStatus(200);
  });
}

export function updateOwnTrip(req, res) {
  Trip.updateOne({ _id: req.params.id, owner: req.user.sub }, req.body, (err, result) => {
    if (err) return errorHandler(res, err);
    console.log(`result ${result}`);
    if (result.nModified === 0) return res.status(404).send({ message: 'No trip with that ID' });
    res.sendStatus(200);
  });
}

export function removeTrip(req, res) {
  const tripId = req.params.id;
  Trip.deleteOne({ _id: tripId }, (err, report) => {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (tripId && report.deletedCount === 0) {
      return res.status(404).send({ message: 'No trip with that ID' });
    }
    res.sendStatus(204);
  });
}

export function removeOwnTrip(req, res) {
  const tripId = req.params.id;
  Trip.deleteOne({ _id: tripId, owner: req.user.sub }, (err, report) => {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (tripId && report.deletedCount === 0) {
      return res.status(404).send({ message: 'No trip with that ID' });
    }
    res.sendStatus(204);
  });
}
