import { useContractRead } from 'wagmi';

import PromiseLand from '@/abis/PromiseLand.json';
import { MarketItem } from '@/schemas/marketItem';

import MarketItems from './MarketItems';

export default function CreatedNFTs({ address }: { address: string }) {
  const { data: items, isLoading } = useContractRead({
    addressOrName: PromiseLand.address,
    contractInterface: PromiseLand.abi,
    functionName: 'fetchUserCreatedNfts',
    overrides: { from: address },
    // args: [address],
  });

  return (
    <MarketItems
      address={address}
      items={items as MarketItem[] | undefined}
      isLoading={isLoading}
    />
  );
}
