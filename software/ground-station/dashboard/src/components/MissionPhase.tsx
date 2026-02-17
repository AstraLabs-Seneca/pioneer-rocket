'use client';

import { PHASES, type PhaseConfig } from '@/lib/constants';

interface MissionPhaseProps {
    current: PhaseConfig;
}

export default function MissionPhase({ current }: MissionPhaseProps) {
    return (
        <div className="mission-phase-bar">
            {PHASES.map((p) => {
                const isActive = p.label === current.label;
                return (
                    <div
                        key={p.label}
                        className={`phase-pill ${isActive ? 'phase-active' : ''}`}
                        style={{
                            '--phase-color': p.color,
                            borderColor: isActive ? p.color : 'transparent',
                            color: isActive ? p.color : undefined,
                            boxShadow: isActive ? `0 0 12px ${p.color}44` : 'none',
                        } as React.CSSProperties}
                    >
                        {p.label}
                    </div>
                );
            })}
        </div>
    );
}
