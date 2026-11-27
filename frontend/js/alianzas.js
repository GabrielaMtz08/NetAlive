(() => {
  const groups = [
    {
      id: 'compute',
      label: 'Cómputo y servidores',
      shortLabel: 'Cómputo',
      partners: [
        { name: 'Dell Technologies', credential: 'Gold Partner', scope: 'Cómputo, servidores y almacenamiento empresarial.' },
        { name: 'Hewlett Packard Enterprise', scope: 'Cómputo, servidores y almacenamiento empresarial.' },
        { name: 'Lanix', scope: 'Cómputo y equipos para entornos empresariales.' },
        { name: 'ASUS', scope: 'Cómputo y equipos para entornos empresariales.' },
        { name: 'Lenovo', scope: 'Cómputo, estaciones de trabajo y equipos empresariales.' }
      ]
    },
    {
      id: 'networks',
      label: 'Redes, ciberseguridad y VoIP',
      shortLabel: 'Redes y seguridad',
      partners: [
        { name: 'Cisco', credential: 'Cisco Partner', scope: 'Redes e infraestructura de comunicación empresarial.' },
        { name: 'Cisco Meraki', scope: 'Redes y conectividad empresarial.' },
        { name: 'Fortinet', scope: 'Ciberseguridad e infraestructura de red.' },
        { name: 'Huawei', scope: 'Redes y conectividad empresarial.' },
        { name: 'Ubiquiti', scope: 'Redes y conectividad inalámbrica.' },
        { name: 'Ruckus Wireless', scope: 'Redes inalámbricas empresariales.' },
        { name: 'Sophos', scope: 'Ciberseguridad.' },
        { name: 'Grandstream', scope: 'Telefonía IP y comunicaciones.' }
      ]
    },
    {
      id: 'virtualization',
      label: 'Virtualización, nube y respaldo',
      shortLabel: 'Nube y virtualización',
      partners: [
        { name: 'VMware by Broadcom', scope: 'Virtualización empresarial, redes definidas por software e hiperconvergencia.' },
        { name: 'Veeam', scope: 'Respaldo y continuidad de datos.' },
        { name: 'Nutanix', scope: 'Infraestructura hiperconvergente y virtualización.' },
        { name: 'Microsoft Hyper-V', scope: 'Virtualización integrada con entornos Windows Server.' },
        { name: 'Proxmox', scope: 'Virtualización de máquinas y contenedores.' },
        { name: 'Red Hat', scope: 'Plataformas empresariales para contenedores y nube híbrida.' }
      ]
    },
    {
      id: 'cabling',
      label: 'Cableado estructurado',
      shortLabel: 'Cableado',
      partners: [
        { name: 'Panduit', scope: 'Cableado estructurado e infraestructura de conectividad.' },
        { name: 'Belden', scope: 'Cableado estructurado e infraestructura de conectividad.' },
        { name: 'Siemon', scope: 'Cableado estructurado e infraestructura de conectividad.' },
        { name: 'LinkedPro', scope: 'Cableado estructurado e infraestructura de conectividad.' }
      ]
    },
    {
      id: 'power',
      label: 'Energía y respaldo',
      shortLabel: 'Energía',
      partners: [
        { name: 'Tripp Lite', scope: 'Energía y respaldo para infraestructura tecnológica.' },
        { name: 'CDP', scope: 'Energía y respaldo para infraestructura tecnológica.' },
        { name: 'APC', scope: 'Energía y respaldo para infraestructura tecnológica.' },
        { name: 'Epcom Power Line', scope: 'Energía y respaldo para infraestructura tecnológica.' },
        { name: 'CyberPower', scope: 'Energía y respaldo para infraestructura tecnológica.' }
      ]
    },
    {
      id: 'physical-security',
      label: 'Videovigilancia y control de acceso',
      shortLabel: 'Seguridad física',
      partners: [
        { name: 'Hikvision', scope: 'Videovigilancia y control de acceso.' },
        { name: 'Dahua Technology', scope: 'Videovigilancia y control de acceso.' },
        { name: 'Hanwha Vision', scope: 'Videovigilancia y control de acceso.' },
        { name: 'ZKTeco', scope: 'Control de acceso y gestión de asistencia.' },
        { name: 'HID', scope: 'Control de acceso e identificación.' },
        { name: 'CAME', scope: 'Control de acceso.' },
        { name: 'Honeywell', scope: 'Videovigilancia y control de acceso.' }
      ]
    },
    {
      id: 'telecom',
      label: 'Conectividad y comunicaciones',
      shortLabel: 'Telecom',
      partners: [
        { name: 'Alestra', scope: 'Enlaces dedicados y redes privadas multisucursal.' },
        { name: 'Net2phone', scope: 'Telefonía en la nube, UCaaS y Contact Center omnicanal.' }
      ]
    }
  ];

  const filterContainer = document.querySelector('#alliance-filters');
  const mapContainer = document.querySelector('#category-map');
  const searchInput = document.querySelector('#alliance-search');
  const resultsGrid = document.querySelector('#partner-grid');
  const resultCount = document.querySelector('#alliance-result-count');
  const emptyState = document.querySelector('#alliance-empty');
  const clearButton = document.querySelector('#alliance-clear');

  if (!filterContainer || !mapContainer || !searchInput || !resultsGrid || !resultCount || !emptyState) return;

  let selectedCategory = 'all';
  const allCategory = { id: 'all', label: 'Todas las categorías', shortLabel: 'Todas' };
  const allCategories = [allCategory, ...groups];
  const partners = groups.flatMap(group => group.partners.map(partner => ({ ...partner, group })));

  function normalize(value) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es');
  }

  function createCategoryButton(category, index, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.dataset.category = category.id;
    button.setAttribute('aria-pressed', String(category.id === selectedCategory));

    if (className === 'alliance-map-button') {
      const number = document.createElement('span');
      number.className = 'alliance-map-button__number';
      number.textContent = category.id === 'all' ? '✳' : String(index).padStart(2, '0');
      number.setAttribute('aria-hidden', 'true');

      const label = document.createElement('span');
      label.className = 'alliance-map-button__label';
      label.textContent = category.shortLabel;
      button.append(number, label);
    } else {
      button.textContent = category.shortLabel;
    }

    return button;
  }

  function renderCategoryControls() {
    filterContainer.replaceChildren(
      ...allCategories.map((category, index) => createCategoryButton(category, index, 'alliance-filter'))
    );
    mapContainer.replaceChildren(
      ...allCategories.slice(1).map((category, index) => createCategoryButton(category, index + 1, 'alliance-map-button'))
    );
  }

  function createPartnerCard(partner, index) {
    const card = document.createElement('article');
    card.className = 'partner-card';
    card.dataset.category = partner.group.id;

    const top = document.createElement('div');
    top.className = 'partner-card__top';

    const name = document.createElement('h3');
    name.className = 'partner-card__name';
    name.textContent = partner.name;
    top.append(name);

    card.append(top);

    if (partner.credential) {
      const credential = document.createElement('p');
      credential.className = 'partner-card__credential';
      credential.textContent = partner.credential;
      card.append(credential);
    }

    const category = document.createElement('p');
    category.className = 'partner-card__category';
    category.textContent = partner.group.label;
    card.append(category);

    const detailId = `alliance-detail-${index}`;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'partner-card__toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', detailId);

    const toggleText = document.createElement('span');
    toggleText.textContent = 'Ver áreas relacionadas';
    const toggleIcon = document.createElement('span');
    toggleIcon.textContent = '+';
    toggleIcon.setAttribute('aria-hidden', 'true');
    toggle.append(toggleText, toggleIcon);

    const details = document.createElement('div');
    details.className = 'partner-card__details';
    details.id = detailId;
    details.hidden = true;
    const description = document.createElement('p');
    description.textContent = partner.scope;
    details.append(description);

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      details.hidden = isExpanded;
      toggleText.textContent = isExpanded ? 'Ver áreas relacionadas' : 'Ocultar áreas relacionadas';
    });

    card.append(toggle, details);
    return card;
  }

  function renderPartners() {
    const query = normalize(searchInput.value.trim());
    const visiblePartners = partners.filter(partner => {
      const categoryMatches = selectedCategory === 'all' || partner.group.id === selectedCategory;
      const searchableText = normalize([
        partner.name,
        partner.group.label,
        partner.scope,
        partner.credential || ''
      ].join(' '));
      return categoryMatches && (!query || searchableText.includes(query));
    });

    resultsGrid.replaceChildren(
      ...visiblePartners.map((partner, index) => createPartnerCard(partner, index))
    );

    emptyState.hidden = visiblePartners.length > 0;
    const countLabel = visiblePartners.length === 1 ? 'fabricante encontrado' : 'fabricantes encontrados';
    resultCount.textContent = `${visiblePartners.length} ${countLabel}`;

    filterContainer.querySelectorAll('[data-category]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.category === selectedCategory));
    });
    mapContainer.querySelectorAll('[data-category]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.category === selectedCategory));
    });
  }

  function selectCategory(categoryId) {
    if (categoryId !== 'all' && !groups.some(group => group.id === categoryId)) return;
    selectedCategory = categoryId;
    renderPartners();
  }

  filterContainer.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (button) selectCategory(button.dataset.category);
  });

  mapContainer.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (button) {
      selectCategory(button.dataset.category);
      document.querySelector('#ecosystem-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  searchInput.addEventListener('input', renderPartners);

  clearButton?.addEventListener('click', () => {
    searchInput.value = '';
    selectedCategory = 'all';
    renderPartners();
    searchInput.focus();
  });

  renderCategoryControls();
  renderPartners();
})();