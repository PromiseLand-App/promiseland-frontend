import { parseEther } from 'ethers/lib/utils';
import { FormEventHandler, useCallback, useState } from 'react';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';
import { MarketItem } from '@/schemas/marketItem';

export default function SellButton({
  marketItem,
}: {
  marketItem?: MarketItem;
}) {
  const promiseLand = usePromiseLandContractMeta();

  const [price, setPrice] = useState('');

  const { config } = usePrepareContractWrite({
    ...promiseLand,
    functionName: 'updateListingPrice',
    args: [marketItem?.tokenId, parseEther(price || '0')],
    enabled: Boolean(marketItem),
  });

  const { data: txn, write, isLoading } = useContractWrite(config);
  const { data: receipt } = useWaitForTransaction({ hash: txn?.hash });

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      write?.();
    },
    [write],
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-full appearance-none rounded border p-2 leading-tight text-gray-700"
        type="number"
        placeholder="Set a Selling Price for ETH"
        step="0.01"
        min="0.0001"
        required
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        type="submit"
        disabled={Boolean(isLoading || receipt || txn || !marketItem)}
        className="my-2 rounded bg-blue-500 py-2 px-4 text-sm font-bold text-white hover:bg-blue-700"
      >
        {receipt
          ? 'Updated price'
          : txn || isLoading
          ? 'Updating price...'
          : 'Sell this NFT'}
      </button>
    </form>
  );
}
