const User = require("../models/User");
const { transporter, mailOptions } = require("./mailer");

const { MAILER_EMAIL } = process.env;

const create = async (req, res) => {
  const { name, email, message, subject } = req.body;

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
};

const retrieveAll = async (req, res) => {
  const users = await User.find();

  try {
    return res.json(users);
  } catch (error) {
    return res.status(404).send(error, "No users found.");
  }
};

const retrieveById = async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    return res.json(user);
  } catch (error) {
    return res.status(404).send("This user possibly does not exist.");
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    await user.remove();

    return res.json("User deleted successfully.");
  } catch (error) {
    return res
      .status(404)
      .send("The user can not be removed, possibly she does not.");
  }
};

module.exports = {
  create,
  retrieveAll,
  retrieveById,
  deleteUser
};
