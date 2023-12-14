import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'ADS Dungeons',
  description: 'Generated by create next app, with spring boot as backend'
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
