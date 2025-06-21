
import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { motion, AnimatePresence } from 'framer-motion';

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
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-1 ${m.userRole === 'gm' ? 'bg-dndred/30 text-dndgold px-1 rounded' : ''}`}
              >
                <b>{m.user}:</b>{' '}
                <span dangerouslySetInnerHTML={{ __html: marked.parse(m.text || '') }} />
              </motion.div>
            ))}
          </AnimatePresence>
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
