/*
  PERSONAL PORTFOLIO CONFIG
  Update these values before publishing. Keep the email blank until you are ready to show it.
*/
const PORTFOLIO_CONFIG = {
  name: 'Muhammad Yaseen',
  email: '', // Add your professional email, e.g. hello@example.com
  github: 'https://github.com/yaseenkhan9177',
  linkedin: '', // Add your LinkedIn profile URL if you use one
  location: 'Swat, Pakistan'
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Year in footer
$('#yearNow').textContent = new Date().getFullYear();

// Reveal items as they enter the viewport.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  $$('.reveal').forEach(el => revealObserver.observe(el));
} else {
  $$('.reveal').forEach(el => el.classList.add('is-visible'));
}

// Progress line, active section, and back-to-top affordance.
const progress = $('#scrollProgress');
const floatTop = $('#floatTop');
const navLinks = $$('.desktop-nav a');
const sections = ['about', 'work', 'stack', 'journey', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
let scrollTicking = false;
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  floatTop.classList.toggle('visible', window.scrollY > 650);
  let current = '';
  for (const section of sections) if (section.getBoundingClientRect().top <= 145) current = section.id;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollUI);
    scrollTicking = true;
  }
}, { passive: true });
updateScrollUI();
floatTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

// Accessible mobile navigation.
const mobileMenu = $('#mobileMenu');
const menuToggle = $('#menuToggle');
const menuClose = $('#menuClose');
function setMenu(open) {
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
  if (open) menuClose.focus(); else menuToggle.focus({ preventScroll: true });
}
menuToggle.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
menuClose.addEventListener('click', () => setMenu(false));
$$('.mobile-menu nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (mobileMenu.classList.contains('open')) setMenu(false);
    if ($('#caseModal').classList.contains('open')) closeModal();
    if (paletteOpen) closePalette();
  }
});

// Dark/light theme (saved only in the current browser, when storage is available).
const themeToggle = $('#themeToggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const light = theme === 'light';
  themeToggle.querySelector('.theme-icon').textContent = light ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', light ? '#f3f6fc' : '#070b14');
  try { localStorage.setItem('yaseen-portfolio-theme', theme); } catch (_) { /* storage may be disabled */ }
}
try {
  const savedTheme = localStorage.getItem('yaseen-portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
} catch (_) { /* privacy mode */ }
themeToggle.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

// Project filters.
const filterButtons = $$('.filter-button');
const projectCards = $$('.project-card');
const projectCount = $('#projectCount');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  const filter = button.dataset.filter;
  let visible = 0;
  projectCards.forEach(card => {
    const show = filter === 'all' || card.dataset.category.split(' ').includes(filter);
    card.hidden = !show;
    if (show) visible++;
  });
  projectCount.textContent = `${String(visible).padStart(2, '0')} ENTRIES`;
}));

