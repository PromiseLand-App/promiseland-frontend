import axios from 'axios';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import PromiseLand from '../../abi/PromiseLand.json';
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

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
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

  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in market place</h1>;

  return (
    <section className="space-y-3">
      {nfts && nfts.map((post, index) => <Post key={index} post={post} />)}
    </section>
  );
};

export default Feed;
