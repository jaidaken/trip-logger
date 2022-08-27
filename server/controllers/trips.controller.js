import Trip from "../models/trip.model.js";
// const { errorHandler } = require("./utils");
// const logger = require("./../logger");

function errorHandler (res, err) {
  console.log(err);
  res.status(500).send(err);
}

export function getTrips(req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Trip.find(query)
    // .populate("items")
    .exec((err, trips) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && trips.length === 0)
        return res.status(404).send({ message: "No trip with that ID" });
      return res.status(200).json(trips);
    });
}

export function getUserTrips(req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  User.find(query)
    // .populate("items")
    .exec((err, users) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && users.length === 0)
        return res.status(404).send({ message: "No user with that ID" });
      return res.status(200).json(users);
    });
}

export function getOwnTrips(req, res) {
  let query = {
    customerID: req.user.sub, // ensure own trips only
  };

  if (req.params.id) {
    query._id = req.params.id;
  }
  Trip.find(query)
    // .populate("items")
    .exec((err, trips) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && trips.length === 0)
        return res.status(404).send({ message: "No trip with that ID" });
      return res.status(200).json(trips);
    });
}

export function addTrip(req, res) {
  const tripData = req.body;
  console.log(`tripData`, tripData);
  const newTrip = new Trip(tripData);
  newTrip.save((err, trip) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(trip);
  });
}

export function addOwnTrip(req, res) {
  // { items: [{}, {}], customerID: '23k42lj34278' }
  const tripData = { ...req.body, customerID: req.user.sub };
  console.log(`tripData ${tripData}`);
  const newTrip = new Trip(tripData);
  newTrip.save((err, trip) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(trip);
  });
}

export function updateTrip(req, res) {
  Trip.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) return errorHandler(res, err);
    /// change the object
    // obj.save()
    console.log(`result ${result}`);
    if (result.nModified === 0)
      return res.status(404).send({ message: "No trip with that ID" });
    res.sendStatus(200);
  });
}

export function updateOwnTrip(req, res) {
  Trip.updateOne(
    { _id: req.params.id, owner: req.user.sub },
    req.body,
    function (err, result) {
      if (err) return errorHandler(res, err);
      console.log(`result ${result}`);
      if (result.nModified === 0)
        return res.status(404).send({ message: "No trip with that ID" });
      res.sendStatus(200);
    }
  );
}

export function removeTrip(req, res) {
  const tripId = req.params.id;
  Trip.deleteOne({ _id: tripId }, function (err, report) {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (tripId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No trip with that ID" });
    }
    res.sendStatus(204);
  });
}

export function removeOwnTrip(req, res) {
  const tripId = req.params.id;
  Trip.deleteOne({ _id: tripId, owner: req.user.sub }, function (err, report) {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (tripId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No trip with that ID" });
    }
    res.sendStatus(204);
  });
}
