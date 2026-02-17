'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { GyroData } from '@/hooks/useSimulation';
import type { MissionPhase } from '@/lib/constants';

interface RocketModelProps {
    gyro: GyroData;
    phase: MissionPhase;
}

export default function RocketModel({ gyro, phase }: RocketModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const exhaustRef = useRef<THREE.PointLight>(null);
    const exhaustMeshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (!groupRef.current) return;
        // Smooth interpolation toward target rotation
        groupRef.current.rotation.x += (gyro.pitch - groupRef.current.rotation.x) * 0.08;
        groupRef.current.rotation.y += (gyro.yaw - groupRef.current.rotation.y) * 0.08;
        groupRef.current.rotation.z += (gyro.roll - groupRef.current.rotation.z) * 0.08;

        // Exhaust glow
        const isFirePhase = phase === 'LAUNCH' || phase === 'RECOVERY';
        const targetIntensity = isFirePhase ? 8 : 0;
        if (exhaustRef.current) {
            exhaustRef.current.intensity += (targetIntensity - exhaustRef.current.intensity) * 0.1;
        }
        if (exhaustMeshRef.current) {
            const targetScale = isFirePhase ? 1 : 0.01;
            exhaustMeshRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.1
            );
        }
    });

    const bodyColor = '#c8c8d0';
    const noseColor = '#e8e8f0';
    const finColor = '#888899';

    return (
        <group ref={groupRef}>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.35, 3, 32]} />
                <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
            </mesh>

            {/* Nose cone */}
            <mesh position={[0, 1.9, 0]}>
                <coneGeometry args={[0.3, 1, 32]} />
                <meshStandardMaterial color={noseColor} metalness={0.5} roughness={0.25} />
            </mesh>

            {/* Band at nose-body junction */}
            <mesh position={[0, 1.35, 0]}>
                <cylinderGeometry args={[0.32, 0.32, 0.08, 32]} />
                <meshStandardMaterial color="#ff3333" metalness={0.4} roughness={0.5} />
            </mesh>

            {/* Fins (4 fins at 90° intervals) */}
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.sin(angle) * 0.45,
                        -1.2,
                        Math.cos(angle) * 0.45,
                    ]}
                    rotation={[0, angle, 0]}
                >
                    <boxGeometry args={[0.02, 0.8, 0.5]} />
                    <meshStandardMaterial color={finColor} metalness={0.5} roughness={0.4} />
                </mesh>
            ))}

            {/* Exhaust glow */}
            <pointLight
                ref={exhaustRef}
                position={[0, -1.8, 0]}
                color="#ff6b35"
                intensity={0}
                distance={5}
            />
            <mesh ref={exhaustMeshRef} position={[0, -1.9, 0]} scale={[0.01, 0.01, 0.01]}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshBasicMaterial color="#ff8844" transparent opacity={0.6} />
            </mesh>
        </group>
    );
}
