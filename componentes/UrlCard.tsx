"use client";

import { toast } from "sonner";

type UrlCardProps = {
  original: string;
  short: string;
};

export default function UrlCard({ original, short }: UrlCardProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(short);
      toast.success("Enlace copiado");
    } catch {
      toast.error("Error al copiar");
    }
  };

  return (
    <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-200 border border-slate-700/50 hover:border-cyan-500/30">
      <p className="text-gray-400 text-sm truncate mb-2">{original}</p>
      <div className="flex items-center justify-between gap-2">
        <a
          href={short}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 font-semibold hover:text-cyan-300 hover:underline truncate"
        >
          {short}
        </a>
        <button
          onClick={handleCopy}
          className="text-xs bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 px-4 py-2 rounded-lg text-cyan-400 font-medium transition flex-shrink-0"
        >
          Copiar
        </button>
      </div>
    </div>
  );
}
