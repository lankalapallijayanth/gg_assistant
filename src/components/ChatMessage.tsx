import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Gamepad2, Bot } from "lucide-react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

const ChatMessage = ({ message, isLatest }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 px-4 py-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
          isUser
            ? "bg-primary/20 border border-primary/30"
            : "bg-neon-purple/20 border border-neon-purple/30"
        }`}
      >
        {isUser ? (
          <Gamepad2 className="w-4 h-4 text-primary" />
        ) : (
          <Bot className="w-4 h-4 text-neon-purple" />
        )}
      </div>

      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 ${
          isUser
            ? "bg-primary/15 border border-primary/20 text-foreground"
            : "bg-secondary border border-border text-foreground"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none text-foreground [&_p]:text-foreground [&_p]:leading-relaxed [&_p]:mb-2 [&_ul]:text-foreground [&_ol]:text-foreground [&_li]:text-foreground [&_strong]:text-primary [&_code]:text-primary [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono-game [&_h1]:text-primary [&_h2]:text-primary [&_h3]:text-primary [&_a]:text-primary [&_blockquote]:border-primary/30 [&_pre]:bg-muted [&_pre]:border [&_pre]:border-border">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
        {!isUser && isLatest && message.content === "" && (
          <div className="flex gap-1.5 py-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow [animation-delay:0.3s]" />
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow [animation-delay:0.6s]" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
