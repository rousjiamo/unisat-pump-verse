import { useState, useEffect, createContext, useContext } from 'react';
import { toast } from "@/hooks/use-toast";
import { ChainType, CHAINS_MAP } from '@/types/network';

interface WalletContextType {
  address: string | null;
  connecting: boolean;
  connected: boolean;
  publicKey: string | null;
  balance: {
    confirmed: number;
    unconfirmed: number;
    total: number;
  };
  network: string;
  chainType: ChainType;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchChain: (chainType: ChainType) => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  publicKey: null,
  connecting: false,
  connected: false,
  balance: {
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  },
  network: 'livenet',
  chainType: ChainType.BITCOIN_MAINNET,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchChain: async () => {},
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState('livenet');
  const [chainType, setChainType] = useState<ChainType>(ChainType.BITCOIN_MAINNET);

  // Helper function to get wallet information
  const getWalletInfo = async () => {
    const unisat = (window as any).unisat;
    if (!unisat) return;

    try {
      const publicKey = await unisat.getPublicKey();
      setPublicKey(publicKey);
    } catch (e) {
      console.error("getPublicKey error", e);
    }

    try {
      const balance = await unisat.getBalance();
      setBalance(balance);
    } catch (e) {
      console.error("getBalance error", e);
    }

    try {
      const network = await unisat.getNetwork();
      setNetwork(network);
    } catch (e) {
      console.error("getNetwork error", e);
    }

    try {
      if (unisat.getChain) {
        const chain = await unisat.getChain();
        setChainType(chain.enum);
      }
    } catch (e) {
      console.error("getChain error", e);
    }
  };

  // Handle account changes from the wallet
  const handleAccountsChanged = (accounts: string[]) => {
    console.log("accounts changed", accounts);
    
    if (accounts && accounts.length > 0) {
      const newAddress = accounts[0];
      setAddress(newAddress);
      setConnected(true);
      localStorage.setItem('walletAddress', newAddress);
      getWalletInfo();
    } else {
      setConnected(false);
      setAddress(null);
      localStorage.removeItem('walletAddress');
    }
  };

  // Handle network changes
  const handleNetworkChanged = (newNetwork: string) => {
    console.log("network changed", newNetwork);
    setNetwork(newNetwork);
    getWalletInfo();
  };

  // Handle chain changes
  const handleChainChanged = (chain: {
    enum: ChainType;
    name: string;
    network: string;
  }) => {
    console.log("chain changed", chain);
    setChainType(chain.enum);
    getWalletInfo();
  };

  // Check if wallet was previously connected and set up event listeners
  useEffect(() => {
    async function checkUnisat() {
      // Wait for the Unisat wallet to be injected
      let unisat = (window as any).unisat;
      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = (window as any).unisat;
      }

      if (!unisat) return;

      // Try to get accounts if wallet was previously connected
      const savedAddress = localStorage.getItem('walletAddress');
      if (savedAddress) {
        unisat.getAccounts()
          .then((accounts: string[]) => {
            if (accounts && accounts.length > 0) {
              handleAccountsChanged(accounts);
            }
          })
          .catch((e: any) => {
            console.error("Error getting accounts:", e);
            localStorage.removeItem('walletAddress');
          });
      }

      // Set up event listeners
      unisat.on("accountsChanged", handleAccountsChanged);
      unisat.on("networkChanged", handleNetworkChanged);
      if (unisat.on && typeof unisat.on === 'function') {
        unisat.on("chainChanged", handleChainChanged);
      }

      return () => {
        if (unisat) {
          unisat.removeListener("accountsChanged", handleAccountsChanged);
          unisat.removeListener("networkChanged", handleNetworkChanged);
          if (unisat.removeListener && typeof unisat.removeListener === 'function') {
            unisat.removeListener("chainChanged", handleChainChanged);
          }
        }
      };
    }

    checkUnisat();
  }, []);

  // Connect to Unisat wallet
  const connectWallet = async () => {
    if (typeof window === 'undefined') return;
    
    setConnecting(true);
    
    try {
      // Check if Unisat wallet is installed
      const unisat = (window as any).unisat;
      if (!unisat) {
        toast({
          title: "Wallet not found",
          description: "Please install the Unisat wallet extension",
          variant: "destructive",
        });
        setConnecting(false);
        return;
      }
      
      // Request account access
      const accounts = await unisat.requestAccounts();
      
      if (accounts && accounts.length > 0) {
        handleAccountsChanged(accounts);
        
        toast({
          title: "Wallet connected",
          description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
        });
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to Unisat wallet",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  // Switch chain
  const switchChain = async (newChainType: ChainType) => {
    if (typeof window === 'undefined') return;
    
    try {
      const unisat = (window as any).unisat;
      if (!unisat) {
        toast({
          title: "Wallet not found",
          description: "Please install the Unisat wallet extension",
          variant: "destructive",
        });
        return;
      }
      
      if (!unisat.switchChain) {
        toast({
          title: "Wallet feature not supported",
          description: "Your wallet does not support chain switching",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Switching chain to:", newChainType);
      
      // Request chain switch
      const chain = await unisat.switchChain(newChainType);
      console.log("Chain switched to:", chain);
      
      // Update chain type state
      setChainType(chain.enum);
      
      // Update network state if available
      if (chain.network) {
        setNetwork(chain.network);
      }
      
      // Refresh wallet info
      await getWalletInfo();
      
      toast({
        title: "Network switched",
        description: `Switched to ${CHAINS_MAP[chain.enum].label}`,
      });
      
    } catch (error) {
      console.error("Error switching chain:", error);
      toast({
        title: "Chain switch failed",
        description: (error as any).message || "Failed to switch chain",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    const unisat = (window as any).unisat;
    if (unisat && unisat.disconnect) {
      unisat.disconnect().catch((e: any) => console.error("Disconnect error:", e));
    }
    
    setAddress(null);
    setPublicKey(null);
    setConnected(false);
    setBalance({
      confirmed: 0,
      unconfirmed: 0,
      total: 0,
    });
    localStorage.removeItem('walletAddress');
    
    toast({
      title: "Wallet disconnected",
      description: "Successfully disconnected wallet",
    });
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        publicKey,
        connecting,
        connected,
        balance,
        network,
        chainType,
        connectWallet,
        disconnectWallet,
        switchChain,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
