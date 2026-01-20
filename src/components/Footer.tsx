import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold text-foreground">
                Forex<span className="text-gradient-gold">Scout</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Your trusted source for unbiased forex broker reviews and comparisons. 
              We help American traders make informed decisions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#reviews" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Broker Reviews
                </a>
              </li>
              <li>
                <a href="/#compare" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Compare Brokers
                </a>
              </li>
              <li>
                <Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Trading Guides
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Affiliate Disclosure
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="bg-secondary rounded-xl p-4 mb-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Risk Disclaimer:</strong> Trading foreign exchange on margin carries a high level of risk, and may not be suitable for all investors. 
              Past performance is not indicative of future results. The high degree of leverage can work against you as well as for you. 
              Before deciding to invest in foreign exchange, you should carefully consider your investment objectives, level of experience, and risk appetite. 
              The possibility exists that you could sustain a loss of some or all of your initial investment.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 ForexScout. All rights reserved.</p>
            <p>
              Affiliate Disclosure: We may receive compensation when you click on links to products we review.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;