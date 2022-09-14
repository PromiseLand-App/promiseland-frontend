import Header from "./header";
// import Footer from "./Footer";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="space-y-5 min-h-screen">
      <Header />
      <main className="max-w-[53rem] mx-auto lg:flex mb-10">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
