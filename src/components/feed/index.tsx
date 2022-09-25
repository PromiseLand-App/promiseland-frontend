import { SpinnerCircular } from 'spinners-react';
import { useContractRead } from 'wagmi';

import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';

import Post from './post';

const Feed = () => {
  const promiseLand = usePromiseLandContractMeta();

  const { data: nfts, isLoading } = useContractRead({
    ...promiseLand,
    functionName: 'fetchAllNfts',
    watch: true,
  });

  if (isLoading) return <SpinnerCircular />;

  return (
    <section className="space-y-3">
      {nfts
        ?.slice(0)
        .reverse()
        .map((post) => (
          <Post key={post.tokenId} item={post} />
        ))}
    </section>
  );
};

export default Feed;
