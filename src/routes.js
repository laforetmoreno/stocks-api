const routes = require("express").Router();
// const userController = require("./controllers/users");
const User = require("../models/User");

// Heathcheck
routes.get("/", (req, res) => {
  res.status(200).send("Up!");
});

// Users;
// routes.post("/users", userController.create);
routes.get("/users", async (req, res) => {
  const users = await User.find();

  try {
    return res.json(users);
  } catch (error) {
    return res.status(404).send(error, "No users found.");
  }
});

// routes.get("/users/:id", userController.retrieveById);
// routes.delete("/users/:id", userController.deleteUser);

module.exports = routes;
