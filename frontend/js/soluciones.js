document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, parent = document) =>
    parent.querySelector(selector);
  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  /* DATOS DEL ECOSISTEMA */
  const solutions = [
    {
      id: 'infraestructura',
      number: '01',
      icon: '⌘',
      title: 'Infraestructura & TI',
      subtitle: 'La base tecnológica de tu organización.',
      description:
        'Diseñamos, integramos y fortalecemos infraestructuras tecnológicas para mantener tu organización conectada, protegida y preparada para evolucionar.',
      highlights: [
        'Networking: switches, routers, access points y telefonía IP.',
        'Ciberseguridad: firewalls, antivirus, AntiSpam, WAF y Cloud Gateway.',
        'Cableado UTP Cat 5e, 6 y 6A, fibra óptica y GPON.',
        'Cómputo, servidores, almacenamiento NAS y SAN.',
        'CCTV, biométricos, control de acceso y analíticos con IA.'
      ],
      services: [
        {
          icon: '⌁',
          title: 'Networking',
          description:
            'Switches, routers, access points y telefonía IP para una conectividad empresarial eficiente.'
        },
        {
          icon: '◈',
          title: 'Ciberseguridad',
          description:
            'Firewalls, antivirus, AntiSpam, WAF y Cloud Gateway para proteger redes y activos digitales.'
        },
        {
          icon: '⌗',
          title: 'Cableado estructurado',
          description:
            'Infraestructura UTP Cat 5e, Cat 6, Cat 6A, fibra óptica y tecnología GPON.'
        },
        {
          icon: '▣',
          title: 'Cómputo empresarial',
          description:
            'Computadoras de escritorio, laptops y workstations para cada necesidad operativa.'
        },
        {
          icon: '▤',
          title: 'Servidores y almacenamiento',
          description:
            'Servidores Torre, Rack y Blade, además de soluciones de almacenamiento NAS y SAN.'
        },
        {
          icon: '◎',
          title: 'CCTV y control de acceso',
          description:
            'Videovigilancia con analíticos e IA, biométricos, gestión de asistencia y control de acceso.'
        }
      ]
    },

    {
      id: 'carrier',
      number: '02',
      icon: '⌁',
      title: 'Carrier & Telecomunicaciones',
      subtitle: 'Conectividad que mantiene todo en movimiento.',
      description:
        'Integramos servicios de conectividad y comunicación empresarial para enlazar sucursales, colaboradores y clientes mediante infraestructura de telecomunicaciones especializada.',
      highlights: [
        'Internet dedicado simétrico por fibra óptica con Alestra.',
        'Alta disponibilidad y SLA empresarial.',
        'Redes privadas multisucursal mediante MPLS y SD-WAN.',
        'Telefonía Cloud PBX y SIP Trunking con Net2phone.',
        'Contact Center omnicanal, WhatsApp empresarial e IVR.'
      ],
      services: [
        {
          icon: '⌁',
          title: 'Internet dedicado empresarial',
          description:
            'Enlaces simétricos por fibra óptica, alta disponibilidad y SLA empresarial mediante Alestra.'
        },
        {
          icon: '◎',
          title: 'Redes privadas multisucursal',
          description:
            'Interconexión segura entre sedes mediante MPLS, SD-WAN y enlaces punto a punto de baja latencia con Alestra.'
        },
        {
          icon: '☎',
          title: 'Telefonía en la nube & UCaaS',
          description:
            'Cloud PBX, extensiones móviles, SIP Trunking e integración con Microsoft Teams y CRMs mediante Net2phone.'
        },
        {
          icon: '◉',
          title: 'Contact Center omnicanal',
          description:
            'Gestión centralizada de voz, WhatsApp empresarial, IVR inteligente y analítica de interacciones en tiempo real con Net2phone.'
        }
      ]
    },

    {
      id: 'virtualizacion',
      number: '03',
      icon: '▦',
      title: 'Virtualización',
      subtitle: 'Infraestructura ágil y multi-plataforma.',
      description:
        'Potenciamos y consolidamos tu infraestructura con plataformas líderes de virtualización, creando entornos más ágiles, rentables y de alta disponibilidad.',
      highlights: [
        'Tecnologías líderes en virtualización y nube híbrida.',
        'Optimización de costos de hardware y licenciamiento.',
        'Migración, soporte y acompañamiento experto.',
        'Arquitecturas multi-plataforma para entornos empresariales.',
        'Integración de máquinas virtuales, contenedores e hiperconvergencia.'
      ],
      services: [
        {
          icon: 'V',
          title: 'VMware by Broadcom',
          description:
            'Virtualización empresarial de alto nivel, redes definidas por software mediante NSX e hiperconvergencia VSAN para centros de datos críticos.'
        },
        {
          icon: 'M',
          title: 'Microsoft Hyper-V',
          description:
            'Integración nativa con entornos Windows Server para aprovechar la inversión en licenciamiento y habilitar alta disponibilidad.'
        },
        {
          icon: 'P',
          title: 'Proxmox VE',
          description:
            'Plataforma empresarial de código abierto que integra máquinas virtuales y contenedores.'
        },
        {
          icon: 'N',
          title: 'Nutanix AHV',
          description:
            'Infraestructura hiperconvergente que unifica cómputo, almacenamiento y virtualización con gestión simplificada.'
        },
        {
          icon: 'R',
          title: 'Red Hat OpenShift',
          description:
            'Plataforma empresarial de código abierto con soporte corporativo para cargas críticas, contenedores y nube híbrida.'
        }
      ]
    },

    {
      id: 'rexha',
      number: '04',
      icon: '☁',
      title: 'Rexha Cloud',
      subtitle: 'Tu infraestructura, disponible desde cualquier lugar.',
      description:
        'Infraestructura flexible, segura y escalable diseñada para impulsar la eficiencia, la continuidad del negocio y la innovación de tu organización.',
      highlights: [
        'Servidores virtuales Windows y Linux bajo demanda.',
        'Escritorios remotos y aplicaciones empresariales en la nube.',
        'Disaster Recovery para entornos críticos.',
        'Migraciones guiadas de máquinas virtuales.',
        'Almacenamiento de archivos y objetos compatible con S3.',
        'Alta disponibilidad, seguridad avanzada y gestión experta.'
      ],
      services: [
        {
          icon: '▣',
          title: 'Servidores virtuales',
          description:
            'Máquinas virtuales Windows y Linux que despliegas, escalas y gestionas bajo demanda sobre nuestra infraestructura.'
        },
        {
          icon: '▤',
          title: 'Escritorio remoto',
          description:
            'El escritorio y las aplicaciones de tu empresa en la nube, accesibles desde cualquier lugar con gestión centralizada.'
        },
        {
          icon: '◈',
          title: 'Disaster Recovery',
          description:
            'Capa de continuidad operativa que replica tus entornos críticos y los mantiene listos para activación.'
        },
        {
          icon: '↗',
          title: 'Migraciones guiadas',
          description:
            'Sube, convierte y despliega en Nube NET ALIVE tus máquinas virtuales y entornos actuales mediante un proceso asistido.'
        },
        {
          icon: '▤',
          title: 'Almacenamiento de archivos',
          description:
            'Servidor de archivos empresarial en la nube con permisos granulares por usuario, respaldos incluidos y cumplimiento normativo.'
        },
        {
          icon: '◫',
          title: 'Almacenamiento de objetos',
          description:
            'Repositorio de alta capacidad compatible con S3 para copias de seguridad, datos de aplicaciones y grandes volúmenes.'
        }
      ],
      features: [
        'Alta disponibilidad: infraestructura redundante y monitoreada 24/7.',
        'Seguridad avanzada: protección de datos, redes privadas y cumplimiento normativo.',
        'Escalabilidad: recursos bajo demanda para crecer sin fricciones.',
        'Gestión experta: plataforma administrada por especialistas certificados.'
      ]
    },

    {
      id: 'data',
      number: '05',
      icon: '⌗',
      title: 'Data Management',
      subtitle: 'Transformamos datos en decisiones estratégicas.',
      description:
        'Conectamos, automatizamos y organizamos los datos de tu empresa para convertir grandes volúmenes de información en conocimiento útil para el negocio.',
      highlights: [
        'Ingesta y extracción automática de información mediante RPA.',
        'Descarga de recibos, facturas y estados de cuenta.',
        'Arquitectura Data Lakehouse y Data Warehouse.',
        'Gobierno, linaje, calidad y privacidad de datos.',
        'Dashboards ejecutivos y Business Intelligence en tiempo real.',
        'Modelos predictivos e inteligencia artificial aplicada.'
      ],
      services: [
        {
          icon: '⇣',
          title: '01. Ingesta y automatización RPA',
          description:
            'Robots de software que extraen y descargan información de portales externos, incluyendo recibos, facturas y estados de cuenta.'
        },
        {
          icon: '↻',
          title: 'Centralización automática',
          description:
            'Procesamiento de información sin intervención manual para agilizar operaciones, conciliaciones y pagos.'
        },
        {
          icon: '▤',
          title: '02. Arquitectura de datos',
          description:
            'Consolidación de información en arquitecturas Data Lakehouse y Data Warehouse con linaje y calidad.'
        },
        {
          icon: '◈',
          title: 'Gobierno de datos',
          description:
            'Marcos de gobierno de datos, seguridad, privacidad y cumplimiento normativo.'
        },
        {
          icon: '▥',
          title: '03. Analítica y Business Intelligence',
          description:
            'Dashboards ejecutivos en tiempo real para obtener visibilidad financiera y operativa.'
        },
        {
          icon: '✧',
          title: 'Inteligencia artificial',
          description:
            'Modelos predictivos e inteligencia artificial aplicada a la toma de decisiones.'
        }
      ]
    },

    {
      id: 'noc',
      number: '06',
      icon: '◉',
      title: 'Centro de Operaciones de Red',
      subtitle: 'Monitoreo, control y continuidad tecnológica.',
      description:
        'Supervisamos continuamente tu infraestructura tecnológica para identificar incidentes, analizar el rendimiento y mantener el control de tus servicios.',
      highlights: [
        'Monitoreo proactivo 24/7/365 de enlaces y dispositivos.',
        'Supervisión de routers, switches y servidores en tiempo real.',
        'Análisis de tráfico, latencia y ancho de banda.',
        'Ingenieros certificados N1, N2 y N3.',
        'Atención, escalamiento y resolución bajo SLA.',
        'KPIs y reportes ejecutivos de desempeño.'
      ],
      services: [
        {
          icon: '◉',
          title: 'Monitoreo proactivo 24/7',
          description:
            'Supervisión continua de enlaces, routers, switches y servidores en tiempo real.'
        },
        {
          icon: '⌁',
          title: 'Disponibilidad y rendimiento',
          description:
            'Análisis de tráfico, latencia, ancho de banda y generación de alertas automatizadas.'
        },
        {
          icon: '⌘',
          title: 'Ingeniería especializada',
          description:
            'Equipo certificado para diagnóstico remoto, mantenimiento preventivo y gestión de cambios.'
        },
        {
          icon: '↗',
          title: 'Atención y resolución bajo SLA',
          description:
            'Escalamiento rápido, soporte en sitio y remoto, de acuerdo con los niveles de servicio contratados.'
        },
        {
          icon: '▥',
          title: 'Operación continua',
          description:
            'Supervisión y seguimiento operativo 24/7/365.'
        },
        {
          icon: '▤',
          title: 'Reporteo ejecutivo',
          description:
            'Indicadores KPI, seguimiento de desempeño y reportes para la toma de decisiones.'
        }
      ],
      features: [
        'Operación continua: cobertura 24/7/365.',
        'Ingenieros certificados: niveles N1, N2 y N3.',
        'Atención garantizada: gestión y escalamiento bajo SLA.',
        'Reporteo ejecutivo: indicadores y seguimiento de KPIs.'
      ]
    }

  ];

  /* REFERENCIAS DEL DOM */
  const nodes = $$('.na-node');
  const info = $('#na-info-content');
  const infoNumber = $('#na-info-number');
  const coreSymbol = $('#na-core-symbol');
  const coreTitle = $('#na-core-title');
  const connectionGroup = $('#na-connection-lines');
  const serviceTrack = $('#na-service-track');
  const serviceCounter = $('#na-service-counter');
  const serviceProgress = $('#na-service-progress');
  const serviceCategory = $('#na-service-category');
  const viewport = $('#na-service-viewport');

  /* PARTÍCULAS DEL HERO */
  const particleContainer = $('#na-particles');
  if (particleContainer) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 32; i++) {
      const particle = document.createElement('span');
      particle.className = 'na-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * -8}s`;
      particle.style.animationDuration = `${5 + Math.random() * 6}s`;
      const size = 2 + Math.random() * 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      fragment.appendChild(particle);
    }
    particleContainer.appendChild(fragment);
  }

  /* CONEXIONES DEL NÚCLEO */
  function buildConnections() {
    if (!connectionGroup) return;
    connectionGroup.innerHTML = '';
    nodes.forEach((node,index) => {
      const x = parseFloat(node.style.getPropertyValue('--node-x'));
      const y = parseFloat(node.style.getPropertyValue('--node-y'));
      const line = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      line.setAttribute('x1','300');
      line.setAttribute('y1','300');
      line.setAttribute('x2',String(x * 6));
      line.setAttribute('y2',String(y * 6));
      line.setAttribute('class','na-connection');
      line.dataset.index = index;
      connectionGroup.appendChild(line);
    });
  }

  function activateConnection(index) {
    $$('.na-connection',connectionGroup || document).forEach(line => {
      line.classList.toggle(
        'active',
        Number(line.dataset.index) === index
      );
    });
  }

  /* DETALLE DE LA ESPECIALIDAD */
  let selectedSolution = 0;
  function renderSolution(index) {
    const solution = solutions[index];
    if (!solution || !info) return;
    info.innerHTML = `
      <div class="na-info-icon">${solution.icon}</div>
      <h3>
        ${solution.title}
        <span>${solution.subtitle}</span>
      </h3>
      <p class="na-info-description">
        ${solution.description}
      </p>
      <div class="na-info-highlights">
        ${solution.highlights.map(item => `
          <div class="na-info-highlight">
            <span>✦</span>
            <div>${item}</div>
          </div>
        `).join('')}
      </div>
    `;
    info.style.animation = 'none';
    void info.offsetWidth;
    info.style.animation = '';
    if (infoNumber) {
      infoNumber.textContent =
        `${solution.number} / 06`;
    }
    if (coreSymbol) {
      coreSymbol.textContent = solution.icon;
    }
    if (coreTitle) {
      coreTitle.textContent = solution.id.toUpperCase();
    }
    if (serviceCategory) {
      serviceCategory.textContent =
        solution.title.toUpperCase();
    }
  }

  /* NAVEGACIÓN RADIAL */
  function selectSolution(index) {
    if (!solutions[index]) return;
    selectedSolution = index;
    nodes.forEach((node,i) => {
      const active = i === index;
      node.classList.toggle('active',active);
      node.setAttribute(
        'aria-pressed',
        String(active)
      );
    });
    activateConnection(index);
    renderSolution(index);
    renderServices(index);
  }
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      selectSolution(Number(node.dataset.solution));
    });
  });

  /* CARRUSEL DE SERVICIOS */
  let serviceIndex = 0;
  let pointerStart = 0;
  let pointerLast = 0;
  let pointerActive = false;
  function visibleServices() {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }
  function renderServices(solutionIndex) {
    const solution = solutions[solutionIndex];
    if (!serviceTrack) return;
    serviceIndex = 0;
    serviceTrack.innerHTML = solution.services.map((service,index) => `
      <article class="na-service-card">
        <span class="na-service-number">
          ${solution.number} / ${String(index+1).padStart(2,'0')}
        </span>
        <div class="na-service-icon">
          ${service.icon}
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </article>
    `).join('');
    updateServices();
  }
  function updateServices() {
    if (!serviceTrack || !serviceTrack.children.length) return;
    const cards = $$('.na-service-card',serviceTrack);
    const visible = visibleServices();
    const maxIndex = Math.max(
      0,
      cards.length - visible
    );
    serviceIndex = Math.min(
      Math.max(0,serviceIndex),
      maxIndex
    );
    const width = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(
      getComputedStyle(serviceTrack).gap
    ) || 0;
    serviceTrack.style.transform =
      `translateX(-${serviceIndex * (width + gap)}px)`;
    if (serviceCounter) {
      serviceCounter.textContent =
        `${String(serviceIndex+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
    }
    if (serviceProgress) {
      const percentage = ((serviceIndex+1)/cards.length)*100;
      serviceProgress.style.width = `${percentage}%`;
    }
    const prevButton = $('#na-service-prev');
    const nextButton = $('#na-service-next');
    if (prevButton) {
      prevButton.disabled = serviceIndex === 0;
    }
    if (nextButton) {
      nextButton.disabled = serviceIndex >= maxIndex;
    }
  }

  /* CONTROLES DEL CARRUSEL */
  $('#na-service-prev')?.addEventListener('click',() => {
    serviceIndex--;
    updateServices();
  });
  $('#na-service-next')?.addEventListener('click',() => {
    serviceIndex++;
    updateServices();
  });

  /* ARRASTRE CON RATÓN Y TÁCTIL */
  if (viewport) {
    viewport.addEventListener('pointerdown',event => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointerStart = event.clientX;
      pointerLast = event.clientX;
      pointerActive = true;
      viewport.classList.add('dragging');
    });
    viewport.addEventListener('pointermove',event => {
      if (!pointerActive) return;
      pointerLast = event.clientX;
    });
    function finishDrag() {
      if (!pointerActive) return;
      const distance = pointerStart - pointerLast;
      if (Math.abs(distance) > 40) {
        const visible = visibleServices();
        const cards = $$('.na-service-card',serviceTrack);
        const maxIndex = Math.max(
          0,
          cards.length-visible
        );
        if (distance > 0) {
          serviceIndex = Math.min(
            maxIndex,
            serviceIndex+1
          );
        } else {
          serviceIndex = Math.max(
            0,
            serviceIndex-1
          );
        }
        updateServices();
      }
      pointerActive = false;
      viewport.classList.remove('dragging');
    }
    viewport.addEventListener('pointerup',finishDrag);
    viewport.addEventListener('pointercancel',finishDrag);
    viewport.addEventListener('lostpointercapture',finishDrag);
  }

  /* ANIMACIÓN DE MOVIMIENTO DEL HERO */
  const hero = $('.na-hero');
  const heroVisual = $('.na-hero-visual');
  if (hero && heroVisual) {
    const motionEnabled =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motionEnabled) {
      hero.addEventListener('pointermove',event => {
        if (event.pointerType === 'touch') return;
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - .5) * 5;
        const rotateX = (.5 - y) * 5;
        heroVisual.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      hero.addEventListener('pointerleave',() => {
        heroVisual.style.transform =
          'perspective(1000px) rotateX(0) rotateY(0)';
      });
    }
  }

  /* CAMBIOS DE TAMAÑO */
  let resizeTimer;
  window.addEventListener('resize',() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateServices();
    },150);
  });

  /* INICIALIZACIÓN */
  buildConnections();
  selectSolution(0);
  updateServices();

  nodes.forEach((node,index) => {
    node.addEventListener('keydown',event => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' ||
          event.key === 'ArrowDown') {
        nextIndex = (index+1)%nodes.length;
      } else if (
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowUp'
      ) {
        nextIndex = (index-1+nodes.length)%nodes.length;
      } else {
        return;
      }
      event.preventDefault();
      nodes[nextIndex].focus();
      selectSolution(nextIndex);
    });
  });

});

