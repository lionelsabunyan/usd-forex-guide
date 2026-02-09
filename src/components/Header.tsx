import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Brokers", path: "/brokers" },
    { label: "Compare", path: "/compare" },
    { label: "Guides", path: "/guides" },
    { label: "Tools", path: "/tools" },
    { label: "Blog", path: "/blog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center z-10">
            <Logo variant="default" size="md" />
          </Link>

          {/* Desktop Navigation - Absolute Center */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side - About, Theme, Language & CTA */}
          <div className="hidden md:flex items-center gap-4 z-10">
            <Link
              to="/about"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
            >
              About
            </Link>
            <ThemeToggle />
            <Button
              variant="default"
              size="sm"
              className="rounded-full px-5 bg-primary hover:bg-primary/90"
              asChild
            >
              <a
                href={getAffiliateUrl("midasfx", UTM_CONFIGS.HEADER_CTA)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAffiliateClick("midasfx", "header", "start_trading")}
              >
                Start Trading
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/40 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium py-3.5 min-h-[44px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/about"
                className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium py-3.5 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex items-center justify-between py-3">
                <span className="text-foreground/70 text-sm font-medium">Theme</span>
                <ThemeToggle />
              </div>
              <div className="pt-4 border-t border-border/40">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full rounded-full bg-primary hover:bg-primary/90"
                  asChild
                >
                  <a
                    href={getAffiliateUrl("midasfx", UTM_CONFIGS.HEADER_CTA)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackAffiliateClick("midasfx", "header_mobile", "start_trading");
                      setIsMenuOpen(false);
                    }}
                  >
                    Start Trading
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
