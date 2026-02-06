import { AlertTriangle } from "lucide-react";

const RiskDisclaimerBannerTR = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-amber-950 py-2 px-4 text-center text-sm font-medium">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <span>
          <strong>RİSK UYARISI:</strong> Forex ve CFD işlemleri yüksek risk içerir. Yatırımcıların %74-89'u para kaybeder.
        </span>
      </div>
    </div>
  );
};

export default RiskDisclaimerBannerTR;
