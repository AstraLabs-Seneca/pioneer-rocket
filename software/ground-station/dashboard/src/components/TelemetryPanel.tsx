'use client';

import {
    LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import type { TelemetryPoint } from '@/hooks/useSimulation';
import { COLORS } from '@/lib/constants';

interface ChartProps {
    data: TelemetryPoint[];
    dataKey: keyof TelemetryPoint;
    color: string;
    label: string;
    unit: string;
    currentValue: number;
}

function TelemetryChart({ data, dataKey, color, label, unit, currentValue }: ChartProps) {
    return (
        <div className="telemetry-chart">
            <div className="chart-header">
                <span className="chart-label">{label}</span>
                <span className="chart-value" style={{ color }}>
                    {currentValue.toFixed(1)}
                    <span className="chart-unit">{unit}</span>
                </span>
            </div>
            <ResponsiveContainer width="100%" height={100}>
                <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip
                        contentStyle={{
                            background: COLORS.bgPanel,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 6,
                            fontSize: 12,
                            color: COLORS.textPrimary,
                        }}
                        labelFormatter={(v) => `T+${Number(v).toFixed(1)}s`}
                        formatter={(v) => [`${Number(v).toFixed(1)} ${unit}`, label]}
                    />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

interface TelemetryPanelProps {
    data: TelemetryPoint[];
    currentPoint: TelemetryPoint;
}

export default function TelemetryPanel({ data, currentPoint }: TelemetryPanelProps) {
    return (
        <div className="telemetry-panel">
            <TelemetryChart
                data={data}
                dataKey="altitude"
                color={COLORS.accentCyan}
                label="ALTITUDE"
                unit=" m"
                currentValue={currentPoint.altitude}
            />
            <TelemetryChart
                data={data}
                dataKey="speed"
                color={COLORS.accentLime}
                label="SPEED"
                unit=" m/s"
                currentValue={currentPoint.speed}
            />
            <TelemetryChart
                data={data}
                dataKey="temperature"
                color={COLORS.accentOrange}
                label="TEMPERATURE"
                unit=" °C"
                currentValue={currentPoint.temperature}
            />
        </div>
    );
}