// Project overview modal.
const caseData = {
  mart: {
    eyebrow: 'PROJECT_001 / FULL-STACK · POS',
    title: 'Vectabyte Mart',
    description: 'A retail operations platform designed around point-of-sale workflows, inventory, sales, and accounting. The emphasis is on making day-to-day store operations clearer and more connected.',
    details: [['ROLE', 'Developer / builder'], ['STACK', 'Laravel · PHP · MySQL'], ['FOCUS', 'Multi-tenant store workflows'], ['STATUS', 'Active build / iteration']],
    link: 'https://mart.vectabyte.net',
    linkText: 'Open project site'
  },
  mira: {
    eyebrow: 'PROJECT_002 / AI EXPERIMENT',
    title: 'Mira — Personal AI',
    description: 'A personal assistant experiment exploring a voice-and-text interface, helpful context, and a privacy-minded workflow. The goal is to learn by building rather than presenting a finished AI product before it is ready.',
    details: [['ROLE', 'Personal R&D project'], ['STACK', 'Python · AI tooling'], ['FOCUS', 'Assistant UX · context'], ['STATUS', 'In development']],
    link: 'https://github.com/yaseenkhan9177',
    linkText: 'View GitHub profile'
  },
  smartschool: {
    eyebrow: 'PROJECT_003 / EDTECH · WEB APP',
    title: 'SmartSchool SMS',
    description: 'A school-management project intended to organize school records and communication workflows. The project also explores practical constraints such as school-specific data and useful offline-friendly experiences.',
    details: [['ROLE', 'Web application development'], ['STACK', 'Laravel · PHP · MySQL'], ['FOCUS', 'School workflows · PWA'], ['SOURCE', 'Public GitHub repository']],
    link: 'https://github.com/yaseenkhan9177/smartschool-sms',
    linkText: 'Open source repository'
  },
  ownbus: {
    eyebrow: 'PROJECT_004 / TRANSPORT · SAAS',
    title: 'OwnBus',
    description: 'A transport-management platform concept for fleet and bus-operator workflows. It explores how a web application can bring operational tasks into a more organized workspace.',
    details: [['ROLE', 'Product / development'], ['STACK', 'Laravel · PHP · MySQL'], ['FOCUS', 'Fleet workflow management'], ['STATUS', 'Iterating']],
    link: 'https://transport.vectabyte.net',
    linkText: 'Open project site'
  }
};
const modal = $('#caseModal');
let previousFocus = null;
function openModal(key) {
  const data = caseData[key];
  if (!data) return;
  previousFocus = document.activeElement;
  $('#modalEyebrow').textContent = data.eyebrow;
  $('#modalTitle').textContent = data.title;
  $('#modalDescription').textContent = data.description;
  $('#modalDetails').replaceChildren(...data.details.map(([label, value]) => {
    const item = document.createElement('div');
    item.className = 'modal-detail';
    const small = document.createElement('small'); small.textContent = label;
    const strong = document.createElement('strong'); strong.textContent = value;
    item.append(small, strong);
    return item;
  }));
  const link = $('#modalLink'); link.href = data.link; link.textContent = `${data.linkText} ↗`;
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open'); $('#modalClose').focus();
}
function closeModal() {
  modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus({ preventScroll: true });
}
$$('[data-case]').forEach(button => button.addEventListener('click', event => { event.stopPropagation(); openModal(button.dataset.case); }));
$$('.project-card').forEach(card => {
  card.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target === card) {
      event.preventDefault(); openModal(card.dataset.project);
    }
  });
});
$('#modalClose').addEventListener('click', closeModal);
$('#modalDone').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });

// Contact helpers. Since this is a static site, no message is silently sent to a server.
let toastTimer;
function toast(message) {
  const node = $('#toast'); node.textContent = message; node.classList.add('show');
  window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => node.classList.remove('show'), 3400);
}
$('#copyProfile').addEventListener('click', async () => {
  const shareText = `${PORTFOLIO_CONFIG.name} — Software Engineering student, Laravel/PHP developer, and aspiring AI engineer. GitHub: ${PORTFOLIO_CONFIG.github}`;
  try {
    await navigator.clipboard.writeText(window.location.href.split('#')[0]);
    toast('Portfolio link copied. Share it with your network.');
  } catch (_) {
    try {
      const temp = document.createElement('textarea'); temp.value = window.location.href.split('#')[0]; temp.style.position = 'fixed'; temp.style.opacity = '0'; document.body.append(temp); temp.select();
      const ok = document.execCommand('copy'); temp.remove();
      toast(ok ? 'Portfolio link copied. Share it with your network.' : shareText);
    } catch (__) { toast(shareText); }
  }
});
function updateEmailLinks() {
  const emailCta = $('#emailCta');
  if (PORTFOLIO_CONFIG.email.trim()) {
    emailCta.href = `mailto:${PORTFOLIO_CONFIG.email}?subject=${encodeURIComponent("Let's build something together")}`;
  } else {
    emailCta.href = '#contact';
    emailCta.addEventListener('click', event => {
      event.preventDefault();
      const draft = `Hello Muhammad,\n\nI came across your portfolio and would like to connect about an opportunity/project.\n\nBest regards,`;
      const mailto = `mailto:?subject=${encodeURIComponent('Portfolio contact — Muhammad Yaseen')}&body=${encodeURIComponent(draft)}`;
      toast('Your email app will open with a draft. Add your own recipient address.');
      window.location.href = mailto;
    });
  }
}
updateEmailLinks();

