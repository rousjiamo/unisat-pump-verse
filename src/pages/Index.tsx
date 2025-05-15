
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrendingTokens } from "@/components/TrendingTokens";
import { WalletProvider } from "@/hooks/useWallet";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-dark-200">
        <Header />
        <main>
          <Hero />
          <Separator className="bg-gray-800" />
          <TrendingTokens />
          
          {/* About Section */}
          <section id="about" className="py-16 bg-dark-100">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">About UniSat Pump</h2>
                <p className="text-white/80 mb-6">
                  UniSat Pump is the premier platform for Bitcoin-based memecoins and ordinals. 
                  We provide a seamless experience for discovering, trading, and launching BRC-20 tokens on Bitcoin.
                </p>
                <p className="text-white/80">
                  Built by Bitcoin enthusiasts, for Bitcoin enthusiasts, we're committed to growing 
                  the ecosystem and providing the tools needed for the next generation of Bitcoin assets.
                </p>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section id="faq" className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-dark-100 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">What are BRC-20 tokens?</h3>
                  <p className="text-white/80">
                    BRC-20 is an experimental standard for fungible tokens on Bitcoin, utilizing Bitcoin Ordinals. 
                    They allow for token creation and transfers directly on the Bitcoin blockchain.
                  </p>
                </div>
                
                <div className="bg-dark-100 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">How do I connect my wallet?</h3>
                  <p className="text-white/80">
                    Click on the "Connect Wallet" button in the top right corner and select UniSat wallet. 
                    You'll need to have the UniSat browser extension installed.
                  </p>
                </div>
                
                <div className="bg-dark-100 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">How do I trade tokens?</h3>
                  <p className="text-white/80">
                    After connecting your wallet, navigate to the token you want to trade, enter the amount, 
                    and click "Trade". Confirm the transaction in your wallet when prompted.
                  </p>
                </div>
                
                <div className="bg-dark-100 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">What fees does UniSat Pump charge?</h3>
                  <p className="text-white/80">
                    We charge a small fee of 1% on all trades to maintain and improve the platform. 
                    Standard Bitcoin network fees also apply for all transactions.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="bg-dark-100 py-8">
            <div className="container mx-auto px-4 text-center">
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-full bg-bitcoin flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₿</span>
                </div>
                <span className="text-lg font-bold text-white">UniSatPump</span>
              </div>
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} UniSat Pump. All rights reserved.
              </p>
              <div className="flex justify-center mt-4 gap-4">
                <a href="#" className="text-white/60 hover:text-bitcoin transition-colors">Terms</a>
                <a href="#" className="text-white/60 hover:text-bitcoin transition-colors">Privacy</a>
                <a href="#" className="text-white/60 hover:text-bitcoin transition-colors">Help</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </WalletProvider>
  );
};

export default Index;
