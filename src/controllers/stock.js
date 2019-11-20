const Stock = require("../models/Stock");

const create = async (req, res) => {
  try {
    console.log(req.body, 'body')
    const stock = await Stock.create(req.body)

    res.status(200).send({ message: 'Created', stock}); 
  } catch (error) {
    return res.status(404).send({ error, message: 'Error' });
  }
};

const retrieveAll = async (req, res) => {
  try {
    const stocks = await Stock.find();
  
    return res.status(200).send(stocks); 
  } catch (error) {
    return res.status(400).send({ error, message: 'No stocks found.' });
  }
};

const retrieveById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    return res.status(200).send(stock);
  } catch (error) {
    return res.status(404).send("This stock possibly does not exist.");
  }
};

const update = async (req, res) => {
  try {
    const stock = await Stock.update(req.params.id, req.body);

    return res.status(200).send({ message: 'Updated', stock});
  } catch (error) {
    return res.status(400).send("This stock possibly does not exist.");
  }
};

const remove = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    await stock.remove();

    return res.send({ message: "Stock deleted successfully.", stock });
  } catch (error) {
    return res
      .status(404)
      .send("The stock can not be removed, possibly she does not.");
  }
};

module.exports = {
  create,
  retrieveAll,
  update,
  retrieveById,
  remove
};
