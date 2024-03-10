import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-screen flex flex-col items-center">
          <AntdRegistry>{children}</AntdRegistry>
          {/* <section className="mt-12">
          </section> */}
        </main>
      </body>
    </html>
  );
}
