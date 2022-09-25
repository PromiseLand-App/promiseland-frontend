import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import { BigNumberish } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';

export interface LikeButtonProps {
  tokenId: BigNumberish;
}

export default function LikeButton({ tokenId }: LikeButtonProps) {
  const promiseLand = usePromiseLandContractMeta();
  const { config } = usePrepareContractWrite({
    ...promiseLand,
    functionName: 'likeNft',
    args: [tokenId],
    overrides: { value: parseEther('0.01') },
  });
  const { data: txn, write } = useContractWrite(config);
  return (
    <button disabled={Boolean(txn)} onClick={() => write?.()}>
      {txn ? (
        <ThumbUpAlt className="h-6 w-6" />
      ) : (
        <ThumbUpOffAlt className="h-6 w-6" />
      )}
    </button>
  );
}
