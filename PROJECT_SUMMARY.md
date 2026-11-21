# QuantumDaily current state

Updated 2026-11-21 (Asia/Shanghai).

## Scope and schedule

The every-other-day brief and Monday weekly start at 09:15 Beijing time. Both use the [project rules](AGENTS.md), [fixed source watchlist](README.md#source-watchlist) and independent reporting windows. The bilingual project rules and both active automation prompts were checked against the requested institutional roster. QFI, PennyLane and PyTorch have no independent tracking requirement.

## Current issues

- [Brief 015](reports/2026/2026-11-21_every-other-day-brief.md) covers November 19 17:19:24 to 2026-11-21T17:23:03+08:00. Focus: minimum finding with uncertain numerical estimates; classical ground-state methods, a hardware game benchmark, decoder timing and hybrid-job scheduling. Generated, saved to GitHub and verified online.
- [Week 005](reports/2026/2026-11-16_weekly-report.md) covers November 9–15. Initial cutoff November 16 09:27:40, revision cutoff 11:55:24. The November 23 weekly will cover November 16–22, separately from the brief.
- Next brief is November 23. Continue from brief 015's successful cutoff, 2026-11-21T17:23:03+08:00; process the brief and weekly sequentially.
- The October 27 draft source and local HTML are recovery files only.

## Validation

Checked source versions, comparison conditions and complete prose. The seven-qubit teaching estimator passed an independent NumPy matrix check, including each label's encoding and accuracy, threshold probabilities, unitarity and inverse restoration. Full minimum finding, finite-shot sampling and hardware execution remain planned. See [TASK_LOG.md](TASK_LOG.md) for coverage and evidence.

[Release 38b476e64678](https://github.com/KeithKaizhiBai/QuantumDaily/commit/38b476e64678b280cd796b3c9909721fa85d78f0) passed exact text and blob readback for all six files. [Pages run 44889846896](https://github.com/KeithKaizhiBai/QuantumDaily/actions/runs/44889846896) succeeded. The public article and homepage returned HTTP 200 with the matching source fingerprint and 20 archive entries. The build validated 381 internal links/fragments and preserved all 19 prior article pages and shared assets. No website code changed.
