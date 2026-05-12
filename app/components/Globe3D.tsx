"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── World map dot cloud using detailed landmass polygons ───────────────────
// Each entry: [latMin, latMax, lonMin, lonMax, density]
// Density 1 = sparse ... 3 = dense
const LANDMASS_REGIONS: [number, number, number, number, number][] = [
  // North America
  [60, 72, -140, -60, 2],  // Canada wide
  [48, 60, -130, -60, 2],  // Canada south / Great Lakes
  [25, 48, -125, -65, 3],  // Continental US
  [15, 30, -115, -88, 2],  // Mexico & southern tip
  [7, 18, -90, -78, 1],    // Central America narrow isthmus

  // Greenland
  [60, 83, -58, -18, 1],

  // Caribbean (sparse islands)
  [10, 24, -85, -60, 1],

  // South America
  [8, 12, -73, -60, 1],    // Venezuela / Guyana
  [-5, 8, -78, -50, 2],    // Colombia / Brazil north
  [-15, -5, -76, -35, 3],  // Brazil central
  [-35, -15, -73, -40, 2], // Brazil south / Bolivia / Argentina north
  [-55, -35, -72, -53, 2], // Argentina / Chile

  // Europe
  [50, 71, -25, 32, 2],    // Scandinavia + British Isles
  [36, 50, -10, 28, 3],    // Western + Central Europe
  [36, 45, 28, 42, 2],     // Turkey + Eastern Med
  [44, 60, 20, 60, 2],     // Eastern Europe + Ukraine

  // Africa
  [30, 37, -6, 12, 2],     // Northwest Africa (Maghreb)
  [5, 30, -18, 45, 3],     // Sub-Saharan North Africa + Egypt
  [-5, 5, 10, 45, 2],      // Equatorial Africa
  [-35, -5, 12, 52, 3],    // Southern + East Africa

  // Middle East
  [20, 38, 36, 62, 2],
  [14, 24, 42, 60, 1],     // Arabian Peninsula south

  // Asia - Central
  [40, 72, 50, 140, 2],    // Russia (vast but sparse)
  [30, 40, 50, 90, 2],     // Central Asia steppe
  [20, 40, 62, 100, 3],    // India + Pakistan + subcontinent
  [8, 20, 68, 92, 2],      // South India / Sri Lanka region
  [15, 25, 100, 122, 2],   // Southeast Asia mainland
  [-8, 8, 95, 145, 2],     // Indonesia / Philippines arcs
  [35, 44, 100, 132, 2],   // China south / Korea
  [44, 55, 80, 140, 2],    // China north / Mongolia
  [30, 45, 130, 145, 1],   // Japan
  [1, 6, 100, 120, 1],     // Malaysia / Singapore

  // Australia
  [-10, -25, 130, 155, 2],
  [-25, -40, 114, 154, 3],
  [-40, -45, 144, 148, 1], // Tasmania

  // Antarctica fringe
  [-72, -62, -180, 180, 1],
];

function latLonToXYZ(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// High-fidelity world map point cloud
function WorldMapDots({ count = 6000 }: { count?: number }) {
  const ref = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const pts: number[] = [];
    const totalWeight = LANDMASS_REGIONS.reduce((s, r) => s + r[4], 0);

    for (let i = 0; i < count; i++) {
      // Weighted random region pick
      let roll = Math.random() * totalWeight;
      let region = LANDMASS_REGIONS[0];
      for (const r of LANDMASS_REGIONS) {
        roll -= r[4];
        if (roll <= 0) { region = r; break; }
      }
      const [latMin, latMax, lonMin, lonMax] = region;
      const lat = latMin + Math.random() * (latMax - latMin);
      const lon = lonMin + Math.random() * (lonMax - lonMin);
      const v = latLonToXYZ(lat, lon, 1.005);
      pts.push(v.x, v.y, v.z);
    }
    return new Float32Array(pts);
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.10;
  });

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#34d399"
          size={0.016}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
    </group>
  );
}

