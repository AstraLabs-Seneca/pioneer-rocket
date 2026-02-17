'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
    PHASES,
    SIM_CYCLE_DURATION,
    TICK_INTERVAL,
    CHART_MAX_POINTS,
    ENGINE_PATTERNS,
    type MissionPhase,
    type PhaseConfig,
} from '@/lib/constants';

// ── Types ────────────────────────────────────────────────
export interface TelemetryPoint {
    time: number;       // elapsed seconds
    altitude: number;   // metres
    speed: number;      // m/s
    temperature: number;// °C
}

export interface GyroData {
    pitch: number;
    yaw: number;
    roll: number;
}

export interface SimulationState {
    isRunning: boolean;
    elapsed: number;
    phase: PhaseConfig;
    telemetry: TelemetryPoint[];
    currentPoint: TelemetryPoint;
    gyro: GyroData;
    engines: boolean[];
    packetCount: number;
    signalStrength: number;
    maxAltitude: number;
    toggle: () => void;
}

// ── Helpers ──────────────────────────────────────────────

function getPhase(t: number): PhaseConfig {
    const cycleT = t % SIM_CYCLE_DURATION;
    let current = PHASES[0];
    for (const p of PHASES) {
        if (cycleT >= p.startTime) current = p;
    }
    return current;
}

function computeAltitude(t: number): number {
    const cycleT = t % SIM_CYCLE_DURATION;
    const peakAlt = 2800; // target apogee in metres
    const apogeeTime = 37; // mid-point of APOGEE phase

    if (cycleT < 3) return 0; // Pre-launch
    if (cycleT <= apogeeTime) {
        // Parabolic rise
        const progress = (cycleT - 3) / (apogeeTime - 3);
        return peakAlt * Math.sin(progress * Math.PI / 2) + (Math.random() - 0.5) * 5;
    }
    // Descent
    const descentProgress = (cycleT - apogeeTime) / (SIM_CYCLE_DURATION - apogeeTime);
    return Math.max(0, peakAlt * Math.cos(descentProgress * Math.PI / 2) + (Math.random() - 0.5) * 5);
}

function computeSpeed(t: number, altitude: number, prevAltitude: number): number {
    const dt = TICK_INTERVAL / 1000;
    const rawSpeed = Math.abs(altitude - prevAltitude) / dt;
    return Math.min(rawSpeed, 350) + (Math.random() - 0.5) * 3;
}

function computeTemperature(phase: MissionPhase, t: number): number {
    const base = 22;
    switch (phase) {
        case 'PRE-LAUNCH': return base + (Math.random() - 0.5) * 2;
        case 'LAUNCH': return base + 40 + Math.sin(t * 0.5) * 10 + (Math.random() - 0.5) * 5;
        case 'MECO': return base + 30 + (Math.random() - 0.5) * 5;
        case 'COAST': return base - 15 + Math.sin(t * 0.3) * 5;
        case 'APOGEE': return base - 25 + (Math.random() - 0.5) * 3;
        case 'RECOVERY': return base + 15 + Math.sin(t * 0.8) * 8;
        default: return base;
    }
}

function computeGyro(t: number, phase: MissionPhase): GyroData {
    const jitter = phase === 'LAUNCH' ? 0.15 : 0.03;
    return {
        pitch: Math.sin(t * 0.4) * 0.3 + (Math.random() - 0.5) * jitter,
        yaw: Math.cos(t * 0.3) * 0.2 + (Math.random() - 0.5) * jitter,
        roll: Math.sin(t * 0.2) * 0.15 + (Math.random() - 0.5) * jitter * 0.5,
    };
}

// ── Hook ─────────────────────────────────────────────────
export function useSimulation(): SimulationState {
    const [isRunning, setIsRunning] = useState(true);
    const [elapsed, setElapsed] = useState(0);
    const [telemetry, setTelemetry] = useState<TelemetryPoint[]>([]);
    const [gyro, setGyro] = useState<GyroData>({ pitch: 0, yaw: 0, roll: 0 });
    const [packetCount, setPacketCount] = useState(0);
    const [maxAltitude, setMaxAltitude] = useState(0);
    const prevAltRef = useRef(0);

    const toggle = useCallback(() => setIsRunning((r) => !r), []);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setElapsed((prev) => {
                const next = prev + TICK_INTERVAL / 1000;
                const phase = getPhase(next);
                const altitude = computeAltitude(next);
                const speed = computeSpeed(next, altitude, prevAltRef.current);
                const temperature = computeTemperature(phase.label, next);

                prevAltRef.current = altitude;

                const point: TelemetryPoint = { time: next, altitude, speed, temperature };

                setTelemetry((t) => {
                    const updated = [...t, point];
                    return updated.length > CHART_MAX_POINTS
                        ? updated.slice(updated.length - CHART_MAX_POINTS)
                        : updated;
                });

                setGyro(computeGyro(next, phase.label));
                setPacketCount((c) => c + 1);
                setMaxAltitude((m) => Math.max(m, altitude));

                return next;
            });
        }, TICK_INTERVAL);

        return () => clearInterval(interval);
    }, [isRunning]);

    const phase = getPhase(elapsed);
    const currentPoint: TelemetryPoint = telemetry.length > 0
        ? telemetry[telemetry.length - 1]
        : { time: 0, altitude: 0, speed: 0, temperature: 22 };

    const signalStrength = Math.max(40, 98 - (currentPoint.altitude / 2800) * 50 + (Math.random() - 0.5) * 5);

    return {
        isRunning,
        elapsed,
        phase,
        telemetry,
        currentPoint,
        gyro,
        engines: ENGINE_PATTERNS[phase.label],
        packetCount,
        signalStrength,
        maxAltitude,
        toggle,
    };
}
