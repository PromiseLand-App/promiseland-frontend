import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/images/logo.png';

const Logo = () => {
  return (
    <Link href="/" id="home">
      <div className="flex w-30">
        <Image src={logo} alt="PromiseLand Logo" height={27} width={27} />
        <a
          className="flex items-center text-xl font-bold text-sky-500 no-underline hover:no-underline lg:text-xl"
          href="#"
        >
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-300 to-sky-500 bg-clip-text text-transparent px-2">
            PromiseLand
          </span>
        </a>
      </div>
    </Link>
  );
};

export default Logo;
