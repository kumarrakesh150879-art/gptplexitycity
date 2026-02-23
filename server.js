const express = require("express");
const Replicate = require("replicate");

const app = express();
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

app.get("/", (req, res) => {
  res.send("GPT Perfect City is running 🚀");
});

module.exports = app;
