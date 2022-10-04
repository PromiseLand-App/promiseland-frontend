import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import { LensGraphQLProvider } from '@/utils/lens';

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
    <>
      <Head>
        <meta
          name="PromiseLand"
          content="The decentralized Social NFT Marketplace"
        />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <LensGraphQLProvider>
            <SWRConfig value={{ fetcher }}>
              {isMounted && <Component {...pageProps} />}
            </SWRConfig>
          </LensGraphQLProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
