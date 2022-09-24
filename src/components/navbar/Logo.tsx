import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/images/logo.png';

const Logo = () => {
  return (
    <Link href="/" id="home">
      <div className="flex">
        <Image
          src={logo}
          alt="PromiseLand Logo"
          height={27}
          width={27}
          className="cursor-pointer"
        />
        <a
          className="flex items-center text-xl font-bold text-sky-500 no-underline hover:no-underline lg:text-xl"
          href="#"
        >
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-300 to-sky-500 bg-clip-text px-2 text-transparent">
            PromiseLand
          </span>
        </a>
      </div>
    </Link>
  );
};

export default Logo;
