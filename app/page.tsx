"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import UrlForm from "@/componentes/UrlForm";
import UrlCard from "@/componentes/UrlCard";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

interface LinkItem {
  original: string;
  short: string;
  createdAt: string;
}

export default function Home() {
  const [links] = useLocalStorage<LinkItem[]>("linkly-history", []);
  const { user, isLoaded } = useUser();

  return (
    <main className="flex flex-col items-center justify-center w-full max-w-2xl p-6 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Linkly 🚀
        </h1>
        {isLoaded && user ? (
          <p className="text-gray-400 text-lg">
            Hola, <span className="text-cyan-400 font-semibold">{user.firstName || user.username}</span>! 👋
          </p>
        ) : (
          <p className="text-gray-400 text-lg">
            Acorta tus enlaces de forma rápida y elegante
          </p>
        )}
      </motion.div>

      <UrlForm />

      {links.length > 0 && (
        <motion.div
          className="mt-12 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-300 flex items-center gap-2">
            <span className="text-cyan-400">→</span> Últimos enlaces
          </h2>
          <div className="flex flex-col gap-3">
            {links.slice(0, 3).map((link, i) => (
              <UrlCard key={i} original={link.original} short={link.short} />
            ))}
          </div>
        </motion.div>
      )}
    </main>
  );
}
