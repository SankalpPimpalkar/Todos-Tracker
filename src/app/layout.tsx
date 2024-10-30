import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "Next Todo",
  description: "Powered by Appwrite and Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/image.png" sizes="any" />
      <body className={`antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
