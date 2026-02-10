import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TrendingUp, MousePointer2, Plane, Clock, Sparkles } from 'lucide-react';

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
                    emissiveIntensity={isSelected ? 18 : 10}
                />
            </mesh>

            {/* Vertical HUD Anchor Line */}
            <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.3, 8]} />
                <meshBasicMaterial color="#d4af37" opacity={0.6} transparent />
            </mesh>

            {/* Premium HUD Label & Hover Box */}
            <Html
                distanceFactor={7}
                position={[0, 0.45, 0]}
                center
                style={{
                    pointerEvents: 'none',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: hideLabels ? 0 : 1,
                    zIndex: hovered || isSelected ? 200 : 10
                }}
            >
                <div className="relative group/label flex flex-col items-center">
                    {/* SLIM Hover Insight Portal (Small Box) */}
                    <div
                        className={`absolute bottom-full mb-6 w-64 overflow-hidden rounded-[2rem] border border-accent/40 shadow-[0_30px_100px_rgba(0,0,0,0.95)] backdrop-blur-3xl transition-all duration-500 origin-bottom
                            ${hovered ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10'}`}
                    >
                        {/* Image Background */}
                        <div className="absolute inset-0 z-0 h-[80px]">
                            <img
                                src={country.image}
                                alt={country.name}
                                className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1b36]/40 via-[#0b1b36]/90 to-[#0b1b36]"></div>
                        </div>

                        {/* Content Overlay - SLIMMED */}
                        <div className="relative z-10 p-5 pt-12 flex flex-col items-center text-center">
                            {/* Circular Flag Badge */}
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-[#0b1b36] overflow-hidden shadow-xl bg-[#0b1b36]">
                                <img
                                    src={`https://flagcdn.com/w160/${country.id === 'uk' ? 'gb' : country.id}.png`}
                                    alt={country.name}
                                    className="w-full h-full object-cover scale-150"
                                />
                            </div>

                            <div className="flex items-center gap-1.5 mb-2 bg-accent/20 px-2 py-0.5 rounded-full border border-accent/30">
                                <Sparkles size={10} className="text-accent" />
                                <span className="text-accent text-[7px] font-black uppercase tracking-widest">ACTIVE HUB</span>
                            </div>

                            <h4 className="text-xl font-black text-white tracking-[0.1em] uppercase mb-3 drop-shadow-xl">{country.name}</h4>

                            <div className="grid grid-cols-2 gap-3 w-full pt-4 border-t border-white/5">
                                <div className="flex flex-col items-center">
                                    <span className="text-[7px] text-accent/60 font-black uppercase tracking-widest mb-1">Success</span>
                                    <span className="text-xs font-black text-white leading-none whitespace-nowrap">{country.success}</span>
                                </div>
                                <div className="flex flex-col items-center border-l border-white/5">
                                    <span className="text-[7px] text-accent/60 font-black uppercase tracking-widest mb-1">Timeline</span>
                                    <span className="text-xs font-black text-white leading-none whitespace-nowrap">{country.processingTime}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2 text-[8px] text-accent font-black uppercase tracking-[0.2em] opacity-80">
                                <MousePointer2 size={10} className="animate-pulse" /> ACCESS INTEL
                            </div>
                        </div>

                        {/* Decorative HUD Accent */}
                        <div className="h-1 w-full bg-accent"></div>
                    </div>

                    {/* Base Label (Static) */}
                    <div
                        className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 shadow-2xl border whitespace-nowrap
                            ${isSelected ? 'bg-accent text-primary border-white ring-8 ring-accent/10' :
                                hovered ? 'bg-accent text-primary border-white scale-110 shadow-[0_0_30px_rgba(212,175,55,0.4)]' :
                                    'bg-[#0b1b36]/90 text-white/90 backdrop-blur-xl border-white/20'}`}
                    >
                        <img
                            src={`https://flagcdn.com/w40/${country.id === 'uk' ? 'gb' : country.id}.png`}
                            alt={country.name}
                            className="w-5 h-3.5 object-cover rounded shadow-lg"
                        />
                        <span className="drop-shadow-sm">{country.name}</span>
                        {(isSelected || hovered) && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping ml-1"></div>}
                    </div>

                    {/* Connector Triangle for hover box */}
                    {hovered && (
                        <div className="absolute bottom-[44px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-accent/40 drop-shadow-2xl z-[101]"></div>
                    )}
                </div>
            </Html>
        </group>
    );
};

const GlobeMesh = ({ countries, selectedCountry, onSelect }) => {
    const meshRef = useRef();
    const cloudsRef = useRef();

    const textures = useLoader(THREE.TextureLoader, [
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg', // Day Map
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_normal_2048.jpg', // Normal
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg', // Specular
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_clouds_1024.png', // Clouds
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2400&auto=format&fit=crop', // Starfield
        'https://threejs.org/examples/textures/planets/earth_lights_2048.png' // Night Lights
    ]);

    const [colorMap, normalMap, specularMap, cloudsMap, milkyWayMap, nightLightsMap] = textures;

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += delta * 0.06;
        }
    });

    // Atmosphere Shader Material - Adjusted for more 'visible' brightness
    const atmosphereMaterial = useMemo(() => new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        uniforms: {
            glowColor: { value: new THREE.Color('#00aaff') }, // Brighter Blue
            viewVector: { value: new THREE.Vector3(0, 0, 1) }
        },
        vertexShader: `
            varying float intensity;
            void main() {
                vec3 vNormal = normalize( normalMatrix * normal );
                vec3 vNormel = normalize( normalMatrix * vec3(0.0, 0.0, 1.0) );
                intensity = pow( 0.75 - dot(vNormal, vNormel), 4.2 );
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
        `,
        fragmentShader: `
            uniform vec3 glowColor;
            varying float intensity;
            void main() {
                vec3 glow = glowColor * intensity;
                gl_FragColor = vec4( glow, intensity );
            }
        `
    }), []);

    return (
        <group>
            {/* Background Galaxy - Slightly brighter for depth */}
            <mesh scale={[-150, -150, -150]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial
                    map={milkyWayMap}
                    side={THREE.BackSide}
                    opacity={0.4}
                    transparent
                    color="#222222"
                />
            </mesh>

            {/* Earth Body - High Performance Cinematic Material with Brighter Lights */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[2, 128, 128]} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    normalScale={new THREE.Vector2(1.5, 1.5)}
                    roughnessMap={specularMap}
                    roughness={0.6}
                    metalness={0.2}
                    emissiveMap={nightLightsMap}
                    emissive={new THREE.Color('#FFECB3')} // Warmer, brighter lights
                    emissiveIntensity={2.5}
                />
            </mesh>

            {/* Clouds */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[2.04, 128, 128]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.35}
                    depthWrite={false}
                    color="#ffffff"
                    shininess={0}
                />
            </mesh>

            {/* Custom Atmosphere Shader Layer - The 'Pop' Factor */}
            <mesh scale={[1.15, 1.15, 1.15]}>
                <sphereGeometry args={[2.1, 128, 128]} />
                <primitive object={atmosphereMaterial} attach="material" />
            </mesh>

            {/* Inner Glow scattering */}
            <mesh scale={[1.02, 1.02, 1.02]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshBasicMaterial color="#0088ff" transparent opacity={0.15} side={THREE.BackSide} />
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
                camera={{ position: [0, 1, 7.5], fov: 35 }}
                shadows
            >
                {/* Cinematic Lighting System - Increased Brighness */}
                <ambientLight intensity={0.4} /> {/* Increased from 0.2 */}

                {/* Main Sun Light (Key Light) */}
                <directionalLight
                    position={[10, 8, 5]}
                    intensity={5}
                    castShadow
                />

                {/* Atmosphere Rim Light (Fill) */}
                <pointLight
                    position={[-15, -10, -5]}
                    intensity={3}
                    color="#00aaff"
                />

                <Stars radius={250} depth={100} count={12000} factor={10} fade />

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
                    maxDistance={12}
                    rotateSpeed={0.5}
                    autoRotate={true}
                    autoRotateSpeed={0.4}
                    enableDamping={true}
                    dampingFactor={0.05}
                />
            </Canvas>
        </div>
    );
};

export default InteractiveGlobe;
