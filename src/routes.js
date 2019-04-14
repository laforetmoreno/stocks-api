const routes = require("express").Router();
// const userController = require("./controllers/users");

const User = require("./models/User");
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

routes.get("/users", async (req, res) => {
  const users = await User.find();

  try {
    return res.json(users);
  } catch (error) {
    return res.status(404).send(error, "No users found.");
  }
});

routes.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    return res.json(user);
  } catch (error) {
    return res.status(404).send("This user possibly does not exist.");
  }
});

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

module.exports = routes;
