import { useEffect, useRef } from "react";

type OGImageProps = {
  title: string;
  subtitle?: string;
  type?: "default" | "blog" | "tool" | "guide" | "broker";
  brokerName?: string;
};

/**
 * SVG-based OG Image component that can be rendered server-side or captured
 * Dimensions: 1200x630 (standard OG image size)
 */
const OGImageGenerator = ({ title, subtitle, type = "default", brokerName }: OGImageProps) => {
  const getTypeIcon = () => {
    switch (type) {
      case "blog":
        return (
          <path d="M4 4h16v16H4z M8 8h8 M8 12h8 M8 16h4" stroke="white" strokeWidth="2" fill="none" />
        );
      case "tool":
        return (
          <path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" />
        );
      case "guide":
        return (
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="white" strokeWidth="2" fill="none" />
        );
      case "broker":
        return (
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" fill="none" />
        );
      default:
        return (
          <path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" />
        );
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "blog": return "BLOG";
      case "tool": return "TRADING TOOL";
      case "guide": return "GUIDE";
      case "broker": return "BROKER REVIEW";
      default: return "FOREX GUIDE";
    }
  };

  return (
    <svg
      width="1200"
      height="630"
      viewBox="0 0 1200 630"
      xmlns="http://www.w3.org/2000/svg"
      className="og-image"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(220, 52%, 12%)" />
          <stop offset="50%" stopColor="hsl(220, 52%, 18%)" />
          <stop offset="100%" stopColor="hsl(220, 52%, 22%)" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(355, 85%, 52%)" />
          <stop offset="100%" stopColor="hsl(355, 85%, 62%)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Main background */}
      <rect width="1200" height="630" fill="url(#bgGradient)" />

      {/* Decorative circles */}
      <circle cx="1100" cy="100" r="200" fill="hsl(355, 85%, 52%)" opacity="0.1" />
      <circle cx="100" cy="530" r="150" fill="hsl(355, 85%, 52%)" opacity="0.08" />

      {/* Grid pattern overlay */}
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.05"/>
      </pattern>
      <rect width="1200" height="630" fill="url(#grid)" />

      {/* Top accent bar */}
      <rect x="0" y="0" width="1200" height="6" fill="url(#accentGradient)" />

      {/* Logo area */}
      <g transform="translate(60, 50)">
        {/* Logo circle */}
        <circle cx="24" cy="24" r="24" fill="url(#accentGradient)" />
        <svg x="8" y="8" width="32" height="32" viewBox="0 0 24 24">
          {getTypeIcon()}
        </svg>

        {/* Site name */}
        <text x="64" y="20" fontFamily="Space Grotesk, sans-serif" fontSize="18" fontWeight="600" fill="white">
          Beginner FX Guide
        </text>
        <text x="64" y="40" fontFamily="Inter, sans-serif" fontSize="12" fill="white" opacity="0.7">
          Independent Forex Broker Reviews
        </text>
      </g>

      {/* Type badge */}
      <g transform="translate(60, 180)">
        <rect x="0" y="0" width="auto" height="32" rx="4" fill="url(#accentGradient)" />
        <text x="12" y="22" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="white" letterSpacing="1">
          {getTypeLabel()}
        </text>
      </g>

      {/* Main title */}
      <text x="60" y="280" fontFamily="Space Grotesk, sans-serif" fontSize="52" fontWeight="700" fill="white" filter="url(#glow)">
        <tspan x="60" dy="0">{title.length > 35 ? title.substring(0, 35) + "..." : title}</tspan>
        {title.length > 35 && (
          <tspan x="60" dy="65">{title.substring(35, 70)}{title.length > 70 ? "..." : ""}</tspan>
        )}
      </text>

      {/* Subtitle */}
      {subtitle && (
        <text x="60" y={title.length > 35 ? 400 : 340} fontFamily="Inter, sans-serif" fontSize="24" fill="white" opacity="0.8">
          {subtitle.length > 60 ? subtitle.substring(0, 60) + "..." : subtitle}
        </text>
      )}

      {/* Bottom section */}
      <g transform="translate(60, 540)">
        {/* URL */}
        <text fontFamily="Inter, sans-serif" fontSize="16" fill="white" opacity="0.6">
          beginnerfxguide.com
        </text>
      </g>

      {/* Trust badges */}
      <g transform="translate(900, 540)">
        <rect x="0" y="-10" width="240" height="40" rx="6" fill="white" opacity="0.1" />
        <text x="20" y="16" fontFamily="Inter, sans-serif" fontSize="14" fill="white" opacity="0.9">
          Trusted by 10,000+ Traders
        </text>
      </g>

      {/* Bottom accent bar */}
      <rect x="0" y="624" width="1200" height="6" fill="url(#accentGradient)" />
    </svg>
  );
};

export default OGImageGenerator;
