import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ChatMessageProps {
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  onOptionClick?: (option: string) => void;
}

const ChatbotIcon = () => (
  <motion.div 
    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md"
    whileHover={{ scale: 1.05 }}
    animate={{ 
      boxShadow: ["0 0 15px rgba(59, 130, 246, 0.2)", "0 0 20px rgba(59, 130, 246, 0.4)", "0 0 15px rgba(59, 130, 246, 0.2)"]
    }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <span className="text-xl">🤖</span>
  </motion.div>
);

const UserIcon = () => (
  <motion.div 
    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white shadow-md"
    whileHover={{ scale: 1.05 }}
  >
    <span className="text-xl">👤</span>
  </motion.div>
);

export default function ChatMessage({ type, text, options, onOptionClick }: ChatMessageProps) {
  const isBot = type === 'bot';
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [text]);

  return (
    <motion.div
      ref={messageRef}
      className={`flex items-start gap-3 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isBot ? <ChatbotIcon /> : <UserIcon />}
      
      <motion.div 
        className={`
          flex-1 max-w-[80%] p-4 rounded-2xl
          ${isBot 
            ? 'bg-white shadow-sm border border-gray-100' 
            : 'bg-primary text-white'}
        `}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap">
          {text}
        </p>
        
        {options && options.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => onOptionClick?.(option)}
                className={`
                  px-4 py-2 text-sm rounded-full 
                  ${isBot 
                    ? 'bg-primary/10 hover:bg-primary/20 text-primary' 
                    : 'bg-white/10 hover:bg-white/20 text-white'}
                  transition-colors
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        )}
        
        <div className="mt-1 text-xs opacity-50">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </motion.div>
    </motion.div>
  );
}