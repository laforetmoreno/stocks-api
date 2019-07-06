const routes = require("express").Router();
// const userController = require("./controllers/users");

const User = require("./models/User");
const Price = require("./models/Price");

const { transporter, mailOptions } = require("./controllers/mailer");

const { MAILER_EMAIL } = process.env;

// Heathcheck
routes.get("/", (req, res) => {
  res.status(200).send("Up!");
});

// Users;
// routes.post("/users", userController.create);
// routes.get("/users", userController.retrieveAll);
// routes.get("/users/:id", userController.retrieveById);
// routes.delete("/users/:id", userController.deleteUser);

// Create user
routes.post("/users", async (req, res) => {
  const { name, email, message, subject } = req.body;

  if (subject !== "lead") {
    transporter.sendMail(
      mailOptions(MAILER_EMAIL, email, name, message, subject),
      function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.info("Send Email: " + info.response);
        }
      }
    );
  }

  const allUsers = await User.find();

  const existingUsers = allUsers
    .map(existingUser => existingUser.email)
    .filter(userMail => userMail === email);

  if (existingUsers.length > 0) {
    res.status(409).send("User already exists.");
  } else {
    await User.create({
      email
    });

    res.status(200).send("Created");
  }
});

// Get all users
routes.get("/users/:id", async (req, res) => {
  const users = await User.find();

  if (req.params.id === process.env.ACCESS_KEY) {
    return res.json(users);
  } else {
    return res.status(401).send("access denied");
  }
});

// Get user by id
routes.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    return res.json(user);
  } catch (error) {
    return res.status(404).send("This user possibly does not exist.");
  }
});

// Delete user
routes.delete("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    await user.remove();

    return res.json("User deleted successfully.");
  } catch (error) {
    return res
      .status(404)
      .send("The user can not be removed, possibly she does not.");
  }
});

// Create price e-book
routes.post("/price/:key/:value", async (req, res) => {
  const { value, key } = req.params;

  try {
    if (key === process.env.CREATE_PRICE_KEY && value) {
      await Price.create({
        value
      });

      return res.status(201).send("Price created");
    }
  } catch (error) {
    return res.status(401).send("Access denied");
  }
});

// Get atual price e-book
routes.get("/price/:key", async (req, res) => {
  const { key } = req.params;
  const prices = await Price.find();

  try {
    if (key === process.env.PRICE_KEY) {
      const atualPrice = prices.map(price => price.value).slice(-1)[0];

      return res.status(201).send(atualPrice);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send("Error", error);
  }
});

module.exports = routes;
