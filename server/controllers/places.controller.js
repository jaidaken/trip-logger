/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import Place from '../models/place.model.js';
// const { errorHandler } = require("./utils");
// const logger = require("./../logger");

function errorHandler(res, err) {
  console.log(err);
  res.status(500).send(err);
}

export function getPlaces(req, res) {
  const query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Place.find(query)
    // .populate("items")
    .exec((err, places) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && places.length === 0) return res.status(404).send({ message: 'No place with that ID' });
      return res.status(200).json(places);
    });
}

export function getUsersPlaces(req, res) {
  const query = {
    // customerID: req.user.sub, // ensure own places only
  };

  if (req.params.id) {
    query._id = req.params.id;
  }
  Place.find(query)
    // .populate("items")
    .exec((err, places) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && places.length === 0) return res.status(404).send({ message: 'No place with that ID' });
      return res.status(200).json(places);
    });
}

export function getOwnPlaces(req, res) {
  const query = {
    customerID: req.user.sub, // ensure own places only
  };

  if (req.params.id) {
    query._id = req.params.id;
  }
  Place.find(query)
    // .populate("items")
    .exec((err, places) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && places.length === 0) return res.status(404).send({ message: 'No place with that ID' });
      return res.status(200).json(places);
    });
}

export function addPlace(req, res) {
  const placeData = req.body;
  console.log('placeData', placeData);
  const newPlace = new Place(placeData);
  newPlace.save((err, place) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(place);
  });
}

export function addOwnPlace(req, res) {
  // { items: [{}, {}], customerID: '23k42lj34278' }
  const placeData = { ...req.body, customerID: req.user.sub };
  console.log(`placeData ${placeData}`);
  const newPlace = new Place(placeData);
  newPlace.save((err, place) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(place);
  });
}

export function updatePlace(req, res) {
  Place.updateOne({ _id: req.params.id }, req.body, (err, result) => {
    if (err) return errorHandler(res, err);
    /// change the object
    // obj.save()
    console.log(`result ${result}`);
    if (result.nModified === 0) return res.status(404).send({ message: 'No place with that ID' });
    res.sendStatus(200);
  });
}

export function updateOwnPlace(req, res) {
  Place.updateOne({ _id: req.params.id, owner: req.user.sub }, req.body, (err, result) => {
    if (err) return errorHandler(res, err);
    console.log(`result ${result}`);
    if (result.nModified === 0) return res.status(404).send({ message: 'No place with that ID' });
    res.sendStatus(200);
  });
}

export function removePlace(req, res) {
  const placeId = req.params.id;
  Place.deleteOne({ _id: placeId }, (err, report) => {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (placeId && report.deletedCount === 0) {
      return res.status(404).send({ message: 'No place with that ID' });
    }
    res.sendStatus(204);
  });
}

export function removeOwnPlace(req, res) {
  const placeId = req.params.id;
  Place.deleteOne({ _id: placeId, owner: req.user.sub }, (err, report) => {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (placeId && report.deletedCount === 0) {
      return res.status(404).send({ message: 'No place with that ID' });
    }
    res.sendStatus(204);
  });
}
