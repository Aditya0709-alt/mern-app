const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(8).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
    isAdmin: Joi.boolean().required(),
  });

  return schema.validate(user);
}

function validateFavorites(data) {
  const schema = Joi.object({
    favorites: Joi.array().required(),
  });
  return schema.validate(data, {
    abortEarly: false,
  });
}

exports.User = User;
exports.validate = validateUser;
exports.validateFavorites = validateFavorites;
