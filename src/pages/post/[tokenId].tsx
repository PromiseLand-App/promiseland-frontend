import { useRouter } from 'next/router';

import Layout from '@/components/layout';
import NftPanel from '@/components/nftPanel';

export default function Post() {
  const router = useRouter();
  const { tokenId } = router.query;

  return (
    <Layout>
      <NftPanel tokenId={tokenId} />
    </Layout>
  );
}
