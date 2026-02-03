import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// =====================================================
// 3D MODEL CONFIGURATION
// =====================================================
// To change the 3D model:
// 1. Add your .glb file to the public folder (e.g., public/models/your-model.glb)
// 2. Update the MODEL_PATH constant below
// 3. The model will automatically be animated with scroll triggers
// =====================================================

// Placeholder geometric object since we don't have a GLB file
const PlaceholderModel = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const partsRef = useRef<THREE.Mesh[]>([]);

  // Create multiple parts for explosion effect
  const parts = useMemo(() => {
    const geometries = [
      { geo: new THREE.TorusKnotGeometry(0.8, 0.25, 128, 32), position: [0, 0, 0] as [number, number, number] },
      { geo: new THREE.OctahedronGeometry(0.3), position: [1.5, 0.5, 0] as [number, number, number] },
      { geo: new THREE.OctahedronGeometry(0.25), position: [-1.5, -0.3, 0.5] as [number, number, number] },
      { geo: new THREE.TetrahedronGeometry(0.2), position: [0.8, -1, 0.3] as [number, number, number] },
      { geo: new THREE.TetrahedronGeometry(0.18), position: [-0.7, 1.2, -0.4] as [number, number, number] },
      { geo: new THREE.IcosahedronGeometry(0.22), position: [1.2, -0.8, -0.5] as [number, number, number] },
    ];
    return geometries;
  }, []);

  // Store original positions for explosion animation
  const originalPositions = useMemo(() => parts.map(p => p.position), [parts]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = scrollProgress.current;
    const time = state.clock.elapsedTime;

    // Base rotation
    groupRef.current.rotation.y = time * 0.1 + progress * Math.PI * 2;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Scale based on scroll progress (zoom in at start, out in middle, in at end)
    const scaleProgress = Math.sin(progress * Math.PI);
    const scale = 1 + scaleProgress * 0.3;
    groupRef.current.scale.setScalar(scale);

    // Explosion effect for parts
    partsRef.current.forEach((mesh, index) => {
      if (!mesh) return;
      
      const original = originalPositions[index];
      const explosionFactor = Math.sin(progress * Math.PI) * 1.5;
      
      // Parts explode outward based on their original position
      const direction = new THREE.Vector3(...original).normalize();
      mesh.position.set(
        original[0] + direction.x * explosionFactor,
        original[1] + direction.y * explosionFactor,
        original[2] + direction.z * explosionFactor
      );

      // Individual rotation for each part
      mesh.rotation.x = time * (0.5 + index * 0.1);
      mesh.rotation.z = time * (0.3 + index * 0.05);
    });
  });

  return (
    <group ref={groupRef}>
      {parts.map((part, index) => (
        <mesh
          key={index}
          ref={(el) => {
            if (el) partsRef.current[index] = el;
          }}
          geometry={part.geo}
          position={part.position}
        >
          {index === 0 ? (
            <MeshTransmissionMaterial
              backside
              samples={16}
              thickness={0.5}
              chromaticAberration={0.25}
              anisotropy={0.4}
              distortion={0.5}
              distortionScale={0.5}
              temporalDistortion={0.1}
              iridescence={1}
              iridescenceIOR={1}
              iridescenceThicknessRange={[0, 1400]}
              color="#ff6b00"
              transmission={0.9}
              roughness={0.1}
            />
          ) : (
            <meshStandardMaterial
              color={index % 2 === 0 ? "#ff6b00" : "#00ff88"}
              metalness={0.9}
              roughness={0.1}
              emissive={index % 2 === 0 ? "#ff3300" : "#00cc66"}
              emissiveIntensity={0.5}
            />
          )}
        </mesh>
      ))}
    </group>
  );
};

// Dynamic lighting that changes based on scroll
const DynamicLights = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const light1Ref = useRef<THREE.SpotLight>(null);
  const light2Ref = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    const progress = scrollProgress.current;
    const time = state.clock.elapsedTime;

    // Animate light positions
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time * 0.5) * 5;
      light1Ref.current.position.y = 3 + Math.cos(time * 0.3) * 2;
      light1Ref.current.intensity = 2 + progress * 3;
    }

    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(time * 0.4) * 5;
      light2Ref.current.position.y = -2 + Math.sin(time * 0.6) * 2;
      // Transition from orange to green based on scroll
      const color = new THREE.Color().lerpColors(
        new THREE.Color("#ff6b00"),
        new THREE.Color("#00ff88"),
        progress
      );
      light2Ref.current.color = color;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <spotLight
        ref={light1Ref}
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="#ff6b00"
        castShadow
      />
      <spotLight
        ref={light2Ref}
        position={[-5, -2, 5]}
        angle={0.6}
        penumbra={1}
        intensity={1.5}
        color="#00ff88"
        castShadow
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
    </>
  );
};

interface Scene3DProps {
  scrollProgress: React.MutableRefObject<number>;
}

const Scene3D = ({ scrollProgress }: Scene3DProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 20]} />
        
        <DynamicLights scrollProgress={scrollProgress} />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <PlaceholderModel scrollProgress={scrollProgress} />
        </Float>
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default Scene3D;
