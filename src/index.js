require("dotenv").config();
const express = require("express");
const port = 8888;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();

// Database config
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => console.log(`Server running in port: ${port}`));
