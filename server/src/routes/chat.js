// server/src/routes/chat.js
import express from "express";
import { getChatReply, streamChatReply } from "../services/llm.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body || {};
    if (!message) return res.status(400).json({ error: "message is required" });
    const reply = await getChatReply(message, history);
    res.json({ reply });
  } catch (err) {
    console.error("REST /chat error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/chat/stream", async (req, res) => {
  try {
    const message = req.query.message;
    const history = req.query.history ? JSON.parse(req.query.history) : [];
    if (!message) {
      res.status(400).end("message query param is required");
      return;
    }
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.write(`event: open\ndata: stream-start\n\n`);

    for await (const chunk of streamChatReply(message, history)) {
      res.write(`data: ${JSON.stringify({ token: chunk })}\n\n`);
    }

    res.write(`event: done\ndata: end\n\n`);
    res.end();
  } catch (err) {
    console.error("SSE /chat/stream error:", err);
    try {
      res.write(
        `event: error\ndata: ${JSON.stringify({
          error: "Internal server error",
        })}\n\n`
      );
      res.end();
    } catch (e) {
      console.error("SSE /chat/stream error sending error:", e);
    }
  }
});

export default router;
