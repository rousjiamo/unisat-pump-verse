
import { useWallet } from "@/hooks/useWallet";

export const Hero = () => {
  const { connected, connectWallet } = useWallet();

  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bitcoin/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Bitcoin symbol background */}
      <div className="absolute opacity-5 text-[400px] font-bold text-bitcoin top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        ₿
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">The </span>
            <span className="text-bitcoin">Premier Platform</span>
            <span className="text-white"> for Bitcoin Memecoins</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Discover, trade, and launch the hottest BRC-20 tokens and Bitcoin Ordinals on the most trusted platform in the ecosystem.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {!connected && (
              <button 
                onClick={connectWallet} 
                className="px-8 py-3 bg-bitcoin hover:bg-bitcoin/90 text-white font-medium rounded-lg transition-all button-glow"
              >
                Connect Wallet
              </button>
            )}
            <a 
              href="#tokens" 
              className="px-8 py-3 bg-dark-100 border border-gray-700 hover:border-bitcoin text-white font-medium rounded-lg transition-all"
            >
              Explore Tokens
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-dark-100/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/40">
              <p className="text-2xl md:text-3xl font-bold text-bitcoin">$24.5M</p>
              <p className="text-sm text-white/70">24h Trading Volume</p>
            </div>
            <div className="bg-dark-100/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/40">
              <p className="text-2xl md:text-3xl font-bold text-bitcoin">32K+</p>
              <p className="text-sm text-white/70">Active Traders</p>
            </div>
            <div className="bg-dark-100/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/40">
              <p className="text-2xl md:text-3xl font-bold text-bitcoin">145+</p>
              <p className="text-sm text-white/70">Listed Tokens</p>
            </div>
            <div className="bg-dark-100/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/40">
              <p className="text-2xl md:text-3xl font-bold text-bitcoin">99.9%</p>
              <p className="text-sm text-white/70">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
