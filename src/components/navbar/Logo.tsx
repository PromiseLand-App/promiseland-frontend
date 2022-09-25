import Image from 'next/image';

import logo from '@/assets/images/logo.png';

const Logo = () => {
  return (
    <div className="flex">
      <Image
        src={logo}
        alt="PromiseLand Logo"
        height={27}
        width={27}
        className="cursor-pointer"
      />
      <span className="bg-gradient-to-r from-pink-400 via-fuchsia-300 to-sky-500 bg-clip-text px-2 text-transparent font-extrabold text-lg">
        PromiseLand
      </span>
    </div>
  );
};

export default Logo;
