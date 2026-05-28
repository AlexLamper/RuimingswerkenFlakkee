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

        <g className="hero-build" stroke="white" strokeWidth="2" fill="none" strokeLinecap="square">
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

        <g
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1"
          fill="none"
        >
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
          className="hero-tractor"
          stroke="white"
          strokeWidth="2"
          fill="rgba(255,255,255,0.04)"
          strokeLinejoin="round"
        >
          <rect x="360" y="310" width="130" height="22" rx="11" />
          <line x1="372" y1="310" x2="372" y2="332" />
          <line x1="394" y1="310" x2="394" y2="332" />
          <line x1="416" y1="310" x2="416" y2="332" />
          <line x1="438" y1="310" x2="438" y2="332" />
          <line x1="460" y1="310" x2="460" y2="332" />
          <line x1="478" y1="310" x2="478" y2="332" />
          <rect x="378" y="278" width="96" height="32" />
          <path d="M 392 278 L 392 246 L 444 246 L 458 278 Z" />
          <line x1="398" y1="254" x2="446" y2="254" />
        </g>

        <g
          className="hero-arm"
          stroke="white"
          strokeWidth="2.5"
          fill="rgba(255,255,255,0.05)"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M 466 292 L 388 226 L 348 256" />
          <path d="M 348 256 L 326 276 L 308 256 L 330 236 Z" />
          <circle cx="466" cy="292" r="3.5" fill="white" stroke="none" />
        </g>

        <g className="hero-dust" fill="rgba(255,255,255,0.55)">
          <circle className="dust dust-1" cx="312" cy="298" r="2" />
          <circle className="dust dust-2" cx="338" cy="292" r="1.6" />
          <circle className="dust dust-3" cx="290" cy="312" r="1.9" />
          <circle className="dust dust-4" cx="324" cy="282" r="1.3" />
          <circle className="dust dust-5" cx="350" cy="306" r="1.5" />
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
