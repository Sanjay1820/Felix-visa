import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Coordinate converter for precise 3D placement
const latLongToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
};

const Marker = ({ country, onSelect, isSelected, hideLabels }) => {
    const [hovered, setHovered] = useState(false);
    // Position markers slightly above the surface
    const pos = useMemo(() => latLongToVector3(country.lat, country.lon, 2.05), [country]);

    return (
        <group
            position={pos}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            onPointerDown={(e) => {
                e.stopPropagation();
                onSelect(country);
            }}
        >
            {/* Click Hitbox */}
            <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} visible={false} />
            </mesh>

            {/* Glowing Core Point */}
            <mesh scale={hovered || isSelected ? 1.8 : 1.2}>
                <sphereGeometry args={[0.045, 32, 32]} />
                <meshStandardMaterial
                    color={isSelected || hovered ? "#FFD700" : "#d4af37"}
                    emissive={isSelected || hovered ? "#FFD700" : "#d4af37"}
                    emissiveIntensity={isSelected ? 12 : 5}
                />
            </mesh>

            {/* Vertical HUD Anchor Line */}
            <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.3, 8]} />
                <meshBasicMaterial color="#d4af37" opacity={0.4} transparent />
            </mesh>

            {/* Premium HUD Label */}
            <Html
                distanceFactor={7}
                position={[0, 0.35, 0]}
                center
                style={{
                    pointerEvents: 'none',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: hideLabels ? 0 : (hovered || isSelected ? 1 : 0.8),
                    transform: `scale(${hovered || isSelected ? 1.1 : 1})`,
                    zIndex: isSelected ? 100 : 10
                }}
            >
                <div
                    className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 shadow-2xl border whitespace-nowrap
                        ${isSelected ? 'bg-accent text-primary border-white ring-8 ring-accent/10' :
                            hovered ? 'bg-white text-black backdrop-blur-md border-white' :
                                'bg-[#0b1b36]/90 text-white/90 backdrop-blur-xl border-white/20'}`}
                >
                    <img
                        src={`https://flagcdn.com/w40/${country.id === 'uk' ? 'gb' : country.id}.png`}
                        alt={country.name}
                        className="w-5 h-3.5 object-cover rounded shadow-lg"
                    />
                    <span className="drop-shadow-sm">{country.name}</span>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping ml-1"></div>}
                </div>
            </Html>
        </group>
    );
};

const GlobeMesh = ({ countries, selectedCountry, onSelect }) => {
    const meshRef = useRef();
    const cloudsRef = useRef();

    const textures = useLoader(THREE.TextureLoader, [
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_normal_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_clouds_1024.png',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2400&auto=format&fit=crop'
    ]);

    const [colorMap, normalMap, specularMap, cloudsMap, milkyWayMap] = textures;

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += delta * 0.06;
        }
    });

    return (
        <group>
            {/* Background Galaxy */}
            <mesh scale={[-150, -150, -150]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial
                    map={milkyWayMap}
                    side={THREE.BackSide}
                    opacity={0.8}
                    transparent
                    color="#ffffff"
                />
            </mesh>

            {/* Earth Body */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[2, 128, 128]} />
                <meshPhongMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    normalScale={new THREE.Vector2(2, 2)}
                    specularMap={specularMap}
                    specular={new THREE.Color('#999999')}
                    shininess={30}
                    color="#ffffff"
                />
            </mesh>

            {/* Clouds */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[2.04, 128, 128]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.4}
                    depthWrite={false}
                    color="#ffffff"
                />
            </mesh>

            {/* Atmosphere Halo */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[2, 128, 128]} />
                <meshBasicMaterial
                    color="#0088ff"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Markers */}
            {countries.map(c => (
                <Marker
                    key={c.id}
                    country={c}
                    onSelect={onSelect}
                    isSelected={selectedCountry?.id === c.id}
                    hideLabels={!!selectedCountry}
                />
            ))}
        </group>
    );
};

const InteractiveGlobe = ({ countries, selectedCountry, onSelect }) => {
    return (
        <div className="w-full h-full min-h-[600px] relative bg-black/10 rounded-[4rem] overflow-hidden">
            <Canvas
                gl={{ antialias: true, alpha: true, logarithmicDepthBuffer: true }}
                camera={{ position: [0, 0, 7.5], fov: 35 }}
            >
                {/* Lighting */}
                <ambientLight intensity={2.5} />
                <pointLight position={[20, 20, 20]} intensity={6} />
                <pointLight position={[-20, -20, -10]} intensity={3} color="#0066ff" />

                <Stars radius={200} depth={100} count={10000} factor={8} fade />

                <Suspense fallback={null}>
                    <GlobeMesh
                        countries={countries}
                        selectedCountry={selectedCountry}
                        onSelect={onSelect}
                    />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3.5}
                    maxDistance={15}
                    rotateSpeed={0.6}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    enableDamping={true}
                />
            </Canvas>
        </div>
    );
};

export default InteractiveGlobe;
