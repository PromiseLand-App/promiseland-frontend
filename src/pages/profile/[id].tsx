import { useRouter } from 'next/router';

import Layout from '@/components/layout';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <div>ID: {id}</div>
    </Layout>
  );
}
