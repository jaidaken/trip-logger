import User from "../models/users/user.model.js";
// const { errorHandler } = require("./utils");
// const logger = require("./../logger");

function errorHandler (res, err) {
  console.log(err);
  res.status(500).send(err);
}

export function getUsers(req, res) {
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

export function getOwnUsers(req, res) {
  let query = {
    customerID: req.user.sub, // ensure own users only
  };

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

export function addUser(req, res) {
  const userData = req.body;
  console.log(`userData`, userData);
  const newUser = new User(userData);
  newUser.save((err, user) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(user);
  });
}

export function addOwnUser(req, res) {
  // { items: [{}, {}], customerID: '23k42lj34278' }
  const userData = { ...req.body, customerID: req.user.sub };
  console.log(`userData ${userData}`);
  const newUser = new User(userData);
  newUser.save((err, user) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(user);
  });
}

export function updateUser(req, res) {
  User.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) return errorHandler(res, err);
    /// change the object
    // obj.save()
    console.log(`result ${result}`);
    if (result.nModified === 0)
      return res.status(404).send({ message: "No user with that ID" });
    res.sendStatus(200);
  });
}

export function updateOwnUser(req, res) {
  User.updateOne(
    { _id: req.params.id, owner: req.user.sub },
    req.body,
    function (err, result) {
      if (err) return errorHandler(res, err);
      console.log(`result ${result}`);
      if (result.nModified === 0)
        return res.status(404).send({ message: "No user with that ID" });
      res.sendStatus(200);
    }
  );
}

export function removeUser(req, res) {
  const userId = req.params.id;
  User.deleteOne({ _id: userId }, function (err, report) {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (userId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No user with that ID" });
    }
    res.sendStatus(204);
  });
}

export function removeOwnUser(req, res) {
  const userId = req.params.id;
  User.deleteOne({ _id: userId, owner: req.user.sub }, function (err, report) {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (userId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No user with that ID" });
    }
    res.sendStatus(204);
  });
}
