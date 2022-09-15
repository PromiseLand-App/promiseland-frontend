import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import Web3ContextProvider from "@/context/Web3Context";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

const { chains, provider } = configureChains(
  [chain.polygon],

  [infuraProvider({ apiKey: infuraId }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "promiseland",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Web3ContextProvider>
          <Component {...pageProps} />
        </Web3ContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
