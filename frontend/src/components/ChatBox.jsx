
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../store/user';

let socket;

export default function ChatBox({ sessionId }) {
  const { user, token } = useUserStore();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEnd = useRef();

  useEffect(() => {
    socket = io(import.meta.env.VITE_SOCKET_URL || '/', {
      auth: { token },
      query: { sessionId },
    });
    socket.on('chat', msg => setMessages(m => [...m, msg]));
    return () => { socket.disconnect(); };
  }, [token, sessionId]);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = e => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('chat', { text: input });
      setInput('');
    }
  };

  return (
    <div className="bg-[#1a110a]/90 rounded-2xl shadow-dnd p-4 max-w-md w-full mx-auto mt-3">
      <div className="h-44 overflow-y-auto mb-3 bg-[#22140d]/70 rounded-xl p-2 text-dndgold/90 text-sm">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-1 ${msg.userRole === 'gm' ? 'bg-dndred/30 text-dndgold px-1 rounded' : ''}`}
              >
                <span className="font-dnd text-dndgold/80">{msg.user || 'Гість'}:</span>{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(marked.parse(msg.text || '')),
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        <div ref={chatEnd} />
      </div>
      <form className="flex gap-2" onSubmit={send}>
        <input
          className="flex-1 rounded-2xl px-3 py-2 bg-[#2c1a12] border border-dndgold text-dndgold"
          placeholder="Ваше повідомлення..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="bg-dndgold text-dndred font-dnd rounded-2xl px-4">↑</button>
      </form>
    </div>
  );
}
