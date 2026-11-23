# QuantumDaily current state

Updated 2026-11-23 (Asia/Shanghai).

## Scope and schedule

Every-other-day briefs and Monday weeklies start at 09:15 Beijing time. Both follow [project rules](AGENTS.md), the [fixed source watchlist](README.md#source-watchlist) and independent windows. Both active prompts and bilingual project rules match the requested roster. QFI, PennyLane and PyTorch have no independent tracking requirement.

## Current issues

- [Brief 016](reports/2026/2026-11-23_every-other-day-brief.md) continues from the November 21 17:23:03 cutoff through 2026-11-23T17:22:13+08:00. Focus: Pauli randomization and coherent error accumulation, with Dicke preparation, Trotter formulas and QPU selection. Generated locally; GitHub save and live deployment verification pending.
- [Week 006](reports/2026/2026-11-23_weekly-report.md) covers November 16–22; research cutoff 2026-11-23T09:26:34+08:00. Generated, saved to GitHub and verified online. Its source and reading page are preserved.
- Next brief is November 25; after successful publication it continues from brief 016's cutoff. Next weekly is November 30, covering November 23–29.
- October 27 draft source and local HTML remain recovery files only.

## Validation

Independent scientific and fresh-context reader reviews approved the same final brief source, including removal of redundant defensive prose. Source SHA-256: 76f0cf010a37c8c4f2cdae3847bdc41632105452d4ffac8711a5237925b2cc54. NumPy 2.3.5 checked all 16 Pauli corrections, exhaustive sign patterns at 4/8/12 layers, exact infidelity formulas and one seeded circuit. SDK compilation, finite-shot/device-noise-model simulation and QPU experiments remain planned.

The existing builder generated 22 issues and preserved all 21 prior reading pages and shared assets. See [TASK_LOG.md](TASK_LOG.md) for source coverage, checks and publication recovery. No website code changed.
