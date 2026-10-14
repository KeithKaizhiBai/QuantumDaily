# QuantumDaily

Personal quantum computing briefs for a quantum algorithm engineer working on simulation and implementation on quantum hardware.

The algorithm scope is general. Engineering analysis focuses on PennyLane and PyTorch, with additional coverage of field trends and publicly documented personnel and team changes. Report bodies are in Simplified Chinese unless another language is requested.

Reading website: [QuantumDaily](https://keithkaizhibai.github.io/QuantumDaily/).

## Online archive

Repository: [KeithKaizhiBai/QuantumDaily](https://github.com/KeithKaizhiBai/QuantumDaily)

Every completed brief or weekly report must have a Markdown source and a corresponding HTML reading page in this repository. Generate the website, upload both formats and the updated archive index, and verify the saved files and deployed page before reporting completion.

Use the issue publication date in the Asia/Shanghai timezone for the filename. Record the coverage window and research cutoff inside each report.

- Every-other-day brief: `reports/YYYY/YYYY-MM-DD_every-other-day-brief.md`
- Weekly report: `reports/YYYY/YYYY-MM-DD_weekly-report.md`

Each report's webpage keeps the same English date/type basename:

- Every-other-day brief: `docs/reports/YYYY/YYYY-MM-DD_every-other-day-brief.html`
- Weekly report: `docs/reports/YYYY/YYYY-MM-DD_weekly-report.html`

On the website, omit the `docs/` prefix. For example, the first sample is available at [2026-10-14_every-other-day-brief.html](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-10-14_every-other-day-brief.html).

Use lowercase English names with an ISO date. English naming does not require translating the report body. The filename date is the issue date, not a source article's date or the date the archive upload occurred.

Check for an existing file before writing. Skip an identical copy. Inspect differences before revising an existing issue, preserve its Git history, and do not silently overwrite a user-approved deliverable.

## Editorial scope

Classify contributions along academia/industry and science/engineering axes, allowing overlapping labels. Prioritize algorithm understanding, classical simulation and quantum hardware implementation. Preserve coverage of broader developments and publicly documented personnel changes without filling quotas.

Follow original papers, official software documentation and releases, university/laboratory announcements, and company announcements. Use QFI and other aggregators to discover leads and trace their original sources.

Each issue should distinguish publication from event dates, preprints from reviewed publications, simulations from hardware experiments, and sourced facts from engineering assessments or trend hypotheses. State material source-coverage gaps and the actual reproduction status. Do not run paid hardware jobs or large computations merely to prepare a report.

## Reports

| Issue date | Type | Status | Markdown source | Webpage |
| --- | --- | --- | --- | --- |
| 2026-10-14 | Every-other-day brief | Sample | [Source](reports/2026/2026-10-14_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-10-14_every-other-day-brief.html) |

## Website maintenance

Markdown remains the sole report source. Do not maintain a separately edited HTML draft. `tools/build-site.mjs` regenerates the homepage and every dated reading page from `reports/`. Shared styles and interactions are in `docs/assets/site.css` and `docs/assets/site.js`.

The visual direction is black and deep blue, with blue/cyan accents and restrained purple highlights. Preserve readable Chinese typography, mobile layouts, source links, sample/status labels and coverage notes. The site includes an archive search, report-type filters and article navigation. Do not add fictional reports to fill an empty category.

With Node.js 20 or later:

```sh
npm ci
npm run build
```

Retain each report's `issue_date`, `report_type`, `status`, `timezone`, `coverage_start`, `coverage_end` and `research_cutoff` metadata. Use `every-other-day-brief` or `weekly-report` for `report_type`. The builder accepts the archive's standalone bold section headings and standard Markdown headings, and preserves fenced code blocks. Relative links to existing report Markdown files are converted to their corresponding reading pages.

Commit the generated `docs/` pages together with their Markdown sources and the updated index. GitHub Pages publishes from the `main` branch's `/docs` directory. Check a representative desktop and mobile reading view, filtering/search, source-link preservation and browser errors when website code changes.

## Project state

Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for the active files, confirmed decisions, validation status and next steps. Historical milestones are recorded in [TASK_LOG.md](TASK_LOG.md).

The reporting cadence is every-other-day briefs plus weekly reports. No recurring execution schedule has been configured yet.
