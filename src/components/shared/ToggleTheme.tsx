import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "@/layout/ThemeProvider";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      className="relative size-10 dark:border-white/10 border border-emerald-100 rounded-md  text-primary-foreground flex items-center justify-center overflow-hidden"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "light" ? (
            <Sun className="text-black size-4" />
          ) : (
            <MoonStar className="text-emerald-100 size-4" />
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-primary-foreground mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
