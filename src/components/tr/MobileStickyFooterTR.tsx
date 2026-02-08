import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";

/**
 * Mobile Sticky Footer CTA - Turkish Version
 * Scrolls to broker comparison table
 */
const MobileStickyFooterTR = () => {
  const scrollToComparison = () => {
    document.getElementById('karsilastirma')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border safe-area-pb">
      <Button variant="hero" size="lg" className="w-full" onClick={scrollToComparison}>
        Broker'ları Karşılaştır
        <ArrowDown className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default MobileStickyFooterTR;
