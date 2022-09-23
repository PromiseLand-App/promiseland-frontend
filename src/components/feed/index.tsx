import axios from 'axios';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { SpinnerCircular } from 'spinners-react';

import PromiseLand from '@/abis/PromiseLand.json';

import Post from './post';

const Feed = () => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-mumbai.infura.io/v3/4fa55521d0f647f28c1a179e85f454da',
    );
    const tokenContract = new ethers.Contract(
      PromiseLand.address,
      PromiseLand.abi,
      provider,
    );
    const marketContract = new ethers.Contract(
      PromiseLand.address,
      PromiseLand.abi,
      provider,
    );

    //return an array of unsold market items
    const data = await marketContract.fetchMarketItems();

    const items: any = await Promise.all(
      data.map(async (index: any) => {
        const tokenUri = await tokenContract.tokenURI(index.tokenId);
        const meta = await axios.get(tokenUri);
        const price = ethers.utils.formatUnits(index.price.toString(), 'ether');
        const item = {
          price,
          tokenId: index.tokenId.toNumber(),
          seller: index.seller,
          owner: index.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      }),
    );

    setNfts(items);
    setLoadingState('loaded');
  }

  if (loadingState !== 'loaded' && !nfts.length) return <SpinnerCircular />;

  return (
    <section className="space-y-3">
      {nfts &&
        nfts
          .slice(0)
          .reverse()
          .map((post, index) => <Post key={index} post={post} />)}
    </section>
  );
};

export default Feed;
