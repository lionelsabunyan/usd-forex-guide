import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "default" | "minimal" | "icon-only";
  className?: string;
  size?: "sm" | "md" | "lg";
};

const Logo = ({ variant = "default", className, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  // Variant 1: Modern geometric logo with flag stripes
  if (variant === "default") {
    return (
      <div className={cn("relative", className)}>
        <svg
          width={size === "sm" ? 32 : size === "md" ? 40 : 48}
          height={size === "sm" ? 32 : size === "md" ? 40 : 48}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Background circle with gradient */}
          <circle cx="20" cy="20" r="20" fill="url(#logoGradient)" />
          
          {/* Top left corner - navy blue */}
          <path
            d="M0 0 L20 0 L20 20 L0 20 Z"
            fill="hsl(220 52% 18%)"
          />
          
          {/* Red stripe pattern */}
          <rect x="0" y="8" width="20" height="2" fill="hsl(355 85% 52%)" />
          <rect x="0" y="12" width="20" height="2" fill="hsl(355 85% 52%)" />
          <rect x="0" y="16" width="20" height="2" fill="hsl(355 85% 52%)" />
          
          {/* Forex symbol - stylized $ */}
          <path
            d="M24 12 L28 12 L28 14 L26 14 L26 18 L30 18 L30 20 L26 20 L26 26 L24 26 Z"
            fill="white"
            opacity="0.95"
          />
          <circle cx="32" cy="16" r="3" fill="white" opacity="0.95" />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(220 52% 18%)" />
              <stop offset="100%" stopColor="hsl(355 85% 52%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Variant 2: Minimal modern logo
  if (variant === "minimal") {
    return (
      <div className={cn("relative", className)}>
        <svg
          width={size === "sm" ? 32 : size === "md" ? 40 : 48}
          height={size === "sm" ? 32 : size === "md" ? 40 : 48}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Modern shield shape */}
          <path
            d="M20 4 L32 10 L32 20 C32 28 26 34 20 36 C14 34 8 28 8 20 L8 10 Z"
            fill="url(#minimalGradient)"
            stroke="hsl(220 52% 18%)"
            strokeWidth="1.5"
          />
          
          {/* Stylized US */}
          <text
            x="20"
            y="24"
            fontSize="12"
            fontWeight="700"
            fill="white"
            textAnchor="middle"
            fontFamily="Space Grotesk, sans-serif"
          >
            US
          </text>
          
          <defs>
            <linearGradient id="minimalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(220 52% 18%)" />
              <stop offset="100%" stopColor="hsl(355 85% 52%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Variant 3: Icon only - modern abstract
  if (variant === "icon-only") {
    return (
      <div className={cn("relative", className)}>
        <svg
          width={size === "sm" ? 32 : size === "md" ? 40 : 48}
          height={size === "sm" ? 32 : size === "md" ? 40 : 48}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Abstract geometric design */}
          <rect x="8" y="8" width="24" height="24" rx="4" fill="url(#iconGradient)" />
          
          {/* Diagonal accent */}
          <path
            d="M8 8 L32 32 M32 8 L8 32"
            stroke="white"
            strokeWidth="2"
            strokeOpacity="0.3"
          />
          
          {/* Center symbol */}
          <circle cx="20" cy="20" r="6" fill="white" opacity="0.9" />
          <path
            d="M17 20 L20 17 L23 20 L20 23 Z"
            fill="hsl(220 52% 18%)"
          />
          
          <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(220 52% 18%)" />
              <stop offset="50%" stopColor="hsl(220 52% 25%)" />
              <stop offset="100%" stopColor="hsl(355 85% 52%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return null;
};

export default Logo;
