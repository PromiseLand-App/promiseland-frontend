import { useContractRead } from 'wagmi';

import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';
import { MarketItem } from '@/schemas/marketItem';

import MarketItems from './MarketItems';

export default function CreatedNFTs({ address }: { address: string }) {
  const promiseLand = usePromiseLandContractMeta();

  const { data: items, isLoading } = useContractRead({
    ...promiseLand,
    functionName: 'fetchUserCreatedNfts',
    args: [address],
    watch: true,
  });

  return (
    <MarketItems
      address={address}
      items={items as MarketItem[] | undefined}
      isLoading={isLoading}
    />
  );
}
