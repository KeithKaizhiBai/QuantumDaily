# QuantumDaily

Personal quantum computing briefs for a quantum algorithm engineer working on simulation and implementation on quantum hardware.

The algorithm scope is general. Engineering analysis covers simulation, measurement costs and hardware execution, alongside field trends and publicly documented personnel and team changes. Report bodies are in Simplified Chinese unless another language is requested.

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

Use the fixed source watchlist below. Follow technical claims to original results, and personnel changes to dated appointments, official rosters or filings.

Each issue should distinguish publication from event dates, preprints from reviewed publications, simulations from hardware experiments, and sourced facts from engineering assessments or trend hypotheses. State material source-coverage gaps and the actual reproduction status. Do not run paid hardware jobs or large computations merely to prepare a report.

## Source watchlist

Both scheduled reports check the following sources every run. Use the official news or laboratory page and a dated search of the institution's domain or affiliated authors' papers. Include only items supported by primary evidence in the reporting window. Describe a material access or indexing gap in the issue.

| Beat | Primary sources |
| --- | --- |
| Research papers | [arXiv quant-ph](https://arxiv.org/list/quant-ph/recent) and [Quantum, published papers](https://quantum-journal.org/papers/). Check submission history, formal publication and the underlying evidence. |
| Mainland universities | [USTC](https://news.ustc.edu.cn/), [Tsinghua](https://www.tsinghua.edu.cn/), [Peking University](https://icqm.pku.edu.cn/), [Fudan University](https://phys.fudan.edu.cn/). |
| Hong Kong and the Greater Bay Area | [University of Hong Kong](https://www.scifac.hku.hk/), with regional coverage across Guangdong, Hong Kong and Macao. Start with [Southern University of Science and Technology, Shenzhen](https://www.sustech.edu.cn/), [Sun Yat-sen University, Guangzhou](https://www.sysu.edu.cn/), [HKUST](https://hkust.edu.hk/), and the [University of Macau](https://www.um.edu.mo/). Follow relevant local labs, companies and professional societies. |
| Overseas universities | [Caltech](https://www.caltech.edu/about/news), [Harvard Quantum Initiative](https://quantum.harvard.edu/news), [MIT](https://news.mit.edu/topic/quantum-computing), [Princeton Quantum Initiative](https://quantum.princeton.edu/news), [ETH Zürich](https://qc.ethz.ch/news-events.html), and [TU Delft / QuTech](https://qutech.nl/newsroom/news/). |
| Quantum companies | [IBM Quantum](https://www.ibm.com/quantum/blog), [Google Quantum AI](https://quantumai.google/research), [Quantinuum](https://ir.quantinuum.com/news-events/press-releases), [IonQ](https://www.ionq.com/news), [QuEra](https://www.quera.com/news), [Pasqal](https://www.pasqal.com/newsroom/), [Horizon Quantum](https://www.horizonquantum.com/resources/newsroom), and [Xanadu](https://www.xanadu.ai/press). Follow Xanadu's company, research and hardware news. |
| Other established institutional sources | [University of Chicago PME](https://pme.uchicago.edu/), [Oak Ridge National Laboratory](https://www.ornl.gov/news/), [IQM](https://iqm.tech/), [NVIDIA](https://nvidianews.nvidia.com/) and [Qedma](https://www.qedma.com/). |
| Verification for individual stories | Authors' publications, repositories and data; official platform documentation for reported experiments; institutional directories and dated appointments; [SEC EDGAR](https://www.sec.gov/search-filings) for relevant corporate filings. |

## Writing standard

The project [AGENTS.md](AGENTS.md) defines the editorial standard for both report types, with a [Chinese companion](AGENTS.zh-CN.md). Write in natural Simplified Chinese. Lead with a concrete result, explain the mechanism, and state the measurement, comparison and resource conditions where they affect interpretation. For instance, name the loss threshold and the eight-qubit run when comparing training submissions. Remove imagined objections and repeated caveats during the full-issue edit. Keep genuine scientific conditions and unresolved discrepancies.

Describe a small, checkable reproduction route in terms of the chosen method, inputs, outputs, reference answer and hardware requirements. Document the specific toolchain when the result depends on it. Verify source links and public dates before building, then inspect the article title, emphasis, formulas, tables and homepage excerpt.

## Reports

| Issue date | Type | Status | Markdown source | Webpage |
| --- | --- | --- | --- | --- |
| 2026-11-16 | Weekly report | Published | [Source](reports/2026/2026-11-16_weekly-report.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-11-16_weekly-report.html) |
| 2026-11-15 | Every-other-day brief | Published | [Source](reports/2026/2026-11-15_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-11-15_every-other-day-brief.html) |
| 2026-11-13 | Weekly report | Published | [Source](reports/2026/2026-11-13_weekly-report.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-11-13_weekly-report.html) |
| 2026-11-13 | Every-other-day brief | Published | [Source](reports/2026/2026-11-13_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-11-13_every-other-day-brief.html) |
| 2026-11-06 | Every-other-day brief | Published | [Source](reports/2026/2026-11-06_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-11-06_every-other-day-brief.html) |
| 2026-11-04 | Every-other-day brief | Published | [Source](reports/2026/2026-11-04_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-11-04_every-other-day-brief.html) |
| 2026-11-02 | Weekly report | Published | [Source](reports/2026/2026-11-02_weekly-report.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-11-02_weekly-report.html) |
| 2026-11-02 | Every-other-day brief | Published | [Source](reports/2026/2026-11-02_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-11-02_every-other-day-brief.html) |
| 2026-10-30 | Every-other-day brief | Published | [Source](reports/2026/2026-10-30_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-10-30_every-other-day-brief.html) |
| 2026-10-26 | Weekly report | Published | [Source](reports/2026/2026-10-26_weekly-report.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-10-26_weekly-report.html) |
| 2026-10-25 | Every-other-day brief | Published | [Source](reports/2026/2026-10-25_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-10-25_every-other-day-brief.html) |
| 2026-10-23 | Every-other-day brief | Published | [Source](reports/2026/2026-10-23_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-10-23_every-other-day-brief.html) |
| 2026-10-21 | Every-other-day brief | Published | [Source](reports/2026/2026-10-21_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-10-21_every-other-day-brief.html) |
| 2026-10-19 | Weekly report | Published | [Source](reports/2026/2026-10-19_weekly-report.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-10-19_weekly-report.html) |
| 2026-10-19 | Every-other-day brief | Published | [Source](reports/2026/2026-10-19_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-10-19_every-other-day-brief.html) |
| 2026-10-16 | Every-other-day brief | Published | [Source](reports/2026/2026-10-16_every-other-day-brief.md) | [Read online](https://keithkaizhibai.github.io/QuantumDaily/reports/2026/2026-10-16_every-other-day-brief.html) |
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

## Automatic publication

On 2026-10-14, the user authorized recurring report generation and automatic commits/publication to this repository's `main` branch. Two active scheduled tasks return to the existing Codex chat and use the same project files:

| Report | Start time (Asia/Shanghai) | First automatic issue | Coverage |
| --- | --- | --- | --- |
| Every-other-day brief | Every two days at 09:15 | 2026-10-16 | New material since the previous brief's research cutoff |
| Weekly report | Monday at 09:15 | 2026-10-19 | The previous Monday through Sunday |

09:15 is the start of research and generation; publication follows successful checks. Weekly reports synthesize themes and changes across the week, verify original sources and add an actionable learning/implementation plan. They must not merely concatenate the briefs. Both report types retain personnel/team coverage when supported by public evidence.

For every scheduled run:

1. Read the accessible project rules, this README, PROJECT_SUMMARY.md and recent reports. Inspect the latest remote `main` and local edits. This workspace is a file mirror; use the GitHub connector rather than assuming a local checkout. Reconcile required remote inputs without overwriting user changes.
2. Search the entire Source watchlist for each report. Record material gaps, distinguish new evidence from earlier work, and assess simulation and hardware feasibility using the methods relevant to the result.
3. Create the dated Markdown report with its actual coverage and research cutoff. Complete the factual and full-prose editorial passes in "Writing standard" before generating HTML. Use `status: published` for a completed automatic issue. If the same date/type is already fully published, skip duplicate generation. Resume an incomplete upload or deployment before creating another copy.
4. Generate the matching HTML page and homepage with the existing builder. Update the README report table, PROJECT_SUMMARY.md and TASK_LOG.md. Preserve all historical issues and the existing website style. Check filenames, required metadata, source-link preservation and generated links. Prefer available project dependencies or the app's bundled Node runtime; `load_workspace_dependencies` can locate it without installing another runtime.
5. Publish only the task's Markdown, generated report page/homepage and related index/state/log changes, in one commit based on the latest remote tree. Recheck the branch before writing; update it with `expected_sha` and `force: false`. If it changed, reread and reconcile the relevant changes. Never force-push or stage unrelated edits.
6. Read back saved files, check GitHub Pages deployment, and open the online report and homepage to verify the new issue appears. Report the actual outcome with reading/source links. Keep a candidate and recovery details if any step fails; distinguish generated content, GitHub storage and live deployment.

When both tasks are due on the same Monday, process them sequentially in the same chat and recheck the repository before each publication. Both dated types must be retained; neither replaces the other.

The scheduler runs in the local Codex app. Keep the computer on, the app running and this project accessible at run time; it is separate from GitHub Pages, which hosts the generated website. See the [official scheduled-task documentation](https://learn.chatgpt.com/docs/automations?surface=app). Review the first unattended results and adjust the workflow if needed.
