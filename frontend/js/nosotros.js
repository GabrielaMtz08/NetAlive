document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-certifications-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('[data-certification-slide]'));
  const targets = Array.from(carousel.querySelectorAll('[data-certification-target]'));
  const status = carousel.querySelector('.certification-carousel__status');
  const previous = carousel.querySelector('[data-certification-previous]');
  const next = carousel.querySelector('[data-certification-next]');

  if (!slides.length || slides.length !== targets.length || !status || !previous || !next) return;

  let activeIndex = 0;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== activeIndex;
    });

    targets.forEach((target, targetIndex) => {
      target.setAttribute('aria-pressed', String(targetIndex === activeIndex));
    });

    const heading = slides[activeIndex].querySelector('h3');
    status.textContent = `Grupo ${activeIndex + 1} de ${slides.length}: ${heading.textContent}`;
  }

  previous.addEventListener('click', () => showSlide(activeIndex - 1));
  next.addEventListener('click', () => showSlide(activeIndex + 1));
  targets.forEach((target, index) => {
    target.addEventListener('click', () => showSlide(index));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const showcase = document.querySelector('[data-values-showcase]');
  if (!showcase) return;

  const values = {
    calidad: {
      title: 'Calidad',
      description: 'Entregamos soluciones confiables, documentadas y alineadas con estándares técnicos y comerciales.'
    },
    experiencia: {
      title: 'Experiencia',
      description: 'Aplicamos conocimiento especializado para resolver proyectos críticos con criterio y seguimiento.'
    },
    creatividad: {
      title: 'Creatividad',
      description: 'Diseñamos respuestas prácticas e innovadoras adaptadas a la realidad de cada organización.'
    },
    eficiencia: {
      title: 'Eficiencia',
      description: 'Optimizamos recursos, tiempos y procesos para generar resultados medibles y sostenibles.'
    },
    honestidad: {
      title: 'Honestidad',
      description: 'Construimos confianza mediante transparencia, comunicación clara y compromisos responsables.'
    }
  };

  const nodes = Array.from(showcase.querySelectorAll('[data-value-target]'));
  const title = showcase.querySelector('[data-value-title]');
  const description = showcase.querySelector('[data-value-description]');
  const icon = showcase.querySelector('[data-value-detail-icon]');

  function selectValue(node) {
    const value = values[node.dataset.valueTarget];
    if (!value) return;

    nodes.forEach((item) => {
      const active = item === node;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    title.textContent = value.title;
    description.textContent = value.description;
    icon.innerHTML = node.querySelector('.value-node__icon').innerHTML;
  }

  nodes.forEach((node) => node.addEventListener('click', () => selectValue(node)));
  selectValue(nodes[0]);
});

document.addEventListener('DOMContentLoaded', () => {
  const visual = document.getElementById('banner-visual');
  if (!visual) return;

  const canvas = visual.querySelector('.banner-visual__network');
  const context = canvas?.getContext('2d');
  const emblem = visual.querySelector('#banner-emblem');
  const chips = Array.from(visual.querySelectorAll('[data-pillar]'));
  const parallaxLayers = Array.from(visual.querySelectorAll('[data-parallax-depth]'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
  const network = { width: 0, height: 0, nodes: [], edges: [], dpr: 1 };
  let visible = true;
  let frameId = 0;
  let activePillar = null;
  let hoveredPillar = null;
  let focusedPillar = null;

  function makeNetwork() {
    if (!canvas || !context) return;
    const bounds = visual.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    network.width = bounds.width;
    network.height = bounds.height;
    network.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(network.width * network.dpr);
    canvas.height = Math.round(network.height * network.dpr);
    context.setTransform(network.dpr, 0, 0, network.dpr, 0, 0);

    const randomAt = (index) => {
      const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
      return value - Math.floor(value);
    };

    network.nodes = Array.from({ length: 42 }, (_, index) => ({
      x: network.width * (.08 + randomAt(index + 1) * .84),
      y: network.height * (.07 + randomAt(index + 97) * .86),
      phase: randomAt(index + 203) * Math.PI * 2
    }));

    const candidates = [];
    for (let first = 0; first < network.nodes.length; first += 1) {
      for (let second = first + 1; second < network.nodes.length; second += 1) {
        const dx = network.nodes[first].x - network.nodes[second].x;
        const dy = network.nodes[first].y - network.nodes[second].y;
        const distance = Math.hypot(dx, dy);
        if (distance < 128) candidates.push({ first, second, distance });
      }
    }

    candidates.sort((a, b) => a.distance - b.distance);
    const connections = new Array(network.nodes.length).fill(0);
    network.edges = [];
    candidates.forEach((edge) => {
      if (connections[edge.first] >= 4 || connections[edge.second] >= 4) return;
      connections[edge.first] += 1;
      connections[edge.second] += 1;
      network.edges.push({
        ...edge,
        phase: randomAt(edge.first * 43 + edge.second * 17)
      });
    });
  }

  function drawNetwork(time) {
    if (!canvas || !context || !network.width || !network.height) return;

    context.clearRect(0, 0, network.width, network.height);
    const offsetX = pointer.x * 7;
    const offsetY = pointer.y * 7;
    context.save();
    context.translate(offsetX, offsetY);

    network.edges.forEach((edge) => {
      const start = network.nodes[edge.first];
      const end = network.nodes[edge.second];
      const pulse = (time * .00022 + edge.phase) % 1;
      const x = start.x + (end.x - start.x) * pulse;
      const y = start.y + (end.y - start.y) * pulse;

      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.strokeStyle = 'rgba(8, 184, 183, 0.15)';
      context.lineWidth = 1;
      context.stroke();

      context.beginPath();
      context.arc(x, y, 2.2, 0, Math.PI * 2);
      context.fillStyle = 'rgba(8, 184, 183, 0.78)';
      context.shadowColor = '#08b8b7';
      context.shadowBlur = 9;
      context.fill();
      context.shadowBlur = 0;
    });

    network.nodes.forEach((node) => {
      const radius = 1.4 + (Math.sin(time * .0015 + node.phase) + 1) * .65;
      context.beginPath();
      context.arc(node.x, node.y, radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(8, 184, 183, 0.56)';
      context.shadowColor = '#08b8b7';
      context.shadowBlur = 7;
      context.fill();
      context.shadowBlur = 0;
    });

    if (pointer.active) {
      const pointerX = pointer.x * network.width;
      const pointerY = pointer.y * network.height;
      network.nodes.forEach((node) => {
        const distance = Math.hypot(node.x - pointerX, node.y - pointerY);
        if (distance > 138) return;
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(pointerX, pointerY);
        context.strokeStyle = `rgba(8, 184, 183, ${(1 - distance / 138) * .4})`;
        context.lineWidth = 1.15;
        context.stroke();
      });
    }

    context.restore();
  }

  function pulseTo(chip) {
    const pulse = visual.querySelector('.banner-visual__pulse');
    if (!pulse) return;
    const visualBounds = visual.getBoundingClientRect();
    const targetBounds = chip.getBoundingClientRect();
    const x = targetBounds.left + targetBounds.width / 2 - (visualBounds.left + visualBounds.width / 2);
    const y = targetBounds.top + targetBounds.height / 2 - (visualBounds.top + visualBounds.height / 2);

    visual.style.setProperty('--pulse-x', `${x}px`);
    visual.style.setProperty('--pulse-y', `${y}px`);
    visual.classList.remove('is-pulsing');
    void visual.offsetWidth;
    visual.classList.add('is-pulsing');
  }

  function updatePillars() {
    const highlighted = hoveredPillar || focusedPillar || activePillar;

    chips.forEach((chip) => {
      const id = chip.dataset.pillar;
      const selected = id === activePillar;
      const shown = id === highlighted;
      chip.classList.toggle('is-active', shown);
      chip.setAttribute('aria-pressed', String(selected));
      const tooltip = chip.querySelector('.pillar-chip__tooltip');
      if (tooltip) tooltip.hidden = !shown;
    });

    visual.querySelectorAll('[data-emblem-node]').forEach((node) => {
      node.classList.toggle('is-active', node.dataset.emblemNode === highlighted);
    });
  }

  function enterPillar(chip) {
    hoveredPillar = chip.dataset.pillar;
    updatePillars();
    pulseTo(chip);
  }

  chips.forEach((chip) => {
    chip.addEventListener('pointerenter', () => enterPillar(chip));
    chip.addEventListener('pointerleave', () => {
      hoveredPillar = null;
      updatePillars();
    });
    chip.addEventListener('focus', () => {
      focusedPillar = chip.dataset.pillar;
      updatePillars();
      pulseTo(chip);
    });
    chip.addEventListener('blur', () => {
      focusedPillar = null;
      updatePillars();
    });
    chip.addEventListener('click', () => {
      activePillar = activePillar === chip.dataset.pillar ? null : chip.dataset.pillar;
      updatePillars();
      pulseTo(chip);
    });
  });

  if (emblem) {
    const pulseEmblem = () => {
      emblem.classList.remove('is-pulsing');
      void emblem.offsetWidth;
      emblem.classList.add('is-pulsing');
    };

    emblem.addEventListener('click', pulseEmblem);
    emblem.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      pulseEmblem();
    });
  }

  if (!coarsePointer) {
    visual.addEventListener('pointermove', (event) => {
      const bounds = visual.getBoundingClientRect();
      pointer.targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
      pointer.targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
      pointer.active = true;
    });
    visual.addEventListener('pointerleave', () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.active = false;
    });
  }

  function animate(time) {
    frameId = 0;
    pointer.x += (pointer.targetX - pointer.x) * .12;
    pointer.y += (pointer.targetY - pointer.y) * .12;

    parallaxLayers.forEach((layer) => {
      const depth = Number(layer.dataset.parallaxDepth) || 0;
      const x = pointer.x * depth * 12;
      const y = pointer.y * depth * 10;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    drawNetwork(time);

    if (visible && !document.hidden && !reducedMotion) {
      frameId = window.requestAnimationFrame(animate);
    }
  }

  function startAnimation() {
    if (frameId || !visible || document.hidden) return;
    if (reducedMotion) {
      drawNetwork(0);
      return;
    }
    frameId = window.requestAnimationFrame(animate);
  }

  function stopAnimation() {
    if (!frameId) return;
    window.cancelAnimationFrame(frameId);
    frameId = 0;
  }

  makeNetwork();
  if (context) drawNetwork(0);

  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(() => {
      makeNetwork();
      if (reducedMotion) drawNetwork(0);
    });
    resizeObserver.observe(visual);
  } else {
    window.addEventListener('resize', () => {
      makeNetwork();
      if (reducedMotion) drawNetwork(0);
    });
  }

  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startAnimation();
      else stopAnimation();
    });
    visibilityObserver.observe(visual);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAnimation();
    else startAnimation();
  });

  startAnimation();
});
