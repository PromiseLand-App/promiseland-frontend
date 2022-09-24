import { useProvider } from 'wagmi';

export default function useChainId() {
  const provider = useProvider();
  return provider.network.chainId;
}
