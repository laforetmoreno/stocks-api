const routes = require("express").Router();
const userController = require("./controllers/users");

// Users
routes.post("/users", userController.create);
routes.get("/users", userController.retrieveAll);
routes.get("/users/:id", userController.retrieveById);
routes.delete("/users/:id", userController.deleteUser);

module.exports = routes;
