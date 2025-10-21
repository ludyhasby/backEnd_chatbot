const express = require("express");
const { connectDB } = require("./db");
const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("./models/Chat");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

connectDB();

// initialize gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message required" });
    }

    // save user message
    await Chat.create({ sender: "user", text: message });

    // prompt + AI response
    const prompt = `
      Kamu adalah AI asisten untuk financial tracker website. 
      Tugasmu adalah menjawab pertanyaan seputar keuangan 
      dan memberikan kebijakan yang membantu pengguna lebih literate secara finansial, 
      dengan tegas, mudah dipahami, dan tidak terlalu panjang. 
      Jika pertanyaan di luar konteks keuangan, jawab: "Maaf, pertanyaan di luar konteks."
      
      Pertanyaan pengguna: ${message}
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    // save bot reply
    await Chat.create({ sender: "bot", text: reply });

    // send reply back to frontend
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error communicating with AI:", error);
    res.status(500).json({ message: "Error communicating with AI" });
  }
});

app.get("/api/chat", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: 1 });
    res.status(200).json(chats);
  } catch (error) {
    console.error("❌ Error fetching chats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
