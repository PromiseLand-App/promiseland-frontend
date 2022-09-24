import { LENSHUB_PROXY_ADDRESS } from '@/utils/constants';
import LensHubProxy from '@/abis/LensHubProxy';
import React, { useState } from 'react';
import {
  useConnect,
  useAccount,
  useDisconnect,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import IProfile from '@/schemas/profile';

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

  async function follow() {
    // if(isConnected){
    //   await disconnectAsync();
    // }
    // await connectAsync({
    //   connector: new MetaMaskConnector({}),
    // });

    write();
  }

  return (
    <button className="text-xs font-semibold text-blue-500" onClick={follow}>
      {buttonText}
    </button>
  );
};

export default FollowButton;
