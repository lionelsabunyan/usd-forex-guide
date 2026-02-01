import { Link } from "react-router-dom";
import Logo from "./Logo";
import NewsletterSignup from "./NewsletterSignup";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="mb-10">
          <NewsletterSignup variant="card" />
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Logo variant="default" size="md" />
              <span className="font-heading text-lg font-bold text-foreground">
                US Forex<span className="text-gradient-gold"> Guide</span>
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
                <Link to="/brokers" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  All Brokers
                </Link>
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
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/disclaimer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/legal/affiliate-disclosure" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Affiliate Disclosure
                </Link>
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
            <p>© 2026 US Forex Guide. All rights reserved.</p>
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