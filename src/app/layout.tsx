import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AEDO Connect - Conectando Vidas, Facilitando a Doação de Órgãos",
  description:
    "Doe órgãos, salve vidas. Conscientize-se sobre a importância da doação de órgãos e ajude a transformar vidas. Faça parte dessa causa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full bg-white" lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-gray-50`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
