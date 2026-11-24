const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// Menú móvil y navegación
const menuToggle = $('.menu-toggle');
const nav = $('.main-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
$$('.main-nav a').forEach(a => {
  if (a.dataset.page === document.body.dataset.page) a.classList.add('active');
  a.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// // Modo día/noche persistente en todas las páginas.
// const themeToggle = $('#theme-toggle');
// function applyTheme(theme) {
//   const dark = theme === 'dark';
//   document.body.dataset.theme = dark ? 'dark' : 'light';
//   if (!themeToggle) return;
//   themeToggle.setAttribute('aria-pressed', String(dark));
//   themeToggle.setAttribute('aria-label', dark ? 'Cambiar a modo día' : 'Cambiar a modo noche');
//   $('.theme-icon', themeToggle).textContent = dark ? '☀' : '☾';
//   $('.theme-label', themeToggle).textContent = dark ? 'Día' : 'Noche';
// }
// let savedTheme = 'light';
// try { savedTheme = localStorage.getItem('netalive-theme') || 'light'; } catch (_) {}
// applyTheme(savedTheme);
// themeToggle?.addEventListener('click', () => {
//   const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
//   applyTheme(next);
//   try { localStorage.setItem('netalive-theme', next); } catch (_) {}
// });

// const currentPage = document.body.dataset.page;
// if (currentPage) {
//   $$('.main-nav a[data-page]').forEach((link) => {
//     const isActive = link.dataset.page === currentPage;
//     link.classList.toggle('is-active', isActive);
//     if (isActive) {
//       link.setAttribute('aria-current', 'page');
//     } else {
//       link.removeAttribute('aria-current');
//     }
//   });
// }


// Modo día/noche
const themeToggle = $('#theme-toggle');
function applyTheme(theme) {
  const dark = theme === 'dark';
  document.body.dataset.theme = dark ? 'dark' : 'light';

  // Cambiar automáticamente los logotipos.
  $$('[data-logo-light][data-logo-dark]').forEach((logo) => {
    const lightLogo = logo.dataset.logoLight;
    const darkLogo = logo.dataset.logoDark;
    logo.src = dark ? darkLogo : lightLogo;
  });

  // Actualizar botón de tema.
  if (!themeToggle) return;
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute(
    'aria-label',
    dark ? 'Cambiar a modo día' : 'Cambiar a modo noche'
  );
  $('.theme-icon', themeToggle).textContent = dark ? '☀' : '☾';
  $('.theme-label', themeToggle).textContent = dark ? 'Día' : 'Noche';
}

// Recuperar tema guardado.
let savedTheme = 'light';
try {
  savedTheme = localStorage.getItem('netalive-theme') || 'light';
} catch (_) {}
applyTheme(savedTheme);

// Cambiar tema al pulsar el botón.
themeToggle?.addEventListener('click', () => {
  const next = document.body.dataset.theme === 'dark'
    ? 'light'
    : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem('netalive-theme', next);
  } catch (_) {}
});

// Marcar página activa en la navegación.
const currentPage = document.body.dataset.page;
if (currentPage) {
  $$('.main-nav a[data-page]').forEach((link) => {
    const isActive = link.dataset.page === currentPage;
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// Efectos de aparición al desplazarse.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold:.12});
  $$('.reveal').forEach(el => observer.observe(el));
} else $$('.reveal').forEach(el => el.classList.add('visible'));
$$('.year').forEach(el => el.textContent = new Date().getFullYear());

// Banner de inicio con rotación de imágenes.
const slides = $$('.hero-slide');
if (slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let active = 0;
  setInterval(() => {
    slides[active].classList.remove('active');
    active = (active + 1) % slides.length;
    slides[active].classList.add('active');
  }, 3800);
}

// Ventanas modales: las tarjetas y botones abren contenido al tocarse.
const modal = $('#info-modal');
function openModal(title, message) {
  if (!modal) return;
  $('#modal-title').textContent = title || 'Más información';
  $('#modal-text').textContent = message || '';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}
function closeModal() {
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden','true');
}
$$('[data-modal-title]').forEach(el => el.addEventListener('click', () =>
  openModal(el.dataset.modalTitle, el.dataset.modalText)));
$('#modal-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Pestañas de sectores.
const sectorContent = {
  salud:{tag:'SECTOR SALUD',symbol:'✚',title:'Decisiones más oportunas, operaciones más eficientes.',description:'Modelos analíticos para segmentación, pronóstico de demanda, detección de anomalías y mejora de la calidad de datos.',points:['Segmentación de afiliaciones','Pronóstico de consultas y citas','Detección de anomalías','Células analíticas y calidad de datos']},
  hotelero:{tag:'SECTOR HOTELERO',symbol:'⌂',title:'Anticipar la demanda para optimizar cada habitación.',description:'Modelos predictivos que integran reservas, cancelaciones, anticipación de compra, estacionalidad, eventos y canales de venta.',points:['Forecast de ocupación','Pricing dinámico','Predicción de cancelaciones y no-show','Segmentación de clientes']},
  fintech:{tag:'SECTOR FINTECH',symbol:'₿',title:'Infraestructura segura, escalable y preparada para innovar.',description:'Arquitecturas de nube híbrida, microsegmentación, protección avanzada y modernización de aplicaciones financieras.',points:['VMware Cloud Foundation','Seguridad y cumplimiento','Modernización con Kubernetes','Alta disponibilidad y recuperación']},
  multindustria:{tag:'MULTINDUSTRIA',symbol:'⌘',title:'Tecnología modular que se adapta a tu operación.',description:'Integramos infraestructura, analítica, automatización y soluciones a la medida para necesidades específicas de negocio.',points:['Consultoría tecnológica','Integración de plataformas','Analítica y BI','Automatización de procesos']}
};
$$('.sector-tab').forEach(tab => tab.addEventListener('click', () => {
  $$('.sector-tab').forEach(item => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  const data = sectorContent[tab.dataset.sector];
  if (!data) return;
  $('#sector-tag').textContent = data.tag;
  $('#sector-symbol').textContent = data.symbol;
  $('#sector-title').textContent = data.title;
  $('#sector-description').textContent = data.description;
  $('#sector-points').replaceChildren(...data.points.map((point,i) => {
    const row = document.createElement('div');
    const label = document.createElement('b');
    label.textContent = point;
    row.append(`${String(i+1).padStart(2,'0')} `, label);
    return row;
  }));
}));

// Interactividad del emblema en el banner de Nosotros
const banner = $('.inner-banner');
const emblem = $('#banner-emblem');

if (banner && emblem && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  banner.addEventListener('mousemove', (e) => {
    const rect = banner.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    emblem.style.transform = `perspective(700px) rotateY(${relX * 18}deg) rotateX(${-relY * 18}deg) translate(${relX * 14}px, ${relY * 14}px)`;
  });

  banner.addEventListener('mouseleave', () => {
    emblem.style.transform = '';
  });

  const triggerPulse = () => {
    emblem.classList.remove('is-pulsing');
    void emblem.offsetWidth; // Reinicia la animación en clics seguidos
    emblem.classList.add('is-pulsing');
  };

  emblem.addEventListener('click', triggerPulse);
  emblem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerPulse();
    }
  });
}