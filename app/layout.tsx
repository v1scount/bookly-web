import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "next-themes";
import ThemeChangerFab from "@/components/Fab";
import { Montserrat } from "next/font/google";

const inter = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <ThemeProvider attribute="class">
            <Header />
            <AntdRegistry>{children}</AntdRegistry>
            <ThemeChangerFab />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
