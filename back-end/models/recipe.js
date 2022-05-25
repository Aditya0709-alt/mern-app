const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  file: {
    type: String,
    required: true,
  },
  groceries: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1024,
  },
  instructions: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 999999999,
  },
  recipeNum: {
    type: String,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

function validateRecipe(recipe) {
  const schema = Joi.object({
    title: Joi.string().required().min(2).max(255),
    groceries: Joi.string().required().min(15).max(1024),
    instructions: Joi.string().required().min(10).max(999999999),
  });
  return schema.validate(recipe);
}

async function generateRecipeNum() {
  function makeId(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  while (true) {
    let random = makeId(10);
    let recipe = await Recipe.findOne({ recipeNum: random });
    if (!recipe) {
      return String(random);
    }
  }
}

exports.Recipe = Recipe;
exports.validateRecipe = validateRecipe;
exports.generateRecipeNum = generateRecipeNum;
