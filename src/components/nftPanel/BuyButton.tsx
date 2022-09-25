import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';
import { MarketItem } from '@/schemas/marketItem';

export default function BuyButton({ marketItem }: { marketItem?: MarketItem }) {
  const promiseLand = usePromiseLandContractMeta();

  const { config } = usePrepareContractWrite({
    ...promiseLand,
    functionName: 'executeSale',
    args: [marketItem?.tokenId],
    overrides: { value: marketItem?.price },
    enabled: Boolean(marketItem),
  });

  const { data: txn, write, isLoading } = useContractWrite(config);
  const { data: receipt } = useWaitForTransaction({ hash: txn?.hash });

  return (
    <button
      className="my-2 rounded bg-blue-500 py-2 px-4 text-sm font-bold text-white hover:bg-blue-700"
      disabled={Boolean(isLoading || receipt || txn || !marketItem)}
      onClick={() => write?.()}
    >
      buy this NFT
    </button>
  );
}
