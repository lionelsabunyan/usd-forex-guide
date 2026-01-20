import { TrendingUp, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">
              Forex<span className="text-gradient-gold">Scout</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/#reviews" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Reviews
            </a>
            <a href="/#compare" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Compare
            </a>
            <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Guides
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              FAQ
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button variant="default" size="sm">
              Get Started
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
              <a href="/#reviews" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Reviews
              </a>
              <a href="/#compare" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Compare
              </a>
              <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Guides
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </Link>
              <Button variant="default" size="sm" className="w-fit">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;