const routes = require("express").Router();
const userController = require("./controllers/users");

// Heathcheck
routes.get("/", (req, res) => {
  res.status(200).send("Up!");
});

// Users
routes.post("/users", userController.create);
routes.get("/users", userController.retrieveAll);
routes.get("/users/:id", userController.retrieveById);
routes.delete("/users/:id", userController.deleteUser);

module.exports = routes;
