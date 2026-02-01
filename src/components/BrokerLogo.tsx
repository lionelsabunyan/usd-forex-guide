import { useMemo, useState } from "react";
import type { Broker } from "@/lib/brokers";
import { cn } from "@/lib/utils";

type Props = {
  broker: Broker;
  className?: string;
  imgClassName?: string;
};

function initials(name: string) {
  const parts = name.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").filter(Boolean);
  const raw = (parts[0]?.[0] || "") + (parts[1]?.[0] || parts[0]?.[1] || "");
  return raw.toUpperCase().slice(0, 2) || "BR";
}

const BrokerLogo = ({ broker, className, imgClassName }: Props) => {
  const [failed, setFailed] = useState(false);
  const label = useMemo(() => initials(broker.name), [broker.name]);

  const showImage = Boolean(broker.logoSrc) && !failed;

  return (
    <div
      className={cn(
        "w-12 h-12 rounded-xl border border-border bg-secondary/60 flex items-center justify-center overflow-hidden",
        // white logos need contrast
        broker.id === "n1cm" ? "bg-[hsl(var(--patriot-blue))] border-white/10" : "",
        broker.id === "fxglory" ? "bg-black border-black/60 shadow-md" : "",
        className
      )}
      aria-label={`${broker.name} logo`}
      title={broker.name}
    >
      {showImage ? (
        <img
          src={broker.logoSrc}
          alt={`${broker.name} forex broker logo`}
          className={cn(
            "w-full h-full object-contain",
            broker.id === "fxglory" ? "p-2.5" : "p-2",
            imgClassName
          )}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={cn(
          "text-sm font-bold text-foreground",
          broker.id === "n1cm" ? "text-white" : "",
          broker.id === "fxglory" ? "text-white" : ""
        )}>
          {label}
        </span>
      )}
    </div>
  );
};

export default BrokerLogo;

