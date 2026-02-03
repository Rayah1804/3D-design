import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Using in-scene emissive/glow meshes instead of postprocessing to avoid extra peer deps

gsap.registerPlugin(ScrollTrigger);

// =====================================================
// CASQUE AUDIO 3D - Premium Headphones Model
// =====================================================
// Ce modèle est créé avec des primitives Three.js
// Pour utiliser un vrai fichier .glb:
// 1. Ajoutez votre fichier dans public/models/headphones.glb
// 2. Importez useGLTF de @react-three/drei
// 3. Chargez: const { scene } = useGLTF('/models/headphones.glb')
// 4. Utilisez <primitive object={scene} /> dans le composant
// =====================================================

// Ear Cup Component
const EarCup = ({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Outer shell */}
      <mesh>
        <cylinderGeometry args={[0.55, 0.55, 0.25, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      
      {/* Inner cushion */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.12, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.3}
          roughness={0.8}
        />
      </mesh>
      
      {/* Accent ring */}
      <mesh position={[0, -0.1, 0]}>
        <torusGeometry args={[0.52, 0.03, 16, 32]} />
        <meshStandardMaterial
          color="#ff6b00"
          emissive="#ff3300"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
          {/* Soft glow ring - slightly larger, additive blending for bloom-like effect */}
          <mesh position={[0, -0.1, 0]}>
            <torusGeometry args={[0.58, 0.06, 16, 64]} />
            <meshBasicMaterial
              color="#ff6b00"
              transparent={true}
              opacity={0.18}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
      
      {/* Logo plate */}
      <mesh position={[0, -0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

// Headband Component
const Headband = () => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.1, 0, 0),
      new THREE.Vector3(-0.8, 0.6, 0),
      new THREE.Vector3(-0.3, 0.9, 0),
      new THREE.Vector3(0, 0.95, 0),
      new THREE.Vector3(0.3, 0.9, 0),
      new THREE.Vector3(0.8, 0.6, 0),
      new THREE.Vector3(1.1, 0, 0),
    ]);
  }, []);

  return (
    <group>
      {/* Main headband */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.08, 16, false]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      
      {/* Inner padding */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.06, 16, false]} />
        <meshStandardMaterial
          color="#2d2d2d"
          metalness={0.2}
          roughness={0.9}
        />
      </mesh>
      
      {/* Accent stripe */}
      <mesh position={[0, 0.95, 0.08]}>
        <boxGeometry args={[0.4, 0.02, 0.02]} />
        <meshStandardMaterial
          color="#ff6b00"
          emissive="#ff3300"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Glow for accent stripe */}
      <mesh position={[0, 0.95, 0.1]}>
        <boxGeometry args={[0.45, 0.03, 0.02]} />
        <meshBasicMaterial color="#ff6b00" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};

// Arm/Slider Component
const SliderArm = ({ side }: { side: "left" | "right" }) => {
  const x = side === "left" ? -1 : 1;
  
  return (
    <group position={[x * 0.95, 0.15, 0]}>
      {/* Vertical arm */}
      <mesh>
        <boxGeometry args={[0.08, 0.6, 0.06]} />
        <meshStandardMaterial
          color="#252525"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      
      {/* Pivot joint */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      
      {/* Connection to cup */}
      <mesh position={[x * 0.08, -0.25, 0]} rotation={[0, 0, x * 0.3]}>
        <boxGeometry args={[0.12, 0.15, 0.05]} />
        <meshStandardMaterial
          color="#1f1f1f"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

// Main Headphones Model
const HeadphonesModel = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftCupRef = useRef<THREE.Group>(null);
  const rightCupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = scrollProgress.current;
    const time = state.clock.elapsedTime;

    // Base rotation - smooth continuous + scroll-driven
    groupRef.current.rotation.y = time * 0.15 + progress * Math.PI * 2;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1 + progress * 0.3;

    // Scale based on scroll (breathe effect)
    const scaleProgress = Math.sin(progress * Math.PI);
    const scale = 1.8 + scaleProgress * 0.4;
    groupRef.current.scale.setScalar(scale);

    // Explosion effect - ear cups move apart
    const explosionFactor = Math.sin(progress * Math.PI) * 0.8;
    
    if (leftCupRef.current) {
      leftCupRef.current.position.x = -1 - explosionFactor * 0.5;
      leftCupRef.current.rotation.y = explosionFactor * 0.3;
    }
    
    if (rightCupRef.current) {
      rightCupRef.current.position.x = 1 + explosionFactor * 0.5;
      rightCupRef.current.rotation.y = -explosionFactor * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={1.8}>
      {/* Headband */}
      <Headband />
      
      {/* Slider arms */}
      <SliderArm side="left" />
      <SliderArm side="right" />
      
      {/* Ear cups with refs for animation */}
      <group ref={leftCupRef} position={[-1, -0.15, 0]}>
        <EarCup position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
      </group>
      
      <group ref={rightCupRef} position={[1, -0.15, 0]}>
        <EarCup position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]} />
      </group>
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

    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time * 0.5) * 5;
      light1Ref.current.position.y = 3 + Math.cos(time * 0.3) * 2;
      light1Ref.current.intensity = 3 + progress * 2;
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
      <ambientLight intensity={0.15} />
      <spotLight
        ref={light1Ref}
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={3}
        color="#ff6b00"
        castShadow
      />
      <spotLight
        ref={light2Ref}
        position={[-5, -2, 5]}
        angle={0.6}
        penumbra={1}
        intensity={2}
        color="#00ff88"
        castShadow
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, -5, 3]} intensity={0.3} color="#ff6b00" />
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
        
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <HeadphonesModel scrollProgress={scrollProgress} />
        </Float>
        
  <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default Scene3D;
