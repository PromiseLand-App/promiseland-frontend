import type { NextPage } from "next";
import Feed from "@/components/feed";
import Panel from "@/components/suggestUserPanel";
import Layout from "@/components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="space-y-3 lg:mx-0">
        <Feed />
      </div>
      <Panel />
    </Layout>
  );
};

export default Home;
