import Image from 'next/image';
import Link from 'next/link';
import SidebarButton from './components/ui/sidebar-button';

export default function HomePage() {
  return (
    <nav className="flex items-center justify-between space-x-1 bg-black text-white p-2 opacity-95">
      {/* Left side */}
      <Link href="/expense-cal" className="flex items-center">
        <div className="flex items-center justify-center">
          <Image src="/web-icon.png" alt="web icon" width={40} height={40} className="rotate-[30deg]" />
        </div>
        <span className="text-lg font-semibold">Utilities</span>
      </Link>

      {/* Center */}
      <div className="flex space-x-8 ">
        <SidebarButton href="#" name="Product 1" />
        <SidebarButton href="#" name="Product 2" />
        <SidebarButton href="#" name="Product 3" />
        <SidebarButton href="#" name="Product 4" />
        <SidebarButton href="#" name="Product 5" />
      </div>

      {/* Right side */}
      <div className="flex space-x-1 items-center text-sm font-semibold">
        <a
          href="#"
          className="hover:bg-white hover:opacity-20 rounded-[8px] p-[6px] hover:text-black transition-all duration-300">
          Log in
        </a>
        <a
          href="#"
          className="hover:opacity-100 transition-opacity duration-300 bg-white text-black rounded-[8px] p-[6px] opacity-50">
          Sign up
        </a>
      </div>
    </nav>
  );
}
