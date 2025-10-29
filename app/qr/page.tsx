"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Download, Link as LinkIcon, Copy } from "lucide-react";
import { toast } from "sonner";

export default function QRGeneratorPage() {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const generateQR = () => {
    if (!url.trim()) {
      toast.error("Introduce una URL válida");
      return;
    }

    // Usar API de QR Code (quickchart.io es gratis y sin límites)
    const qrApiUrl = `https://quickchart.io/qr?text=${encodeURIComponent(url)}&size=300&dark=06b6d4&light=0f172a`;
    setQrUrl(qrApiUrl);
    toast.success("Código QR generado");
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR descargado");
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        toast.info("Texto pegado");
      }
    } catch {
      toast.error("No se pudo acceder al portapapeles");
    }
  };

  const copyQRUrl = () => {
    navigator.clipboard.writeText(qrUrl);
    toast.success("URL del QR copiada");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3 flex items-center justify-center gap-3">
          <QrCode size={36} className="text-cyan-400" />
          Generador de QR
        </h1>
        <p className="text-gray-400">
          Crea códigos QR personalizados para tus enlaces
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-700/50 mb-6"
      >
        <div className="flex gap-2 mb-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && generateQR()}
            placeholder="Introduce tu URL aquí..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-600 bg-slate-900/50 text-gray-100 placeholder-gray-500 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
          />
          <button
            onClick={pasteFromClipboard}
            className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-cyan-400 transition shadow-lg"
            title="Pegar"
          >
            <LinkIcon size={18} />
          </button>
        </div>

        <button
          onClick={generateQR}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium transition shadow-xl hover:shadow-cyan-500/50"
        >
          <QrCode size={18} />
          Generar Código QR
        </button>
      </motion.div>

      {qrUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-cyan-500/30 text-center"
        >
          <div className="flex justify-center mb-6 bg-slate-900 p-6 rounded-xl inline-block">
            <img 
              src={qrUrl} 
              alt="QR Code" 
              className="w-[300px] h-[300px] rounded-lg"
            />
          </div>

          <div className="flex gap-3 justify-center mb-4">
            <button
              onClick={downloadQR}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 font-medium transition"
            >
              <Download size={18} />
              Descargar
            </button>
            <button
              onClick={copyQRUrl}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 font-medium transition"
            >
              <Copy size={18} />
              Copiar URL
            </button>
          </div>

          <p className="text-gray-400 text-sm break-all px-4">{url}</p>
        </motion.div>
      )}
    </div>
  );
}
