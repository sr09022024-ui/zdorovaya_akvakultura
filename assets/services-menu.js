(() => {
  const navigationMenus = [
    {
      selector: '.navlinks > a[href="/uslugi-ihtiopatologa/"]',
      label: 'Услуги',
      labelForScreenReader: 'Открыть список услуг',
      hasOverview: true,
      links: [
        ['/uslugi-ihtiopatologa/', 'Все услуги'],
        ['/konsultaciya-ihtiopatologa/', 'Консультация ихтиопатолога'],
        ['/audit-biobezopasnosti-rybovodnogo-hozyaystva/', 'Аудит биобезопасности'],
        ['/soprovozhdenie-rybovodnogo-hozyaystva/', 'Сопровождение хозяйства']
      ]
    },
    {
      selector: '.navlinks > a[href="/#tariffs"]',
      label: 'Тарифы',
      labelForScreenReader: 'Открыть список тарифов',
      links: [
        ['/tarif-standart/', 'Стандарт'],
        ['/tarif-optimalnyj/', 'Оптимальный'],
        ['/tarif-vip/', 'VIP']
      ]
    }
  ];

  navigationMenus.forEach(({ selector, label, labelForScreenReader, hasOverview, links }) => {
    document.querySelectorAll(selector).forEach((link) => {
      const menu = document.createElement('div');
      menu.className = `services-menu${hasOverview ? ' has-overview' : ''}`;
      menu.innerHTML = `
        <button class="services-menu__button" type="button" aria-haspopup="true" aria-expanded="false" aria-label="${labelForScreenReader}">${label}</button>
        <div class="services-menu__panel">${links.map(([href, text]) => `<a href="${href}">${text}</a>`).join('')}</div>`;
      const currentItem = menu.querySelector(`a[href="${window.location.pathname}"]`);
      if (currentItem) {
        menu.classList.add('is-active');
        currentItem.setAttribute('aria-current', 'page');
      }
      link.replaceWith(menu);
    });
  });

  document.querySelectorAll('.services-menu').forEach((menu) => {
    const button = menu.querySelector('.services-menu__button');
    if (!button) return;

    const setExpanded = (isExpanded) => button.setAttribute('aria-expanded', String(isExpanded));
    menu.addEventListener('mouseenter', () => setExpanded(true));
    menu.addEventListener('mouseleave', () => setExpanded(false));
    menu.addEventListener('focusin', () => setExpanded(true));
    menu.addEventListener('focusout', () => {
      requestAnimationFrame(() => setExpanded(menu.contains(document.activeElement)));
    });
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') button.blur();
    });
  });

  const blogGrid = document.querySelector('.post-grid');
  const addBlogCard = (href, markup) => {
    if (!blogGrid || blogGrid.querySelector(`[href="${href}"]`)) return;
    const card = document.createElement('article');
    card.className = 'post-card';
    card.innerHTML = markup;
    blogGrid.prepend(card);
  };

  addBlogCard('/blog/kogda-bit-trevogu-pri-othode-ryby/', `<a class="post-open" href="/blog/kogda-bit-trevogu-pri-othode-ryby/"><span class="post-image"><img src="/blog-fish-sampling.png" width="1672" height="941" alt="Рыба и набор для отбора диагностических проб" loading="lazy" decoding="async"></span><span class="post-copy"><span class="post-meta"><span>Диагностика</span><span>12 мин чтения</span></span><strong>Когда бить тревогу при увеличении отхода рыбы и как правильно отбирать пробы</strong><span class="post-excerpt">Когда увеличение отхода требует немедленных действий и как подготовить материал для лабораторной диагностики.</span><span class="post-more">Читать статью <b aria-hidden="true">→</b></span></span></a>`);
  addBlogCard('/blog/ihnv-genogruppy-e-i-u/', `<a class="post-open" href="/blog/ihnv-genogruppy-e-i-u/"><span class="post-image"><img src="/blog-ihnv-forel.png" width="1672" height="941" alt="Экспериментальный аквариум с молодью форели, образцами и графиком наблюдений" loading="lazy" decoding="async"></span><span class="post-copy"><span class="post-meta"><span>Вирусные болезни</span><span>9 мин чтения</span></span><strong>IHNV у радужной форели: что показал эксперимент с геногруппами E и U</strong><span class="post-excerpt">Главные результаты исследования и практические выводы для контроля рисков на хозяйстве.</span><span class="post-more">Читать статью <b aria-hidden="true">→</b></span></span></a>`);
  addBlogCard('/blog/iodinol-obrabotka-ikry-foreli/', `<a class="post-open" href="/blog/iodinol-obrabotka-ikry-foreli/"><span class="post-image"><img src="/blog-iodinol-ikra.png" width="1672" height="941" alt="Икра радужной форели в инкубационной ёмкости и раствор для обработки" loading="lazy" decoding="async"></span><span class="post-copy"><span class="post-meta"><span>Биобезопасность</span><span>8 мин чтения</span></span><strong>Йодинол для обработки икры форели: что показал эксперимент</strong><span class="post-excerpt">Безопасность обработки икры и результаты против трёх вирусов рыб — краткий разбор исследования.</span><span class="post-more">Читать статью <b aria-hidden="true">→</b></span></span></a>`);
  addBlogCard('/blog/algoritm-deystviy-pri-othode-ryby/', `<a class="post-open" href="/blog/algoritm-deystviy-pri-othode-ryby/"><span class="post-image"><img src="/blog-algoritm-otkhod-ryby.png" width="1672" height="941" alt="Бассейн с рыбой, приборы контроля воды и чек-лист действий" loading="lazy" decoding="async"></span><span class="post-copy"><span class="post-meta"><span>Практика и диагностика</span><span>9 мин чтения</span></span><strong>Растёт отход рыбы: алгоритм первых действий на хозяйстве</strong><span class="post-excerpt">Что проверить в воде, когда отбирать рыбу и в каких случаях срочно нужна диагностика.</span><span class="post-more">Читать статью <b aria-hidden="true">→</b></span></span></a>`);
  if (blogGrid) {
    const count = document.querySelector('.hero-facts span');
    if (count) count.textContent = '10 материалов';
  }

  const tariffLinks = [
    ['/tarif-standart/', 'Подробнее о тарифе «Стандарт»'],
    ['/tarif-optimalnyj/', 'Подробнее о тарифе «Оптимальный»'],
    ['/tarif-vip/', 'Подробнее о тарифе VIP']
  ];
  document.querySelectorAll('#tariffs .price-card').forEach((card, index) => {
    const [href, label] = tariffLinks[index] || [];
    if (!href || card.querySelector(`a[href="${href}"]`)) return;
    const button = document.createElement('a');
    button.className = 'btn primary';
    button.href = href;
    button.textContent = 'Подробнее о тарифе';
    button.setAttribute('aria-label', label);
    card.append(button);
  });
})();
