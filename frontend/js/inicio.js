document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("holo-modal");
  if (!modal) return;
  const modalWindow = modal.querySelector(".holo-modal-window");
  const closeButton = document.getElementById("holo-close");
  const modalTitle = document.getElementById("holo-modal-title");
  const modalDescription = document.getElementById("holo-modal-description");
  const modalDetail = document.getElementById("holo-modal-detail");
  const modalImage = document.getElementById("holo-modal-image");
  const modalNumber = document.getElementById("holo-modal-number");
  const modalCategory = modal.querySelector(".holo-modal-category");
  const cards = document.querySelectorAll(".holo-card");
  let previousFocus = null;
  let isOpen = false;

  /* INFORMACIÓN DE LOS SERVICIOS */
  const services = {
    infraestructura: {
      category: "INFRAESTRUCTURA",
      title: "Infraestructura y TI",
      description:
        "Especialistas en infraestructura tecnológica y servicios de TI. Diseñamos e integramos soluciones orientadas al rendimiento, disponibilidad y crecimiento de tu organización.",
      detail:
        "Combinamos experiencia e innovación para fortalecer los entornos tecnológicos y acompañar las necesidades de cada negocio.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85"
    },

    virtualizacion: {
      category: "PLATAFORMAS",
      title: "Virtualización Multi-Plataforma",
      description:
        "Optimizamos los recursos tecnológicos mediante soluciones de virtualización multi-plataforma.",
      detail:
        "Facilitamos la administración de entornos tecnológicos, buscando flexibilidad, eficiencia y escalabilidad para tu organización.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85"
    },

    nube: {
      category: "CLOUD",
      title: "Servicios en la Nube",
      description:
        "Impulsamos la transformación digital mediante servicios en la nube adaptados a las necesidades de tu negocio.",
      detail:
        "Acompañamos la evolución de tus plataformas tecnológicas con soluciones orientadas a la disponibilidad, flexibilidad y escalabilidad.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85"
    },

    analitica: {
      category: "INTELIGENCIA",
      title: "Analítica Avanzada",
      description:
        "Convertimos los datos en información estratégica para respaldar decisiones y descubrir nuevas oportunidades.",
      detail:
        "Integramos capacidades de análisis avanzado para transformar la información en valor para tu organización.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85"
    },

    gobierno: {
      category: "GESTIÓN DE INFORMACIÓN",
      title: "Gobierno de Datos",
      description:
        "Fortalecemos la administración, calidad, disponibilidad y control de los datos de tu organización.",
      detail:
        "Impulsamos buenas prácticas para gestionar la información empresarial y mejorar la confianza en los datos.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85"
    },

    ciberseguridad: {
      category: "PROTECCIÓN DIGITAL",
      title: "Ciberseguridad",
      description:
        "Protegemos los activos digitales, la infraestructura y la información de tu organización.",
      detail:
        "Integramos soluciones de seguridad orientadas a la prevención, protección y fortalecimiento de los entornos tecnológicos.",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85"
    },

    noc: {
      category: "OPERACIONES Y MONITOREO",
      title: "NOC - Network Operations Center",
      description:
        "Ofrecemos capacidades de monitoreo y supervisión para contribuir a la disponibilidad de los servicios tecnológicos.",
      detail:
        "La operación continua 24/7 permite mantener visibilidad sobre la infraestructura, identificar eventos y dar seguimiento a incidencias.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85"
    }

  };

  /* ABRIR MODAL */
  function openModal(key, card) {
    const service = services[key];
    if (!service || isOpen) return;
    previousFocus = card;
    modalTitle.textContent = service.title;
    modalDescription.textContent = service.description;
    modalDetail.textContent = service.detail;
    modalNumber.textContent = service.number;
    modalCategory.textContent = service.category;
    modalImage.src = service.image;
    modalImage.alt = service.title;
    modal.inert = false;
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("active");
    document.body.classList.add("holo-modal-open");
    isOpen = true;
    closeButton.focus();
  }

  /* CERRAR MODAL */
  function closeModal() {
    if (!isOpen) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modal.inert = true;
    document.body.classList.remove("holo-modal-open");
    isOpen = false;
    if (previousFocus) {
      previousFocus.focus();
    }
  }

  /* TARJETAS */
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const service = card.dataset.service;
      openModal(service, card);
    });
  });

  /* CERRAR CON BOTÓN */
  closeButton.addEventListener("click", closeModal);

  /* CERRAR AL HACER CLIC FUERA */
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  /* CERRAR CON ESCAPE */
  document.addEventListener("keydown", event => {
    if (!isOpen) return;
    if (event.key === "Escape") {
      closeModal();
    }
  });

  /* CONTROL DE FOCO DEL MODAL */
  modalWindow.addEventListener("keydown", event => {
    if (event.key !== "Tab" || !isOpen) return;
    const elements = modalWindow.querySelectorAll(
      'button:not([disabled]), a[href]'
    );
    if (!elements.length) return;
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    }
    else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  });
});