// Particle field
function Particles({ count = 2200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.6 + Math.random() * 2.2;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.015;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#10b981" size={0.009} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
}

// Animated arc lines (market data routes)
function GlobeArcs() {
  const ref = useRef<THREE.Group>(null);
  const arcs = useMemo(() => {
    const CITY_PAIRS: [number, number, number, number][] = [
      [40.7, -74.0, 51.5, -0.13],  // NY → London
      [51.5, -0.13, 35.7, 139.7],  // London → Tokyo
      [35.7, 139.7, 19.1, 72.9],   // Tokyo → Mumbai
      [19.1, 72.9, 1.3, 103.8],    // Mumbai → Singapore
      [1.3, 103.8, -33.9, 151.2],  // Singapore → Sydney
      [40.7, -74.0, 19.4, -99.1],  // NY → Mexico City
      [28.6, 77.2, 39.9, 116.4],   // Delhi → Beijing
      [48.9, 2.3, 55.8, 37.6],     // Paris → Moscow
      [-33.9, 151.2, 35.7, 139.7], // Sydney → Tokyo
      [-23.5, -46.6, 40.7, -74.0], // São Paulo → NY
      [1.3, 103.8, 40.7, -74.0],   // Singapore → NY
      [55.8, 37.6, 39.9, 116.4],   // Moscow → Beijing
    ];
    const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#06b6d4", "#f43f5e"];
    return CITY_PAIRS.map((pair, i) => {
      const [lat1, lon1, lat2, lon2] = pair;
      const p1 = latLonToXYZ(lat1, lon1, 1.02);
      const p2 = latLonToXYZ(lat2, lon2, 1.02);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const lift = 1.0 + p1.distanceTo(p2) * 0.35;
      mid.normalize().multiplyScalar(lift);
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const pts   = curve.getPoints(40);
      return { pts, color: colors[i % colors.length], opacity: 0.35 + Math.random() * 0.3 };
    });
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.10;
  });

  return (
    <group ref={ref}>
      {arcs.map((arc, i) => {
        const curve  = new THREE.CatmullRomCurve3(arc.pts);
        const tubeGeo = new THREE.TubeGeometry(curve, 30, 0.003, 4, false);
        return (
          <mesh key={i} geometry={tubeGeo}>
            <meshBasicMaterial color={arc.color} transparent opacity={arc.opacity} />
          </mesh>
        );
      })}
    </group>
  );
}

// City dot markers at real locations
function CityMarkers() {
  const ref = useRef<THREE.Group>(null);
  const cities = useMemo(() => [
    { lat: 40.7,  lon: -74.0,  color: "#3b82f6" }, // New York
    { lat: 51.5,  lon: -0.13,  color: "#10b981" }, // London
    { lat: 35.7,  lon: 139.7,  color: "#f59e0b" }, // Tokyo
    { lat: 19.1,  lon: 72.9,   color: "#10b981" }, // Mumbai
    { lat: 1.3,   lon: 103.8,  color: "#06b6d4" }, // Singapore
    { lat: -33.9, lon: 151.2,  color: "#8b5cf6" }, // Sydney
    { lat: 28.6,  lon: 77.2,   color: "#f43f5e" }, // Delhi
    { lat: 39.9,  lon: 116.4,  color: "#f59e0b" }, // Beijing
    { lat: 48.9,  lon: 2.3,    color: "#3b82f6" }, // Paris
    { lat: -23.5, lon: -46.6,  color: "#10b981" }, // São Paulo
    { lat: 55.8,  lon: 37.6,   color: "#8b5cf6" }, // Moscow
    { lat: 25.2,  lon: 55.3,   color: "#f59e0b" }, // Dubai
  ].map(c => ({ ...latLonToXYZ(c.lat, c.lon, 1.015), color: c.color, scale: 0.009 + Math.random() * 0.008 })), []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.10;
  });

  return (
    <group ref={ref}>
      {cities.map((m, i) => (
        <mesh key={i} position={[m.x, m.y, m.z]}>
          <sphereGeometry args={[m.scale, 8, 8]} />
          <meshBasicMaterial color={m.color} />
        </mesh>
      ))}
    </group>
  );
}

// Solid globe + wireframe grid
function GlobeShell() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.10;
    }
  });
  return (
    <>
      {/* Deep ocean core */}
      <mesh ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#040d1a"
          emissive="#081830"
          transparent
          opacity={0.98}
          shininess={120}
        />
      </mesh>

      {/* Fine lat/lon grid */}
      <mesh>
        <sphereGeometry args={[1.002, 48, 48]} />
        <meshBasicMaterial color="#1e4060" wireframe transparent opacity={0.04} />
      </mesh>

      {/* Inner glow haze */}
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.025} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

// Atmospheric glow layers — all radii ≤ 1.30 to stay within frustum at z=3.2 fov=46
function Atmosphere() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.04;
    if (r2.current) r2.current.rotation.x += delta * 0.06;
    if (r3.current) r3.current.rotation.y += delta * 0.03;
  });
  return (
    <>
      {/* Outer haze sphere — stays inside globe, no clipping */}
      <mesh>
        <sphereGeometry args={[1.14, 32, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {/* Atmosphere ring — r=1.18, fits within ±1.34 frustum */}
      <mesh ref={r1}>
        <torusGeometry args={[1.18, 0.016, 8, 128]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.28} />
      </mesh>

      {/* Orbit ring (blue) — r=1.26, tilted 45° so max y-extent = 1.26*cos(45°)≈0.89 */}
      <mesh ref={r2} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.26, 0.005, 4, 120]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.22} />
      </mesh>

      {/* Orbit ring 2 (purple) — r=1.22, tilted so max extent ≈ 1.06 */}
      <mesh ref={r3} rotation={[Math.PI / 3.5, Math.PI / 4, 0]}>
        <torusGeometry args={[1.22, 0.004, 4, 120]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.16} />
      </mesh>
    </>
  );
}

export default function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 46 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]}  intensity={1.8} color="#10b981" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[0, 5, -5]}  intensity={0.5} color="#8b5cf6" />

      <GlobeShell />
      <WorldMapDots count={7000} />
      <GlobeArcs />
      <CityMarkers />
      <Atmosphere />
      <Particles />
    </Canvas>
  );
}
