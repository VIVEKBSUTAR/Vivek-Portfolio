import { memo } from "react";

interface BlueprintProps {
  slug: string;
}

export const ProjectBlueprint = memo(function ProjectBlueprint({ slug }: BlueprintProps) {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
  const stdDev = isMobile ? 0 : 6;
  const gridBackground = (
    <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border-hairline/20" />
    </pattern>
  );

  const styleOverrides = (
    <style dangerouslySetInnerHTML={{ __html: `
      @media (prefers-reduced-motion: reduce) {
        .flow-particle, animate, animateMotion, animateTransform {
          animation: none !important;
          display: none !important;
        }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.08); }
      }
      .glow-node {
        animation: pulse-glow 3s infinite ease-in-out;
      }
    `}} />
  );

  switch (slug) {
    case "navio":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-40 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {gridBackground}
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={stdDev} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={stdDev} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {styleOverrides}
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          
          {/* Subtle background network topology */}
          <path d="M 100 80 L 700 240 M 100 240 L 700 80 M 400 30 V 290" stroke="var(--border-hairline)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
          
          {/* Service Connections to Central Agent */}
          <g stroke="#06b6d4" strokeWidth="1" opacity="0.6">
            <line x1="400" y1="160" x2="400" y2="50" />
            <line x1="400" y1="160" x2="490" y2="80" />
            <line x1="400" y1="160" x2="530" y2="160" />
            <line x1="400" y1="160" x2="490" y2="240" />
            <line x1="400" y1="160" x2="400" y2="270" />
            <line x1="400" y1="160" x2="310" y2="240" />
            <line x1="400" y1="160" x2="270" y2="160" />
            <line x1="400" y1="160" x2="310" y2="80" />
          </g>

          {/* Central AI Agent Node */}
          <circle cx="400" cy="160" r="38" fill="var(--bg)" stroke="#06b6d4" strokeWidth="1.5" filter="url(#glow-cyan)" />
          <circle cx="400" cy="160" r="30" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 3" />
          <text x="400" y="157" fill="#06b6d4" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">AI AGENT</text>
          <text x="400" y="169" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">CORE</text>

          {/* Service Modules */}
          {[
            { name: "Travel", cx: 400, cy: 50, color: "#f59e0b" },
            { name: "Food Delivery", cx: 490, cy: 80, color: "#06b6d4" },
            { name: "Commerce", cx: 530, cy: 160, color: "#f59e0b" },
            { name: "Payments", cx: 490, cy: 240, color: "#06b6d4" },
            { name: "Productivity", cx: 400, cy: 270, color: "#f59e0b" },
            { name: "Healthcare", cx: 310, cy: 240, color: "#06b6d4" },
            { name: "Bookings", cx: 270, cy: 160, color: "#f59e0b" },
            { name: "Notifications", cx: 310, cy: 80, color: "#06b6d4" }
          ].map((m) => (
            <g key={m.name}>
              <circle cx={m.cx} cy={m.cy} r="18" fill="var(--surface)" stroke="var(--border-hairline)" strokeWidth="1" />
              <circle cx={m.cx} cy={m.cy} r="3" fill={m.color} />
              <text x={m.cx} y={m.cy > 160 ? m.cy + 18 : m.cy - 12} fill="var(--fg-muted)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="500">{m.name}</text>
            </g>
          ))}

          {/* Data Flow Particles */}
          <circle r="2.5" fill="#f59e0b" className="flow-particle">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 400 160 L 400 50 Z" />
          </circle>
          <circle r="2.5" fill="#06b6d4" className="flow-particle">
            <animateMotion dur="5.5s" repeatCount="indefinite" path="M 490 80 L 400 160 Z" />
          </circle>
          <circle r="2.5" fill="#f59e0b" className="flow-particle">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M 400 160 L 530 160 Z" />
          </circle>
          <circle r="2.5" fill="#06b6d4" className="flow-particle">
            <animateMotion dur="6s" repeatCount="indefinite" path="M 400 160 L 490 240 Z" />
          </circle>
          <circle r="2.5" fill="#f59e0b" className="flow-particle">
            <animateMotion dur="4.5s" repeatCount="indefinite" path="M 400 270 L 400 160 Z" />
          </circle>
          <circle r="2.5" fill="#06b6d4" className="flow-particle">
            <animateMotion dur="5s" repeatCount="indefinite" path="M 400 160 L 310 240 Z" />
          </circle>
          <circle r="2.5" fill="#f59e0b" className="flow-particle">
            <animateMotion dur="3.8s" repeatCount="indefinite" path="M 270 160 L 400 160 Z" />
          </circle>
          <circle r="2.5" fill="#06b6d4" className="flow-particle">
            <animateMotion dur="4.2s" repeatCount="indefinite" path="M 400 160 L 310 80 Z" />
          </circle>
        </svg>
      );

    case "sentinel-ai":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-40 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {gridBackground}
            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={stdDev} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {styleOverrides}
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* Central AI Engine Shield Node */}
          <g filter="url(#glow-blue)">
            <polygon points="400,105 445,120 445,175 400,205 355,175 355,120" fill="var(--bg)" stroke="#3b82f6" strokeWidth="1.5" />
          </g>
          <text x="400" y="148" fill="#3b82f6" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">AI ENGINE</text>
          <text x="400" y="162" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">SECURITY</text>
          
          {/* Inputs Panel (Left) */}
          <g transform="translate(100, 30)">
            <text x="0" y="10" fill="var(--fg-muted)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">INPUT telemetry</text>
            {[
              { name: "Logs", y: 35 },
              { name: "Metrics", y: 75 },
              { name: "API Calls", y: 115 },
              { name: "Infrastructure", y: 155 },
              { name: "Cloud Events", y: 195 }
            ].map((inp) => (
              <g key={inp.name} transform={`translate(0, ${inp.y})`}>
                <rect x="0" y="0" width="110" height="26" rx="4" fill="var(--surface)" stroke="var(--border-hairline)" strokeWidth="1" />
                <text x="12" y="16" fill="var(--fg-subtle)" fontSize="8" fontFamily="var(--font-mono)">{inp.name}</text>
                <path d="M 110 13 L 245 ${13 + inp.y - 120}" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                <circle cx="110" cy="13" r="2.5" fill="#3b82f6" />
              </g>
            ))}
          </g>

          {/* Outputs Panel (Right) */}
          <g transform="translate(580, 30)">
            <text x="110" y="10" fill="#3b82f6" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="end">OUTPUT signals</text>
            {[
              { name: "Threat Detection", y: 35, accent: true },
              { name: "Root Cause", y: 75 },
              { name: "Incident Summary", y: 115 },
              { name: "Recommendations", y: 155 },
              { name: "Risk Score", y: 195, accent: true }
            ].map((out) => (
              <g key={out.name} transform={`translate(0, ${out.y})`}>
                <rect x="0" y="0" width="125" height="26" rx="4" fill="var(--surface)" stroke={out.accent ? "#ef4444" : "var(--border-hairline)"} strokeWidth="1" />
                <text x="12" y="16" fill={out.accent ? "#ef4444" : "var(--fg-subtle)"} fontSize="8" fontFamily="var(--font-mono)">{out.name}</text>
                <path d="M -125 ${13 + out.y - 120} L 0 13" stroke="var(--border-hairline)" strokeWidth="0.8" opacity="0.6" />
                <circle cx="0" cy="13" r="2.5" fill={out.accent ? "#ef4444" : "#3b82f6"} />
              </g>
            ))}
          </g>

          {/* Underneath DB & LLM Nodes */}
          <g transform="translate(300, 245)">
            <rect x="0" y="0" width="80" height="28" rx="4" fill="var(--surface)" stroke="var(--border-hairline)" strokeWidth="1" />
            <text x="40" y="17" fill="var(--fg-subtle)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">DATABASE</text>
            <path d="M 40 0 L 70 -40" stroke="var(--border-hairline)" strokeWidth="1" />
          </g>
          
          <g transform="translate(420, 245)">
            <rect x="0" y="0" width="80" height="28" rx="4" fill="var(--surface)" stroke="#3b82f6" strokeWidth="1" />
            <text x="40" y="17" fill="#3b82f6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">LLM CORE</text>
            <path d="M 40 0 L 10 -40" stroke="#3b82f6" strokeWidth="1" />
          </g>

          {/* Inputs flow pathways to center */}
          <path d="M 210 165 L 355 150 M 210 225 L 355 160 M 210 105 L 355 140 M 210 65 L 355 130 M 210 285 L 355 170" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
          
          {/* Outputs flow pathways from center */}
          <path d="M 445 150 L 580 65 M 445 155 L 580 105 M 445 160 L 580 145 M 445 165 L 580 185 M 445 170 L 580 225" stroke="var(--border-hairline)" strokeWidth="1" opacity="0.3" />

          {/* Floating Flow Signals */}
          <circle r="2" fill="#3b82f6" className="flow-particle">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 210 105 L 355 140" />
          </circle>
          <circle r="2" fill="#ef4444" className="flow-particle">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 445 170 L 580 225" />
          </circle>
          <circle r="2" fill="#3b82f6" className="flow-particle">
            <animateMotion dur="4.2s" repeatCount="indefinite" path="M 210 225 L 355 160" />
          </circle>
        </svg>
      );

    case "api-cost-optimizer":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-40 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {gridBackground}
            <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={stdDev} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {styleOverrides}
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* Flow Pipeline: Left to Right */}
          {/* 1. Incoming Request */}
          <g transform="translate(40, 135)">
            <rect width="110" height="50" rx="4" fill="var(--bg)" stroke="var(--border-hairline)" strokeWidth="1" />
            <text x="55" y="24" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">INCOMING</text>
            <text x="55" y="36" fill="var(--fg-subtle)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">REQUEST</text>
          </g>

          <path d="M 150 160 H 210" stroke="var(--border-hairline)" strokeWidth="1" />
          
          {/* 2. Smart Router */}
          <g transform="translate(210, 130)">
            <polygon points="30,0 60,30 30,60 0,30" fill="var(--bg)" stroke="#a855f7" strokeWidth="1.5" />
            <text x="30" y="28" fill="#a855f7" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">SMART</text>
            <text x="30" y="38" fill="var(--fg-muted)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">ROUTER</text>
          </g>

          {/* Dynamic Router Lines to Models */}
          <g stroke="var(--border-hairline)" strokeWidth="1" opacity="0.5">
            <path d="M 270 160 L 380 60" />
            <path d="M 270 160 L 380 110" />
            <path d="M 270 160 L 380 160" />
            <path d="M 270 160 L 380 210" />
            <path d="M 270 160 L 380 260" />
          </g>

          {/* 3. Providers Stack */}
          {[
            { name: "OpenAI GPT-4o", y: 45, cost: "$0.005", lat: "620ms" },
            { name: "Claude 3.5 Sonnet", y: 95, cost: "$0.003", lat: "840ms" },
            { name: "Gemini 1.5 Pro", y: 145, cost: "$0.001", lat: "510ms", active: true },
            { name: "Grok 2 Beta", y: 195, cost: "$0.002", lat: "920ms" },
            { name: "Local Llama 3", y: 245, cost: "$0.000", lat: "120ms", active: true }
          ].map((m) => (
            <g key={m.name} transform={`translate(380, ${m.y})`}>
              <rect x="0" y="0" width="150" height="30" rx="4" fill="var(--bg)" stroke={m.active ? "#10b981" : "var(--border-hairline)"} strokeWidth={m.active ? 1.5 : 1} />
              <text x="10" y="18" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)" fontWeight={m.active ? "bold" : "normal"}>{m.name}</text>
              
              {/* Cost & Latency stats next to models */}
              <text x="160" y="14" fill="#a855f7" fontSize="7" fontFamily="var(--font-mono)">{m.cost}</text>
              <text x="160" y="24" fill="#3b82f6" fontSize="7" fontFamily="var(--font-mono)">{m.lat}</text>
              
              <path d="M 150 15 L 240 ${15 - (m.y - 145)}" stroke="var(--border-hairline)" strokeWidth="1" opacity="0.3" />
            </g>
          ))}

          {/* 4. Evaluation Engine */}
          <g transform="translate(600, 130)">
            <rect width="60" height="60" rx="6" fill="var(--bg)" stroke="#10b981" strokeWidth="1.5" filter="url(#glow-green)" />
            <text x="30" y="27" fill="#10b981" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">EVAL</text>
            <text x="30" y="39" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">ENGINE</text>
          </g>

          <path d="M 660 160 H 710" stroke="var(--border-hairline)" strokeWidth="1" />

          {/* 5. Output node */}
          <g transform="translate(710, 135)">
            <circle cx="25" cy="25" r="24" fill="var(--surface)" stroke="#10b981" strokeWidth="1.5" />
            <text x="25" y="23" fill="#10b981" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">OPTIMIZED</text>
            <text x="25" y="32" fill="var(--fg-muted)" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">OUTPUT</text>
          </g>

          {/* Active Flow Animations */}
          <circle r="3" fill="#10b981" className="flow-particle">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M 270 160 L 380 160 H 530 L 600 160" />
          </circle>
          <circle r="3" fill="#3b82f6" className="flow-particle">
            <animateMotion dur="4.5s" repeatCount="indefinite" path="M 270 160 L 380 260 H 530 L 600 160" />
          </circle>
        </svg>
      );

    case "trading-engine":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-40 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {gridBackground}
            <filter id="glow-copper" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={stdDev} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {styleOverrides}
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* Candlestick Charts in Background */}
          <g stroke="var(--border-hairline)" opacity="0.12" strokeWidth="1">
            {/* Candle 1 */}
            <line x1="120" y1="60" x2="120" y2="120" />
            <rect x="114" y="70" width="12" height="30" fill="#ef4444" />
            {/* Candle 2 */}
            <line x1="220" y1="100" x2="220" y2="200" />
            <rect x="214" y="120" width="12" height="60" fill="#10b981" />
            {/* Candle 3 */}
            <line x1="320" y1="80" x2="320" y2="180" />
            <rect x="314" y="90" width="12" height="50" fill="#10b981" />
            {/* Candle 4 */}
            <line x1="420" y1="140" x2="420" y2="240" />
            <rect x="414" y="160" width="12" height="50" fill="#ef4444" />
            {/* Candle 5 */}
            <line x1="520" y1="70" x2="520" y2="160" />
            <rect x="514" y="80" width="12" height="60" fill="#10b981" />
          </g>

          {/* Moving Graph Line (Equity Curve) */}
          <path d="M 60 220 Q 200 240 320 180 T 580 120 T 740 60" fill="none" stroke="#d97706" strokeWidth="1.5" opacity="0.5" />
          <path d="M 60 220 Q 200 240 320 180 T 580 120 T 740 60" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

          {/* Flow Pipeline: Left to Right */}
          {[
            { name: "Market Data", cx: 90, cy: 160 },
            { name: "Strategy Engine", cx: 210, cy: 160, glow: true },
            { name: "Risk Engine", cx: 330, cy: 160 },
            { name: "Portfolio Mgr", cx: 460, cy: 160 },
            { name: "Execution", cx: 590, cy: 160, glow: true },
            { name: "Analytics", cx: 710, cy: 160 }
          ].map((node) => (
            <g key={node.name} transform={`translate(${node.cx - 50}, 140)`}>
              <rect width="100%" height="40" rx="4" fill="var(--bg)" stroke={node.glow ? "#d97706" : "var(--border-hairline)"} strokeWidth="1" filter={node.glow ? "url(#glow-copper)" : undefined} />
              <text x="50" y="24" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">{node.name}</text>
            </g>
          ))}

          {/* Connections */}
          <g stroke="var(--border-hairline)" strokeWidth="1">
            <line x1="140" y1="160" x2="160" y2="160" />
            <line x1="260" y1="160" x2="280" y2="160" />
            <line x1="380" y1="160" x2="410" y2="160" />
            <line x1="510" y1="160" x2="540" y2="160" />
            <line x1="640" y1="160" x2="660" y2="160" />
          </g>

          {/* Order Signals & Arrow Markers */}
          <g transform="translate(265, 80)">
            <polygon points="5,0 10,10 0,10" fill="#10b981" />
            <text x="15" y="9" fill="#10b981" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">BUY SIGNAL</text>
          </g>
          
          <g transform="translate(545, 220)">
            <polygon points="5,10 10,0 0,0" fill="#ef4444" />
            <text x="15" y="9" fill="#ef4444" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">EXECUTE SELL</text>
          </g>

          {/* Signal flow particles */}
          <circle r="3" fill="#10b981" className="flow-particle">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M 90 160 H 710" />
          </circle>
        </svg>
      );

    case "devguard":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-40 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {gridBackground}
            <filter id="glow-security" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={stdDev} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {styleOverrides}
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* Shield Motif Background */}
          <path d="M 400 40 Q 480 40 500 80 Q 500 180 400 240 Q 300 180 300 80 Q 320 40 400 40 Z" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.12" />

          {/* Flow Pipeline: Left to Right */}
          {/* 1. GitHub Repo */}
          <g transform="translate(40, 135)">
            <rect width="90" height="50" rx="4" fill="var(--bg)" stroke="var(--border-hairline)" strokeWidth="1" />
            <text x="45" y="24" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">GITHUB</text>
            <text x="45" y="36" fill="var(--fg-subtle)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">REPOSITORY</text>
          </g>

          <path d="M 130 160 H 170" stroke="var(--border-hairline)" strokeWidth="1" />

          {/* 2. Source Code */}
          <g transform="translate(170, 135)">
            <rect width="90" height="50" rx="4" fill="var(--bg)" stroke="var(--border-hairline)" strokeWidth="1" />
            <text x="45" y="24" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">SOURCE</text>
            <text x="45" y="36" fill="var(--fg-subtle)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">FILES</text>
          </g>

          <path d="M 260 160 H 310" stroke="var(--border-hairline)" strokeWidth="1" />

          {/* 3. AI Analysis Engine (Shield) */}
          <g transform="translate(310, 115)" filter="url(#glow-security)">
            <polygon points="40,0 80,15 80,65 40,90 0,65 0,15" fill="var(--bg)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="40" y="44" fill="#3b82f6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">SECURITY</text>
            <text x="40" y="54" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">ENGINE</text>
          </g>

          {/* Scanning lines effect */}
          <line x1="310" y1="130" x2="390" y2="130" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6">
            <animate attributeName="y1" values="120;200;120" dur="4s" repeatCount="indefinite" />
            <animate attributeName="y2" values="120;200;120" dur="4s" repeatCount="indefinite" />
          </line>

          {/* Connectors to Scanning Categories */}
          <g stroke="var(--border-hairline)" strokeWidth="1" opacity="0.5">
            <path d="M 390 160 L 460 70" />
            <path d="M 390 160 L 460 130" />
            <path d="M 390 160 L 460 190" />
            <path d="M 390 160 L 460 250" />
          </g>

          {/* 4. Scan Modules */}
          {[
            { name: "Vulnerability Scan", y: 55 },
            { name: "Code Quality Metrics", y: 115 },
            { name: "Architecture Audit", y: 175 },
            { name: "Dependency Scan", y: 235 }
          ].map((m) => (
            <g key={m.name} transform={`translate(460, ${m.y})`}>
              <rect x="0" y="0" width="130" height="30" rx="4" fill="var(--bg)" stroke="var(--border-hairline)" strokeWidth="1" />
              <text x="12" y="18" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)">{m.name}</text>
              <path d="M 130 15 L 200 ${15 - (m.y - 145)}" stroke="var(--border-hairline)" strokeWidth="1" opacity="0.4" />
            </g>
          ))}

          {/* 5. Risk Score & Output */}
          <g transform="translate(660, 135)">
            <circle cx="25" cy="25" r="25" fill="var(--bg)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="25" y="24" fill="#3b82f6" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">RISK</text>
            <text x="25" y="34" fill="var(--fg-muted)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">SCORE</text>
          </g>

          <path d="M 710 160 H 740" stroke="var(--border-hairline)" strokeWidth="1" />

          <g transform="translate(740, 135)">
            <rect width="40" height="50" rx="4" fill="var(--surface)" stroke="#3b82f6" strokeWidth="1" />
            <text x="20" y="24" fill="#3b82f6" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">READY</text>
            <text x="20" y="34" fill="var(--fg-muted)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">DEPLOY</text>
          </g>

          {/* Scanning data flow animation */}
          <circle r="2.5" fill="#3b82f6" className="flow-particle">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 130 160 H 310" />
          </circle>
          <circle r="2.5" fill="#3b82f6" className="flow-particle">
            <animateMotion dur="5s" repeatCount="indefinite" path="M 390 160 L 460 70 H 590 L 660 160 H 740" />
          </circle>
        </svg>
      );

    case "silentbridge":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-40 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {gridBackground}
            <filter id="glow-violet" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={stdDev} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {styleOverrides}
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* 1. Smart Glove representation */}
          <g transform="translate(30, 110)">
            <rect width="90" height="100" rx="8" fill="var(--bg)" stroke="var(--border-hairline)" strokeWidth="1" />
            {/* Draw a simple hand/sensor skeleton */}
            <path d="M 20 70 V 30 M 35 65 V 20 M 50 65 V 25 M 65 70 V 35 M 75 75 L 85 55" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            {/* Sensor nodes */}
            <circle cx="20" cy="30" r="3" fill="#3b82f6" />
            <circle cx="35" cy="20" r="3" fill="#3b82f6" />
            <circle cx="50" cy="25" r="3" fill="#3b82f6" />
            <circle cx="65" cy="35" r="3" fill="#3b82f6" />
            <circle cx="85" cy="55" r="3" fill="#3b82f6" />
            <text x="45" y="90" fill="var(--fg-muted)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">SMART GLOVE</text>
          </g>

          <path d="M 120 160 H 160" stroke="var(--border-hairline)" strokeWidth="1" />

          {/* 2. Sensor Array */}
          <g transform="translate(160, 125)">
            <rect width="100" height="70" rx="4" fill="var(--bg)" stroke="var(--border-hairline)" strokeWidth="1" />
            {/* Wave lines for sensors */}
            <path d="M 10 35 Q 25 15 40 35 T 70 35 T 90 35" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
            <path d="M 10 45 Q 25 25 40 45 T 70 45 T 90 45" fill="none" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.6" />
            <text x="50" y="60" fill="var(--fg-subtle)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">SENSOR ARRAY</text>
          </g>

          <path d="M 260 160 H 300" stroke="var(--border-hairline)" strokeWidth="1" />

          {/* 3. Gesture Recognition Model */}
          <g transform="translate(300, 120)">
            <rect width="110" height="80" rx="4" fill="var(--bg)" stroke="#8b5cf6" strokeWidth="1.5" filter="url(#glow-violet)" />
            <text x="55" y="35" fill="#8b5cf6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">GESTURE MODEL</text>
            <text x="55" y="47" fill="var(--fg-muted)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">LSTM / RNN</text>
            <rect x="15" y="58" width="80" height="10" rx="2" fill="#3b82f6" opacity="0.2" />
            <text x="55" y="66" fill="#3b82f6" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">96.5% CONFIDENCE</text>
          </g>

          <path d="M 410 160 H 450" stroke="var(--border-hairline)" strokeWidth="1" />

          {/* 4. Sign Language Classifier (Neural Network visualization) */}
          <g transform="translate(450, 110)">
            <rect width="110" height="100" rx="4" fill="var(--bg)" stroke="var(--border-hairline)" strokeWidth="1" />
            {/* Draw miniature nodes & weights */}
            <circle cx="20" cy="30" r="4" fill="#3b82f6" />
            <circle cx="20" cy="50" r="4" fill="#3b82f6" />
            <circle cx="20" cy="70" r="4" fill="#3b82f6" />
            
            <circle cx="55" cy="20" r="4" fill="var(--border-hairline)" />
            <circle cx="55" cy="40" r="4" fill="#8b5cf6" />
            <circle cx="55" cy="60" r="4" fill="#8b5cf6" />
            <circle cx="55" cy="80" r="4" fill="var(--border-hairline)" />
            
            <circle cx="90" cy="40" r="4" fill="#8b5cf6" />
            <circle cx="90" cy="60" r="4" fill="#8b5cf6" />

            <line x1="20" y1="30" x2="55" y2="40" stroke="var(--border-hairline)" strokeWidth="0.5" opacity="0.4" />
            <line x1="20" y1="50" x2="55" y2="60" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.6" />
            <line x1="55" y1="60" x2="90" y2="40" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.6" />
            <text x="55" y="94" fill="var(--fg-subtle)" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">CLASSIFIER</text>
          </g>

          <path d="M 560 160 H 600" stroke="var(--border-hairline)" strokeWidth="1" />

          {/* 5. Text & Speech outputs */}
          <g transform="translate(600, 110)">
            {/* Text Node */}
            <rect x="0" y="0" width="100" height="35" rx="4" fill="var(--surface)" stroke="var(--border-hairline)" strokeWidth="1" />
            <text x="10" y="20" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)">TEXT: Hello</text>
            
            {/* Speech Node */}
            <rect x="0" y="65" width="100" height="35" rx="4" fill="var(--surface)" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="10" y="85" fill="#8b5cf6" fontSize="8" fontFamily="var(--font-mono)">SPEECH (API)</text>
            <path d="M 80 75 Q 85 85 90 75" fill="none" stroke="#8b5cf6" strokeWidth="1" />
          </g>

          {/* Flow animations */}
          <circle r="3" fill="#8b5cf6" className="flow-particle">
            <animateMotion dur="3.8s" repeatCount="indefinite" path="M 120 160 H 300 H 450 H 600" />
          </circle>
        </svg>
      );

    default:
      return null;
  }
});
