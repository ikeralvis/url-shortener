import "./globals.css";
import Navbar from "@/componentes/Navbar";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: "dark" as any,
        variables: {
          colorPrimary: "#06b6d4",
          colorBackground: "#0f172a",
          colorInputBackground: "#1e293b",
          colorInputText: "#f1f5f9",
          colorText: "#f1f5f9",
          colorTextSecondary: "#94a3b8",
          colorDanger: "#ef4444",
          colorSuccess: "#10b981",
          colorWarning: "#f59e0b",
          colorNeutral: "#64748b",
        },
        elements: {
          formButtonPrimary: 
            "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium shadow-lg",
          card: "bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl",
          headerTitle: "text-gray-100 font-bold",
          headerSubtitle: "text-gray-400",
          socialButtonsBlockButton: 
            "bg-slate-700/50 border border-slate-600 hover:bg-slate-600/50 text-gray-100",
          socialButtonsBlockButtonText: "text-gray-100 font-medium",
          formFieldLabel: "text-gray-300 font-medium",
          formFieldInput: 
            "bg-slate-900/50 border-slate-600 text-gray-100 placeholder:text-gray-500",
          footerActionLink: "text-cyan-400 hover:text-cyan-300",
          identityPreviewText: "text-gray-100",
          identityPreviewEditButton: "text-cyan-400 hover:text-cyan-300",
          formFieldInputShowPasswordButton: "text-gray-400 hover:text-gray-200",
          formHeaderTitle: "text-gray-100 font-bold text-xl",
          formHeaderSubtitle: "text-gray-400",
          dividerLine: "bg-slate-700",
          dividerText: "text-gray-400",
          otpCodeFieldInput: "bg-slate-900/50 border-slate-600 text-gray-100",
          formResendCodeLink: "text-cyan-400 hover:text-cyan-300",
          alertText: "text-gray-100",
          formFieldSuccessText: "text-green-400",
          formFieldErrorText: "text-red-400",
          formFieldWarningText: "text-yellow-400",
          profileSectionTitle: "text-gray-100",
          profileSectionContent: "text-gray-300",
          badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
          avatarBox: "border-slate-600",
          userButtonPopoverCard: "bg-slate-800 border border-slate-700",
          userButtonPopoverActionButton: "text-gray-100 hover:bg-slate-700",
          userButtonPopoverActionButtonText: "text-gray-100",
          userButtonPopoverActionButtonIcon: "text-gray-400",
          userButtonPopoverFooter: "bg-slate-900/50 border-t border-slate-700",
          modalContent: "bg-slate-800/95 backdrop-blur-xl",
          modalCloseButton: "text-gray-400 hover:text-gray-200",
        },
      }}
    >
      <html lang="es">
        <body className="min-h-screen transition-colors duration-300">
          <Navbar />
          <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
