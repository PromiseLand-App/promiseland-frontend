import clsx from 'clsx';

import Header from './header';

interface IProps {
  children: React.ReactNode;
  hasSidebar?: boolean;
}

const Layout = ({ children, hasSidebar = false }: IProps) => {
  return (
    <div className="min-h-screen space-y-5">
      <Header />
      <main
        className={clsx(
          'mx-auto max-w-[53rem] justify-between pb-10',
          hasSidebar && 'lg:flex',
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
