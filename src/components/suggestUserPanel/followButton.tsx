import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import LensHubProxy from '@/abis/LensHubProxy.json';
import IProfile from '@/schemas/profile';
import { LENSHUB_PROXY_ADDRESS } from '@/utils/constants';

interface IProps {
  profile: IProfile;
}

const FollowButton = ({ profile }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Follow');

  const { config } = usePrepareContractWrite({
    addressOrName: LENSHUB_PROXY_ADDRESS,
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
