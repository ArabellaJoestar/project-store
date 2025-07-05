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
      <body className="bg-gray-900">
        <header className="w-full h-30 p-3 flex items-center justify-center bg-gray-900">
          <Link href="/" className="text-6xl duration-300 text-amber-400" id="infLoja">Loja</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
