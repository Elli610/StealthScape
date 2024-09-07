import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { hederaTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

//Custom Chain
const rootstock_testnet = {
  id: 31,
  name: "Rootstock Testnet",
  iconUrl:
    "https://imgs.search.brave.com/LATDcVcVDT-xuQmeKIkbZ3zzSylrPfTkqChVzyA5kgc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9leHBs/b3Jlci56aXJjdWl0/LmNvbS9hc3NldHMv/emlyY3VpdF9sb2dv/X2Zvb3Rlci5zdmc.svg",
  iconBackground: "#fff",
  nativeCurrency: { name: "Bitcoin", symbol: "RBTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mycrypto.testnet.rsk.co"] },
  },
};

const morph_testnet = {
  id: 2810,
  name: "Morph Testnet",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-holesky.morphl2.io"] },
  },
};

const kinto_mainnet = {
  id: 7887,
  name: "Kinto Mainnet",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.kinto-rpc.com"] },
  },
};
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [hederaTestnet, rootstock_testnet, morph_testnet, kinto_mainnet],
  ssr: true,
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
