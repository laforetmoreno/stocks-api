const routes = require("express").Router();

const userControllers = require("./controllers/Users");

routes.post("/users", userControllers.create);
routes.get("/users", userControllers.retrieveAll);
routes.get("/users/:id", userControllers.retrieveById);
routes.delete("/users/:id", userControllers.deleteUser);

module.exports = routes;
