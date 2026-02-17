'use client';

interface SimToggleProps {
    isRunning: boolean;
    onToggle: () => void;
}

export default function SimToggle({ isRunning, onToggle }: SimToggleProps) {
    return (
        <button
            id="sim-toggle"
            className={`sim-toggle ${isRunning ? 'sim-running' : 'sim-paused'}`}
            onClick={onToggle}
        >
            <span className="sim-mode-label">SIM</span>
            <span className={`sim-indicator ${isRunning ? 'pulse' : ''}`} />
        </button>
    );
}
