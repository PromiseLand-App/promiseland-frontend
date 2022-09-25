import { SpinnerCircular } from 'spinners-react';
import { useContractRead } from 'wagmi';

import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';

import Post from './post';

const Feed = () => {
  // const [nfts, setNfts] = useState([]);
  // const [loadingState, setLoadingState] = useState('not-loaded');
  const promiseLand = usePromiseLandContractMeta();

  const { data: nfts, isLoading } = useContractRead({
    ...promiseLand,
    functionName: 'fetchAllNfts',
  });

  console.log(nfts);

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
