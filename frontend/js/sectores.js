const ICONS = {
  hospitalidad: 'M3 18h18M5 18a7 7 0 0 1 14 0M12 11V7.5M9.5 7.5h5',
  financiero: 'M3 3v18h18M7 15l4-4 3 3 5-6',
  construccion: 'M3 21V11l6 4v-4l6 4V5h6v16ZM7 21v-3M12 21v-3M17 21v-3',
  gobierno: 'M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2 10l10-6 10 6Z',
  salud: 'M3 12h4l2-5 4 10 2-5h6',
  telecom: 'M12 12v9M8 21h8M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 19.1a10 10 0 0 0 0-14.2',
};

const iconSvg = key =>
  `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[key]}"/></svg>`;

document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".sector-tab");
  const panel = document.querySelector("#sector-panel");
  if (!tabs.length || !panel) return;

  const visual = document.querySelector("#sector-visual");
  const symbol = document.querySelector("#sector-symbol");
  const visualCaption = document.querySelector("#sector-visual-caption");
  const kicker = document.querySelector("#sector-kicker");
  const title = document.querySelector("#sector-title");
  const description = document.querySelector("#sector-description");
  const services = document.querySelector("#sector-services");
  const brands = document.querySelector("#sector-brands");

  // Pestañas con el mismo icono vectorial del hero
  tabs.forEach(tab => {
    const slot = tab.querySelector(".sector-tab-icon");
    if (slot) slot.innerHTML = iconSvg(tab.dataset.sector);
  });

  const sectors = {

    hospitalidad: {
      kicker: "SECTOR / HOSPITALIDAD Y TURISMO",
      title: "Experiencias conectadas. Operaciones sin interrupciones.",
      description:
        "Soluciones tecnológicas que conectan la experiencia de los huéspedes con la operación eficiente de hoteles y resorts. Diseñamos, implementamos y operamos infraestructuras que acompañan cada estancia.",
      services: ["Conectividad y WiFi", "Infraestructura de red", "Comunicaciones unificadas", "Cómputo", "Soporte continuo"],
      brands: ["Grupo Presidente", "IHG", "Grupo Vidanta", "Hyatt", "Andaz", "Mondrian", "Sofitel", "Presidente"],
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85"
    },

    financiero: {
      kicker: "SECTOR / FINANCIERO Y FINTECH",
      title: "Seguridad, disponibilidad y evolución financiera.",
      description:
        "Arquitecturas tecnológicas diseñadas para entornos financieros que exigen seguridad, disponibilidad, agilidad y confianza. Integramos soluciones para banca, pagos digitales, insurtech e inversión.",
      services: ["Arquitecturas híbridas", "Alta disponibilidad", "Ciberseguridad", "Cumplimiento regulatorio", "Automatización"],
      brands: ["Banco Azteca", "Elektra", "Kovecta", "Parovi", "Fintech"],
      image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=1200&q=85"
    },

    construccion: {
      kicker: "SECTOR / CONSTRUCCIÓN, INMOBILIARIO E INDUSTRIA",
      title: "Infraestructura que construye posibilidades.",
      description:
        "Tecnología que acompaña el desarrollo de espacios, proyectos inmobiliarios e instalaciones industriales. Integramos redes, sistemas de seguridad, infraestructura física y automatización.",
      services: ["Cableado estructurado", "Infraestructura de red", "Seguridad física y electrónica", "Servidores y cómputo", "Automatización"],
      brands: ["Holcim", "Hogares Unión", "GIM Desarrollos", "Migdal Arquitectos", "SOMA", "Grupo Aflorida México", "Arkema", "Grupo Nach"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85"
    },

    gobierno: {
      kicker: "SECTOR / GOBIERNO",
      title: "Tecnología confiable para instituciones que conectan.",
      description:
        "Implementamos infraestructura tecnológica, redes y comunicaciones para organismos públicos, con atención a la continuidad operativa, la eficiencia y los requerimientos institucionales.",
      services: ["Infraestructura de red", "Comunicaciones unificadas", "Equipamiento tecnológico", "Instalación", "Soporte y continuidad"],
      brands: ["Poder Judicial del Estado de Guanajuato"],
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85"
    },

    salud: {
      kicker: "SECTOR / SALUD",
      title: "Tecnología que acompaña el cuidado y la operación.",
      description:
        "Soluciones tecnológicas para entornos médicos, farmacéuticos y de gestión de salud. Integramos infraestructura, comunicaciones y automatización para fortalecer los procesos y la continuidad operativa.",
      services: ["Comunicaciones unificadas", "Infraestructura física", "Infraestructura eléctrica", "Automatización RPA", "Gestión y operación"],
      brands: ["Grupo Diagnóstico Médico Proa"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85"
    },

    telecom: {
      kicker: "SECTOR / TELECOMUNICACIONES, CIBERSEGURIDAD Y MEDIOS",
      title: "Conectividad inteligente. Operaciones más eficientes.",
      description:
        "Infraestructura, redes, equipamiento, seguridad y automatización para organizaciones que mantienen conectados los servicios, la información y las comunicaciones.",
      services: ["Infraestructura y redes", "Equipamiento", "Ciberseguridad", "Automatización", "Monitoreo y reportes"],
      brands: ["Totalplay", "IQSEC", "C3NTRO Telecom Group", "TV Azteca", "Secure Soft", "Grupo Digitex", "CommData Group"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85"
    }
  };

  function fillChips(container, items, className) {
    container.replaceChildren();
    items.forEach(text => {
      const chip = document.createElement("span");
      chip.className = className;
      chip.textContent = text;
      container.appendChild(chip);
    });
  }

  function renderSector(key) {
    const data = sectors[key];
    if (!data) return;

    tabs.forEach(tab => {
      const active = tab.dataset.sector === key;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
      if (active) panel.setAttribute("aria-labelledby", tab.id);
    });

    // Reinicia la animación de entrada
    panel.classList.remove("sector-panel-animate");
    void panel.offsetWidth;
    panel.classList.add("sector-panel-animate");

    visual.style.backgroundImage = `
      linear-gradient(0deg, rgba(3,10,18,.6), transparent 65%),
      linear-gradient(135deg, rgba(8,184,183,.15), transparent 60%),
      url("${data.image}")
    `;

    symbol.innerHTML = iconSvg(key);
    visualCaption.textContent = data.visual;
    kicker.textContent = data.kicker;
    title.textContent = data.title;
    description.textContent = data.description;

    fillChips(services, data.services, "sector-service-chip");
    fillChips(brands, data.brands, "sector-brand-chip");
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => renderSector(tab.dataset.sector));

    // Navegación accesible con flechas del teclado
    tab.addEventListener("keydown", event => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;

      event.preventDefault();
      tabs[next].focus();
      renderSector(tabs[next].dataset.sector);
    });
  });

  // Sector inicial
  renderSector("hospitalidad");
});

