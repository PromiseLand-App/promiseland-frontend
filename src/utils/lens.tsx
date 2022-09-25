import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ReactNode, useMemo } from 'react';
import { chain } from 'wagmi';

import useChainId from '@/hooks/useChainId';

import { LENS_API_URL_MAP } from './constants';

export const LensGraphQLProvider = ({ children }: { children: ReactNode }) => {
  const chainId = useChainId();
  const client = useMemo(
    () =>
      new ApolloClient({
        uri:
          LENS_API_URL_MAP[chainId] ?? LENS_API_URL_MAP[chain.polygonMumbai.id],
        cache: new InMemoryCache(),
      }),
    [chainId],
  );
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
