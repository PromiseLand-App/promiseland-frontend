import { useContractRead } from 'wagmi';

import PromiseLand from '@/abis/PromiseLand.json';
import { MarketItem } from '@/schemas/marketItem';

import MarketItems from './MarketItems';

export default function BroughtNFTs({ address }: { address: string }) {
  const { data: items, isLoading } = useContractRead({
    addressOrName: PromiseLand.address,
    contractInterface: PromiseLand.abi,
    functionName: 'fetchUserOwnedNfts',
    overrides: { from: address },
  });

  return (
    <MarketItems
      address={address}
      items={items as MarketItem[] | undefined}
      isLoading={isLoading}
    />
  );
}
