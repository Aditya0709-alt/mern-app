const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateFavorites } = require("../models/user");
const { Recipe } = require("../models/recipe");
const auth = require("../middleware/auth");
const route = express.Router();

//get data on user
route.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//post new user with hash password
route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(414).send("User already registered.");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "isAdmin", "favorites"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = route;
