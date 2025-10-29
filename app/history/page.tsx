// src/app/history/page.tsx
"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import UrlHistoryList from "@/componentes/UrlHistoryList";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

interface HistoryItem {
  original: string;
  short: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>("linkly-history", []);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return history;
    
    const query = searchQuery.toLowerCase();
    return history.filter(
      (item) =>
        item.original.toLowerCase().includes(query) ||
        item.short.toLowerCase().includes(query)
    );
  }, [history, searchQuery]);

  const handleDelete = useMemo(() => (short: string) => {
    setHistory((prev) => prev.filter((item) => item.short !== short));
    toast.info("Enlace eliminado");
  }, [setHistory]);

  const handleClearAll = useMemo(() => () => {
    setHistory([]);
    setSearchQuery("");
    toast.warning("Historial borrado");
  }, [setHistory]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto mt-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Historial
        </h1>
        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-medium transition"
          >
            Borrar todo
          </button>
        )}
      </div>

      {/* Barra de búsqueda */}
      {history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6 relative"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar enlaces..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-600 bg-slate-900/50 text-gray-100 placeholder-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition"
              >
                <X size={18} />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-400 mt-2">
              {filteredHistory.length} resultado{filteredHistory.length !== 1 ? "s" : ""} encontrado{filteredHistory.length !== 1 ? "s" : ""}
            </p>
          )}
        </motion.div>
      )}

      <UrlHistoryList history={filteredHistory} onDelete={handleDelete} />
    </motion.div>
  );
}
