
import { useState, useEffect, createContext, useContext } from 'react';
import { toast } from "@/hooks/use-toast";

interface WalletContextType {
  address: string | null;
  connecting: boolean;
  connected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  connecting: false,
  connected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setAddress(savedAddress);
      setConnected(true);
    }
  }, []);

  // Connect to Unisat wallet
  const connectWallet = async () => {
    if (typeof window === 'undefined') return;
    
    setConnecting(true);
    
    try {
      // Check if Unisat wallet is installed
      if (!(window as any).unisat) {
        toast({
          title: "Wallet not found",
          description: "Please install the Unisat wallet extension",
          variant: "destructive",
        });
        setConnecting(false);
        return;
      }
      
      // Request account access
      const accounts = await (window as any).unisat.requestAccounts();
      
      if (accounts && accounts.length > 0) {
        const addr = accounts[0];
        setAddress(addr);
        setConnected(true);
        localStorage.setItem('walletAddress', addr);
        
        toast({
          title: "Wallet connected",
          description: `Connected to ${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`,
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

  // Disconnect wallet
  const disconnectWallet = () => {
    setAddress(null);
    setConnected(false);
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
        connecting,
        connected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
