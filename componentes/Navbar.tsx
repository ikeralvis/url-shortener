// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { History, Sparkles, QrCode } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50 shadow-lg"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          <Sparkles size={20} className="text-cyan-400" />
          Linkly
        </Link>

        <div className="flex items-center gap-3">
          <Link 
            href="/qr" 
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-cyan-400 transition px-3 py-2 rounded-lg hover:bg-slate-800/50"
          >
            <QrCode size={16} />
            <span className="hidden sm:inline">QR</span>
          </Link>
          
          <Link 
            href="/history" 
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-cyan-400 transition px-3 py-2 rounded-lg hover:bg-slate-800/50"
          >
            <History size={16} />
            <span className="hidden sm:inline">Historial</span>
          </Link>

          <UserMenu />
        </div>
      </div>
    </motion.nav>
  );
}
