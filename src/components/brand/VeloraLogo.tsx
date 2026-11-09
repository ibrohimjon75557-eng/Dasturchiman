import React from 'react';

interface VeloraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  className?: string;
}

export const VeloraLogo: React.FC<VeloraLogoProps> = ({
  size = 'md',
  showSlogan = false,
  className = '',
}) => {
  const dimensions = {
    sm: { icon: 30, text: 'text-lg', subtext: 'text-[9px]' },
    md: { icon: 38, text: 'text-2xl', subtext: 'text-[10px]' },
    lg: { icon: 52, text: 'text-3xl', subtext: 'text-xs' },
    xl: { icon: 70, text: 'text-4xl', subtext: 'text-sm' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official VELORA Futuristic Monogram */}
      <div className="relative group flex items-center justify-center">
        {/* Ambient Neon Glow */}
        <div 
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 opacity-60 blur-md group-hover:opacity-100 transition duration-500"
        />

        {/* Crisp Vector SVG Mark */}
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Primary Neon Gradient */}
            <linearGradient id="veloraGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="45%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            {/* Electric Blue Gradient */}
            <linearGradient id="veloraGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>

            {/* Accent Shimmer */}
            <linearGradient id="veloraShimmer" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Filter for subtle glow */}
            <filter id="veloraGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Dark Glass Base Container */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="22"
            fill="#090914"
            stroke="url(#veloraGrad1)"
            strokeWidth="2.5"
            strokeOpacity="0.5"
          />

          {/* Left Wing of V (Neon Purple / Violet) */}
          <path
            d="M24 24L45 76C46.5 79.5 50 81 53 79.5L55 78.5L38 24H24Z"
            fill="url(#veloraGrad1)"
            filter="url(#veloraGlow)"
          />

          {/* Right Wing of V (Electric Blue / Cyan) */}
          <path
            d="M76 24L52 79C50 82 46.5 82 44.5 79L62 24H76Z"
            fill="url(#veloraGrad2)"
            filter="url(#veloraGlow)"
          />

          {/* Central Prismatic Diamond Core */}
          <polygon
            points="50,34 59,48 50,62 41,48"
            fill="#c084fc"
            fillOpacity="0.9"
          />

          {/* Futuristic Upper Tech Bridge Dot */}
          <circle cx="50" cy="23" r="4.5" fill="#38bdf8" />
          <circle cx="50" cy="23" r="2" fill="#ffffff" />

          {/* Subtle light reflex line */}
          <path
            d="M28 27L43 65"
            stroke="url(#veloraShimmer)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-wider font-extrabold">
          <span className={`gradient-text-velora font-black tracking-widest ${dimensions.text}`}>
            VELORA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-1.5 shadow-[0_0_8px_#22d3ee] animate-pulse"></span>
        </div>
        {showSlogan && (
          <span className={`text-slate-400 font-medium tracking-wider uppercase -mt-0.5 ${dimensions.subtext}`}>
            Kelajak shu yerdan boshlanadi
          </span>
        )}
      </div>
    </div>
  );
};
