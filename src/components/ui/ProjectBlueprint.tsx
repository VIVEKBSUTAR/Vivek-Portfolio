interface BlueprintProps {
  slug: string;
}

export function ProjectBlueprint({ slug }: BlueprintProps) {
  const accentColor = "var(--accent)";
  const mutedColor = "var(--fg-subtle)";
  const textColor = "var(--fg-muted)";

  const gridBackground = (
    <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border-hairline/20" />
    </pattern>
  );

  switch (slug) {
    case "navio":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-30 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>{gridBackground}</defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          
          {/* Flow pathways */}
          <path d="M 50 160 L 220 80 L 450 80 M 50 160 L 220 240 L 450 240" stroke={accentColor} strokeWidth="1" strokeDasharray="5 3" />
          <path d="M 450 80 L 580 160 L 750 160 M 450 240 L 580 160" stroke={accentColor} strokeWidth="1.5" />
          
          {/* Nodes */}
          {/* Input Document chunk */}
          <rect x="30" y="130" width="80" height="60" rx="4" stroke={mutedColor} strokeWidth="1" fill="var(--bg)" />
          <text x="70" y="165" fill={textColor} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">DOC_CHUNK</text>
          
          {/* Sparse Encoder Pathway */}
          <circle cx="220" cy="80" r="28" stroke={accentColor} strokeWidth="1.5" fill="var(--bg)" />
          <text x="220" y="83" fill={accentColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">BM25_SPARSE</text>
          
          {/* Dense Encoder Pathway */}
          <circle cx="220" cy="240" r="28" stroke={accentColor} strokeWidth="1.5" fill="var(--bg)" />
          <text x="220" y="243" fill={accentColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">DENSE_CONT</text>

          {/* Sparse & Dense index arrays */}
          <path d="M 270 80 H 420 M 270 240 H 420" stroke={mutedColor} strokeWidth="1" />
          <rect x="320" y="65" width="80" height="30" rx="3" stroke={mutedColor} fill="var(--surface)" />
          <text x="360" y="83" fill={textColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">INVERT_IDX</text>
          
          <rect x="320" y="225" width="80" height="30" rx="3" stroke={mutedColor} fill="var(--surface)" />
          <text x="360" y="243" fill={textColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">QDRANT_HNSW</text>

          {/* Fusion / Rerank Node */}
          <circle cx="580" cy="160" r="32" stroke={accentColor} strokeWidth="2" fill="var(--bg)" />
          <text x="580" y="158" fill={accentColor} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">RERANKER</text>
          <text x="580" y="170" fill={textColor} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">CROSS_ENC</text>

          {/* Output Context */}
          <rect x="670" y="135" width="90" height="50" rx="4" stroke={accentColor} strokeWidth="1.5" fill="var(--bg)" />
          <text x="715" y="160" fill={accentColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">TOP_K_CONTEXT</text>
          <text x="715" y="172" fill={textColor} fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">RECALL@10: 0.92</text>

          {/* Flowing particle animation */}
          <circle r="4" fill={accentColor}>
            <animateMotion dur="6s" repeatCount="indefinite" path="M 50 160 L 220 80 L 450 80 L 580 160 L 750 160" />
          </circle>
          <circle r="4" fill={accentColor}>
            <animateMotion dur="6s" repeatCount="indefinite" path="M 50 160 L 220 240 L 450 240 L 580 160" />
          </circle>
        </svg>
      );

    case "trading-engine":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-30 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>{gridBackground}</defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          
          {/* Query, Key, Value Projections */}
          <g transform="translate(100, 40)">
            <text x="0" y="-15" fill={textColor} fontSize="10" fontFamily="var(--font-mono)">INPUT_EMBEDDINGS (X)</text>
            <rect x="0" y="0" width="120" height="240" rx="4" stroke={mutedColor} strokeWidth="1" fill="var(--surface)" />
            
            {/* Horizontal matrix lines */}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={i} x1="10" y1={30 + i * 36} x2="110" y2={30 + i * 36} stroke={mutedColor} strokeWidth="0.5" strokeDasharray="3 3" />
            ))}
          </g>

          {/* Projection Lines */}
          <path d="M 220 80 L 360 60 M 220 140 L 360 160 M 220 200 L 360 260" stroke={accentColor} strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="360" cy="60" r="5" fill={accentColor} />
          <circle cx="360" cy="160" r="5" fill={accentColor} />
          <circle cx="360" cy="260" r="5" fill={accentColor} />

          {/* Attention Weights Matrix Grid */}
          <g transform="translate(420, 40)">
            <text x="0" y="-15" fill={accentColor} fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">ATTENTION_MAP (Q K^T)</text>
            <rect x="0" y="0" width="240" height="240" rx="6" stroke={accentColor} strokeWidth="1.5" fill="var(--bg)" />
            
            {/* Grid overlay representing Attention map cells */}
            {Array.from({ length: 5 }).map((_, i) => (
              <g key={i}>
                <line x1={48 + i * 48} y1="0" x2={48 + i * 48} y2="240" stroke={mutedColor} strokeWidth="0.5" />
                <line x1="0" y1={48 + i * 48} x2="240" y2={48 + i * 48} stroke={mutedColor} strokeWidth="0.5" />
              </g>
            ))}
            
            {/* Highlighted firing attention spots */}
            <rect x="48" y="96" width="48" height="48" fill={accentColor} opacity="0.15" />
            <rect x="144" y="48" width="48" height="48" fill={accentColor} opacity="0.25" />
            <rect x="192" y="192" width="48" height="48" fill={accentColor} opacity="0.35" />
            
            {/* Scanning radar indicator line */}
            <line x1="0" y1="0" x2="240" y2="0" stroke={accentColor} strokeWidth="2" opacity="0.7">
              <animate attributeName="y1" values="0;240;0" dur="10s" repeatCount="indefinite" />
              <animate attributeName="y2" values="0;240;0" dur="10s" repeatCount="indefinite" />
            </line>
          </g>

          <text x="360" y="80" fill={textColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">W_Q</text>
          <text x="360" y="180" fill={textColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">W_K</text>
          <text x="360" y="280" fill={textColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">W_V</text>
        </svg>
      );

    case "api-cost-optimizer":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-30 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>{gridBackground}</defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* CI Loop pathways */}
          <rect x="60" y="120" width="130" height="80" rx="4" stroke={mutedColor} strokeWidth="1" fill="var(--surface)" />
          <text x="125" y="150" fill={textColor} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">TEST_DATASETS</text>
          <text x="125" y="165" fill={textColor} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">v1.2.0 (GOLDEN)</text>

          {/* Loop lines */}
          <path d="M 190 160 L 320 160" stroke={accentColor} strokeWidth="1.5" />
          <path d="M 450 160 H 550" stroke={accentColor} strokeWidth="1.5" />
          <path d="M 610 120 V 60 H 125 V 120" stroke={accentColor} strokeWidth="1" strokeDasharray="4 4" />

          {/* Harness evaluator */}
          <rect x="320" y="110" width="130" height="100" rx="6" stroke={accentColor} strokeWidth="2" fill="var(--bg)" />
          <text x="385" y="150" fill={accentColor} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">EVAL_HARNESS</text>
          <text x="385" y="165" fill={textColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">DET_RULES</text>
          <text x="385" y="180" fill={textColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">LLM_JUDGES</text>

          {/* Result gates */}
          <circle cx="610" cy="160" r="30" stroke={accentColor} strokeWidth="1.5" fill="var(--bg)" />
          <text x="610" y="163" fill={accentColor} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">CI_GATE</text>

          <g transform="translate(680, 135)">
            <rect width="60" height="50" rx="3" stroke={mutedColor} strokeWidth="1" fill="var(--surface)" />
            <text x="30" y="25" fill={textColor} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">PASS</text>
            <circle cx="30" cy="38" r="4" fill="var(--accent)" />
          </g>

          {/* Floating evaluation packet animation */}
          <circle r="4" fill={accentColor}>
            <animateMotion dur="5s" repeatCount="indefinite" path="M 190 160 H 320" />
          </circle>
          <circle r="3" fill={mutedColor}>
            <animateMotion dur="8s" repeatCount="indefinite" path="M 610 120 V 60 H 125 V 120" />
          </circle>
        </svg>
      );

    case "sentinel-ai":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-30 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>{gridBackground}</defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* Scanning camera frame grid */}
          <g transform="translate(80, 40)">
            <rect width="360" height="240" rx="8" stroke={mutedColor} strokeWidth="1" fill="var(--surface)" opacity="0.6" />
            
            {/* Viewfinder crosshairs */}
            <path d="M 20 20 H 40 M 20 20 V 40 M 340 20 H 320 M 340 20 V 40 M 20 220 H 40 M 20 220 V 200 M 340 220 H 320 M 340 220 V 200" stroke={accentColor} strokeWidth="1.5" />
            <circle cx="180" cy="120" r="10" stroke={accentColor} strokeWidth="0.5" strokeDasharray="2 2" />

            {/* Simulated YOLO bounding boxes */}
            <g>
              <rect x="60" y="80" width="80" height="120" stroke={accentColor} strokeWidth="1.5" fill="color-mix(in oklch, var(--accent) 5%, transparent)" />
              <text x="65" y="74" fill={accentColor} fontSize="8" fontFamily="var(--font-mono)">FORKLIFT: 0.94</text>
            </g>

            <g>
              <rect x="220" y="110" width="50" height="90" stroke={accentColor} strokeWidth="1.5" fill="color-mix(in oklch, var(--accent) 5%, transparent)" />
              <text x="225" y="104" fill={accentColor} fontSize="8" fontFamily="var(--font-mono)">PERSON: 0.98</text>
            </g>

            {/* Proximity warning vector */}
            <line x1="140" y1="140" x2="220" y2="155" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="180" y="132" fill="var(--danger)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">NEAR_MISS_WARN</text>
          </g>

          {/* Inference processing pipeline graph */}
          <g transform="translate(520, 60)">
            <rect x="0" y="0" width="200" height="200" rx="6" stroke={accentColor} strokeWidth="2" fill="var(--bg)" />
            <text x="100" y="30" fill={accentColor} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">ONNX_TENSORRT</text>
            <line x1="20" y1="60" x2="180" y2="60" stroke={mutedColor} strokeWidth="0.5" />

            {/* Stats block */}
            <text x="20" y="90" fill={textColor} fontSize="8" fontFamily="var(--font-mono)">CAMERA_FEED: 220 CH</text>
            <text x="20" y="115" fill={textColor} fontSize="8" fontFamily="var(--font-mono)">EDGE_INFERENCE: 30 FPS</text>
            <text x="20" y="140" fill={textColor} fontSize="8" fontFamily="var(--font-mono)">KAFKA_LOG_STREAM</text>
            
            {/* Running edge line */}
            <rect x="20" y="160" width="160" height="20" rx="3" stroke={accentColor} strokeWidth="1" />
            <rect x="20" y="160" width="110" height="20" rx="3" fill={accentColor} opacity="0.3" />
            <text x="100" y="173" fill={accentColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">LATENCY: 12ms</text>
          </g>
        </svg>
      );

    case "devguard":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-30 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>{gridBackground}</defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* Dual Text / Figure Encoders */}
          <g transform="translate(60, 40)">
            <rect x="0" y="20" width="160" height="60" rx="4" stroke={accentColor} strokeWidth="1.5" fill="var(--bg)" />
            <text x="80" y="55" fill={accentColor} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">TEXT_ENCODER (CLIP)</text>

            <rect x="0" y="140" width="160" height="60" rx="4" stroke={accentColor} strokeWidth="1.5" fill="var(--bg)" />
            <text x="80" y="175" fill={accentColor} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">IMAGE_ENCODER (CLIP)</text>
          </g>

          {/* Projections to Joint Embeddings space */}
          <path d="M 220 70 L 360 160 M 220 170 L 360 160" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" />

          {/* Joint Latent space projection */}
          <g transform="translate(420, 40)">
            <circle cx="160" cy="120" r="100" stroke={mutedColor} strokeWidth="1" fill="none" />
            <circle cx="160" cy="120" r="10" stroke={accentColor} strokeWidth="0.5" strokeDasharray="2 2" fill="none" />

            {/* Projection Vectors */}
            <line x1="160" y1="120" x2="230" y2="70" stroke={accentColor} strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="160" y1="120" x2="210" y2="180" stroke={accentColor} strokeWidth="2" />
            
            {/* Angle similarity arc */}
            <path d="M 205 104 A 50 50 0 0 1 192 158" stroke={accentColor} strokeWidth="1" strokeDasharray="2 2" />
            <text x="215" y="130" fill={accentColor} fontSize="9" fontFamily="var(--font-mono)">cos(θ)</text>

            {/* Highlighting clustered dots */}
            <circle cx="230" cy="70" r="4" fill={accentColor} />
            <circle cx="210" cy="180" r="4" fill={accentColor} />
            
            {/* Text labels */}
            <text x="240" y="65" fill={textColor} fontSize="8" fontFamily="var(--font-mono)">TEXT_VEC</text>
            <text x="220" y="195" fill={textColor} fontSize="8" fontFamily="var(--font-mono)">FIG_VEC</text>
            
            <text x="160" y="-15" fill={accentColor} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">JOINT_LATENT_SPACE</text>
          </g>
        </svg>
      );

    case "silentbridge":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-30 select-none pointer-events-none p-4" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>{gridBackground}</defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

          {/* Model Compression pathways / Neural Grid */}
          <g transform="translate(100, 60)">
            <text x="150" y="-15" fill={accentColor} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">QUANTIZATION_AWARE_PRUNING</text>
            
            {/* Draw neural network layers */}
            {/* Input layer */}
            {Array.from({ length: 4 }).map((_, i) => (
              <circle key={`in-${i}`} cx="30" cy={30 + i * 45} r="8" stroke={mutedColor} strokeWidth="1" fill="var(--surface)" />
            ))}

            {/* Hidden layer 1 */}
            {Array.from({ length: 5 }).map((_, i) => {
              const isPruned = i === 1 || i === 3;
              return (
                <circle
                  key={`hid1-${i}`}
                  cx="150"
                  cy={15 + i * 42}
                  r="8"
                  stroke={isPruned ? mutedColor : accentColor}
                  strokeWidth={isPruned ? 1 : 1.5}
                  fill="var(--bg)"
                  opacity={isPruned ? 0.3 : 1}
                />
              );
            })}

            {/* Hidden layer 2 */}
            {Array.from({ length: 4 }).map((_, i) => {
              const isPruned = i === 0 || i === 2;
              return (
                <circle
                  key={`hid2-${i}`}
                  cx="270"
                  cy={30 + i * 45}
                  r="8"
                  stroke={isPruned ? mutedColor : accentColor}
                  strokeWidth={isPruned ? 1 : 1.5}
                  fill="var(--bg)"
                  opacity={isPruned ? 0.3 : 1}
                />
              );
            })}

            {/* Output layer */}
            {Array.from({ length: 2 }).map((_, i) => (
              <circle key={`out-${i}`} cx="390" cy={75 + i * 55} r="8" stroke={accentColor} strokeWidth="2" fill="var(--bg)" />
            ))}

            {/* Draw connections (weights) */}
            {/* Input to Hidden 1 */}
            {Array.from({ length: 4 }).map((_, inIdx) =>
              Array.from({ length: 5 }).map((_, hidIdx) => {
                const isPruned = hidIdx === 1 || hidIdx === 3 || (inIdx + hidIdx) % 3 === 0;
                return (
                  <line
                    key={`w1-${inIdx}-${hidIdx}`}
                    x1="38"
                    y1={30 + inIdx * 45}
                    x2="142"
                    y2={15 + hidIdx * 42}
                    stroke={isPruned ? mutedColor : accentColor}
                    strokeWidth={isPruned ? 0.5 : 1}
                    opacity={isPruned ? 0.08 : 0.4}
                  />
                );
              })
            )}

            {/* Hidden 1 to Hidden 2 */}
            {Array.from({ length: 5 }).map((_, h1Idx) =>
              Array.from({ length: 4 }).map((_, h2Idx) => {
                const isPruned = h1Idx === 1 || h1Idx === 3 || h2Idx === 0 || h2Idx === 2 || (h1Idx + h2Idx) % 2 === 0;
                return (
                  <line
                    key={`w2-${h1Idx}-${h2Idx}`}
                    x1="158"
                    y1={15 + h1Idx * 42}
                    x2="262"
                    y2={30 + h2Idx * 45}
                    stroke={isPruned ? mutedColor : accentColor}
                    strokeWidth={isPruned ? 0.5 : 1}
                    opacity={isPruned ? 0.08 : 0.4}
                  />
                );
              })
            )}

            {/* Hidden 2 to Output */}
            {Array.from({ length: 4 }).map((_, h2Idx) =>
              Array.from({ length: 2 }).map((_, outIdx) => {
                const isPruned = h2Idx === 0 || h2Idx === 2;
                return (
                  <line
                    key={`w3-${h2Idx}-${outIdx}`}
                    x1="278"
                    y1={30 + h2Idx * 45}
                    x2="382"
                    y2={75 + outIdx * 55}
                    stroke={isPruned ? mutedColor : accentColor}
                    strokeWidth={isPruned ? 0.5 : 1}
                    opacity={isPruned ? 0.08 : 0.4}
                  />
                );
              })
            )}
          </g>

          {/* Model optimization stats box */}
          <g transform="translate(540, 70)">
            <rect x="0" y="0" width="170" height="170" rx="4" stroke={mutedColor} strokeWidth="1" fill="var(--surface)" />

            <text x="15" y="30" fill={textColor} fontSize="8" fontFamily="var(--font-mono)">350M PARAMS {"\u2192"} 42M</text>
            <text x="15" y="55" fill={textColor} fontSize="8" fontFamily="var(--font-mono)">INT8 QUANTIZED</text>
            <text x="15" y="80" fill={accentColor} fontSize="9" fontFamily="var(--font-mono)">QAT ACCURACY: 98.4%</text>
            <line x1="15" y1="100" x2="155" y2="100" stroke={mutedColor} strokeWidth="0.5" />
            <text x="15" y="125" fill={textColor} fontSize="8" fontFamily="var(--font-mono)">FREQUENCY: 30 HZ</text>
            <text x="15" y="145" fill={textColor} fontSize="8" fontFamily="var(--font-mono)">TARGET: CORETML / C++</text>
          </g>
        </svg>
      );

    default:
      return null;
  }
}
