
import { useState, useEffect } from "react";
import { Globe, Network } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChainType, CHAINS_MAP } from "@/types/network";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "@/hooks/use-toast";

export const NetworkSelector = () => {
  const { network, connected, chainType, switchChain } = useWallet();
  const [selectedNetwork, setSelectedNetwork] = useState<ChainType>(ChainType.BITCOIN_MAINNET);
  
  // Update selectedNetwork when wallet network/chain changes
  useEffect(() => {
    if (chainType) {
      setSelectedNetwork(chainType);
    } else if (network === 'livenet') {
      setSelectedNetwork(ChainType.BITCOIN_MAINNET);
    } else if (network === 'testnet') {
      setSelectedNetwork(ChainType.BITCOIN_TESTNET);
    }
  }, [network, chainType]);
  
  const handleNetworkChange = async (value: string) => {
    const chainType = value as ChainType;
    
    if (!connected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await switchChain(chainType);
      setSelectedNetwork(chainType);
    } catch (e) {
      console.error("Error switching network:", e);
      // Error is already toasted in the useWallet hook
    }
  };
  
  return (
    <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
      <SelectTrigger className="w-[180px] bg-dark-100 border-gray-700 hover:bg-dark-100/80 hover:border-bitcoin text-white">
        <div className="flex items-center gap-2">
          <Network size={16} className="text-bitcoin" />
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
