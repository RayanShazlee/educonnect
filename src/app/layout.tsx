import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { AuthProvider } from "@/lib/auth-context";
import { CourseProvider } from "@/lib/course-context";
import { CourseManagementProvider } from "@/lib/course-management-context";
import { Toaster } from "sonner";

const press_start_2p = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "EduConnect - Learn with a Retro Gaming Experience",
  description: "An educational platform with a retro gaming aesthetic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${press_start_2p.variable} ${vt323.variable} min-h-screen bg-[var(--retro-bg)] text-[var(--retro-text)]`}
      >
        <AuthProvider>
          <CourseProvider>
            <CourseManagementProvider>
              <MainNav />
              <main className="container mx-auto px-4 py-6">
                <div className="retro-container">
                  {children}
                </div>
              </main>
              <Toaster 
                theme="dark" 
                position="top-right"
                toastOptions={{
                  style: {
                    background: 'var(--retro-bg)',
                    border: '2px solid var(--retro-primary)',
                    color: 'var(--retro-text)',
                    fontFamily: 'VT323, monospace'
                  }
                }}
              />
            </CourseManagementProvider>
          </CourseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
