(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const body = document.body;
  const menuButton = $('[data-menu-toggle]');
  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const open = body.classList.toggle('nav-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  $$('.nav-link').forEach((link) => {
    link.addEventListener('click', () => body.classList.remove('nav-open'));
  });

  const currentPage = document.body.dataset.page;
  $$('.nav-link[data-page]').forEach((link) => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

  $$('.copy-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = button.dataset.copyTarget ? $(button.dataset.copyTarget) : button.closest('.code-panel')?.querySelector('pre');
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.innerText);
        const original = button.textContent;
        button.textContent = 'COPIADO';
        button.dataset.copied = 'true';
        setTimeout(() => { button.textContent = original; button.dataset.copied = 'false'; }, 1300);
      } catch {
        button.textContent = 'SELECCIONA';
      }
    });
  });

  $$('.example-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const group = tab.closest('[data-example-group]');
      if (!group) return;
      const targetId = tab.dataset.target;
      $$('.example-tab', group).forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      $$('.example-content', group).forEach((content) => {
        content.classList.toggle('active', content.id === targetId);
      });
    });
  });

  const searchInput = $('[data-global-search]');
  const searchResults = $('[data-search-results]');
  const searchIndex = $$('.search-target').map((element) => ({
    title: element.dataset.searchTitle || element.querySelector('h2,h3,h4')?.textContent?.trim() || 'Sección',
    text: element.dataset.searchText || element.textContent?.slice(0, 220).trim() || '',
    href: `#${element.id}`,
  }));
  const renderSearch = (value) => {
    if (!searchResults) return;
    const query = value.trim().toLowerCase();
    if (!query) {
      searchResults.classList.remove('open');
      searchResults.innerHTML = '';
      return;
    }
    const matches = searchIndex.filter((item) => `${item.title} ${item.text}`.toLowerCase().includes(query)).slice(0, 8);
    searchResults.innerHTML = matches.length
      ? matches.map((item) => `<a class="search-result" href="${item.href}"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.text)}</span></a>`).join('')
      : '<div class="search-result"><strong>Sin coincidencias</strong><span>Prueba con “slider”, “icons”, “theme” o “flag”.</span></div>';
    searchResults.classList.add('open');
  };
  if (searchInput) {
    searchInput.addEventListener('input', () => renderSearch(searchInput.value));
    searchInput.addEventListener('focus', () => renderSearch(searchInput.value));
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        searchInput.value = '';
        renderSearch('');
        searchInput.blur();
      }
    });
  }
  document.addEventListener('click', (event) => {
    if (searchResults && !event.target.closest('.search-wrap')) searchResults.classList.remove('open');
  });
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      searchInput?.focus();
    }
  });

  const iconGrid = $('[data-icon-grid]');
  if (iconGrid) {
    const iconSearch = $('[data-icon-search]');
    const iconSet = $('[data-icon-set]');
    const iconCount = $('[data-icon-count]');
    const iconDataUrl = iconGrid.dataset.icons || 'icons.json';
    let catalog = null;
    let renderTimer;
    fetch(iconDataUrl)
      .then((response) => response.json())
      .then((data) => {
        catalog = data;
        iconSet.innerHTML = '<option value="all">Todos los sets</option>' + Object.keys(data.sets).map((set) => `<option value="${set}">${set} · ${data.sets[set].length.toLocaleString('es-ES')}</option>`).join('');
        renderIcons();
      })
      .catch(() => {
        iconGrid.innerHTML = '<div class="icon-empty">No se pudo cargar <code>icons.json</code>. Sirve la carpeta con un servidor local para habilitar el catálogo.</div>';
      });
    const renderIcons = () => {
      if (!catalog) return;
      const query = (iconSearch?.value || '').trim().toLowerCase();
      const selectedSet = iconSet?.value || 'all';
      const source = selectedSet === 'all' ? Object.entries(catalog.sets).flatMap(([set, entries]) => entries.map((entry) => ({ ...entry, source: set }))) : (catalog.sets[selectedSet] || []);
      const filtered = source.filter((entry) => !query || entry.name.toLowerCase().includes(query)).slice(0, 180);
      const totalMatches = source.filter((entry) => !query || entry.name.toLowerCase().includes(query)).length;
      if (iconCount) iconCount.textContent = `${totalMatches.toLocaleString('es-ES')} resultados · mostrando ${filtered.length.toLocaleString('es-ES')}`;
      iconGrid.innerHTML = filtered.length
        ? filtered.map((entry) => `<button class="icon-item" type="button" data-icon-name="${escapeAttr(entry.name)}" data-icon-source="${escapeAttr(entry.source)}" title="Copiar ${escapeAttr(entry.name)}"><span class="icon-glyph">✦</span><span class="icon-name">${escapeHtml(entry.name)}</span><span class="icon-id">${escapeHtml(entry.source)} · ${escapeHtml(String(entry.image || 'sprite'))}</span></button>`).join('')
        : '<div class="icon-empty">No hay iconos que coincidan con esa búsqueda.</div>';
      $$('.icon-item', iconGrid).forEach((item) => item.addEventListener('click', async () => {
        const value = item.dataset.iconName;
        try { await navigator.clipboard.writeText(value); } catch { /* El botón sigue siendo útil aunque el portapapeles esté bloqueado. */ }
        const glyph = $('.icon-glyph', item);
        if (glyph) { glyph.textContent = '✓'; setTimeout(() => { glyph.textContent = '✦'; }, 850); }
      }));
    };
    const scheduleRender = () => { clearTimeout(renderTimer); renderTimer = setTimeout(renderIcons, 90); };
    iconSearch?.addEventListener('input', scheduleRender);
    iconSet?.addEventListener('change', renderIcons);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }
  function escapeAttr(value) { return escapeHtml(value); }
})();
