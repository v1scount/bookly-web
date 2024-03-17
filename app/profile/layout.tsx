export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="min-h-screen mt-6">{children}</section>
  }