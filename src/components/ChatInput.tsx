import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const quickActions = [
  { label: "🎮 Game Guide", prompt: "Give me a beginner's guide for" },
  { label: "⚔️ Strategy", prompt: "What's the best strategy for" },
  { label: "📰 Game News", prompt: "What are the latest gaming news and updates?" },
  { label: "🏆 Level Up", prompt: "How do I level up fast in" },
  { label: "💎 Resources", prompt: "Where can I find rare resources in" },
];

const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="px-4 pb-4 pt-2 space-y-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-gaming pb-1">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => setInput(action.prompt)}
            disabled={isLoading}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 disabled:opacity-50"
          >
            {action.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about any game..."
          disabled={isLoading}
          className="w-full bg-secondary border border-border rounded-xl pl-4 pr-12 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={!input.trim() || isLoading}
          whileTap={{ scale: 0.9 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:glow-cyan-sm transition-shadow"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </form>
    </div>
  );
};

export default ChatInput;
