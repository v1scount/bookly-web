import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header/Header";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "next-themes";
import ThemeChangerFab from "@/components/Fab";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { signOut } from "./lib/supabase";

const inter = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Bookly",
  description: "Rate, follow and share your favorite books",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();


  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <ThemeProvider attribute="class">
            <AntdRegistry>
              <Navbar user={user}/> 
              {/* {<Header />} */}
              {children}
            </AntdRegistry>
            <ThemeChangerFab />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
