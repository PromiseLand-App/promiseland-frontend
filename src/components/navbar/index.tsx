import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import Logo from './Logo';
import Navmenu from './Navmenu';

export default function Navbar() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {mounted && (
        <header className="border-b-2 border-gray-100 bg-white">
          <nav
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            aria-label="Top"
          >
            <div className="flex w-full flex-wrap items-center justify-between border-b border-indigo-500 py-4 lg:border-none">
              <div className="flex items-center ">
                <Link href="/">
                  <a>
                    <Logo />
                  </a>
                </Link>
              </div>
              <div className="ml-10 flex items-center space-x-4">
                <Link href="/">
                  <a className="inline-flex items-center rounded-full px-3  text-sm font-medium  text-blue-500 hover:text-blue-300 ">
                    Explore
                  </a>
                </Link>
                {address && (
                  <Link href="/create">
                    <a className="inline-flex items-center rounded-full  px-3  text-sm font-medium  text-blue-500 hover:text-blue-300 ">
                      Create
                    </a>
                  </Link>
                )}
                {address && <Navmenu />}
                <ConnectButton />
              </div>
            </div>
          </nav>
        </header>
      )}
    </div>
  );
}
