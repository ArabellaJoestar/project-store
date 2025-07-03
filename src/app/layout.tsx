import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Loja virtual",
  description: "Loja virtual de produtos, utilizando API."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="w-full h-18 p-2 flex items-center justify-center">
          <Link href="/" className="text-3xl duration-300" id="infLoja">Loja Infinity</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
