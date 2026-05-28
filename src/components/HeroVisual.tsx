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
          fill="rgba(255,255,255,0.45)"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9"
          letterSpacing="2"
        >
          <text x="28" y="34">SLOOPPLAN A-01</text>
          <text x="416" y="34">SCHAAL 1:100</text>
          <text x="28" y="402">PROJECT NR.</text>
          <text x="416" y="402">SECTIE A-A</text>
        </g>

        <g
          className="hero-build"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="square"
        >
          <rect x="110" y="130" width="220" height="200" />
          <line x1="110" y1="190" x2="330" y2="190" />
          <line x1="110" y1="250" x2="330" y2="250" />
          <rect x="130" y="146" width="32" height="28" />
          <rect x="176" y="146" width="32" height="28" />
          <rect x="222" y="146" width="32" height="28" />
          <rect x="268" y="146" width="32" height="28" />
          <rect x="130" y="206" width="32" height="28" />
          <rect x="176" y="206" width="32" height="28" />
          <rect x="222" y="206" width="32" height="28" />
          <rect x="268" y="206" width="32" height="28" />
          <rect x="200" y="270" width="40" height="60" />
          <line x1="220" y1="270" x2="220" y2="330" />
        </g>

        <g stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none">
          <line x1="85" y1="130" x2="85" y2="330" strokeDasharray="3 3" />
          <line x1="80" y1="130" x2="90" y2="130" />
          <line x1="80" y1="330" x2="90" y2="330" />
          <line x1="110" y1="355" x2="330" y2="355" strokeDasharray="3 3" />
          <line x1="110" y1="350" x2="110" y2="360" />
          <line x1="330" y1="350" x2="330" y2="360" />
        </g>

        <g
          fill="rgba(255,255,255,0.7)"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="10"
        >
          <text x="78" y="232" transform="rotate(-90 78 232)" textAnchor="middle">
            14.5 M
          </text>
          <text x="220" y="372" textAnchor="middle">
            22.0 M
          </text>
        </g>

        <g
          className="hero-hammer"
          transform="translate(388 280) rotate(28)"
          stroke="white"
          strokeWidth="2.5"
          fill="rgba(255,255,255,0.07)"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="-60" y="-26" width="120" height="52" rx="3" />
          <line x1="-60" y1="-12" x2="60" y2="-12" strokeWidth="1.25" />
          <line x1="-60" y1="12" x2="60" y2="12" strokeWidth="1.25" />
          <line x1="-32" y1="-26" x2="-32" y2="26" strokeWidth="1.25" />
          <line x1="32" y1="-26" x2="32" y2="26" strokeWidth="1.25" />

          <rect x="-10" y="-156" width="20" height="130" rx="3" />
          <line x1="-12" y1="-26" x2="12" y2="-26" strokeWidth="1.5" />

          <line x1="-12" y1="-138" x2="12" y2="-138" strokeWidth="1.25" />
          <line x1="-12" y1="-118" x2="12" y2="-118" strokeWidth="1.25" />
          <line x1="-12" y1="-98" x2="12" y2="-98" strokeWidth="1.25" />
        </g>

        <g className="hero-dust" fill="rgba(255,255,255,0.55)">
          <circle className="dust dust-1" cx="308" cy="296" r="2" />
          <circle className="dust dust-2" cx="328" cy="286" r="1.6" />
          <circle className="dust dust-3" cx="295" cy="308" r="1.9" />
          <circle className="dust dust-4" cx="318" cy="276" r="1.3" />
          <circle className="dust dust-5" cx="340" cy="294" r="1.5" />
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