// Gentle 3D tilt on the hero core and project cards, disabled for touch or reduced motion.
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canHover && !reduceMotion) {
  const tiltItems = $$('.project-card, .core-card');
  tiltItems.forEach(item => {
    item.addEventListener('pointermove', event => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      item.style.transform = `perspective(900px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-2px)`;
    });
    item.addEventListener('pointerleave', () => { item.style.transform = ''; });
  });
}

// Cursor spotlight.
const cursorGlow = $('#cursorGlow');
if (canHover && !reduceMotion) {
  let cursorFrame = 0;
  window.addEventListener('pointermove', event => {
    if (cursorFrame) return;
    cursorFrame = window.requestAnimationFrame(() => {
      cursorGlow.style.transform = `translate(${event.clientX - 190}px,${event.clientY - 190}px)`;
      cursorFrame = 0;
    });
  }, { passive: true });
}

// Lightweight ambient particle network. Respects reduced-motion and saves work on small screens.
(function initParticleField() {
  const canvas = $('#particleCanvas');
  if (!canvas || reduceMotion) return;
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return;
  let width = 0, height = 0, particles = [], frame = 0;
  const pointer = { x: -1000, y: -1000 };
  const isSmall = () => window.innerWidth < 650;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(isSmall() ? 28 : 58, Math.floor((width * height) / (isSmall() ? 25000 : 21000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
      r: Math.random() * 1.25 + .35, phase: Math.random() * Math.PI * 2
    }));
  }
  function draw() {
    context.clearRect(0, 0, width, height);
    const light = document.documentElement.dataset.theme === 'light';
    const baseColor = light ? '64,116,175' : '103,190,231';
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.phase += .012;
      if (p.x < -10) p.x = width + 10; else if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10; else if (p.y > height + 10) p.y = -10;
      const dx = pointer.x - p.x, dy = pointer.y - p.y;
      const distPointer = Math.hypot(dx, dy);
      if (distPointer < 120 && distPointer > 0) { p.x -= dx / distPointer * .1; p.y -= dy / distPointer * .1; }
      context.beginPath(); context.arc(p.x, p.y, p.r + Math.sin(p.phase) * .25, 0, Math.PI * 2);
      context.fillStyle = `rgba(${baseColor},${light ? .36 : .55})`; context.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j], dx2 = p.x - q.x, dy2 = p.y - q.y, distance = Math.hypot(dx2, dy2);
        const maxDistance = isSmall() ? 85 : 115;
        if (distance < maxDistance) {
          context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(q.x, q.y);
          context.strokeStyle = `rgba(${baseColor},${(1 - distance / maxDistance) * (light ? .11 : .17)})`;
          context.lineWidth = .6; context.stroke();
        }
      }
    }
    frame = window.requestAnimationFrame(draw);
  }
  window.addEventListener('pointermove', event => { pointer.x = event.clientX; pointer.y = event.clientY; }, { passive: true });
  window.addEventListener('pointerleave', () => { pointer.x = -1000; pointer.y = -1000; });
  window.addEventListener('resize', resize, { passive: true });
  resize(); draw();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
    else if (!document.hidden && !frame) draw();
  });
})();

