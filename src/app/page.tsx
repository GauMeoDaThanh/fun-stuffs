import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import Anchor from './components/ui/sidebar-button';
import { data } from './mock';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-gray-800 bg-black p-3 text-white opacity-95">
        {/* Left side */}
        <Link href={ROUTES.EXPENSE_CALCULATOR} className="flex items-center">
          <div className="flex items-center justify-center">
            <Image
              src="/web-icon.png"
              alt="web icon"
              width={30}
              height={30}
              className="rotate-[30deg] brightness-0 invert"
            />
          </div>
          <span className="text-s font-semibold">Utilities</span>
        </Link>

        {/* Center */}

        <div className="flex items-baseline space-x-2">
          <div className="group/product1 hover:after:absolute hover:after:left-0 hover:after:block hover:after:h-10 hover:after:w-full hover:after:content-['']">
            <Anchor href="#" name="Product 1" />
            {/* Menu bar */}
            <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 -translate-y-2 items-center opacity-0 group-hover/product1:visible group-hover/product1:opacity-100">
              <div className="rounded-[10px] border-2 border-gray-400/30 bg-gradient-to-b from-black to-transparent p-2">
                <div
                  className="grid min-w-[600px] rounded-[5px] bg-gradient-to-b from-gray-900 to-transparent p-4"
                  style={{
                    gridTemplateColumns: `repeat(${data.length}, 1fr)`,
                  }}>
                  {data.map((section) => (
                    <div
                      className="flex flex-col space-y-4 border-r-1 border-gray-600 pl-2 last:border-0 last:pr-0"
                      key={section.section}>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase">
                          {section.section}
                        </h3>
                        <ul className="mt-2 space-y-2">
                          {section.item.map((item) => (
                            <li key={item.name}>
                              <a
                                href="#"
                                className="text-sm font-medium hover:underline">
                                {item.name}
                              </a>
                              <p className="text-sm text-gray-400">
                                {item.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="group/product2">
            <Anchor href="#" name="Product 2" />
            <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 opacity-0 group-hover/product2:visible group-hover/product2:opacity-100">
              <div className="">
                <p>hello menu bar 2</p>
              </div>
            </div>
          </div>
          <Anchor href="#" name="Product 3" />
          <Anchor href="#" name="Product 4" />
          <Anchor href="#" name="Product 5" />
        </div>

        {/* Right side */}
        <div className="flex items-center text-sm font-semibold">
          <Anchor href="#" name="Log in" />
          <Anchor href="#" name="Sign up" variant="light" />
        </div>
      </nav>
    </main>
  );
}
