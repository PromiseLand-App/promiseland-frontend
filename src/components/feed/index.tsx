import { SpinnerCircular } from 'spinners-react';
import { useContractRead } from 'wagmi';

import PromiseLand from '@/abis/PromiseLand.json';

import Post from './post';

const Feed = () => {
  // const [nfts, setNfts] = useState([]);
  // const [loadingState, setLoadingState] = useState('not-loaded');

  const { data: nfts, isLoading } = useContractRead({
    addressOrName: PromiseLand.address,
    contractInterface: PromiseLand.abi,
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
