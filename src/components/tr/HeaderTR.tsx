import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";

const HeaderTR = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Convert TR URL to EN URL
  const getEnglishUrl = () => {
    return location.pathname.replace('/tr', '') || '/';
  };

  const navItems = [
    { label: "Brokerlar", href: "/tr" },
    { label: "Hakkımızda", href: "/tr/hakkimizda" },
    { label: "İletişim", href: "/tr/iletisim" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        {/* Main header row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/tr" className="flex items-center">
            <Logo variant="default" size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <Button variant="outline" size="sm" asChild className="gap-2">
              <Link to={getEnglishUrl()}>
                <Globe className="w-4 h-4" />
                EN
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <Link
                to={getEnglishUrl()}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium py-2 border-t border-border pt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <Globe className="w-4 h-4" />
                English Version
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default HeaderTR;
