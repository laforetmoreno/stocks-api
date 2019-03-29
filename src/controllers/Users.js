const User = require("../models/User");

const create = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const users = await retrieveAll();

    users.map(user => {
      if (user.email === email) return;
    });

    const user = await User.create({
      name,
      email,
      phone
    });

    return res.json(user);
  } catch (error) {
    res.status(401).send("We could not create the user.");
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
    return res.status(404).send("This user possibly does not exist");
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
