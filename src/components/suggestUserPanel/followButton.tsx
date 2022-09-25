import { useState } from 'react';
import { chain, useContractWrite, usePrepareContractWrite } from 'wagmi';

import LensHubProxy from '@/abis/LensHubProxy.json';
import useChainId from '@/hooks/useChainId';
import IProfile from '@/schemas/profile';
import { LENSHUB_PROXY_ADDRESS_MAP } from '@/utils/constants';

interface IProps {
  profile: IProfile;
}

const FollowButton = ({ profile }: IProps) => {
  const chainId = useChainId();
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Follow');

  const { config } = usePrepareContractWrite({
    addressOrName:
      LENSHUB_PROXY_ADDRESS_MAP[chainId] ??
      LENSHUB_PROXY_ADDRESS_MAP[chain.polygonMumbai.id],
    contractInterface: LensHubProxy,
    functionName: 'follow',
    args: [[profile.id], [0x0]],
  });

  const { write } = useContractWrite(config);

  return (
    <button
      className="text-xs font-semibold text-blue-500"
      onClick={() => write?.()}
    >
      {buttonText}
    </button>
  );
};

export default FollowButton;
