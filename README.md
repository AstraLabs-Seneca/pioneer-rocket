# ASTRA Labs: Pioneer Rocket

**Team 06 | Seneca Polytechnic | Launch Canada 2026**

> *College students can compete at the highest level, standing side-by-side with established universities.*

---

## Mission

Launch the **Pioneer** rocket to a target apogee of **2.8 km** and demonstrate a high-fidelity suborbital rideshare simulation hosting **50 student-designed picosatellites**.

## Tech Stack

| System | Technology |
|--------|-----------|
| **Flight Computer** | STM32F405RGT6 |
| **Telemetry** | LoRa 433MHz |
| **Motor** | Cesaroni L1355-P |
| **PCB Design** | KiCad |
| **CAD** | SolidWorks / Fusion 360 |
| **Simulations** | OpenRocket, CFD, FEA |
| **Comms Bus** | CAN Bus (50-slot PicoSat rack) |

## Repository Structure

```
pioneer-rocket/
├── electronics/
│   ├── eps/            # Power system (EPS) - KiCad schematics, PCB layouts
│   ├── obc/            # On-Board Computer - STM32 config, sensor integration
│   ├── picosat/        # PicoSat rack - CAN bus, connectors, gold finger layouts
│   └── datasheets/     # Component datasheets & reference docs
├── mechanical/
│   ├── cad/            # SolidWorks/Fusion 360 models, airframe, bulkheads
│   └── analysis/       # CFD, FEA, thermal, vibration, center of mass
├── software/
│   ├── firmware/       # STM32 firmware, CAN polling, SD/Flash logging
│   └── ground-station/ # LoRa receiver, dashboard UI, antenna assembly
└── docs/               # FDR sections, meeting notes, compliance docs
```

## Team

| Subsystem | Lead | Scope |
|-----------|------|-------|
| **EPS (Power)** | Kiran, Nic | Battery, voltage regulation, power management, PCB |
| **OBC (Flight Computer)** | Sai | STM32, sensors (IMU/GPS/Alt), data storage, LoRa, CAN |
| **PicoSat Integration** | Adeem | CAN highway, rack design, gold finger connectors |
| **Hardware / CAD** | TBD | Airframe skeleton, thermal analysis, vibration damping |
| **Software / Ground Station** | TBD | Firmware, ground station dashboard, packet serialization |
| **Business / Marketing** | DJ | Sponsorship, outreach, FDR Sections 15/18 |

## Getting Started

1. Clone this repo: `git clone https://github.com/AstraLabs-Seneca/pioneer-rocket.git`
2. Read `docs/STUDENT_WORKFLOW.md` (this is the default process for all contributors)
3. Pick one issue from the [Issues](https://github.com/AstraLabs-Seneca/pioneer-rocket/issues) tab
4. Create a branch: `git checkout -b <subsystem>/<short-task-name>`
5. Open a PR using the required checklist template

## Student Quickstart

- Use `Student Task` issue template for new tasks.
- Use the PR checklist for every merge.
- Keep each PR scoped to one issue.
- Attach evidence (logs, screenshots, CAD exports, or outreach artifacts).

## AI Copilot Quickstart

- Repo AI entrypoint: `.ai/START_HERE.md`
- Core behavior contract: `.ai/AGENT_BRAIN_CORE.md`
- Multi-agent guardrails: `.ai/MULTI_AGENT_PROTOCOL.md`
- Subsystem first-move guide: `.ai/TASK_ROUTER.md`
- Student copy/paste prompt: `.ai/PROMPT_TEMPLATE.md`

## Workflow Automation

- `.github/workflows/pr-guard.yml` checks non-draft PRs for:
  - linked issue (`Closes #...`, `Fixes #...`, or `Resolves #...`)
  - non-empty `## Evidence` section
- `.github/CODEOWNERS` is included as a scaffold for auto-review routing.
  - Replace placeholder team names with real teams/usernames to enable reviewer auto-assignment.

## Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Verified, flight-ready designs only |
| `eps/*` | Electronics Power System work |
| `obc/*` | On-Board Computer work |
| `picosat/*` | PicoSat integration work |
| `mech/*` | Mechanical / CAD work |
| `sw/*` | Software / firmware work |

## Values

- **Reliability Over Complexity** — Proven COTS systems for flight-critical components
- **Safety Without Compromise** — Every member is a safety officer
- **Radical Transparency** — Single Source of Truth
- **Redundancy as Standard** — We don't leave success to chance
- **Documentation for the Future** — Building a legacy for Seneca students

## Competition

- **Event:** [Launch Canada 2026](https://www.launchcanada.org/) (Aug 15-21)
- **Location:** Timmins, Ontario
- **CSA Training:** Mar 10, Mar 24, Apr 7

---

*ASTRA Labs — Seneca Polytechnic*
