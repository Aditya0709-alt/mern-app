const route = require("express").Router();
const authMiddleware = require("../middleware/auth");
const {
  Recipe,
  validateRecipe,
  generateRecipeNum,
} = require("../models/recipe");
const { User } = require("../models/user");
const app = require("express")();
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

//get favorites
route.get('/favorites', authMiddleware, async (req, res) => {
  let recipe = await Recipe.find({ user_id: req.user._id })
  const user = await User.findById({ _id: req.user._id, favorites: recipe })
  if (!user) {
    return res.status(401).send('There is no user found.')
  }
  recipe = await Recipe.find({ _id: user.favorites })
  res.json(recipe);
})

//remove from favorites
route.delete("/favorites/:id", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id);
  const recipe = await Recipe.findById(req.params.id);
  if (!user) {
    return res.status(401).send("User didn't found.");
  }
  if (!recipe) {
    return res.status(401).send("Recipe didn't found.");
  }

  if (!recipe) return res.status(401).send('Not match.')
  user.favorites.pull(recipe._id);
  user.save();
  res.send(recipe);
})

//add to favorites
route.post("/favorites", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id);
  const recipe = await Recipe.findById(req.body._id);
  if (!recipe) {
    return res.status(401).send("Something went wrong.");
  }
  const inF = await User.findOne({ _id: req.user._id, favorites: recipe._id });
  if (inF) return res.status(401).send('The given recipe already in favorites.');
  user.favorites.push(recipe._id);
  user.save();
  res.send("Added to your favorites.");
})

//get all
route.get("/all-recipes", async (req, res) => {
  const recipes = await Recipe.find({});
  res.json(recipes);
});

//get search by params
route.get(`/search/:search`, async (req, res) => {
  const search = req.params.search;
  const data = await Recipe.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { groceries: { $regex: search, $options: "i" } },
      { instructions: { $regex: search, $options: "i" } },
    ],
  }, (err, doc) => { }
  );
  res.json(data);
})

//get recipe by id 
route.get("/:id", authMiddleware, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(401).send('No recipe found.');
  res.json(recipe);
})

//delete the recipe ans the image
route.delete("/delete/:id", authMiddleware, async (req, res) => {
  const recipe = await Recipe.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!recipe) return res.status(400).send("The recipe with the given number doesn't exist");
  const filePath = path.join(__dirname, '../public/uploads', recipe.file);
  if (!filePath) return res.status(401).send('Did not found an recipe image');

  fs.unlinkSync(filePath);
  res.send(recipe);
});

//get recipe by id
route.get("/my-recipes", authMiddleware, async (req, res) => {
  const recipes = await Recipe.find({ user_id: req.user._id });
  res.json(recipes);
});

//post a new recipe
route.post("/", authMiddleware, async (req, res) => {
  if (req.files === null) return res.status(400).send('No file upload');
  const file = req.files.file;
  file.name = Math.floor(Math.random() * 99999) + '_' + file.name;
  const filePath = path.join(__dirname, '../public/uploads', file.name);
  file.mv(filePath, err => {
    if (err) {
      return res.status(400).send(err);
    }
  });

  const { error } = validateRecipe(req.body);
  if (error) return res.status(405).send(error.details[0].message);

  let recipe = new Recipe({
    ...req.body,
    recipeNum: await generateRecipeNum(),
    user_id: req.user._id,
    file: file.name
  });
  await recipe.save();
  res.send(recipe);
});

//update the recipe with the new image deleting the old one and modify the new if not sending file update just the recipe 
route.put('/:id', authMiddleware, async (req, res) => {
  if (req.files !== null) {
    const file = req.files.file;
    if (!file) return res.status(401).send('File not found.');
    file.name = Math.floor(Math.random() * 99999) + '_' + file.name;

    const newBody = { ...req.body };
    delete newBody._id;

    const { error } = validateRecipe(newBody);
    if (error) return res.status(406).send(error.details[0].message);

    let recipe = await Recipe.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!recipe) return res.status(401).send('The given id didn\'t found.');

    let filePath = path.join(__dirname, '..', 'public/uploads', recipe.file);
    if (!filePath) return res.status(401).send('Did not found an recipe image');
    await fs.unlinkSync(filePath);

    filePath = path.join(__dirname, '..', 'public/uploads', file.name)
    file.mv(filePath, err => {
      if (err) {
        return res.status(400).send(err);
      }
    });

    const newRecipe = new Recipe({
      _id: req.params.id,
      title: req.body.title,
      file: req.files.file.name,
      groceries: req.body.groceries,
      instructions: req.body.instructions,
      recipeNum: recipe.recipeNum,
      user_id: req.user._id,
    });

    recipe = await Recipe.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, newRecipe);
    res.json(recipe);
  } else if (req.files === null) {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).send('User not found.');
    let recipe = await Recipe.findOne({ _id: req.params.id, user_id: user._id });
    if (!recipe) return res.status(401).send('Recipe not found.');

    const newBody = req.body;
    delete newBody._id;
    delete newBody.file;

    const { error } = validateRecipe(newBody);
    if (error) return res.status(400).send(error.details[0].message);


    recipe = await Recipe.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, newBody);
    res.json(recipe);
  }

})

//get user by recipe id 
route.get('/user-recipe/:id', async (req, res) => {
  let recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(401).send('No recipe found.');
  let user = await User.findById(recipe.user_id);
  if (!user) return res.status(401).send('No found a user.');
  res.json(user);
})

module.exports = route;
