import { Poppins } from "next/font/google";
import { Lexend } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const poppins = Poppins({
  weight: ["200", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const lexend = Lexend({
  weight: ["200", "800"],
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata = {
  metadataBase: new URL("https://basket-buzz.vercel.app"),

  title: {
    default: "Buzz Basket",
    template: "%s | Buzz Basket",
  },

  description: "Buzz Basket is an online shop with selected products, smooth checkout, and a simple shopping experience.",

  keywords: ["Buzz Basket", "online shop", "webshop", "products", "ecommerce"],

  applicationName: "Buzz Basket",
  authors: [{ name: "Farwa Rizvi" }],
  creator: "Farwa Rizvi",
  publisher: "Buzz Basket",

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "Buzz Basket",
    description: "Fill your life basket with our buzz items.",
    url: "https://basket-buzz.vercel.app",
    siteName: "Buzz Basket",
    images: [
      {
        url: "/square.png",
        width: 1200,
        height: 630,
        alt: "Buzz Basket",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Buzz Basket",
    description: "Fill your life basket with our buzz items.",
    images: ["/twitter.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${lexend.variable}`}>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
