import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { ApolloProvider } from '@apollo/client';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import apolloClient from '@/lib/client';

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

const { chains, provider } = configureChains(
  [chain.polygonMumbai],

  [infuraProvider({ apiKey: infuraId }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'PromiseLand',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const fetcher = (key: string) => fetch(key).then((res) => res.json());

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={apolloClient}>
        <RainbowKitProvider chains={chains}>
          <SWRConfig value={{ fetcher }}>
            {isMounted && <Component {...pageProps} />}
          </SWRConfig>
        </RainbowKitProvider>
      </ApolloProvider>
    </WagmiConfig>
  );
}
