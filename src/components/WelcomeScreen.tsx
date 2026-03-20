import { motion } from "framer-motion";
import { Gamepad2, Swords, Map, Newspaper, Trophy } from "lucide-react";

interface WelcomeScreenProps {
  onPrompt: (prompt: string) => void;
}

const suggestions = [
  { icon: Swords, label: "Best builds", prompt: "What are the best character builds in Elden Ring for beginners?", color: "text-primary" },
  { icon: Map, label: "Walkthrough", prompt: "Give me a step-by-step walkthrough for the first area of Baldur's Gate 3", color: "text-neon-green" },
  { icon: Newspaper, label: "Latest news", prompt: "What are the biggest gaming news and upcoming game releases this month?", color: "text-neon-purple" },
  { icon: Trophy, label: "Pro tips", prompt: "Give me advanced tips to improve my aim and positioning in Valorant", color: "text-primary" },
];

const WelcomeScreen = ({ onPrompt }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4 mb-10"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center glow-cyan">
          <Gamepad2 className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground font-mono-game glow-text-cyan">
            GG Assistant
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Your AI-powered gaming companion
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {suggestions.map((s, i) => (
          <motion.button
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            onClick={() => onPrompt(s.prompt)}
            className="flex flex-col items-start gap-2 p-4 rounded-xl bg-secondary border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-left group"
          >
            <s.icon className={`w-5 h-5 ${s.color} group-hover:drop-shadow-lg transition-all`} />
            <span className="text-xs font-medium text-foreground">{s.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-muted-foreground mt-8 text-center max-w-xs"
      >
        Ask me about game guides, strategies, news, builds, walkthroughs, or anything gaming-related!
      </motion.p>
    </div>
  );
};

export default WelcomeScreen;
