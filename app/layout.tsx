import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AarogyaAI Triage',
  description: 'AI-powered diagnostic triage assistant for Ayushman Bharat Health Records',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
