
import { useState, useEffect, useRef } from 'react';

export default function ChatComponent({ tableId, user, messages, socket }) {
  const [input, setInput] = useState("");
  const chatEnd = useRef(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    if (input.trim() && tableId && user && user.login) {
      socket.emit("chat-message", { tableId, user, text: input });
      setInput("");
    }
  };

  return (
    <div className="border border-dndgold rounded-2xl p-2 bg-[#25160f]/80 w-60">
      <div className="flex flex-col h-full">
        <div className="flex-1 max-h-32 overflow-y-auto bg-[#20100a]/70 p-2 rounded-xl mb-2">
          {messages.map((m, i) => (
            <div key={i}><b>{m.user}:</b> {m.text}</div>
          ))}
          <div ref={chatEnd} />
        </div>
        <form onSubmit={send}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="rounded-xl w-full px-2 py-1"
            placeholder="Ваше повідомлення..."
          />
        </form>
      </div>
    </div>
  );
}
