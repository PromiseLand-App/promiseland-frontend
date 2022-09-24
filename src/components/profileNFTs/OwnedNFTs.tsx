import { useMemo } from 'react';

import useChainId from '@/hooks/useChainId';
import { SUPPORTED_CHAINS, useOwnedNFTs } from '@/utils/nftPort';

import Image from '../Image';

export default function OwnedNFTs({ address }: { address: string }) {
  const chainId = useChainId();

  const chain = useMemo(
    () => SUPPORTED_CHAINS[chainId] ?? 'polygon',
    [chainId],
  );

  const {
    data: nfts,
    hasNextPage,
    isValidating: isLoading,
    setSize,
  } = useOwnedNFTs(chain, address);

  return (
    <>
      {nfts?.length && (
        <div className="grid grid-cols-3 gap-4">
          {nfts.map((_nfts) =>
            _nfts.map((nft) => (
              <div
                key={`${nft.contractAddress}.${nft.tokenId}`}
                className="relative aspect-square"
              >
                <Image
                  className="h-full w-full object-cover"
                  src={nft.imageUrl ?? 'https://via.placeholder.com/150'}
                  alt={`${nft.contractAddress}.${nft.tokenId}`}
                />
              </div>
            )),
          )}
        </div>
      )}
      <div className="py-4 text-center">
        {isLoading ? (
          'Loading...'
        ) : hasNextPage ? (
          <button onClick={() => setSize((prev) => prev + 1)}>Load More</button>
        ) : nfts?.[0]?.length ? null : (
          'No Items Found'
        )}
      </div>
    </>
  );
}
