import Link from 'next/link';
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
              <Link
                href={`/${chainId}/collection/${nft.contractAddress}?tokenId=${nft.tokenId}`}
                key={`${nft.contractAddress}.${nft.tokenId}`}
              >
                <a>
                  <div className="relative aspect-square">
                    <Image
                      className="h-full w-full object-cover"
                      src={
                        nft.fileUrl ||
                        `https://via.placeholder.com/300?text=${encodeURIComponent(
                          `${nft.tokenId}`,
                        )}`
                      }
                      fallbackSrc={`https://via.placeholder.com/300?text=${encodeURIComponent(
                        `${nft.tokenId}`,
                      )}`}
                      alt={`${nft.contractAddress}.${nft.tokenId}`}
                    />
                  </div>
                </a>
              </Link>
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
