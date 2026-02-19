import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { FloatingShapes } from "@/components/floating-shapes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pixxle",
  description: " AI image editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>


            {/* <Header/> */}
              <main className="bg-slate-900 text-white overflow-x-hidden min-h-screen">
                <FloatingShapes/>
                <Toaster richColors/>
        {children}
              </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
