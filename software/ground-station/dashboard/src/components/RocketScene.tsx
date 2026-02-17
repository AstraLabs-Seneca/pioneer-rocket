'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { GyroData } from '@/hooks/useSimulation';
import type { MissionPhase } from '@/lib/constants';

interface RocketSceneProps {
    gyro: GyroData;
    phase: MissionPhase;
    altitude: number;
}

// Dynamic import to avoid SSR issues with Three.js
const Scene = dynamic(
    () => import('./RocketSceneInner') as Promise<{ default: ComponentType<RocketSceneProps> }>,
    { ssr: false }
);

export default function RocketScene({ gyro, phase, altitude }: RocketSceneProps) {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: 300 }}>
            <Scene gyro={gyro} phase={phase} altitude={altitude} />
        </div>
    );
}
