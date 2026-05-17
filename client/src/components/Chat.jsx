import { useEffect, useState } from "react";
import { socket } from "../socket";

function Chat({ roomId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const data = {
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, data]);

    socket.emit("send-message", {
      roomId,
      data,
    });

    setMessage("");
  };

  return (
    <div className="h-full flex flex-col bg-zinc-900 text-white">
      
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-zinc-800 p-2 rounded-lg"
          >
            <p>{msg.text}</p>
            <span className="text-xs text-zinc-400">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-3 border-t border-zinc-700 flex gap-2">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-zinc-800 px-3 py-2 rounded-lg outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;