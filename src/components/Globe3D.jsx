import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Globe as GlobeIcon } from 'lucide-react';

const OrbitingPlane = ({ radius, speed, color, startPos }) => {
    const planeRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed + startPos;
        planeRef.current.position.set(
            Math.cos(t) * radius,
            Math.sin(t * 0.4) * (radius * 0.3),
            Math.sin(t) * radius
        );
        planeRef.current.lookAt(0, 0, 0);
    });

    return (
        <group ref={planeRef}>
            <mesh>
                <boxGeometry args={[0.07, 0.01, 0.12]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
            </mesh>
            <pointLight intensity={0.6} distance={1.2} color={color} />
        </group>
    );
};

const GlobeMesh = () => {
    const meshRef = useRef();
    const cloudsRef = useRef();

    // High-resolution premium textures
    const textures = useLoader(THREE.TextureLoader, [
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_normal_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_clouds_1024.png',
        'https://threejs.org/examples/textures/planets/earth_lights_2048.png' // Night Lights
    ]);

    const [colorMap, normalMap, specularMap, cloudsMap, nightLightsMap] = textures;

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += delta * 0.06;
        }
    });

    // Custom Atmosphere Shader for the 'pop' halo effect
    const atmosphereMaterial = useMemo(() => new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        uniforms: {
            glowColor: { value: new THREE.Color('#00aaff') },
            viewVector: { value: new THREE.Vector3(0, 0, 1) }
        },
        vertexShader: `
            varying float intensity;
            void main() {
                vec3 vNormal = normalize( normalMatrix * normal );
                vec3 vNormel = normalize( normalMatrix * vec3(0.0, 0.0, 1.0) );
                intensity = pow( 0.7 - dot(vNormal, vNormel), 4.2 );
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
            {/* High-Resolution Cinematic Earth */}
            <Sphere args={[2, 128, 128]} ref={meshRef}>
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    normalScale={new THREE.Vector2(1.8, 1.8)}
                    roughnessMap={specularMap}
                    roughness={0.6}
                    metalness={0.2}
                    emissiveMap={nightLightsMap}
                    emissive={new THREE.Color('#FFECB3')}
                    emissiveIntensity={2.5}
                />
            </Sphere>

            {/* Cloud Layer - Improved Depth */}
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

            {/* Custom Fresnel Atmosphere Glow */}
            <mesh scale={[1.18, 1.18, 1.18]}>
                <sphereGeometry args={[2.08, 128, 128]} />
                <primitive object={atmosphereMaterial} attach="material" />
            </mesh>

            {/* Inner Glow scattering */}
            <mesh scale={[1.01, 1.01, 1.01]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshBasicMaterial color="#0088ff" transparent opacity={0.15} side={THREE.BackSide} />
            </mesh>

            {/* Strategic Space Traffic */}
            <OrbitingPlane radius={3.2} speed={0.5} color="#d4af37" startPos={0} />
            <OrbitingPlane radius={3.8} speed={0.4} color="#00ffff" startPos={Math.PI} />
        </group>
    );
};

const Globe3D = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                shadows
                camera={{ position: [0, 0, 7.5], fov: 40 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    logarithmicDepthBuffer: true,
                    powerPreference: "high-performance"
                }}
            >
                {/* Cinema Lighting Suite - Sharp High Contrast & Brighter View */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[10, 8, 5]}
                    intensity={5}
                    castShadow
                />
                <pointLight
                    position={[-15, -10, -5]}
                    intensity={3.2}
                    color="#00aaff"
                />

                <Stars radius={250} depth={100} count={12000} factor={10} fade speed={1.5} />

                <Suspense fallback={
                    <Html center>
                        <div className="flex flex-col items-center justify-center space-y-8 w-80 transform scale-125">
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 border-[6px] border-accent/10 rounded-full"></div>
                                <div className="absolute inset-0 border-[6px] border-accent border-t-transparent rounded-full animate-spin"></div>
                                <GlobeIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent" size={32} />
                            </div>
                            <div className="text-center">
                                <p className="text-accent/60 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Initializing Global Node...</p>
                            </div>
                        </div>
                    </Html>
                }>
                    <GlobeMesh />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    enableDamping={true}
                    dampingFactor={0.06}
                />
            </Canvas>
        </div>
    );
};

export default Globe3D;
