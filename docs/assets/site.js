const filterButtons = [...document.querySelectorAll('[data-filter]')];
const reportRows = [...document.querySelectorAll('[data-report]')];
const search = document.querySelector('#archive-search');
let selectedType = 'all';

function updateArchive() {
  const query = (search?.value ?? '').trim().toLocaleLowerCase();
  let count = 0;
  for (const row of reportRows) {
    const typeMatches = selectedType === 'all' || row.dataset.type === selectedType;
    const queryMatches = (row.dataset.search ?? '').includes(query);
    row.hidden = !(typeMatches && queryMatches);
    if (!row.hidden) count += 1;
  }
  const empty = document.querySelector('#archive-empty');
  if (empty) empty.hidden = count !== 0;
  const status = document.querySelector('#archive-status');
  if (status) status.textContent = `${count} 期`;
}

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    selectedType = button.dataset.filter;
    for (const sibling of filterButtons) {
      sibling.setAttribute('aria-pressed', String(sibling === button));
    }
    updateArchive();
  });
}
search?.addEventListener('input', updateArchive);
document.querySelector('#archive-search-form')?.addEventListener('submit', (event) => event.preventDefault());
document.documentElement.classList.add('js-ready');

const progress = document.querySelector('#reading-progress');
const outlineDetails = document.querySelector('.outline details');
if (outlineDetails && window.matchMedia('(max-width:720px)').matches) outlineDetails.open = false;
if (progress) {
  let pending = false;
  const updateProgress = () => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const percent = distance > 0 ? Math.max(0, Math.min(100, window.scrollY / distance * 100)) : 100;
    progress.style.width = `${percent}%`;
    progress.setAttribute('aria-valuenow', String(Math.round(percent)));
    pending = false;
  };
  window.addEventListener('scroll', () => {
    if (!pending) {
      pending = true;
      window.requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

if ('IntersectionObserver' in window) {
  const outlineLinks = [...document.querySelectorAll('.outline a')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of outlineLinks) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('.article-body h2[id]').forEach((heading) => observer.observe(heading));
}
