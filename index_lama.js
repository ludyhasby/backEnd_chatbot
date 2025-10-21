// const express = require("express"); 
// const { connectDB } = require("./db");
// const dotenv = require("dotenv").config();
// const {GoogleGenerativeAI} = require("@google/generative-ai"); 
// const Chat = require("./models/Chat"); 
// const cors = require("cors");

// const app = express(); 

// const PORT = 3000; 

// app.use(cors()); 
// app.use(express.json()); 


// connectDB(); 

// // initialize gemini client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 
// const model = genAI.getGenerativeModel({
//     model : "gemini-2.5-flash"
// }); 

// // Chat route 
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({ reply: "Message required" });
//     }

//     await Chat.create({ sender: "user", text: message });
//     res.json({ reply: "Message saved successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// try{
//     const prompt = "Kamu adalah AI asistant untuk financial tracker website. Kerjaan kamu adalah menjawab pertanyaan seputar keuangan dan berikan kebijakan yang membantu pengguna untuk lebih financial literation, dengan tegas, mudah dipahami, dan tidak terlalu panjang. Jika tanya di luar keuangan, jawab 'maaf, pertanyaan diluar konteks'"; 
//     const result = await model.generateContent(prompt); 
//     const reply = result.response.text();

//     // save
//     await Chat.create({sender: "bot", text: reply}); 
// }catch(error){
//     res.status(500).json({message: "error comunicate with AI"}); 
//     console.log("Error comunicate with AI")
// }

// app.listen(PORT, ()=> {
//     console.log(`Server is running on Port ${PORT}`)
// }); 