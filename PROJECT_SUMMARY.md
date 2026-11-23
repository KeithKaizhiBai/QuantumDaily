# QuantumDaily current state

Updated 2026-11-23 (Asia/Shanghai).

## Scope and schedule

Every-other-day briefs and Monday weeklies start at 09:15 Beijing time. Both follow [project rules](AGENTS.md), the [fixed source watchlist](README.md#source-watchlist) and independent windows. Both active prompts and bilingual project rules match the requested roster. QFI, PennyLane and PyTorch have no independent tracking requirement.

## Current issues

- [Week 006](reports/2026/2026-11-23_weekly-report.md) covers November 16–22; research cutoff 2026-11-23T09:26:34+08:00. Focus: the four-qubit magic-square benchmark, classical preprocessing and separate system-time metrics. Generated, saved to GitHub and verified online.
- [Brief 015](reports/2026/2026-11-21_every-other-day-brief.md) is saved and online. Its successful cutoff remains 2026-11-21T17:23:03+08:00. The November 23 brief continues from that cutoff and must be processed separately.
- Next weekly is November 30, covering November 23–29.
- October 27 draft source and local HTML remain recovery files only.

## Validation

Independent scientific and reader reviews approved the same final weekly source, including the removal of defensive prose. The four-qubit NumPy check verified 4,096 classical strategies, nine quantum probability distributions, measurement-basis gates and resource counts. SDK, finite-shot, noise and QPU experiments remain planned.

The existing builder generated 21 issues and checked 335 internal links/fragments. All 20 prior article pages and shared assets are unchanged. [Release fd88abbd586b](https://github.com/KeithKaizhiBai/QuantumDaily/commit/fd88abbd586ba1a4045bfa060f8e936e0bcbee4d) passed exact text and blob readback for all six paths. [Pages run 45095155329](https://github.com/KeithKaizhiBai/QuantumDaily/actions/runs/45095155329) succeeded. The public article and homepage returned HTTP 200, with matching source fingerprint, 17 source URLs, two tables and 21 archive entries. See [TASK_LOG.md](TASK_LOG.md) for evidence. No website code changed.
