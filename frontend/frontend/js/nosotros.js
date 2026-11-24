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