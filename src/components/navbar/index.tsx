import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

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
            <div className="flex w-full flex-wrap items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
              <div className="flex items-center">
                <Link href="/">
                  <a>PromiseLand</a>
                </Link>
              </div>
              <div className="ml-10 flex items-center space-x-4">
                <Link href="/create-post">
                  <a className="inline-flex items-center rounded-md border border-indigo-100 px-4 py-2 text-sm font-medium  text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Create A NFT Post
                  </a>
                </Link>
                {address ? <Navmenu /> : <ConnectButton />}
              </div>
            </div>
          </nav>
        </header>
      )}
    </div>
  );
}
