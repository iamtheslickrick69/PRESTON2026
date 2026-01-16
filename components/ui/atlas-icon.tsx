/**
 * Atlas AI Icon Component
 * Stylized globe with integrated health data visualization
 * "Map out your health" - Atlas meets healthcare intelligence
 */

interface AtlasIconProps {
  className?: string
  size?: number
}

export function AtlasIcon({ className, size = 80 }: AtlasIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Premium gradient */}
        <linearGradient id="globe-grad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
        </linearGradient>

        {/* Radial gradient for depth */}
        <radialGradient id="sphere-depth">
          <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 0.3 }} />
          <stop offset="70%" style={{ stopColor: '#3B82F6', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 0 }} />
        </radialGradient>

        {/* Soft glow */}
        <filter id="soft-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.6" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow halo */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="url(#globe-grad)"
        opacity="0.15"
        filter="url(#soft-glow)"
      />

      {/* Sphere depth background */}
      <circle
        cx="50"
        cy="50"
        r="30"
        fill="url(#sphere-depth)"
      />

      {/* Main globe outline */}
      <circle
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="url(#globe-grad)"
        strokeWidth="2"
        opacity="0.9"
      />

      {/* Stylized latitude lines (curved for 3D effect) */}
      <g stroke="url(#globe-grad)" strokeWidth="1.2" opacity="0.5" fill="none">
        {/* Top latitude */}
        <ellipse cx="50" cy="50" rx="30" ry="9" transform="translate(0, -12)" />

        {/* Equator - thicker for emphasis */}
        <ellipse cx="50" cy="50" rx="30" ry="3" strokeWidth="1.5" opacity="0.7" />

        {/* Bottom latitude */}
        <ellipse cx="50" cy="50" rx="30" ry="9" transform="translate(0, 12)" />
      </g>

      {/* Stylized longitude lines - asymmetric for visual interest */}
      <g stroke="url(#globe-grad)" strokeWidth="1.2" opacity="0.5" fill="none">
        {/* Center meridian */}
        <path d="M 50 20 Q 50 50 50 80" />

        {/* Left meridian - curved */}
        <path d="M 32 23 Q 28 50 32 77" />

        {/* Right meridian - curved */}
        <path d="M 68 23 Q 72 50 68 77" />
      </g>

      {/* Data points (representing health data nodes) */}
      <g fill="#60A5FA" opacity="0.8">
        <circle cx="42" cy="35" r="2" />
        <circle cx="58" cy="32" r="2" />
        <circle cx="35" cy="50" r="2" />
        <circle cx="65" cy="48" r="2" />
        <circle cx="46" cy="62" r="2" />
        <circle cx="55" cy="65" r="2" />
      </g>

      {/* Connecting lines between data points (neural network style) */}
      <g stroke="#60A5FA" strokeWidth="0.8" opacity="0.3">
        <line x1="42" y1="35" x2="58" y2="32" />
        <line x1="42" y1="35" x2="35" y2="50" />
        <line x1="58" y1="32" x2="65" y2="48" />
        <line x1="35" y1="50" x2="46" y2="62" />
        <line x1="65" y1="48" x2="55" y2="65" />
      </g>

      {/* Medical cross integrated into center */}
      <g opacity="0.9">
        {/* Cross background circle */}
        <circle cx="50" cy="50" r="8" fill="#2563EB" opacity="0.3" />

        {/* Vertical bar */}
        <rect
          x="48.5"
          y="44"
          width="3"
          height="12"
          rx="1"
          fill="#60A5FA"
        />

        {/* Horizontal bar */}
        <rect
          x="44"
          y="48.5"
          width="12"
          height="3"
          rx="1"
          fill="#60A5FA"
        />

        {/* Subtle outline for definition */}
        <rect
          x="48.5"
          y="44"
          width="3"
          height="12"
          rx="1"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <rect
          x="44"
          y="48.5"
          width="12"
          height="3"
          rx="1"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </g>

      {/* Highlight arc (3D effect) */}
      <path
        d="M 32 28 Q 38 24 45 23"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
        fill="none"
      />

      {/* Subtle shadow arc (bottom) */}
      <path
        d="M 55 77 Q 60 76 65 73"
        stroke="#2563EB"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.2"
        fill="none"
      />
    </svg>
  )
}

export default AtlasIcon
