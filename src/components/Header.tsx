
import { ConnectWalletButton } from "./ConnectWalletButton";
import { NetworkSelector } from "./NetworkSelector";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // Update header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-dark-200/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-bitcoin flex items-center justify-center">
            <span className="text-white font-bold text-lg">₿</span>
          </div>
          <span className="text-xl font-bold text-white">UniSatPump</span>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white/80 hover:text-bitcoin transition-colors">Home</a>
          <a href="#tokens" className="text-white/80 hover:text-bitcoin transition-colors">Tokens</a>
          <a href="#about" className="text-white/80 hover:text-bitcoin transition-colors">About</a>
          <a href="#faq" className="text-white/80 hover:text-bitcoin transition-colors">FAQ</a>
        </nav>
        
        {/* Network Selector and Connect Wallet Button */}
        <div className="flex items-center gap-2">
          <NetworkSelector />
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
};
