require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Puerto para Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("IA Creatoria backend running on port", PORT);
});
