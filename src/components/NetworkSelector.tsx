
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChainType, CHAINS_MAP } from "@/types/network";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "@/hooks/use-toast";

export const NetworkSelector = () => {
  const { network, connected } = useWallet();
  const [selectedNetwork, setSelectedNetwork] = useState<ChainType>(ChainType.BITCOIN_MAINNET);
  
  // Update selectedNetwork when wallet network changes
  useEffect(() => {
    if (network === 'livenet') {
      setSelectedNetwork(ChainType.BITCOIN_MAINNET);
    } else if (network === 'testnet') {
      setSelectedNetwork(ChainType.BITCOIN_TESTNET);
    }
  }, [network]);
  
  const switchNetwork = async (chainType: ChainType) => {
    const unisat = (window as any).unisat;
    
    if (!unisat) {
      toast({
        title: "Wallet not found",
        description: "Please install the Unisat wallet extension",
        variant: "destructive",
      });
      return;
    }
    
    if (!connected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const chain = await unisat.switchChain(chainType);
      setSelectedNetwork(chain.enum);
      toast({
        title: "Network switched",
        description: `Switched to ${CHAINS_MAP[chain.enum].label}`,
      });
    } catch (e) {
      console.error("Error switching network:", e);
      toast({
        title: "Failed to switch network",
        description: (e as any).message || "Unknown error",
        variant: "destructive",
      });
    }
  };
  
  const handleNetworkChange = (value: string) => {
    const chainType = value as ChainType;
    switchNetwork(chainType);
  };
  
  return (
    <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
      <SelectTrigger className="w-[180px] bg-dark-100 border-gray-700 hover:bg-dark-100/80 hover:border-bitcoin text-white">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-bitcoin" />
          <SelectValue placeholder="Select Network" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-dark-100 border-gray-700 text-white">
        {Object.keys(CHAINS_MAP).map((chainKey) => {
          const chain = CHAINS_MAP[chainKey];
          return (
            <SelectItem key={chain.enum} value={chain.enum} className="hover:bg-dark-200 cursor-pointer">
              {chain.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
