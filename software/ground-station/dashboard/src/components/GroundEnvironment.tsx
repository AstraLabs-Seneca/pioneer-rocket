'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MissionPhase } from '@/lib/constants';

interface GroundEnvironmentProps {
    altitude: number;
    phase: MissionPhase;
}

export default function GroundEnvironment({ altitude, phase }: GroundEnvironmentProps) {
    const groundRef = useRef<THREE.Group>(null);
    const smokeRef = useRef<THREE.Mesh>(null);

    // Map altitude (0-2800m) to visual Y offset
    // Ground drops ~15 units in 3D space over the full altitude range
    const groundY = -1.6 - (altitude / 2800) * 30;

    useFrame(() => {
        if (!groundRef.current) return;
        // Smooth interpolation to target Y position
        groundRef.current.position.y += (groundY - groundRef.current.position.y) * 0.06;

        // Launch smoke grows during launch, fades after
        if (smokeRef.current) {
            const isLaunching = phase === 'LAUNCH';
            const targetOpacity = isLaunching && altitude < 200 ? 0.4 : 0;
            const targetScale = isLaunching && altitude < 200 ? 3 + altitude * 0.01 : 0.1;
            const mat = smokeRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity += (targetOpacity - mat.opacity) * 0.05;
            smokeRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale * 0.3, targetScale),
                0.04
            );
        }
    });

    return (
        <group ref={groundRef} position={[0, -1.6, 0]}>
            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[60, 60]} />
                <meshStandardMaterial color="#1a1a18" roughness={0.9} metalness={0.1} />
            </mesh>

            {/* Launch pad - concrete circle */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <circleGeometry args={[2.5, 32]} />
                <meshStandardMaterial color="#333330" roughness={0.8} metalness={0.2} />
            </mesh>

            {/* Inner pad markings */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <ringGeometry args={[0.8, 1.0, 32]} />
                <meshStandardMaterial color="#ff3333" roughness={0.7} metalness={0.1} emissive="#ff3333" emissiveIntensity={0.2} />
            </mesh>

            {/* Pad center cross - X */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <planeGeometry args={[0.08, 1.6]} />
                <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.3} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.02, 0]}>
                <planeGeometry args={[0.08, 1.6]} />
                <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.3} />
            </mesh>

            {/* Launch stand legs (4 supports) */}
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.sin(angle) * 0.6,
                        0.3,
                        Math.cos(angle) * 0.6,
                    ]}
                    rotation={[0, angle, Math.PI / 12]}
                >
                    <boxGeometry args={[0.06, 0.6, 0.06]} />
                    <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} />
                </mesh>
            ))}

            {/* Launch smoke/cloud */}
            <mesh ref={smokeRef} position={[0, 0.5, 0]} scale={[0.1, 0.1, 0.1]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="#aaaaaa" transparent opacity={0} />
            </mesh>

            {/* Pad lights (4 small glowing spheres) */}
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
                <group key={`light-${i}`}>
                    <mesh
                        position={[
                            Math.sin(angle) * 2,
                            0.15,
                            Math.cos(angle) * 2,
                        ]}
                    >
                        <sphereGeometry args={[0.06, 8, 8]} />
                        <meshBasicMaterial color="#00ff88" />
                    </mesh>
                    <pointLight
                        position={[
                            Math.sin(angle) * 2,
                            0.3,
                            Math.cos(angle) * 2,
                        ]}
                        color="#00ff88"
                        intensity={0.5}
                        distance={3}
                    />
                </group>
            ))}
        </group>
    );
}
