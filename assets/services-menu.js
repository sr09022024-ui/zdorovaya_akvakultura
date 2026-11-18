(() => {
  const menuMarkup = `
    <button class="services-menu__button" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Открыть список услуг">Услуги</button>
    <div class="services-menu__panel">
      <a href="/uslugi-ihtiopatologa/">Все услуги</a>
      <a href="/konsultaciya-ihtiopatologa/">Консультация ихтиопатолога</a>
      <a href="/audit-biobezopasnosti-rybovodnogo-hozyaystva/">Аудит биобезопасности</a>
      <a href="/soprovozhdenie-rybovodnogo-hozyaystva/">Сопровождение хозяйства</a>
    </div>`;

  document.querySelectorAll('.navlinks > a[href="/uslugi-ihtiopatologa/"]').forEach((link) => {
    const menu = document.createElement('div');
    menu.className = 'services-menu';
    menu.innerHTML = menuMarkup;
    const currentItem = menu.querySelector(`a[href="${window.location.pathname}"]`);
    if (currentItem) {
      menu.classList.add('is-active');
      currentItem.setAttribute('aria-current', 'page');
    }
    link.replaceWith(menu);
  });

  const closeMenu = (menu) => {
    menu.classList.remove('is-open');
    const button = menu.querySelector('.services-menu__button');
    if (button) button.setAttribute('aria-expanded', 'false');
  };

  document.querySelectorAll('.services-menu').forEach((menu) => {
    const button = menu.querySelector('.services-menu__button');
    if (!button) return;

    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !menu.classList.contains('is-open');
      document.querySelectorAll('.services-menu.is-open').forEach(closeMenu);
      if (willOpen) {
        menu.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        menu.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        menu.querySelector('.services-menu__panel a')?.focus();
      }
      if (event.key === 'Escape') closeMenu(menu);
    });
  });

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.services-menu.is-open').forEach((menu) => {
      if (!menu.contains(event.target)) closeMenu(menu);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') document.querySelectorAll('.services-menu.is-open').forEach(closeMenu);
  });

  const blogGrid = document.querySelector('.post-grid');
  if (blogGrid && !blogGrid.querySelector('[href="/blog/kogda-bit-trevogu-pri-othode-ryby/"]')) {
    const card = document.createElement('article');
    card.className = 'post-card';
    card.innerHTML = `<a class="post-open" href="/blog/kogda-bit-trevogu-pri-othode-ryby/"><span class="post-image"><img src="/blog-fish-sampling.png" width="1672" height="941" alt="Рыба и набор для отбора диагностических проб" loading="lazy" decoding="async"></span><span class="post-copy"><span class="post-meta"><span>Диагностика</span><span>12 мин чтения</span></span><strong>Когда бить тревогу при увеличении отхода рыбы и как правильно отбирать пробы</strong><span class="post-excerpt">Когда увеличение отхода требует немедленных действий и как подготовить материал для лабораторной диагностики.</span><span class="post-more">Читать статью <b aria-hidden="true">→</b></span></span></a>`;
    blogGrid.prepend(card);
    const count = document.querySelector('.hero-facts span');
    if (count) count.textContent = '7 материалов';
  }
})();