// Keyboard-accessible quick navigation: press Ctrl/Cmd + K.
let paletteOpen = false;
const palette = document.createElement('div');
palette.className = 'modal-backdrop'; palette.id = 'commandPalette'; palette.setAttribute('role', 'dialog'); palette.setAttribute('aria-modal', 'true'); palette.setAttribute('aria-label', 'Quick navigation'); palette.setAttribute('aria-hidden', 'true');
palette.innerHTML = `<div class="case-modal palette-modal"><button class="modal-close icon-button" type="button" aria-label="Close quick navigation">×</button><p class="section-label mono">QUICK NAVIGATION / ⌘ K</p><h2>Where to next?</h2><label for="paletteSearch" class="palette-label">Search a section or action</label><input id="paletteSearch" type="search" placeholder="Try “projects”, “skills”, “resume”…" autocomplete="off"><div class="palette-results" id="paletteResults"></div><p class="palette-hint mono">↑ ↓ TO MOVE · ENTER TO OPEN · ESC TO CLOSE</p></div>`;
document.body.append(palette);
const paletteCloseButton = $('.modal-close', palette);
const paletteSearch = $('#paletteSearch', palette);
const paletteResults = $('#paletteResults', palette);
const paletteItems = [
  { name: 'Home', detail: 'Back to the top', url: '#home', keys: 'home top start' },
  { name: 'About me', detail: 'Background and education', url: '#about', keys: 'about education profile' },
  { name: 'Projects', detail: 'Selected web and AI work', url: '#work', keys: 'projects work portfolio' },
  { name: 'Toolkit', detail: 'Technologies and skills', url: '#stack', keys: 'skills stack technology' },
  { name: 'Journey', detail: 'Learning and direction', url: '#journey', keys: 'journey timeline experience' },
  { name: 'Contact', detail: 'Start a conversation', url: '#contact', keys: 'contact email collaboration' },
  { name: 'Résumé', detail: 'Open printable résumé', url: 'resume.html', keys: 'resume cv pdf' },
  { name: 'GitHub', detail: 'Source code and experiments', url: PORTFOLIO_CONFIG.github, keys: 'code github repository' }
];
let filteredPaletteItems = paletteItems;
let paletteFocusIndex = 0;
function renderPaletteResults() {
  const query = paletteSearch.value.trim().toLowerCase();
  filteredPaletteItems = paletteItems.filter(item => `${item.name} ${item.detail} ${item.keys}`.toLowerCase().includes(query));
  paletteFocusIndex = Math.min(paletteFocusIndex, Math.max(0, filteredPaletteItems.length - 1));
  paletteResults.replaceChildren();
  if (!filteredPaletteItems.length) {
    const empty = document.createElement('p'); empty.className = 'palette-empty'; empty.textContent = 'No matching sections. Try another keyword.'; paletteResults.append(empty); return;
  }
  filteredPaletteItems.forEach((item, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = `palette-result${index === paletteFocusIndex ? ' selected' : ''}`;
    const copy = document.createElement('span'); copy.className = 'palette-result-copy';
    const strong = document.createElement('strong'); strong.textContent = item.name;
    const detail = document.createElement('small'); detail.textContent = item.detail;
    copy.append(strong, detail);
    const icon = document.createElement('span'); icon.className = 'palette-result-icon'; icon.textContent = item.url.startsWith('#') ? '↘' : '↗';
    button.append(copy, icon);
    button.addEventListener('mouseenter', () => { paletteFocusIndex = index; renderPaletteResults(); });
    button.addEventListener('click', () => navigatePaletteItem(item));
    paletteResults.append(button);
  });
}
function navigatePaletteItem(item) {
  closePalette();
  if (item.url.startsWith('#')) document.querySelector(item.url)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  else window.open(item.url, '_blank', 'noopener,noreferrer');
}
function openPalette() {
  if (mobileMenu.classList.contains('open') || modal.classList.contains('open')) return;
  paletteOpen = true; palette.classList.add('open'); palette.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open');
  paletteSearch.value = ''; paletteFocusIndex = 0; renderPaletteResults(); paletteSearch.focus();
}
function closePalette() {
  paletteOpen = false; palette.classList.remove('open'); palette.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open');
}
paletteCloseButton.addEventListener('click', closePalette);
palette.addEventListener('click', event => { if (event.target === palette) closePalette(); });
paletteSearch.addEventListener('input', () => { paletteFocusIndex = 0; renderPaletteResults(); });
paletteSearch.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown') { event.preventDefault(); paletteFocusIndex = (paletteFocusIndex + 1) % filteredPaletteItems.length; renderPaletteResults(); }
  if (event.key === 'ArrowUp') { event.preventDefault(); paletteFocusIndex = (paletteFocusIndex - 1 + filteredPaletteItems.length) % filteredPaletteItems.length; renderPaletteResults(); }
  if (event.key === 'Enter' && filteredPaletteItems[paletteFocusIndex]) { event.preventDefault(); navigatePaletteItem(filteredPaletteItems[paletteFocusIndex]); }
});
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); paletteOpen ? closePalette() : openPalette(); }
});
