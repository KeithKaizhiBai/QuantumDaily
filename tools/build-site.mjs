/** Build the online reading archive from reports/YYYY/*.md. Markdown is the sole report source. */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { Marked } = await import(pathToFileURL(require.resolve('marked')).href);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'docs');
const repository = 'https://github.com/KeithKaizhiBai/QuantumDaily';
const typeNames = { 'every-other-day-brief': '隔日简报', 'weekly-report': '周报' };
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const plain = (text) => text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*`#]/g, '').trim();

function reportFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes:true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? reportFiles(file) : entry.name.endsWith('.md') ? [file] : [];
  });
}

function loadReport(file) {
  const source = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing report metadata: ${file}`);
  const metadata = Object.fromEntries(match[1].split('\n').filter(Boolean).map((line) => {
    const index = line.indexOf(':');
    if (index < 1) throw new Error(`Invalid metadata in ${file}: ${line}`);
    const value = line.slice(index + 1).trim();
    return [line.slice(0, index).trim(), value.startsWith('"') ? JSON.parse(value) : value];
  }));
  if (!(metadata.report_type in typeNames)) throw new Error(`Unsupported report type: ${file}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.issue_date) || Number.isNaN(Date.parse(metadata.issue_date)) || new Date(metadata.issue_date).toISOString().slice(0,10) !== metadata.issue_date) throw new Error(`Invalid issue date: ${file}`);
  const expected = `${metadata.issue_date}_${metadata.report_type}.md`;
  if (path.basename(file) !== expected) throw new Error(`Filename must be ${expected}`);
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  if (relative !== `reports/${metadata.issue_date.slice(0, 4)}/${expected}`) throw new Error(`Unexpected report path: ${relative}`);
  const body = match[2].trim();
  const titleMatch = body.match(/^\*\*(.+?)\*\*\s*\n/);
  const title = titleMatch ? titleMatch[1] : `${metadata.issue_date} ${typeNames[metadata.report_type]}`;
  const readingBody = titleMatch ? body.slice(titleMatch[0].length).trim() : body;
  const blocks = readingBody.split(/\n\s*\n/);
  const focusIndex = blocks.findIndex((block) => /^\*\*本期优先关注：/.test(block));
  const focus = focusIndex >= 0 ? plain(blocks[focusIndex]).replace(/^本期优先关注：/, '') : plain(title);
  const summary = focusIndex >= 0 && blocks[focusIndex + 1] ? plain(blocks[focusIndex + 1]) : plain(blocks.find((block) => !block.startsWith('#') && !block.startsWith('**') && !block.startsWith('刊期')) ?? '');
  return { metadata, title, body:readingBody, focus, summary, source, relative, htmlPath:relative.replace(/\.md$/, '.html'), sourceHash:createHash('sha256').update(source).digest('hex') };
}

function outlineLabel(title) {
  if (title.startsWith('本期优先关注')) return '本期重点';
  const content = title.replace(/^\d+[．.)]\s*/, '');
  const short = content.split(/[：:]/)[0];
  return short.length > 25 ? `${short.slice(0, 24)}…` : short;
}

function renderReport(report) {
  const headings = [];
  const identifiers = new Set();
  const parser = new Marked({ gfm:true, breaks:false });
  parser.use({ renderer:{
    html({ text }) { return escape(text); },
    link({ href, title, tokens }) {
      if (/^(?!https?:)[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//')) throw new Error(`Unsupported link in ${report.relative}: ${href}`);
      const external = /^https?:\/\//i.test(href);
      if (!external && !href.startsWith('#')) {
        const [, linkPath, query = '', fragment = ''] = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
        const target = path.posix.normalize(path.posix.join(path.posix.dirname(report.relative), linkPath));
        if (target === '..' || target.startsWith('../')) throw new Error(`Link escapes the project: ${href}`);
        if (target.endsWith('.md')) {
          if (!fs.existsSync(path.join(root, target))) throw new Error(`Missing linked Markdown file: ${target}`);
          href = target.startsWith('reports/')
            ? `${path.posix.relative(path.posix.dirname(report.htmlPath), target.replace(/\.md$/, '.html'))}${query}${fragment}`
            : `${repository}/blob/main/${target}${query}${fragment}`;
        }
      }
      return `<a href="${escape(href)}"${title ? ` title="${escape(title)}"` : ''}${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${this.parser.parseInline(tokens)}</a>`;
    },
    heading({ tokens, depth, text }) {
      const level = Math.max(2, depth);
      const label = plain(text);
      const base = `section-${createHash('sha256').update(label).digest('hex').slice(0, 10)}`;
      let id = base;
      let number = 2;
      while (identifiers.has(id)) id = `${base}-${number++}`;
      identifiers.add(id);
      if (level === 2) headings.push({ id, label:outlineLabel(label) });
      const numbered = label.match(/^(\d+)[．.)]\s*([\s\S]+)$/);
      const content = numbered ? `<span class="section-index">${escape(numbered[1].padStart(2, '0'))}</span>${escape(numbered[2])}` : this.parser.parseInline(tokens);
      return `<h${level} id="${id}">${content}</h${level}>\n`;
    }
  }});
  // Convert only top-level bold paragraphs; code blocks and nested content remain intact.
  const tokens = parser.lexer(report.body, parser.defaults).map((token) => {
    if (token.type !== 'paragraph' || token.tokens?.length !== 1 || token.tokens[0].type !== 'strong') return token;
    const strong = token.tokens[0];
    return { type:'heading', depth:2, raw:token.raw, text:strong.text, tokens:strong.tokens };
  });
  return { html:parser.parser(tokens, parser.defaults), headings };
}

const logo = `<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><ellipse cx="20" cy="20" rx="17" ry="8" stroke="currentColor" stroke-width="1.2" transform="rotate(-35 20 20)"/><ellipse cx="20" cy="20" rx="17" ry="8" stroke="#b19afa" stroke-width="1.2" transform="rotate(35 20 20)"/><circle cx="20" cy="20" r="3" fill="currentColor"/><circle cx="32" cy="12" r="2.1" fill="#a4d8ff"/></svg>`;
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';

function header(prefix, isHome = false) {
  return `<a class="skip-link" href="#main">跳到正文</a><header class="site-header"><div class="wrap header-inner"><a class="brand" href="${prefix}index.html" aria-label="QuantumDaily 首页"><span class="brand-mark">${logo}</span><span>Quantum<span>Daily</span></span></a><nav class="site-nav" aria-label="主导航"><a href="${prefix}index.html#archive"${isHome ? ' aria-current="page"' : ''}>简报档案</a><a href="${prefix}index.html#about">关于</a><a class="nav-repo" href="${repository}" aria-label="GitHub 仓库" target="_blank" rel="noopener noreferrer"><span>GitHub</span>${arrow}</a></nav></div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="wrap footer-inner"><span class="mono">QUANTUMDAILY / ALGORITHMS · SIMULATION · HARDWARE</span><span>隔日简报与周报 · <a href="${repository}" target="_blank" rel="noopener noreferrer">查看原稿与来源 ↗</a></span></div></footer>`;
}

function document(title, description, prefix, contents, sourceHash = '') {
  return `<!doctype html>\n<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#070b14"><title>${escape(title)} · QuantumDaily</title><meta name="description" content="${escape(description)}">${sourceHash ? `<meta name="source-sha256" content="${sourceHash}">` : ''}<link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${prefix}assets/site.css"><script src="${prefix}assets/site.js" defer></script></head><body>${contents}</body></html>\n`;
}

function orbit() {
  return `<div class="orbit" aria-hidden="true"><svg viewBox="0 0 500 380" fill="none"><defs><linearGradient id="orbit-blue" x1="60" y1="90" x2="450" y2="300"><stop stop-color="#83c8ff"/><stop offset="1" stop-color="#3b5584"/></linearGradient><radialGradient id="orbit-glow"><stop stop-color="#65afff" stop-opacity=".3"/><stop offset="1" stop-color="#65afff" stop-opacity="0"/></radialGradient></defs><circle cx="255" cy="180" r="115" fill="url(#orbit-glow)"/><ellipse cx="255" cy="180" rx="179" ry="70" stroke="url(#orbit-blue)" stroke-width=".9" transform="rotate(-30 255 180)"/><ellipse cx="255" cy="180" rx="179" ry="70" stroke="#a287db" stroke-opacity=".65" stroke-width=".9" transform="rotate(36 255 180)"/><ellipse cx="255" cy="180" rx="145" ry="91" stroke="#5384b5" stroke-opacity=".6" stroke-width=".7" transform="rotate(88 255 180)"/><circle cx="255" cy="180" r="40" stroke="#648bb550"/><circle cx="255" cy="180" r="28" stroke="#8fcaff99"/><circle cx="255" cy="180" r="9" fill="#81bfff"/><circle cx="118" cy="218" r="4" fill="#a5d8ff"/><circle cx="390" cy="267" r="4" fill="#b8a0fa"/><circle cx="260" cy="38" r="3" fill="#81bfff"/><path d="M118 218H64M390 267h43M260 38V20" stroke="#426d99"/><text x="22" y="236" fill="#97b1d1" font-family="Consolas,monospace" font-size="9" letter-spacing="1.5">ALGORITHMS</text><text x="382" y="289" fill="#b1a1cd" font-family="Consolas,monospace" font-size="9" letter-spacing="1.5">HARDWARE</text><text x="213" y="14" fill="#97b1d1" font-family="Consolas,monospace" font-size="9" letter-spacing="1.5">SIMULATION</text><path d="M38 54h16m-8-8v16M449 322h14m-7-7v14" stroke="#52769880"/></svg><span class="orbit-note">EXPLORE / VERIFY / IMPLEMENT</span></div>`;
}

function homePage(reports) {
  const latest = reports[0];
  const briefCount = reports.filter((r) => r.metadata.report_type === 'every-other-day-brief').length;
  const weeklyCount = reports.length - briefCount;
  const [year, month, day] = latest.metadata.issue_date.split('-');
  const monthName = new Date(`${year}-${month}-01T00:00:00Z`).toLocaleString('en-US', { month:'short', timeZone:'UTC' }).toUpperCase();
  const status = latest.metadata.status === 'sample' ? '<span class="sample-badge">样稿</span>' : '';
  const rows = reports.map((r) => `<article class="report-row" data-report data-type="${escape(r.metadata.report_type)}" data-search="${escape(`${r.metadata.issue_date} ${r.title} ${plain(r.body)}`.toLocaleLowerCase())}"><div class="row-date mono"><time datetime="${r.metadata.issue_date}">${r.metadata.issue_date}</time><span class="type-label">${typeNames[r.metadata.report_type]}</span></div><div class="row-content"><h3><a href="${r.htmlPath}">${escape(r.focus)}</a></h3><p>${escape(r.summary.length > 115 ? `${r.summary.slice(0,115)}…` : r.summary)}</p></div><a class="row-action" href="${r.htmlPath}" aria-label="阅读 ${r.metadata.issue_date} ${typeNames[r.metadata.report_type]}">阅读${arrow}</a></article>`).join('\n');
  const html = `${header('', true)}<main id="main" class="wrap"><section class="hero" aria-labelledby="hero-title"><div><div class="eyebrow">QUANTUM COMPUTING INTELLIGENCE</div><h1 id="hero-title">量子计算，<span>持续观测。</span></h1><p class="hero-copy">连接算法进展、模拟实践与真实量子硬件。<br>为量子算法工程师筛选值得读、值得验证、值得实现的变化。</p><div class="axis-line"><span>学界 × 业界</span><span>科学 × 工程</span></div></div>${orbit()}</section><section class="issue-feature" aria-labelledby="latest-title"><div class="date-block"><span class="day">${day}</span><span class="month">${monthName} ${year}</span></div><div class="feature-copy"><div class="issue-labels"><span class="type-label">最新一期 / ${typeNames[latest.metadata.report_type]}</span>${status}</div><h2 id="latest-title">${escape(latest.focus)}</h2><p>${escape(latest.summary)}</p></div><div class="feature-actions"><a class="primary-link" href="${latest.htmlPath}">阅读本期<span class="arrow" aria-hidden="true">→</span></a><a class="secondary-link" href="${repository}/blob/main/${latest.relative}" target="_blank" rel="noopener noreferrer">Markdown 原稿 ↗</a></div></section><div class="coverage-strip"><span><i class="dot"></i><strong>PennyLane + PyTorch</strong> 实现视角</span><span>算法范围 <strong>通用</strong></span><span>内容窗口 <strong>${escape(latest.metadata.coverage_start)} — ${escape(latest.metadata.coverage_end)}</strong></span></div><section id="archive" class="archive" aria-labelledby="archive-title"><div class="section-heading"><div><div class="eyebrow">THE ARCHIVE</div><h2 id="archive-title">简报档案</h2></div><p id="archive-status" class="archive-count" aria-live="polite">${reports.length} 期</p></div><div class="archive-tools"><div class="filters" role="group" aria-label="按报刊类型筛选"><button type="button" data-filter="all" aria-pressed="true">全部 ${reports.length}</button><button type="button" data-filter="every-other-day-brief" aria-pressed="false">隔日简报 ${briefCount}</button><button type="button" data-filter="weekly-report" aria-pressed="false">周报 ${weeklyCount}</button></div><form id="archive-search-form" class="search" role="search"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor"/><path d="m13 13 4 4" stroke="currentColor"/></svg><input id="archive-search" type="search" aria-label="搜索简报" placeholder="搜索日期、主题或关键词" autocomplete="off"></form></div><div class="archive-list">${rows}<p id="archive-empty" class="archive-empty" hidden>暂无符合条件的报刊。<br>可以更换类型或搜索关键词。</p></div></section><section id="about" class="about" aria-labelledby="about-title"><div><h2 id="about-title">面向算法工程的观察</h2><div class="eyebrow">BUILT FOR PRACTICE</div></div><p>关注通用量子算法、经典模拟与真机实现，同时保留领域趋势和人物动向。每期结合 PennyLane 与 PyTorch 分析复现条件，区分论文结果、工程判断与尚待验证的观察。隔日简报追踪新增，周报比较进展。</p></section></main>${footer()}`;
  return document('量子计算观察站', '面向量子算法工程师的隔日简报与周报，关注通用算法、模拟、真机实现、领域趋势和人物动向。', '', html);
}

function reportPage(report) {
  const prefix = '../../';
  const { html, headings } = renderReport(report);
  const badge = report.metadata.status === 'sample' ? '<span class="sample-badge">样稿</span>' : '';
  const outline = headings.map((h) => `<li><a href="#${h.id}">${escape(h.label)}</a></li>`).join('');
  const content = `<div id="reading-progress" class="reading-progress" role="progressbar" aria-label="阅读进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>${header(prefix)}<main id="main" class="wrap"><header class="issue-top"><a class="back-link" href="${prefix}index.html#archive"><span aria-hidden="true">←</span>返回简报档案</a><div class="eyebrow">${report.metadata.report_type === 'weekly-report' ? 'WEEKLY REPORT' : 'EVERY OTHER DAY BRIEF'} / ${report.metadata.issue_date}</div><h1 class="issue-title">${escape(report.title)}</h1><div class="issue-toolbar">${badge}<span>内容窗口 ${escape(report.metadata.coverage_start)} — ${escape(report.metadata.coverage_end)}</span><span>PennyLane + PyTorch</span><a class="source-link" href="${repository}/blob/main/${report.relative}" target="_blank" rel="noopener noreferrer">Markdown 原稿 ${arrow}</a></div></header><div class="reading-layout"><article class="article-body">${html}</article><aside class="outline" aria-label="本期导航"><details open><summary>本期目录</summary><ol>${outline}</ol></details><p class="outline-note">从进展到实现<br>留意假设、证据与资源条件。</p></aside></div></main>${footer()}`;
  return document(report.title, report.summary, prefix, content, report.sourceHash);
}

const reports = reportFiles(path.join(root, 'reports')).map(loadReport).sort((a,b) => b.relative.localeCompare(a.relative));
if (!reports.length) throw new Error('No reports found');
for (const asset of ['site.css','site.js']) {
  if (!fs.existsSync(path.join(output, 'assets', asset))) throw new Error(`Missing asset: ${asset}`);
}
for (const report of reports) {
  const destination = path.join(output, report.htmlPath);
  fs.mkdirSync(path.dirname(destination), { recursive:true });
  fs.writeFileSync(destination, reportPage(report), 'utf8');
}
fs.writeFileSync(path.join(output, 'index.html'), homePage(reports), 'utf8');
fs.writeFileSync(path.join(output, '.nojekyll'), '', 'utf8');
fs.writeFileSync(path.join(output, 'assets', 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#070b14"/><g color="#74b7ff">${logo.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g></svg>`, 'utf8');
console.log(JSON.stringify({ reports:reports.length, output:'docs/', pages:['index.html', ...reports.map((r) => r.htmlPath)] }, null, 2));
