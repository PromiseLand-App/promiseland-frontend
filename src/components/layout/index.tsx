import Header from './header';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen space-y-5">
      <Header />
      <main className="mx-auto max-w-[53rem] justify-between pb-10 lg:flex">
        {children}
      </main>
    </div>
  );
};

export default Layout;
