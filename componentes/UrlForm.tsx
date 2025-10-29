"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Loader2, Clipboard, Scissors } from "lucide-react";

interface HistoryItem {
  original: string;
  short: string;
  createdAt: string;
}


export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>("linkly-history", []);

  // función para acortar la URL usando la API
  const shortenUrl = async () => {
    if (!url.trim()) {
      toast.error("Introduce una URL válida");
      return;
    }

    setLoading(true);
    try {
      // Usar API alternativa: TinyURL
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      
      if (!res.ok) throw new Error("Error al acortar URL");

      const newShort = await res.text();
      setShortUrl(newShort);
      toast.success("URL acortada correctamente");

      const newEntry: HistoryItem = {
        original: url,
        short: newShort,
        createdAt: new Date().toLocaleString(),
      };
      setHistory((prev) => [newEntry, ...prev]);
      
      // Limpiar el campo de entrada
      setUrl("");
    } catch (err) {
      toast.error("Error al acortar la URL. Verifica que sea válida.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      shortenUrl();
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        toast.info("Texto pegado desde el portapapeles");
      } else {
        toast.warning("No hay texto en el portapapeles");
      }
    } catch {
      toast.error("No se pudo acceder al portapapeles");
    }
  };

  const copyToClipboard = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("URL copiada al portapapeles");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-700/50"
    >
      <div className="flex gap-2 mb-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pega tu URL aquí..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-600 bg-slate-900/50 text-gray-100 placeholder-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
        />
        <button
          onClick={pasteFromClipboard}
          className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-cyan-400 transition shadow-lg"
          title="Pegar desde portapapeles"
        >
          <Clipboard size={18} />
        </button>
      </div>

      <button
        onClick={shortenUrl}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition shadow-xl hover:shadow-cyan-500/50"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Acortando...
          </>
        ) : (
          <>
            <Scissors size={18} />
            Acortar enlace
          </>
        )}
      </button>

      {shortUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center bg-slate-900/50 p-4 rounded-xl border border-cyan-500/30"
        >
          <p className="text-sm mb-2 text-gray-400 font-medium">✨ Enlace acortado:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 hover:underline break-all font-semibold text-sm"
          >
            {shortUrl}
          </a>
          <div className="mt-3">
            <button
              onClick={copyToClipboard}
              className="text-sm px-6 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 font-medium transition"
            >
              Copiar
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
