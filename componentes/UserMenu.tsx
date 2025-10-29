"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

export default function UserMenu() {
  return (
    <>
      {/* Mostrar cuando NO está autenticado */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 font-medium transition">
            <User size={16} />
            Iniciar sesión
          </button>
        </SignInButton>
      </SignedOut>

      {/* Mostrar cuando SÍ está autenticado */}
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-9 h-9 rounded-lg border-2 border-slate-600 hover:border-cyan-500 transition",
              userButtonPopoverCard: "bg-slate-800 border border-slate-700",
              userButtonPopoverActionButton: "hover:bg-slate-700",
            },
          }}
          afterSignOutUrl="/"
        />
      </SignedIn>
    </>
  );
}
