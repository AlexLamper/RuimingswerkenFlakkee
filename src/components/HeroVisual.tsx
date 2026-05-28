export function HeroVisual() {
  return (
    <div className="relative" aria-hidden>
      <svg
        viewBox="0 0 520 420"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-visual h-auto w-full"
        role="img"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 26 0 L 0 0 0 26"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="520" height="420" fill="url(#hero-grid)" />

        <rect
          x="14"
          y="14"
          width="492"
          height="392"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          strokeDasharray="4 5"
        />

        <g
          fill="rgba(255,255,255,0.5)"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9"
          letterSpacing="2"
        >
          <text x="28" y="34">WERKGEBIED</text>
          <text x="492" y="34" textAnchor="end">REGIO 01</text>
          <text x="28" y="402">GOEREE-OVERFLAKKEE</text>
          <text x="492" y="402" textAnchor="end">SCHAAL 1:80K</text>
        </g>

        <g transform="translate(470 70)">
          <circle
            cx="0"
            cy="0"
            r="18"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
          />
          <path
            d="M 0 -11 L 4 5 L 0 2 L -4 5 Z"
            fill="white"
            stroke="white"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <text
            x="0"
            y="-21"
            textAnchor="middle"
            fill="white"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="9"
            letterSpacing="2"
          >
            N
          </text>
        </g>

        <g className="map-island">
          <path
            d="M 70 220 C 70 192, 92 170, 132 162 C 174 154, 212 150, 232 150 L 232 134 L 268 134 L 268 150 C 304 154, 346 164, 390 180 C 432 196, 456 218, 454 240 C 450 262, 428 276, 396 282 C 354 288, 296 288, 236 282 C 178 278, 122 278, 96 268 C 76 258, 64 242, 70 220 Z"
            fill="rgba(255,255,255,0.05)"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <line
            x1="90"
            y1="208"
            x2="440"
            y2="208"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          <line
            x1="100"
            y1="242"
            x2="430"
            y2="242"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        </g>

        <g
          className="map-markers"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing="1.5"
        >
          <g>
            <circle cx="108" cy="200" r="3.5" fill="white" />
            <text
              x="108"
              y="218"
              textAnchor="middle"
              fill="rgba(255,255,255,0.85)"
              fontSize="10"
            >
              OUDDORP
            </text>
          </g>

          <g>
            <circle cx="248" cy="148" r="3.5" fill="white" />
            <text
              x="248"
              y="124"
              textAnchor="middle"
              fill="rgba(255,255,255,0.85)"
              fontSize="10"
            >
              STELLENDAM
            </text>
          </g>

          <g>
            <circle cx="395" cy="245" r="3.5" fill="white" />
            <text
              x="395"
              y="263"
              textAnchor="middle"
              fill="rgba(255,255,255,0.85)"
              fontSize="10"
            >
              OUDE-TONGE
            </text>
          </g>

          <g>
            <circle
              className="map-pulse"
              cx="282"
              cy="222"
              r="6"
              fill="rgba(255,255,255,0.35)"
              stroke="white"
              strokeWidth="1"
            />
            <circle
              cx="282"
              cy="222"
              r="7.5"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />
            <circle cx="282" cy="222" r="3.5" fill="white" />
            <text
              x="282"
              y="245"
              textAnchor="middle"
              fill="white"
              fontSize="10.5"
              fontWeight="600"
              letterSpacing="2.5"
            >
              MIDDELHARNIS
            </text>
          </g>
        </g>

        <g
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeDasharray="2 4"
          fill="none"
        >
          <line x1="14" y1="380" x2="506" y2="380" />
        </g>
      </svg>
    </div>
  );
}
