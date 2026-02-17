'use client';

import { useSimulation } from '@/hooks/useSimulation';
import RocketScene from '@/components/RocketScene';
import TelemetryPanel from '@/components/TelemetryPanel';
import MissionPhase from '@/components/MissionPhase';
import EngineStatus from '@/components/EngineStatus';
import SimToggle from '@/components/SimToggle';
import StatsBar from '@/components/StatsBar';

export default function DashboardPage() {
  const sim = useSimulation();

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <h1 className="header-title">
          <span>ASTRA LABS</span> — STARSHIP TELEMETRY
        </h1>
        <SimToggle isRunning={sim.isRunning} onToggle={sim.toggle} />
      </header>

      {/* Main Split */}
      <div className="main-content">
        {/* Left: 3D Rocket */}
        <div className="rocket-panel">
          <RocketScene gyro={sim.gyro} phase={sim.phase.label} altitude={sim.currentPoint.altitude} />
        </div>

        {/* Right: Telemetry */}
        <div className="right-panel">
          <MissionPhase current={sim.phase} />
          <TelemetryPanel data={sim.telemetry} currentPoint={sim.currentPoint} />
        </div>
      </div>

      {/* Bottom */}
      <div className="bottom-bar">
        <EngineStatus engines={sim.engines} />
        <StatsBar
          elapsed={sim.elapsed}
          packetCount={sim.packetCount}
          signalStrength={sim.signalStrength}
          maxAltitude={sim.maxAltitude}
        />
      </div>
    </div>
  );
}