(() => {
  const hero = document.querySelector('.sectors-hero');
  const canvas = document.getElementById('sectors-canvas');
  if (!hero || !canvas) return;

  const ctx = canvas.getContext('2d');
  const root = hero.closest('.sectors-experience') || hero;
  const card = document.getElementById('hero-sector-card');
  const logoEl = document.getElementById('hub-logo-src');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2;

  /* ---- Sectores: color, frase e icono de cada uno ---- */
  const SECTORS = [
    { key: 'hospitalidad', label: 'Hospitalidad',     tag: 'Experiencias conectadas',           color: '#08c4c2', icon: ICONS.hospitalidad },
    { key: 'financiero',   label: 'Financiero',       tag: 'Seguridad y continuidad operativa', color: '#4d8dff', icon: ICONS.financiero },
    { key: 'construccion', label: 'Construcción',     tag: 'Conectividad en planta y obra',     color: '#ffb02e', icon: ICONS.construccion },
    { key: 'gobierno',     label: 'Gobierno',         tag: 'Infraestructura que sirve',         color: '#9a85ff', icon: ICONS.gobierno },
    { key: 'salud',        label: 'Salud',            tag: 'Tecnología que cuida la operación', color: '#ff6b87', icon: ICONS.salud },
    { key: 'telecom',      label: 'Telecom y medios', tag: 'Redes y medios sin pausa',          color: '#31e3a4', icon: ICONS.telecom }
  ];
  SECTORS.forEach(s => { s.p = new Path2D(s.icon); });

  /* ---- Logo del núcleo (claro / noche, definidos en el HTML) ---- */
  const logos = { light: new Image(), dark: new Image() };
  if (logoEl) {
    logos.light.src = logoEl.dataset.logoLight || logoEl.getAttribute('src');
    logos.dark.src  = logoEl.dataset.logoDark  || logos.light.src;
  }
  const redraw = () => { if (!running) draw(clock, 0); };
  logos.light.onload = redraw;
  logos.dark.onload = redraw;

  /* ---- Fotos de los sectores (data-img en cada botón del hero) ---- */
  const photos = {};
  function loadPhoto(key, list) {
    const urls = list.split('|').map(u => u.trim()).filter(Boolean);
    const im = new Image();
    im.ok = false;
    photos[key] = im;
    let i = 0;
    const next = () => { if (i < urls.length) im.src = urls[i++]; };
    im.onload = () => { im.ok = true; redraw(); };
    im.onerror = next;
    next();
  }

  let W = 0, H = 0, dpr = 1, hub = { x: 0, y: 0 }, rx = 220, ry = 130, tilt = -0.2;
  let hubR = 52, nr = 30, small = false, dark = false;
  let nodes = [], particles = [], ripples = [];
  let running = false, raf = 0, focusKey = null, hoverKey = null, shownKey = null;
  let clock = 0, lastT = 0, speed = 1, frame = 0;
  let hubCol = '#08b8b7', hubBright = '#38d6d1';
  const mouse = { x: -9999, y: -9999, active: false };
  const colors = { accent: '#08b8b7', bright: '#38d6d1', text: '#102431', panel: '#ffffff' };

  /* ---- utilidades de color ---- */
  const hexA = (hex, a) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };
  const mixHex = (a, b, t) => {
    const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16);
    return '#' + [16, 8, 0].map(sh => {
      const x = (A >> sh) & 255, y = (B >> sh) & 255;
      return Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
    }).join('');
  };
  const toHex = c => { ctx.fillStyle = '#000000'; ctx.fillStyle = c; return ctx.fillStyle; };

  function readColors() {
    const s = getComputedStyle(root);
    const v = (n, d) => (s.getPropertyValue(n).trim() || d);
    colors.accent = toHex(v('--na-accent', colors.accent));
    colors.bright = toHex(v('--na-accent-bright', colors.bright));
    colors.text   = v('--na-heading', colors.text);
    colors.panel  = v('--na-panel', colors.panel);

    // ¿el panel es oscuro? (para elegir el logo de noche)
    ctx.fillStyle = colors.panel;
    const norm = ctx.fillStyle;
    let r = 255, g = 255, b = 255;
    const hx = norm.match(/^#([0-9a-f]{6})$/i);
    if (hx) {
      const n = parseInt(hx[1], 16);
      r = n >> 16; g = (n >> 8) & 255; b = n & 255;
    } else {
      const m = norm.match(/\d+/g);
      if (m) { r = +m[0]; g = +m[1]; b = +m[2]; }
    }
    dark = (r * 299 + g * 587 + b * 114) / 1000 < 110;
  }

  function resize() {
    const r = hero.getBoundingClientRect();
    W = r.width; H = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    small = W < 1050;
    if (!small) {
      rx = Math.min(W * 0.235, 330); ry = rx * 0.6; tilt = -0.2;
      hub = { x: W * 0.72, y: H * 0.5 }; hubR = 62; nr = 41;
    } else {
      rx = Math.min(W * 0.36, 270); ry = rx * 0.62; tilt = -0.12;
      hub = { x: W * 0.5, y: H - ry - 95 }; hubR = 48; nr = 31;
    }

    nodes = SECTORS.map((s, i) => ({
      ...s, i, a: (i / SECTORS.length) * TAU,
      speed: 0.00017 + (i % 2) * 0.00005,
      ring: i % 2 ? 1 : 0.78,
      x: 0, y: 0, z: 0, s: 1, hover: 0
    }));

    const count = Math.round(Math.min(80, (W * H) / 13000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.6
    }));
    redraw();
  }

  /* posición de un nodo en su órbita (con inclinación) */
  function orbitPoint(n, ang, px, py) {
    const ex = Math.cos(ang) * rx * n.ring, ey = Math.sin(ang) * ry * n.ring;
    return {
      x: hub.x + ex * Math.cos(tilt) - ey * Math.sin(tilt) + px,
      y: hub.y + ex * Math.sin(tilt) + ey * Math.cos(tilt) + py
    };
  }

  function place(c) {
    const px = mouse.active ? ((mouse.x - W / 2) / W) * 18 : 0;
    const py = mouse.active ? ((mouse.y - H / 2) / H) * 12 : 0;
    nodes.forEach(n => {
      const ang = n.a + c * n.speed;
      const p = orbitPoint(n, ang, px, py);
      n.x = p.x; n.y = p.y; n.ang = ang; n.px = px; n.py = py;
      n.z = Math.sin(ang);
      n.s = 0.78 + 0.34 * (n.z + 1) / 2;
    });
  }

  const NEAR = 60;   // margen en px: el nodo reacciona al acercarse
  function hitTest() {
    if (!mouse.active) return null;
    let best = null, bd = Infinity;
    nodes.forEach(n => {
      const d = Math.hypot(mouse.x - n.x, mouse.y - n.y) - nr * n.s;
      if (d < NEAR && d < bd) { bd = d; best = n.key; }
    });
    return best;
  }

  /* ---------------- dibujo ---------------- */

  function drawParticles() {
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (mouse.active && dm < 170) {
        ctx.globalAlpha = (1 - dm / 170) * 0.55;
        ctx.strokeStyle = colors.accent; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        p.x += (mouse.x - p.x) * 0.004; p.y += (mouse.y - p.y) * 0.004;
      }
      ctx.globalAlpha = 0.4; ctx.fillStyle = colors.bright;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (d < 95) {
          ctx.globalAlpha = (1 - d / 95) * 0.15;
          ctx.strokeStyle = colors.accent; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  function drawOrbits() {
    ctx.setLineDash([2, 9]); ctx.lineWidth = 1; ctx.strokeStyle = colors.accent;
    [1, 0.78].forEach(k => {
      ctx.globalAlpha = 0.32;
      ctx.beginPath(); ctx.ellipse(hub.x, hub.y, rx * k, ry * k, tilt, 0, TAU); ctx.stroke();
    });
    ctx.setLineDash([]); ctx.globalAlpha = 1;
  }

  function drawBeam(n, t) {
    const active = n.key === hoverKey || n.key === focusKey;
    const col = mixHex(colors.accent, n.color, n.hover);
    const g = ctx.createLinearGradient(hub.x, hub.y, n.x, n.y);
    g.addColorStop(0, hexA(col, active ? 0.9 : 0.25));
    g.addColorStop(1, hexA(col, active ? 1 : 0.55));
    ctx.globalAlpha = 1;
    ctx.strokeStyle = g; ctx.lineWidth = active ? 2.6 : 1.2;
    ctx.setLineDash([7, 11]); ctx.lineDashOffset = -t * 0.04;
    ctx.beginPath(); ctx.moveTo(hub.x, hub.y); ctx.lineTo(n.x, n.y); ctx.stroke();
    ctx.setLineDash([]);

    for (let k = 0; k < (active ? 3 : 1); k++) {
      const q = ((t * 0.00038) + n.i * 0.17 + k / 3) % 1;
      const px = hub.x + (n.x - hub.x) * q, py = hub.y + (n.y - hub.y) * q;
      ctx.globalAlpha = 0.28; ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(px, py, 8, 0, TAU); ctx.fill();
      ctx.globalAlpha = 1; ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(px, py, 2.4, 0, TAU); ctx.fill();
    }
  }

  function drawNode(n) {
    const active = n.key === hoverKey || n.key === focusKey;
    n.hover += ((active ? 1 : 0) - n.hover) * 0.14;
    const col = mixHex(colors.accent, n.color, n.hover);   // color del sector al hover
    const r = nr * n.s * (1 + n.hover * 0.22);
    const depth = 0.55 + 0.45 * (n.z + 1) / 2;

    /* estela de cometa */
    for (let k = 1; k <= 16; k++) {
      const p = orbitPoint(n, n.ang - k * 0.045, n.px, n.py);
      ctx.globalAlpha = (1 - k / 17) * 0.2 * depth;
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.6, r * 0.2 * (1 - k / 18)), 0, TAU); ctx.fill();
    }

    /* halo (se intensifica con el hover) */
    const halo = ctx.createRadialGradient(n.x, n.y, r * 0.5, n.x, n.y, r * (1.6 + n.hover * 0.7));
    halo.addColorStop(0, hexA(col, 0.12 * depth + n.hover * 0.28));
    halo.addColorStop(1, hexA(col, 0));
    ctx.globalAlpha = 1; ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(n.x, n.y, r * (1.6 + n.hover * 0.7), 0, TAU); ctx.fill();

    /* cuerpo de cristal */
    ctx.globalAlpha = 0.96 * (0.8 + 0.2 * depth); ctx.fillStyle = colors.panel;
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, TAU); ctx.fill();
    const body = ctx.createRadialGradient(n.x - r * 0.35, n.y - r * 0.4, 1, n.x, n.y, r);
    body.addColorStop(0, hexA(col, 0.1 + n.hover * 0.2));
    body.addColorStop(1, hexA(col, 0.34 + n.hover * 0.3));
    ctx.globalAlpha = 1; ctx.fillStyle = body;
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, TAU); ctx.fill();

    /* foto del sector (si existe) */
    const ph = photos[n.key], hasPh = !!(ph && ph.ok);
    if (hasPh) {
      ctx.save();
      ctx.beginPath(); ctx.arc(n.x, n.y, r - 1.5, 0, TAU); ctx.clip();
      const sc = Math.max(2 * r / ph.naturalWidth, 2 * r / ph.naturalHeight) * (1.08 + n.hover * 0.2);
      const w = ph.naturalWidth * sc, h = ph.naturalHeight * sc;
      ctx.globalAlpha = 0.6 + 0.4 * depth;
      ctx.drawImage(ph, n.x - w / 2, n.y - h / 2, w, h);
      const ov = ctx.createLinearGradient(n.x, n.y - r, n.x, n.y + r);
      ov.addColorStop(0, hexA(col, 0.12 + n.hover * 0.28));
      ov.addColorStop(1, hexA('#03101a', 0.42 - n.hover * 0.25));
      ctx.globalAlpha = 1; ctx.fillStyle = ov;
      ctx.fillRect(n.x - r, n.y - r, 2 * r, 2 * r);
      ctx.restore();
    }

    /* borde */
    ctx.globalAlpha = depth; ctx.strokeStyle = col; ctx.lineWidth = 2.2 + n.hover * 1.6;
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, TAU); ctx.stroke();

    /* anillo giratorio */
    ctx.globalAlpha = (0.4 + n.hover * 0.6) * depth; ctx.lineWidth = 2; ctx.lineCap = 'round';
    const spin = n.ang * 6;
    ctx.beginPath(); ctx.arc(n.x, n.y, r + 7, spin, spin + 1.1 + n.hover); ctx.stroke();
    ctx.beginPath(); ctx.arc(n.x, n.y, r + 7, spin + Math.PI, spin + Math.PI + 0.7); ctx.stroke();

    /* icono vectorial */
    const k = hasPh ? r * 0.0175 : r * 0.038;
    const ix = hasPh ? n.x + r * 0.7 : n.x, iy = hasPh ? n.y + r * 0.7 : n.y;
    if (hasPh) {
      ctx.globalAlpha = 1; ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(ix, iy, r * 0.36, 0, TAU); ctx.fill();
      ctx.strokeStyle = colors.panel; ctx.lineWidth = 2.5; ctx.stroke();
    }
    ctx.save();
    ctx.translate(ix - 12 * k, iy - 12 * k); ctx.scale(k, k);
    ctx.globalAlpha = 1; ctx.strokeStyle = hasPh ? '#ffffff' : col; ctx.lineWidth = 1.9;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.stroke(n.p);
    ctx.restore();

    /* rótulo */
    ctx.globalAlpha = (0.55 + 0.45 * depth) * (0.85 + n.hover * 0.15);
    ctx.fillStyle = n.hover > 0.5 ? col : colors.text;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `700 ${(small ? 11 : 12.5) * (0.92 + n.hover * 0.1)}px Manrope, sans-serif`;
    ctx.fillText(n.label, n.x, n.y + r + 20);
    ctx.globalAlpha = 1;
  }

  function drawHub(t) {
    /* ondas de choque */
    for (let k = 0; k < 3; k++) {
      const q = ((t * 0.00032) + k / 3) % 1;
      ctx.globalAlpha = (1 - q) * 0.18; ctx.strokeStyle = hubBright; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(hub.x, hub.y, hubR + q * 120, 0, TAU); ctx.stroke();
    }

    /* resplandor */
    const pulse = reduceMotion ? 0 : (Math.sin(t * 0.0022) + 1) / 2;
    const gl = ctx.createRadialGradient(hub.x, hub.y, hubR * 0.4, hub.x, hub.y, hubR * 2.3);
    gl.addColorStop(0, hexA(hubBright, 0.16 + pulse * 0.06));
    gl.addColorStop(1, hexA(hubCol, 0));
    ctx.globalAlpha = 1; ctx.fillStyle = gl;
    ctx.beginPath(); ctx.arc(hub.x, hub.y, hubR * 2.3, 0, TAU); ctx.fill();

    /* anillos orbitales */
    ctx.lineCap = 'round';
    ctx.setLineDash([2, 7]); ctx.lineDashOffset = -t * 0.01;
    ctx.strokeStyle = hubCol; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.7;
    ctx.beginPath(); ctx.arc(hub.x, hub.y, hubR + 13, 0, TAU); ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineWidth = 3; ctx.globalAlpha = 0.9; ctx.strokeStyle = hubBright;
    const a1 = t * 0.0016;
    ctx.beginPath(); ctx.arc(hub.x, hub.y, hubR + 22, a1, a1 + 1.3); ctx.stroke();
    ctx.strokeStyle = hubCol; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(hub.x, hub.y, hubR + 30, -a1 * 0.7, -a1 * 0.7 + 0.9); ctx.stroke();

    /* disco del núcleo */
    ctx.globalAlpha = 1; ctx.fillStyle = colors.panel;
    ctx.beginPath(); ctx.arc(hub.x, hub.y, hubR, 0, TAU); ctx.fill();
    ctx.strokeStyle = hubCol; ctx.lineWidth = 2.5; ctx.stroke();

    /* logo (logoSin en claro, versión de noche en modo oscuro) */
    const img = dark ? logos.dark : logos.light;
    if (img.complete && img.naturalWidth) {
      const box = hubR * (dark ? 1.45 : 1.85);
      const sc = Math.min(box / img.naturalWidth, box / img.naturalHeight);
      const w = img.naturalWidth * sc, h = img.naturalHeight * sc;
      ctx.save();
      ctx.beginPath(); ctx.arc(hub.x, hub.y, hubR - 2, 0, TAU); ctx.clip();
      ctx.drawImage(img, hub.x - w / 2, hub.y - h / 2, w, h);
      ctx.restore();
    }
  }

  function drawRipples(t) {
    ripples = ripples.filter(r => t - r.t < 900);
    ripples.forEach(r => {
      const q = Math.max(0, (t - r.t) / 900);
      ctx.globalAlpha = (1 - q) * 0.8; ctx.strokeStyle = r.c; ctx.lineWidth = 3 * (1 - q) + 1;
      ctx.beginPath(); ctx.arc(r.x, r.y, 20 + q * 110, 0, TAU); ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  function updateCard() {
    if (!card) return;
    const key = hoverKey || focusKey;
    const n = key && nodes.find(x => x.key === key);
    if (!n || small) { card.classList.remove('show'); shownKey = null; return; }
    if (shownKey !== key) {
      shownKey = key;
      card.style.setProperty('--c', n.color);
      card.querySelector('.hsc-name').textContent = n.label;
      card.querySelector('.hsc-tag').textContent = n.tag;
    }
    const cw = card.offsetWidth, ch = card.offsetHeight, r = nr * n.s;
    const x = Math.min(Math.max(n.x - cw / 2, 12), W - cw - 12);
    let y = n.y - r - ch - 26;
    if (y < 12) y = n.y + r + 44;
    card.style.transform = `translate(${x}px, ${y}px)`;
    card.classList.add('show');
  }

  function draw(c, t) {
    ctx.clearRect(0, 0, W, H);
    place(c);
    hoverKey = hitTest();
    canvas.style.cursor = hoverKey ? 'pointer' : 'default';

    // el núcleo toma el color del sector iluminado
    let an = null;
    nodes.forEach(n => { if (n.hover > 0.02 && (!an || n.hover > an.hover)) an = n; });
    hubCol = an ? mixHex(colors.accent, an.color, an.hover) : colors.accent;
    hubBright = an ? mixHex(colors.bright, an.color, an.hover * 0.85) : colors.bright;

    drawParticles();
    drawOrbits();
    const sorted = [...nodes].sort((a, b) => a.z - b.z);
    sorted.forEach(n => drawBeam(n, t));
    sorted.filter(n => n.z < 0).forEach(drawNode);
    drawHub(t);
    sorted.filter(n => n.z >= 0).forEach(drawNode);
    drawRipples(t);
    updateCard();
  }

  function loop(t) {
    if (!running) return;
    const dt = Math.min(t - lastT, 50); lastT = t;
    speed += (((hoverKey || focusKey) ? 0.2 : 1) - speed) * 0.06;
    clock += dt * speed;
    if (++frame % 30 === 0) readColors();
    draw(clock, t);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true; lastT = performance.now(); raf = requestAnimationFrame(loop);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }

  function goTo(key) {
    const tab = document.querySelector(`.sector-tab[data-sector="${key}"]`);
    if (tab) tab.click();
    const target = document.getElementById('explorar-sectores');
    if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---- eventos ---- */
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
  });
  hero.addEventListener('pointerleave', () => {
    mouse.active = false; mouse.x = mouse.y = -9999;
  });
  hero.addEventListener('click', e => {
    if (e.target.closest('a, button')) return;
    const r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    const key = hitTest();
    if (!key) return;
    const n = nodes.find(x => x.key === key);
    ripples.push({ x: n.x, y: n.y, c: n.color, t: performance.now() });
    ripples.push({ x: hub.x, y: hub.y, c: n.color, t: performance.now() + 120 });
    setTimeout(() => goTo(key), reduceMotion ? 0 : 450);
  });

  hero.querySelectorAll('.hero-sector-chip').forEach(chip => {
    const key = chip.dataset.go;
    const s = SECTORS.find(x => x.key === key);
    if (s) chip.style.setProperty('--c', s.color);
    if (chip.dataset.img) loadPhoto(key, chip.dataset.img);
    chip.addEventListener('mouseenter', () => { focusKey = key; });
    chip.addEventListener('mouseleave', () => { focusKey = null; });
    chip.addEventListener('focus',      () => { focusKey = key; });
    chip.addEventListener('blur',       () => { focusKey = null; });
    chip.addEventListener('click',      () => goTo(key));
  });

  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { threshold: 0.05 }).observe(hero);

  // repinta si cambia el tema (botón noche/día)
  const onTheme = () => { readColors(); redraw(); };
  new MutationObserver(onTheme).observe(document.documentElement, { attributes: true });
  new MutationObserver(onTheme).observe(document.body, { attributes: true });

  readColors();
  resize();
})();