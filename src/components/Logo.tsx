import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "default" | "minimal" | "icon-only";
  className?: string;
  size?: "sm" | "md" | "lg";
};

const Logo = ({ variant = "default", className, size = "md" }: LogoProps) => {
  // Text-only minimal logo - Scribe style
  // No icon, just beautiful serif typography

  const sizeStyles = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  if (variant === "icon-only") {
    // For favicon/small spaces - just "BFX" monogram
    return (
      <div className={cn("font-heading font-normal tracking-tight", sizeStyles[size], className)}>
        <span className="text-foreground">BFX</span>
      </div>
    );
  }

  // Default and minimal variants - full text logo
  return (
    <div className={cn("font-heading font-normal tracking-tight", sizeStyles[size], className)}>
      <span className="text-foreground">Beginner</span>
      <span className="text-primary italic ml-1">FX</span>
    </div>
  );
};

export default Logo;
