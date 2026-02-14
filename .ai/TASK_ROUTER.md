# ASTRA Task Router (Practice Mode)

Use this to route a student + AI pair to the right first move in under 2 minutes.

## Universal Rules
- One issue at a time.
- Max 3 actions in the plan.
- Smallest complete change.
- Include evidence in PR.

## 1) Electronics - EPS
First actions:
1. Confirm issue acceptance criteria.
2. Identify exact schematic/PCB files affected.
3. Implement one power-related change (calculation, schematic, or layout note).

Evidence:
- Updated design file or notes.
- Screenshot/export of changed area.
- Short validation note.

## 2) Electronics - OBC
First actions:
1. Confirm required subsystem behavior (sensor, logging, CAN, LoRa, recovery).
2. Touch only relevant circuit/firmware files.
3. Add/adjust one test or verification step.

Evidence:
- Updated file(s).
- Test/bench log or expected signal path note.
- Risk note if flight-critical.

## 3) Electronics - PicoSat
First actions:
1. Confirm slot/CAN/power requirement from issue.
2. Make one scoped connector/bus/layout change.
3. Document compatibility assumptions.

Evidence:
- Updated diagrams/layout or spec note.
- Pinout/addressing summary.

## 4) Mechanical
First actions:
1. Confirm component impacted (bulkhead, rack, cable path, mount, thermal, vibration).
2. Produce one focused CAD/analysis update.
3. Document interfaces with electronics/software.

Evidence:
- CAD export/screenshot.
- Mass/fit/thermal/vibration note as applicable.

## 5) Software - Firmware
First actions:
1. Confirm packet/loop/error behavior needed.
2. Implement minimal code change.
3. Run or describe one verification path.

Evidence:
- Log/output snippet.
- Before/after behavior summary.

## 6) Software - Ground Station
First actions:
1. Confirm telemetry field(s) or UI behavior to change.
2. Implement smallest dashboard/parser update.
3. Verify with sample packet or mock input.

Evidence:
- UI screenshot or parser output.
- Note on packet assumptions.

## 7) Business / Marketing
First actions:
1. Confirm exact artifact needed (sponsor email, proposal section, outreach list, budget update).
2. Draft one complete artifact.
3. Tie draft to acceptance criteria and deadline.

Evidence:
- Final draft content.
- Target list/date sent (if outreach task).

## 8) Docs
First actions:
1. Identify source-of-truth file(s).
2. Make one clarity-focused update.
3. Ensure links/paths are valid.

Evidence:
- Updated doc.
- One-line "what changed and why."

## PR Exit Checklist
- Linked issue with `Closes #...`
- Evidence included
- Scope stayed within subsystem
- Reviewer requested
