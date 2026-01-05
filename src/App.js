import { useEffect, useRef, useState } from "react";
import { useTheme } from "./context/ThemeContext";
import {
  Container,
  Panel,
  Header,
  HeaderContent,
  ThemeToggleBtn,
  Meta,
  Messages,
  Bubble,
  InputRow,
} from "./components/styles";

const API_BASE = "http://localhost:9090/api";

export default function App() {
  const { theme, toggleTheme, currentTheme } = useTheme();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I am your AI chatbot. How can I help today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null);
  const scrollingElement = useRef(null);

  const historyForServer = messages
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    }))
    .filter((m) => m.content && m.content.length);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          history: historyForServer,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "(no reply)" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: " + err.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendStream = () => {
    if (!input.trim()) return;
    if (controllerRef.current) return;
    setLoading(true);

    const userMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const url = new URL(`${API_BASE}/chat/stream`);
    url.searchParams.set("message", userMsg.content);
    url.searchParams.set("history", JSON.stringify(historyForServer));

    // Use server sent events using EventSource to receive streaming response
    const evtSource = new EventSource(url.toString());
    controllerRef.current = evtSource;

    let acc = "";

    // Listen for messages on the default "message" event
    evtSource.onmessage = (ev) => {
      try {
        const payload = JSON.parse(ev.data);
        acc += payload.token;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (!last || last.role !== "assistant") {
            return [...updated, { role: "assistant", content: acc }];
          } else {
            updated[updated.length - 1] = { role: "assistant", content: acc };
            return updated;
          }
        });
      } catch (e) {
        console.error("Error parsing SSE message:", e);
      }
    };
    // Listen for the "done" event to close the connection
    evtSource.addEventListener("done", () => {
      stopStream();
    });

    // Listen for errors on the "error" event
    evtSource.addEventListener("error", () => {
      evtSource.close();
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error Occurred." },
      ]);
    });
  };

  // Function to stop streaming
  const stopStream = () => {
    if (controllerRef.current) {
      controllerRef.current.close();
      controllerRef.current = null;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollingElement.current) {
      scrollingElement.current.scrollTop =
        scrollingElement.current.scrollHeight;
    }
    if (!loading) {
      // Place API call here to store these messages in database or log file
      console.log("Final messages:", messages);
    }
  }, [messages, loading]);

  return (
    <Container theme={currentTheme}>
      <Panel theme={currentTheme}>
        <Header theme={currentTheme}>
          <h1>Sample Chatbot using React and Node with SEE</h1>
          <HeaderContent>
            <Meta theme={currentTheme}>{loading ? "Working..." : "Ready"}</Meta>
            <ThemeToggleBtn
              onClick={toggleTheme}
              theme={currentTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? "Dark" : "Light"}
            </ThemeToggleBtn>
          </HeaderContent>
        </Header>

        <Messages ref={scrollingElement} theme={currentTheme}>
          {messages.map((m, i) => (
            <Bubble
              key={i + 1}
              $isUser={m.role === "user"}
              theme={currentTheme}
            >
              {m.content}
            </Bubble>
          ))}
        </Messages>

        <InputRow theme={currentTheme}>
          <input
            type="text"
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? sendStream() : null)}
          />
          <button onClick={sendStream} disabled={loading}>
            Send
          </button>
          <button onClick={stopStream} disabled={!loading}>
            Stop
          </button>
        </InputRow>
      </Panel>
    </Container>
  );
}
