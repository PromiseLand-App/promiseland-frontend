import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout';

const Home: NextPage = () => {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    router.prefetch('/explore');
    if (isConnected) {
      router.push('/explore');
    }
  }, [isConnected, router]);

  return (
    <Layout hasSidebar>
      <div className="space-y-3 lg:mx-0">Promiseland</div>
    </Layout>
  );
};

export default Home;
