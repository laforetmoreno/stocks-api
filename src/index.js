const express = require("express");
const port = 3000;
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => console.log("opa"));

app.listen(port, () => console.log(`Server running in ${port}`));
