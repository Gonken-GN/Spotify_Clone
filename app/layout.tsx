import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import SupaBaseProvider from "@/providers/SupaBaseProvider";
const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupaBaseProvider>
          <Sidebar>{children}</Sidebar>
        </SupaBaseProvider>
      </body>
    </html>
  );
}
