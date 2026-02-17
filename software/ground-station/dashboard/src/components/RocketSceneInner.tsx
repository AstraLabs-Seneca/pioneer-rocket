'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import RocketModel from './RocketModel';
import GroundEnvironment from './GroundEnvironment';
import type { GyroData } from '@/hooks/useSimulation';
import type { MissionPhase } from '@/lib/constants';

interface Props {
    gyro: GyroData;
    phase: MissionPhase;
    altitude: number;
}

export default function RocketSceneInner({ gyro, phase, altitude }: Props) {
    // Normalize altitude: 0 = ground level, 1 = fully in space (at ~500m+)
    const spaceProgress = Math.min(1, altitude / 500);

    return (
        <Canvas
            camera={{ position: [5, 2, 6], fov: 45 }}
            style={{ background: 'transparent' }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.25 + spaceProgress * 0.1} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} color="#e0e0ff" />
            <directionalLight position={[-3, -2, -5]} intensity={0.3} color="#ff6b35" />

            {/* Stars fade in as we leave the ground */}
            <Stars
                radius={80}
                depth={60}
                count={2500}
                factor={3}
                fade
                speed={0.5}
            />

            {/* Ground, launch pad, atmosphere — drops away with altitude */}
            <GroundEnvironment altitude={altitude} phase={phase} />

            {/* Rocket stays centered, the world moves around it */}
            <RocketModel gyro={gyro} phase={phase} />

            <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={3}
                maxDistance={15}
                autoRotate={false}
            />
        </Canvas>
    );
}
