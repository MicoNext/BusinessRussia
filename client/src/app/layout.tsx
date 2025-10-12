import { Inter } from "next/font/google"
import "./globals.css"
import { metadata } from "./metadata"

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: 'swap',
})

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        {children}
      </body>
    </html>
  )
}