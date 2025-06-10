const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");
const path = require("path");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../front")));

//La Api de dónde viene
app.post("/api/chat", async (req, res) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo", // El modelo de ia
      messages: [{ role: "user", content: message }],
    });

    res.json(completion);
  } catch (error) {
    console.error("Error al llamar a OpenRouter:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
