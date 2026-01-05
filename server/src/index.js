import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors({ origin: "http://localhost:3000", credentials: true })); // CRA/CDN
app.use(express.json());

app.use("/api", chatRoutes);
app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
