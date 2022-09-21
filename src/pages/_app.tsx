import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { ApolloProvider } from '@apollo/client';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
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

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={apolloClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </ApolloProvider>
    </WagmiConfig>
  );
}
