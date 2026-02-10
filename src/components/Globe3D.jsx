import React, { useRef, Suspense } from 'react';
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

    // Stable high-res textures
    const textures = useLoader(THREE.TextureLoader, [
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_normal_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_clouds_1024.png',
    ]);

    const [colorMap, normalMap, specularMap, cloudsMap] = textures;

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.07;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += delta * 0.09;
            cloudsRef.current.rotation.x += delta * 0.01;
        }
    });

    return (
        <group>
            {/* High-Resolution Earth */}
            <Sphere args={[2, 128, 128]} ref={meshRef}>
                <meshPhongMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    normalScale={new THREE.Vector2(2.5, 2.5)}
                    specularMap={specularMap}
                    specular={new THREE.Color('#AAAAAA')}
                    shininess={35}
                />
            </Sphere>

            {/* Cloud Atmosphere */}
            <Sphere args={[2.04, 128, 128]} ref={cloudsRef}>
                <meshPhongMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.55}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                    color="#ffffff"
                />
            </Sphere>

            {/* Blue Atmospheric Glow */}
            <mesh scale={[1.22, 1.22, 1.22]}>
                <sphereGeometry args={[2, 128, 128]} />
                <meshBasicMaterial
                    color="#0077ff"
                    transparent
                    opacity={0.18}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Space Traffic */}
            <OrbitingPlane radius={3.2} speed={0.5} color="#d4af37" startPos={0} />
            <OrbitingPlane radius={3.8} speed={0.4} color="#00ffff" startPos={Math.PI} />
        </group>
    );
};

const Globe3D = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 42 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    logarithmicDepthBuffer: true,
                    powerPreference: "high-performance"
                }}
                onCreated={({ gl }) => {
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                }}
            >
                {/* Cinema Lighting Suite */}
                <ambientLight intensity={2.5} />
                <pointLight position={[15, 15, 15]} intensity={7} color="#ffffff" />
                <pointLight position={[-15, -15, -10]} intensity={4.5} color="#4488ff" />
                <directionalLight position={[0, 10, 5]} intensity={2.2} />

                <Stars radius={200} depth={80} count={10000} factor={8} saturation={0.8} fade speed={2.5} />

                <Suspense fallback={
                    <Html center>
                        <div className="flex flex-col items-center justify-center space-y-8 w-80 transform scale-125">
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 border-[6px] border-accent/10 rounded-full"></div>
                                <div className="absolute inset-0 border-[6px] border-accent border-t-transparent rounded-full animate-spin"></div>
                                <GlobeIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent" size={32} />
                            </div>
                            <div className="text-center">
                                <p className="text-accent/60 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Syncing Galaxy Core...</p>
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
                    autoRotateSpeed={0.7}
                    enableDamping={true}
                    dampingFactor={0.07}
                />
            </Canvas>
        </div>
    );
};

export default Globe3D;
