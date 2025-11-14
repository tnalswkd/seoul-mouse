import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./_libs/provider/StyledComponentsRegistry";
import ThemeContextProvider from "./_libs/provider/themeProvider";

export const metadata: Metadata = {
  title: "서울쥐",
  description: "서울쥐와 함께 당신에게 딱 맞는 서울의 집을 찾아보세요",
  icons: {
    icon: [
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
    other: [
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <StyledComponentsRegistry>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
