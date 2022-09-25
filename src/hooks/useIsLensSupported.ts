import { LENS_API_URL_MAP } from '@/utils/constants';

import useChainId from './useChainId';

export default function useIsLensSupported() {
  const chainId = useChainId();
  return Boolean(LENS_API_URL_MAP[chainId]);
}
