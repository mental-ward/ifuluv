export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body style={{
        height: "100%",
        margin: "0",
        padding: "0",
        overflow: "hidden"
      }}>{children}</body>
    </html>
  )
}
