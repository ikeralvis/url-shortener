// src/components/UrlHistoryList.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { memo } from "react";

interface HistoryItem {
  original: string;
  short: string;
  createdAt: string;
}

interface Props {
  history: HistoryItem[];
  onDelete: (short: string) => void;
}

const UrlHistoryList = memo(function UrlHistoryList({ history, onDelete }: Props) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Enlace copiado");
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg mb-2">No hay enlaces guardados</p>
            <p className="text-gray-500 text-sm">Los enlaces que acortes aparecerán aquí</p>
          </motion.div>
        ) : (
          history.map((item) => (
            <motion.div
              key={item.short}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex items-center justify-between bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-700/50 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex flex-col text-sm overflow-hidden flex-1 mr-4">
                <a
                  href={item.original}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-gray-300 hover:text-cyan-400 transition text-xs mb-1"
                >
                  {item.original}
                </a>
                <a
                  href={item.short}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 text-sm truncate font-semibold hover:underline"
                >
                  {item.short}
                </a>
                <span className="text-xs text-gray-500 mt-1">{item.createdAt}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => copyToClipboard(item.short)}
                  className="p-2 rounded-lg hover:bg-slate-700 text-cyan-400 transition"
                  title="Copiar"
                >
                  <Copy size={16} />
                </button>
                <a
                  href={item.short}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-slate-700 text-cyan-400 transition"
                  title="Abrir"
                >
                  <ExternalLink size={16} />
                </a>
                <button
                  onClick={() => onDelete(item.short)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
});

export default UrlHistoryList;
