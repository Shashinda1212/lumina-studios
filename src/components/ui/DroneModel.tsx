import React, { useEffect, useRef, useMemo } from 'react'; // useMemo එකතු කළා
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, Float, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib'; // අනිවාර්යයෙන්ම මේක import කරන්න ඕනේ

const DRONE_MODEL_PATH = '/models/drone_gltf_draco.glb';

// Robust absolute Google CDN path for Draco decoder binaries
const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/';

const Model = () => {
  const groupRef = useRef(null); // Type declaration එක අයින් කළා ලේසියට
  
  // Model එක load කරනවා - Draco decoding enabled with CDN path configuration
  const { scene, animations } = useGLTF(DRONE_MODEL_PATH, DRACO_DECODER_PATH);
  
  // ---- මෙන්න මේ කෑල්ල තමයි අලුතින් එකතු කරේ ----
  // scene එක clone කරලා අලුත් instance එකක් හදාගන්නවා
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (!actions) return;

    Object.keys(actions).forEach((key) => {
      if (key !== 'hover') {
        actions[key]?.stop();
      }
    });

    const hoverAction = actions['hover'];
    if (hoverAction) {
      hoverAction.reset().fadeIn(0.3).play();
    } else {
      const firstTrackKey = Object.keys(actions)[0];
      if (firstTrackKey) {
        actions[firstTrackKey]?.reset().fadeIn(0.3).play();
      }
    }
  }, [actions]);

  return (
    <group ref={groupRef} dispose={null}>
      <Float
        speed={2} 
        rotationIntensity={0.4} 
        floatIntensity={0.8} 
      >
        {/* කලින් scene තිබ්බ තැනට clonedScene දැම්මා */}
        <primitive 
          object={clonedScene} 
          scale={7} 
          position={[0, -0.2, 0]} 
          rotation={[0.1, -0.5, 0]} 
        />
      </Float>
    </group>
  );
};

// Preload model assets with Draco decoding configuration
useGLTF.preload(DRONE_MODEL_PATH, DRACO_DECODER_PATH);

// Error boundary to gracefully catch WebGL/Context compilation errors
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('WebGL Rendering error captured by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const FallbackVisual = () => (
  <div className="w-full h-full flex items-center justify-center bg-neutral-950/20 border border-white/5 rounded-xl pointer-events-none">
    <div className="text-center p-4">
      <div className="text-[#F27D26]/85 font-mono text-[9px] uppercase tracking-widest mb-1.5 animate-pulse">Visual Engine Offline</div>
      <div className="text-neutral-500 text-[8px] uppercase tracking-[0.25em]">WebGL Context Unavailable</div>
    </div>
  </div>
);

export const Drone = ({ active = true }: { active?: boolean }) => {
  return (
    <CanvasErrorBoundary fallback={<FallbackVisual />}>
      <Canvas 
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.5]} // Clamp Device Pixel Ratio to 1.5 max for performance
        gl={{ 
          antialias: true,
          powerPreference: 'high-performance', // Hint browser to use discrete GPU if available
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-5, 5, 5]} intensity={0.6} />
        <directionalLight position={[0, 5, -8]} intensity={2.2} color="#ffffff" />
        <Environment preset="city" environmentIntensity={0.6} />
        <Model />
        <Preload all />
      </Canvas>
    </CanvasErrorBoundary>
  );
};