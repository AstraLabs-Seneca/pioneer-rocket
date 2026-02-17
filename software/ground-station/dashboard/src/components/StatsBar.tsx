'use client';

import { COLORS } from '@/lib/constants';

interface StatsBarProps {
    elapsed: number;
    packetCount: number;
    signalStrength: number;
    maxAltitude: number;
}

export default function StatsBar({ elapsed, packetCount, signalStrength, maxAltitude }: StatsBarProps) {
    const mins = Math.floor(elapsed / 60);
    const secs = Math.floor(elapsed % 60);
    const timeStr = `T+${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    return (
        <div className="stats-bar">
            <div className="stat-item">
                <span className="stat-label">ELAPSED</span>
                <span className="stat-value" style={{ color: COLORS.textPrimary }}>{timeStr}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">PACKETS</span>
                <span className="stat-value" style={{ color: COLORS.accentCyan }}>{packetCount}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">SIGNAL</span>
                <span className="stat-value" style={{ color: signalStrength > 70 ? COLORS.accentLime : COLORS.accentOrange }}>
                    {signalStrength.toFixed(0)}%
                </span>
            </div>
            <div className="stat-item">
                <span className="stat-label">MAX ALT</span>
                <span className="stat-value" style={{ color: COLORS.accentCyan }}>
                    {maxAltitude.toFixed(0)} m
                </span>
            </div>
        </div>
    );
}
