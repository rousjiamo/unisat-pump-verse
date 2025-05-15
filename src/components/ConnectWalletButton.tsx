
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const ConnectWalletButton = () => {
  const { connecting, connected, address, connectWallet, disconnectWallet } = useWallet();
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
        <DropdownMenuContent className="bg-dark-100 border-gray-700 text-white">
          <DropdownMenuItem onClick={copyAddress} className="cursor-pointer hover:bg-dark-200">
            {copied ? "Copied!" : "Copy Address"}
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
