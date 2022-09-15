import React, { ReactNode, useContext, useEffect, useState } from "react";

import { useAccount, useProvider, useSigner } from "wagmi";
export const Web3Context = React.createContext<{
  address: string | undefined;
  switchChain: (chainId: string) => void;
}>({
  address: undefined,

  switchChain: () => {},
});
const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
  const { address: addressFromWagmi } = useAccount();

  const [address, setAddress] = useState<string | undefined>(addressFromWagmi);

  const switchChain = (chainId: string) => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    }
  };

  useEffect(() => {
    if (addressFromWagmi) {
      setAddress(addressFromWagmi);
    }
  }, [addressFromWagmi]);

  return (
    <Web3Context.Provider
      value={{
        address,
        switchChain,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
export const useWeb3 = () => {
  return useContext(Web3Context);
};
