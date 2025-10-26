import "./globals.css"

export const metadata = { title: "Exdrop", description: "Airdrop aggregator" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="flex min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
