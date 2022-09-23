import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout';

const ProfileRedirector: NextPage = () => {
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.push(`/profile/${address}`);
      return;
    }
  }, [router, address]);

  return <Layout>Please login first.</Layout>;
};

export default ProfileRedirector;
