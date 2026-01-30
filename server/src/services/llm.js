// server/src/services/llm.js
import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.MODEL || "gpt-4o-mini";

let openai = null;
if (OPENAI_API_KEY) {
  const OpenAI = (await import("openai")).default;
  openai = new OpenAI({ apiKey: OPENAI_API_KEY });
}

export async function getChatReply(prompt, history = []) {
  console.log("getChatReply called with prompt:", prompt);
  if (!openai) {
    return `MockBot: You said "${prompt}". Ask me anything!`;
  }
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    ...history,
    { role: "user", content: prompt },
  ];
  const res = await openai.chat.completions.create({
    model: MODEL,
    messages,
    temperature: 0.7,
  });
  return res.choices?.[0]?.message?.content || "(No reply)";
}

export async function* streamChatReply(prompt, history = []) {
  if (!openai) {
    const mock = `Bot (stream): You asked "${prompt}". How can I help further?`;
    for (const chunk of mock.split(" ")) {
      yield chunk + " ";
      await new Promise((r) => setTimeout(r, 100));
    }
    return;
  }
  // Optional system prompt like history can be added here
  const messages = [
    // ...history,
    { role: "user", content: prompt },
  ];
  // Controls the sampling randomness when the model generates tokens.
  // The code sends temperature: 0.7 to make outputs moderately creative but not wildly random.
  const stream = await openai.chat.completions.create({
    model: MODEL,
    messages,
    temperature: 0.7,
    stream: true,
  });
  for await (const part of stream) {
    const token = part.choices?.[0]?.delta?.content;
    if (token) yield token;
  }
}
