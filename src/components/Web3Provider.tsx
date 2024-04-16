import { WagmiProvider, createConfig, http } from "wagmi"
import { sepolia, baseSepolia, celoAlfajores } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  ConnectKitProvider,
  getDefaultConfig,
  ConnectKitButton,
} from "connectkit"
import { EthereumProvider } from "@walletconnect/ethereum-provider"
import { createWeb3Modal } from "@web3modal/wagmi/react"
import { ethers } from "ethers"

/* const provider = await EthereumProvider.init({
  projectId: "YOUR_PROJECT_ID",
  metadata: {
    name: "My Website",
    description: "My Website Description",
    url: "https://mywebsite.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  showQrModal: true,
  optionalChains: [sepolia.id, baseSepolia.id, celoAlfajores.id],
})

const ethersWeb3Provider = new ethers.BrowserProvider(provider) */

// 5. Create a Web3Modal instance

const chains = [sepolia, celoAlfajores, baseSepolia] as const

const config = createConfig(
  getDefaultConfig({
    chains: chains,
    // Your dApps chains

    // Required API Keys
    walletConnectProjectId: import.meta.env
      .VITE_WALLETCONNECT_PROJECT_ID as string,

    // Required App Info
    appName: "Zeneca",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)

createWeb3Modal({
  wagmiConfig: config,
  allowUnsupportedChain: true,
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
})

const queryClient = new QueryClient()

export const Web3Provider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
