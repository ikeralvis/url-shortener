// src/components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 w-[34px] h-[34px]" />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 hover:from-purple-200 hover:to-pink-200 dark:hover:from-gray-600 dark:hover:to-gray-500 transition shadow-md"
      aria-label="Cambiar tema"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-purple-600 dark:text-yellow-300"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
