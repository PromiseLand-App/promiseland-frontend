import Navbar from '../navbar';

const Header = () => {
  return (
    <header className="sticky top-0 z-20 border-[1px] border-gray-300 bg-white">
      <div className="mx-auto max-w-5xl">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
