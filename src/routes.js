const routes = require("express").Router();
const stockController = require("./controllers/stock");

// Heathcheck
routes.get("/heathCheck", (req, res) => {
  res.status(200).send("Up!");
});

routes.post("/", stockController.create)
routes.get("/", stockController.retrieveAll)
routes.get("/:id", stockController.retrieveById)
routes.delete("/:id", stockController.remove)
routes.put("/:id", stockController.update)

module.exports = routes;
