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
