require("dotenv").config();
const express = require("express");
const axios = require("axios");
const multer = require("multer");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(express.static("public"));

/* 1️⃣ START GENERATION */
app.post("/start", upload.single("imageFile"), async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      imageUrl = `data:${req.file.mimetype};base64,${base64}`;
    }

    const response = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version: "MODEL_VERSION_ID",
        input: {
          image: imageUrl,
          prompt: "smooth cinematic motion"
        }
      },
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ id: response.data.id });

  } catch (err) {
    res.status(500).json({ error: "Start failed" });
  }
});

/* 2️⃣ CHECK STATUS */
app.get("/status/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.replicate.com/v1/predictions/${req.params.id}`,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`
        }
      }
    );

    res.json({
      status: response.data.status,
      output: response.data.output
    });

  } catch (err) {
    res.status(500).json({ error: "Status check failed" });
  }
});

module.exports = app;
