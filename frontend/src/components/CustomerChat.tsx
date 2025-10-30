import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, MessageCircle, X, Plus } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { TypingIndicator } from "./ui/typing-indicator";
import { SOP_CONTENT } from "@/lib/constants";
import Fuse from "fuse.js";

interface Message {
  type: "bot" | "user";
  text: string;
  options?: string[];
}

const DUMMY_APPLICATIONS = [
  { id: "NRI100234", status: "Documents under verification by Branch Staff" },
  { id: "NRI100567", status: "Application submitted for back-end processing" },
  { id: "NRI100890", status: "Under compliance review" },
  { id: "NRI100112", status: "Account opened successfully! Welcome kit dispatched" },
];

export default function CustomerChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<"chat" | "search">("chat");
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // track uploaded files
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Build Fuse index dynamically
  const buildFuse = () => {
    const dataset: { text: string; options?: string[] }[] = [];

    // SOP content
    dataset.push(...Object.values(SOP_CONTENT));

    // Chat history
    messages.forEach((m) => dataset.push({ text: m.text }));

    // Uploaded files
    uploadedFiles.forEach((f) => dataset.push({ text: f }));

    return new Fuse(dataset, {
      keys: ["text", "options"],
      threshold: 0.3,
    });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            type: "bot",
            text: "👋 Hello! I’m your personal NRI Banking Assistant.\n\nYou can chat with me or search for info.",
          },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen]);

  const handleUserMessage = async (msg: string) => {
    setMessages((prev) => [...prev, { type: "user", text: msg }]);
    setIsTyping(true);

    try {
        const res = await fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: msg })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setMessages((prev) => [...prev, { 
            type: "bot", 
            text: data.answer || "Sorry, I couldn't generate a response."
        }]);
    } catch (error) {
        console.error('Chat error:', error);
        setMessages((prev) => [...prev, { 
            type: "bot", 
            text: "Sorry, I encountered an error processing your request." 
        }]);
    } finally {
        setIsTyping(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleUserMessage(inputText.trim());
    setInputText("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // show user that upload started
      setMessages((prev) => [
        ...prev,
        { type: "user", text: `📎 Uploading file: ${file.name}` },
      ]);

      try {
        const form = new FormData();
        form.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: form,
        });

        if (!res.ok) {
          const errText = await res.text();
          setMessages((prev) => [
            ...prev,
            { type: "bot", text: `❌ Upload failed: ${errText}` },
          ]);
          return;
        }

        const json = await res.json();
        setUploadedFiles((prev) => [...prev, file.name]); // store for searching
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: `✅ Uploaded ${file.name} — ${json.chunks} chunks indexed.` },
        ]);
      } catch (err: any) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: `❌ Upload error: ${err?.message || String(err)}` },
        ]);
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
    setUploadedFiles([]);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-6 w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-glow text-white p-3 flex justify-between items-center">
              <h1 className="text-sm font-semibold">NRI Banking Assistant</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode(mode === "chat" ? "search" : "chat")}
                  className="bg-white/20 px-2 py-1 rounded-full text-xs hover:bg-white/30"
                >
                  {mode === "chat" ? "Search" : "Chat"}
                </button>
                <button
                  onClick={clearChat}
                  className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
                >
                  <Trash2 size={12} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto custom-scrollbar text-sm space-y-2">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    type={message.type}
                    text={message.text}
                    options={message.options}
                    onOptionClick={handleUserMessage}
                  />
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  className="flex items-start mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <TypingIndicator />
                  <span className="text-muted-foreground text-xs ml-2">
                    Assistant is typing...
                  </span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-2 border-t flex items-center gap-2"
            >
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* + Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
              >
                <Plus size={16} />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 rounded-full px-3 py-2 border text-sm focus:outline-none"
                placeholder={mode === "chat" ? "Type a message..." : "Search across chat, SOP, files..."}
              />

              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50"
                disabled={inputText.trim() === ""}
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}