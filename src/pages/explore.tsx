import type { NextPage } from 'next';

import Feed from '@/components/feed';
import Layout from '@/components/layout';
import Panel from '@/components/suggestUserPanel';

const Home: NextPage = () => {
  return (
    <Layout hasSidebar>
      <div className="space-y-3 lg:mx-0">
        <Feed />
      </div>
      <Panel />
    </Layout>
  );
};

export default Home;
