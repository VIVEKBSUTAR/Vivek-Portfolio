import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/hooks/useTheme";

function Sculpture({
  theme,
  scrollY,
  isMobile,
}: {
  theme: "dark" | "light";
  scrollY: number;
  isMobile: boolean;
}) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const dirLight1 = useRef<THREE.DirectionalLight>(null);
  const dirLight2 = useRef<THREE.DirectionalLight>(null);

  // Track pointer position across the window.
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Skip cursor tracking on mobile (no hover cursor)
    if (isMobile) return;

    const handlePointerMove = (e: PointerEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isMobile]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Floating/breathing oscillation (slightly randomized periods for organic feel)
    const floatY = Math.sin(t * 0.41 + 0.3) * 0.12 + Math.cos(t * 0.23) * 0.03;
    const floatX = Math.cos(t * 0.33 + 0.7) * 0.06 + Math.sin(t * 0.17) * 0.02;

    // Out-of-phase scale breathing for outer glass and inner metallic core
    const outerScale = 1.05 + Math.sin(t * 0.45) * 0.015;
    const innerScale = 0.98 + Math.cos(t * 0.6) * 0.025;

    // Target rotation based on time + cursor offsets (no cursor offset on mobile)
    const targetOuterRotX = t * 0.035 + (isMobile ? 0 : pointer.y * 0.35);
    const targetOuterRotY = t * 0.045 + (isMobile ? 0 : pointer.x * 0.35);

    // Counter-rotation for the metallic core for visual tension and refractive complexity
    const targetInnerRotX = -t * 0.04 - (isMobile ? 0 : pointer.y * 0.25);
    const targetInnerRotY = -t * 0.05 - (isMobile ? 0 : pointer.x * 0.25);

    if (outerRef.current) {
      outerRef.current.position.y = THREE.MathUtils.lerp(outerRef.current.position.y, floatY, 0.07);
      outerRef.current.position.x = THREE.MathUtils.lerp(outerRef.current.position.x, floatX, 0.07);
      outerRef.current.scale.setScalar(THREE.MathUtils.lerp(outerRef.current.scale.x, outerScale, 0.07));

      outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, targetOuterRotX, 0.05);
      outerRef.current.rotation.y = THREE.MathUtils.lerp(outerRef.current.rotation.y, targetOuterRotY, 0.05);
    }

    if (innerRef.current) {
      innerRef.current.position.y = THREE.MathUtils.lerp(innerRef.current.position.y, floatY, 0.07);
      innerRef.current.position.x = THREE.MathUtils.lerp(innerRef.current.position.x, floatX, 0.07);
      innerRef.current.scale.setScalar(THREE.MathUtils.lerp(innerRef.current.scale.x, innerScale * 0.94, 0.07));

      innerRef.current.rotation.x = THREE.MathUtils.lerp(innerRef.current.rotation.x, targetInnerRotX, 0.05);
      innerRef.current.rotation.y = THREE.MathUtils.lerp(innerRef.current.rotation.y, targetInnerRotY, 0.05);
    }

    // Slow, organic lighting drift (reduce complexity on mobile by running lights statically)
    if (!isMobile) {
      if (dirLight1.current) {
        dirLight1.current.position.x = 6 + Math.sin(t * 0.12) * 1.5;
        dirLight1.current.position.y = 8 + Math.cos(t * 0.18) * 1.0;
      }
      if (dirLight2.current) {
        dirLight2.current.intensity = 0.6 + Math.sin(t * 0.2) * 0.15;
      }
    }

    // Subtle scroll-linked camera zoom and vertical shift
    const targetCamZ = 4.0 + scrollY * 0.0008; // pull back slightly
    const targetCamY = -(scrollY * 0.0008);     // track slightly downwards
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.06);
  });

  return (
    <group>
      {/* Outer physical glass sculpture */}
      <mesh ref={outerRef} castShadow receiveShadow>
        <torusKnotGeometry args={[0.9, 0.28, isMobile ? 64 : 128, isMobile ? 16 : 24]} />
        <MeshTransmissionMaterial
          backside={!isMobile} // Disable backside reflections on mobile
          backsideThickness={isMobile ? 0 : 0.5}
          samples={isMobile ? 4 : 16}
          resolution={isMobile ? 128 : 512}
          transmission={1.0}
          thickness={isMobile ? 0.8 : 1.4}
          roughness={isMobile ? 0.12 : 0.08}
          chromaticAberration={isMobile ? 0.02 : 0.06}
          anisotropy={isMobile ? 0 : 0.4}
          distortion={isMobile ? 0 : 0.12}
          distortionScale={isMobile ? 0 : 0.15}
          temporalDistortion={isMobile ? 0 : 0.02}
          ior={1.65}
          color={theme === "dark" ? "#fff2e5" : "#ffffff"}
          clearcoat={isMobile ? 0.5 : 1.0}
          clearcoatRoughness={isMobile ? 0.1 : 0.03}
        />
      </mesh>

      {/* Inner chrome core sculpture */}
      <mesh ref={innerRef}>
        <torusKnotGeometry args={[0.9, 0.12, isMobile ? 32 : 64, isMobile ? 8 : 12]} />
        <meshPhysicalMaterial
          metalness={1.0}
          roughness={isMobile ? 0.1 : 0.05}
          clearcoat={isMobile ? 0.5 : 1.0}
          clearcoatRoughness={isMobile ? 0.1 : 0.03}
          color={theme === "dark" ? "#ebdcb9" : "#ffecdb"}
        />
      </mesh>

      {/* Lights with refs for slow organic drift */}
      <ambientLight intensity={0.35} />
      <directionalLight ref={dirLight1} position={[6, 8, 4]} intensity={1.5} color="#ffd8b3" />
      <directionalLight ref={dirLight2} position={[-6, -4, -4]} intensity={0.65} color="#8fb2ff" />
      <directionalLight position={[0, 6, -8]} intensity={1.8} color="#ffffff" />
    </group>
  );
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [inViewport, setInViewport] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleVisibility = () => {
      setVisible(document.visibilityState === "visible");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    let observer: IntersectionObserver | null = null;
    if (containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setInViewport(entry.isIntersecting);
        },
        { rootMargin: "100px 0px" } // Check rendering status slightly before entering
      );
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (observer) observer.disconnect();
    };
  }, []);

  if (!mounted || reduced) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden select-none"
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 4.0], fov: 45 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
          dpr={isMobile ? 1 : [1, 1.5]}
          frameloop={visible && inViewport ? "always" : "never"}
          style={{ width: "100%", height: "100%" }}
        >
          <Sculpture theme={theme} scrollY={scrollY} isMobile={isMobile} />
          <Environment preset="studio" />
        </Canvas>
      </Suspense>
    </div>
  );
}
