import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: 'To Do List',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[radial-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-lime-300/80 to-sky-900">
        <div>{children}</div>
      </body>
    </html>
  )
}
