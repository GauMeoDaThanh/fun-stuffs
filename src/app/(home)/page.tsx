import MainSection from '@/app/_shared/components/ui/main-section';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Logo/Branding - Top Left */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <span className="text-sm font-bold">⚙️</span>
        </div>
        <span className="text-lg font-bold hidden sm:inline">Utils</span>
      </div>

      {/* Main Content */}
      <MainSection />
    </main>
  );
}


