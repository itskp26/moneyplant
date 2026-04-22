"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Particle field around the globe
function Particles({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 2.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#10b981"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Market data arc lines on globe
function GlobeArcs() {
  const ref = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const lat1 = (Math.random() - 0.5) * Math.PI;
      const lon1 = Math.random() * Math.PI * 2;
      const lat2 = (Math.random() - 0.5) * Math.PI;
      const lon2 = Math.random() * Math.PI * 2;

      const points: THREE.Vector3[] = [];
      for (let t = 0; t <= 1; t += 0.05) {
        const lat = lat1 + (lat2 - lat1) * t;
        const lon = lon1 + (lon2 - lon1) * t;
        const r = 1.02 + Math.sin(Math.PI * t) * 0.25;
        points.push(
          new THREE.Vector3(
            r * Math.cos(lat) * Math.cos(lon),
            r * Math.sin(lat),
            r * Math.cos(lat) * Math.sin(lon)
          )
        );
      }

      const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#06b6d4"];
      return {
        points,
        color: colors[i % colors.length],
        opacity: 0.3 + Math.random() * 0.4,
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={ref}>
      {arcs.map((arc, i) => {
        const curve = new THREE.CatmullRomCurve3(arc.points);
        const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.003, 4, false);
        return (
          <mesh key={i} geometry={tubeGeo}>
            <meshBasicMaterial color={arc.color} transparent opacity={arc.opacity} />
          </mesh>
        );
      })}
    </group>
  );
}

// Glowing dot markers on the globe surface
function GlobeMarkers() {
  const ref = useRef<THREE.Group>(null);

  const markers = useMemo(() =>
    Array.from({ length: 20 }, () => {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      return {
        x: 1.01 * Math.sin(phi) * Math.cos(theta),
        y: 1.01 * Math.cos(phi),
        z: 1.01 * Math.sin(phi) * Math.sin(theta),
        color: ["#10b981", "#3b82f6", "#f59e0b"][Math.floor(Math.random() * 3)],
        scale: 0.008 + Math.random() * 0.012,
      };
    }), []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={ref}>
      {markers.map((m, i) => (
        <mesh key={i} position={[m.x, m.y, m.z]}>
          <sphereGeometry args={[m.scale, 8, 8]} />
          <meshBasicMaterial color={m.color} />
        </mesh>
      ))}
    </group>
  );
}

// Simplified world map representation (landmasses)
function WorldMap({ count = 2500 }: { count?: number }) {
  const ref = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const radius = 1.005;

    // Rough coordinates for major landmasses
    const landmasses = [
      { lat: [15, 70], lon: [-130, -60] },  // N America
      { lat: [-50, 12], lon: [-80, -35] },   // S America
      { lat: [35, 72], lon: [-10, 45] },    // Europe
      { lat: [5, 75], lon: [45, 145] },     // Asia
      { lat: [-35, 36], lon: [-18, 52] },   // Africa
      { lat: [-42, -12], lon: [112, 152] }, // Australia
      { lat: [5, 25], lon: [100, 130] },    // SE Asia
    ];

    for (let i = 0; i < count; i++) {
      const land = landmasses[Math.floor(Math.random() * landmasses.length)];
      const lat = Math.random() * (land.lat[1] - land.lat[0]) + land.lat[0];
      const lon = Math.random() * (land.lon[1] - land.lon[0]) + land.lon[0];

      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi);
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#34d399"
          size={0.018}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
        />
      </Points>
    </group>
  );
}

// The wireframe globe itself
function Globe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <>
      {/* Solid core with faint glow */}
      <mesh ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#060f1e"
          emissive="#0a2040"
          transparent
          opacity={0.98}
          shininess={100}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[1.002, 32, 32]} />
        <meshBasicMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>
    </>
  );
}

// Outer atmosphere glow ring
function AtmosphereRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.04;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.22, 0.015, 8, 100]} />
      <meshBasicMaterial color="#10b981" transparent opacity={0.2} />
    </mesh>
  );
}

// Outer orbit ring (blue)
function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * 0.06;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[1.6, 0.005, 4, 80]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
    </mesh>
  );
}

export default function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.3], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#10b981" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#3b82f6" />

      <Globe />
      <WorldMap />
      <GlobeArcs />
      <GlobeMarkers />
      <AtmosphereRing />
      <OrbitRing />
      <Particles />
    </Canvas>
  );
}
