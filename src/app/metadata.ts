import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Деловая Россия КЧР",
  description: "Деловая Россия КЧР",
  keywords: "Деловая Россия КЧР",
  authors: [{ name: "Деловая Россия КЧР" }],
  openGraph: {
    title: "Деловая Россия КЧР",
    description: "Деловая Россия КЧР",
    type: "website",
    locale: "ru_RU",
  },
  robots: "index, follow",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  }
};