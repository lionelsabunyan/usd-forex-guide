import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Email subscription handled by newsletter service
    setEmail("");
  };

  return (
    <footer className="bg-background">
      {/* Newsletter CTA Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">
            Get the best sent to your inbox, every month
          </h2>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent/90 hover:bg-accent text-white rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </div>
            <p className="text-primary-foreground/70 text-sm mt-3">
              Once monthly, no spam
            </p>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <Logo variant="default" size="lg" />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Independent forex broker reviews for US traders. Research-driven, unbiased analysis.
              </p>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Trading Guides
                  </Link>
                </li>
                <li>
                  <Link to="/tools" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Calculator Tools
                  </Link>
                </li>
                <li>
                  <Link to="/glossary" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Forex Glossary
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Brokers Column */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Brokers</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/brokers" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    All Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/compare" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Compare
                  </Link>
                </li>
                <li>
                  <Link to="/review/midasfx" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    MidasFX
                  </Link>
                </li>
                <li>
                  <Link to="/review/hankotrade" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Hankotrade
                  </Link>
                </li>
                <li>
                  <Link to="/review/oanda" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    OANDA
                  </Link>
                </li>
                <li>
                  <Link to="/review/forexcom" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Forex.com
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/legal/affiliate-disclosure" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Affiliate Disclosure
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Risk Disclaimer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Risk Disclaimer:</strong> Trading foreign exchange on margin carries a high level of risk and may not be suitable for all investors.
                Past performance is not indicative of future results. Before deciding to invest in foreign exchange, you should carefully consider your investment objectives, level of experience, and risk appetite.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© 2026 Beginner FX Guide. All rights reserved.</p>
              <p className="text-xs">
                We may receive compensation when you click on links to products we review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
