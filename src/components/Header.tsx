import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Logo variant="default" size="md" />
            <span className="font-heading text-lg font-bold text-foreground">
              US Forex<span className="text-gradient-gold"> Guide</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide">
              Home
            </Link>
            <Link to="/brokers" className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide">
              Brokers
            </Link>
            <Link to="/guides" className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide">
              Guides
            </Link>
            <Link to="/blog" className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide">
              Blog
            </Link>
            <Link to="/faq" className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide">
              FAQ
            </Link>
            <Link to="/contact" className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide">
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button variant="default" size="sm" asChild>
              <a
                href={getAffiliateUrl("fxglory", UTM_CONFIGS.HEADER_CTA)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick("fxglory", "header", "get_started")}
              >
                Get Started
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/brokers"
                className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Brokers
              </Link>
              <Link
                to="/guides"
                className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Guides
              </Link>
              <Link
                to="/blog"
                className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/faq"
                className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="text-foreground/90 hover:text-foreground transition-colors font-semibold uppercase text-sm tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button variant="default" size="sm" className="w-fit" asChild>
                <a
                  href={getAffiliateUrl("fxglory", UTM_CONFIGS.HEADER_CTA)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick("fxglory", "header_mobile", "get_started")}
                >
                  Get Started
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;