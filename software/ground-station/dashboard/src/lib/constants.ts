// ── Color Tokens ──────────────────────────────────────────
export const COLORS = {
    bgPrimary: '#0a0a0f',
    bgPanel: '#12121a',
    bgPanelHover: '#1a1a2e',
    accentCyan: '#00d4ff',
    accentLime: '#39ff14',
    accentOrange: '#ff6b35',
    accentRed: '#ff1744',
    accentBlue: '#4488ff',
    textPrimary: '#e0e0e0',
    textSecondary: '#8888aa',
    border: '#2a2a3e',
} as const;

// ── Mission Phases ───────────────────────────────────────
export type MissionPhase =
    | 'PRE-LAUNCH'
    | 'LAUNCH'
    | 'MECO'
    | 'COAST'
    | 'APOGEE'
    | 'RECOVERY';

export interface PhaseConfig {
    label: MissionPhase;
    color: string;
    startTime: number; // seconds into the sim
    enginesActive: boolean;
}

export const PHASES: PhaseConfig[] = [
    { label: 'PRE-LAUNCH', color: COLORS.textSecondary, startTime: 0, enginesActive: false },
    { label: 'LAUNCH', color: COLORS.accentOrange, startTime: 3, enginesActive: true },
    { label: 'MECO', color: COLORS.accentCyan, startTime: 15, enginesActive: false },
    { label: 'COAST', color: COLORS.accentBlue, startTime: 20, enginesActive: false },
    { label: 'APOGEE', color: COLORS.accentLime, startTime: 35, enginesActive: false },
    { label: 'RECOVERY', color: COLORS.accentRed, startTime: 40, enginesActive: false },
];

export const SIM_CYCLE_DURATION = 60; // seconds before the sim loops
export const TICK_INTERVAL = 100;     // ms between data updates
export const CHART_MAX_POINTS = 200;  // rolling window for charts

// ── Engine Grid ──────────────────────────────────────────
export const ENGINE_COUNT = 6;
// Which engines fire per phase (index 0-5)
export const ENGINE_PATTERNS: Record<MissionPhase, boolean[]> = {
    'PRE-LAUNCH': [false, false, false, false, false, false],
    'LAUNCH': [true, true, true, true, true, true],
    'MECO': [false, false, false, false, false, false],
    'COAST': [false, false, false, false, false, false],
    'APOGEE': [false, false, false, false, false, false],
    'RECOVERY': [false, false, true, false, true, false],
};
