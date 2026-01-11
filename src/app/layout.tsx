import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Auric - AI Customer Feedback Analyzer",
  description: "Auric analyzes customer feedback using AI to provide actionable insights quickly and efficiently.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-inter-display antialiased">
          {children}
      </body>
    </html>
  )
}
