import { CockpitNav } from "@/components/cockpit-nav"

export default function CockpitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <CockpitNav />
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
} 