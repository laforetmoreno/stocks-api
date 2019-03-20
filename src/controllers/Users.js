const Users = require("../models/Users");

const create = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const user = await Users.create({
      name,
      email,
      phone
    });

    return res.json(user);
  } catch (error) {
    res.json("We could not create the user.");
  }
};

const retrieveAll = async (req, res) => {
  const users = await Users.find();

  try {
    return res.json(users);
  } catch (error) {
    return res.status(404).json(error, "No users found.");
  }
};

const retrieveById = async (req, res) => {
  const user = await Users.findById(req.params.id);

  try {
    return res.json(user);
  } catch (error) {
    return res.status(404).json("This user possibly does not exist");
  }
};

const deleteUser = async (req, res) => {
  const user = await Users.findById(req.params.id);

  try {
    await user.remove();

    return res.json("User deleted successfully.");
  } catch (error) {
    return res
      .status(404)
      .json("The user can not be removed, possibly she does not.");
  }
};

module.exports = {
  create,
  retrieveAll,
  retrieveById,
  deleteUser
};
