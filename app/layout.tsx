import { Inter } from "next/font/google";
import { MainNav } from "@/components/shared/Header/MainNav";
import "@/app/globals.css";
import MainProvider from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>
          <div className="flex flex-col min-h-screen">
            <MainNav />
            <main className="flex-1">{children}</main>
          </div>
        </MainProvider>
      </body>
    </html>
  );
}
