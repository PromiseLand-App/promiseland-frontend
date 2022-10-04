import Image from 'next/image';

import logo from '@/assets/images/logo.png';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Image
        src={logo}
        alt="PromiseLand Logo"
        height={27}
        width={27}
        className="cursor-pointer"
      />

      <span className="hidden bg-gradient-to-r from-orange-400 via-pink-500 to-sky-500 bg-clip-text px-2 text-lg font-extrabold text-transparent md:block">
        PromiseLand
      </span>
      <h2 className="hidden font-bold text-gray-500 lg:block">(On Beta)</h2>
    </div>
  );
};

export default Logo;
