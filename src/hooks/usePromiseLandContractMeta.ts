import { chain } from 'wagmi';

import PromiseLand from '@/abis/PromiseLand.json';
import { PROMISELAND_ADDRESS_MAP } from '@/utils/constants';

import useChainId from './useChainId';

const META = Object.fromEntries(
  Object.entries(PROMISELAND_ADDRESS_MAP).map(([key, value]) => [
    key,
    { addressOrName: value, contractInterface: PromiseLand.abi },
  ]),
);

export default function usePromiseLandContractMeta(chainId_?: number) {
  const currentChainId = useChainId();
  const chainId = chainId_ || currentChainId;
  return META[chainId] ?? META[chain.polygonMumbai.id];
}
