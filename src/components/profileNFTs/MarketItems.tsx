import { useMemo } from 'react';
import { useContractReads } from 'wagmi';

import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';
import { MarketItem } from '@/schemas/marketItem';

import NFTWithTokenURI from './NFTWithTokenURI';

export default function MarketItems({
  address,
  items,
  isLoading,
}: {
  address: string;
  isLoading: boolean;
  items: MarketItem[] | undefined;
}) {
  const promiseLand = usePromiseLandContractMeta();

  const args = useMemo(
    () =>
      !items
        ? { contracts: [], enabled: false }
        : {
            contracts: items.map((item: MarketItem) => ({
              ...promiseLand,
              functionName: 'tokenURI',
              args: [item.tokenId],
            })),
          },
    [items, promiseLand],
  );

  const { data: uris } = useContractReads(args);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {uris?.length &&
          uris.map((uri, i) => (
            <NFTWithTokenURI
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              key={items![i].tokenId.toString()}
              owner={address}
              contractAddress={promiseLand.addressOrName}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              tokenId={items![i].tokenId.toString()}
              tokenURI={uri as unknown as string}
            />
          ))}
      </div>
      <div className="py-4 text-center">
        {isLoading ? 'Loading...' : uris?.length ? '' : 'No Items Found'}
      </div>
    </>
  );
}
