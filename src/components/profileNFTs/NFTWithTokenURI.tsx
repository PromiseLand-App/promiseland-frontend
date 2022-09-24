import useSWR from 'swr';

import { NFT } from '@/schemas/nft';

import Image from '../Image';

export default function NFTWithTokenURI({
  tokenURI,
}: NFT & { tokenURI: string }) {
  const { data } = useSWR(tokenURI);

  return (
    <div className="relative aspect-square">
      {!data ? (
        'Loading'
      ) : (
        <Image
          className="h-full w-full object-cover"
          src={data.image}
          alt={tokenURI}
        />
      )}
    </div>
  );
}
