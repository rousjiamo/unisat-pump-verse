
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CHAINS_MAP } from "@/types/network";

export const ConnectWalletButton = () => {
  const { connecting, connected, address, publicKey, balance, network, chainType, connectWallet, disconnectWallet } = useWallet();
  const [copied, setCopied] = useState(false);

  // Format address for display (e.g., 0x1234...5678)
  const formattedAddress = address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "";

  // Copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate balance in BTC
  const formatBalance = (satoshis: number): string => {
    return (satoshis / 100000000).toFixed(8);
  };

  // Get current chain info
  const currentChain = CHAINS_MAP[chainType] || CHAINS_MAP.BITCOIN_MAINNET;
  const unit = currentChain ? currentChain.unit : "BTC";

  if (connected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-dark-100 border-gray-700 hover:bg-dark-100/80 hover:border-bitcoin text-white"
          >
            <Wallet size={16} className="text-bitcoin" />
            <span>{formattedAddress}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-dark-100 border-gray-700 text-white w-56">
          <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="text-xs opacity-70 flex flex-col items-start">
            <span>Balance:</span>
            <span className="font-bold text-sm text-bitcoin">{formatBalance(balance.total)} {unit}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs opacity-70 flex flex-col items-start">
            <span>Network:</span>
            <span className="font-bold text-sm">{currentChain.label}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem onClick={copyAddress} className="cursor-pointer hover:bg-dark-200">
            {copied ? "✓ Copied" : "Copy Address"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer hover:bg-dark-200">
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button 
      onClick={connectWallet} 
      disabled={connecting}
      className="bg-bitcoin hover:bg-bitcoin/90 text-white font-medium flex items-center gap-2"
    >
      <Wallet size={16} />
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};
