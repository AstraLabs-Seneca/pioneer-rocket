'use client';

import { COLORS } from '@/lib/constants';

interface EngineStatusProps {
    engines: boolean[];
}

export default function EngineStatus({ engines }: EngineStatusProps) {
    return (
        <div className="engine-status">
            <span className="engine-label">ENGINES</span>
            <div className="engine-grid">
                {engines.map((on, i) => (
                    <div
                        key={i}
                        className={`engine-dot ${on ? 'engine-on' : 'engine-off'}`}
                        style={{
                            background: on ? COLORS.accentLime : COLORS.accentRed,
                            boxShadow: on
                                ? `0 0 8px ${COLORS.accentLime}88`
                                : `0 0 4px ${COLORS.accentRed}44`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
