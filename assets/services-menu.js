(() => {
  document.querySelectorAll('.navlinks').forEach((navigation) => {
    const reviewsLink = navigation.querySelector('a[href="/#reviews"]');
    const faqLink = navigation.querySelector('a[href="/#faq"]');
    const blogLink = navigation.querySelector('a[href="/blog/"]');

    reviewsLink?.remove();
    faqLink?.remove();

    if (!navigation.querySelector('a[href="/ob-eksperte/"]')) {
      const expertLink = document.createElement('a');
      expertLink.href = '/ob-eksperte/';
      expertLink.textContent = 'Об эксперте';
      if (window.location.pathname === '/ob-eksperte/') {
        expertLink.classList.add('active');
        expertLink.setAttribute('aria-current', 'page');
      }
      if (blogLink) {
        navigation.insertBefore(expertLink, blogLink);
      } else {
        navigation.append(expertLink);
      }
    }
  });

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
  addBlogCard('/blog/ihnv-v-rossii-molekulyarnaya-epidemiologiya/', `<a class="post-open" href="/blog/ihnv-v-rossii-molekulyarnaya-epidemiologiya/"><span class="post-image"><img src="/blog-ihnv-rossia-genetika.png" width="1672" height="941" alt="Радужная форель, генетическое дерево и маршруты распространения вируса" loading="lazy" decoding="async"></span><span class="post-copy"><span class="post-meta"><span>Вирусные болезни</span><span>9 мин чтения</span></span><strong>IHNV в России: что показал генетический анализ изолятов форели</strong><span class="post-excerpt">Две геногруппы, вероятные пути заноса вируса и выводы для биобезопасности хозяйств.</span><span class="post-more">Читать статью <b aria-hidden="true">→</b></span></span></a>`);
  if (blogGrid) {
    const count = document.querySelector('.hero-facts span');
    if (count) count.textContent = '11 материалов';
  }

  const articleConnections = {
    '/blog/algoritm-deystviy-pri-othode-ryby/': [
      ['/konsultaciya-ihtiopatologa/', 'Консультация ихтиопатолога — оценить ситуацию при росте отхода'],
      ['/audit-biobezopasnosti-rybovodnogo-hozyaystva/', 'Аудит биобезопасности рыбоводного хозяйства'],
      ['/blog/kogda-bit-trevogu-pri-othode-ryby/', 'Как правильно отбирать пробы при увеличении отхода рыбы']
    ],
    '/blog/antibiotiki-v-rybovodstve/': [
      ['/konsultaciya-ihtiopatologa/', 'Консультация ихтиопатолога по диагностике и лечению'],
      ['/soprovozhdenie-rybovodnogo-hozyaystva/', 'Сопровождение хозяйства: профилактика вместо постоянного лечения'],
      ['/blog/autovakciny-dlya-ryb/', 'Аутовакцины для рыб: когда индивидуальный подход оправдан']
    ],
    '/blog/autovakciny-dlya-ryb/': [
      ['/konsultaciya-ihtiopatologa/', 'Консультация ихтиопатолога по диагностике и профилактике'],
      ['/audit-biobezopasnosti-rybovodnogo-hozyaystva/', 'Аудит биобезопасности перед планированием профилактики'],
      ['/blog/antibiotiki-v-rybovodstve/', 'Антибиотики в рыбоводстве не заменяют профилактику']
    ],
    '/blog/dezkovrik-v-rybovodnom-hozyaystve/': [
      ['/audit-biobezopasnosti-rybovodnogo-hozyaystva/', 'Аудит биобезопасности рыбоводного хозяйства'],
      ['/soprovozhdenie-rybovodnogo-hozyaystva/', 'Сопровождение хозяйства и контроль санитарных мероприятий'],
      ['/blog/iodinol-obrabotka-ikry-foreli/', 'Йодинол для обработки икры форели: что показал эксперимент']
    ],
    '/blog/ihnv-genogruppy-e-i-u/': [
      ['/audit-biobezopasnosti-rybovodnogo-hozyaystva/', 'Аудит биобезопасности при рисках вирусных инфекций'],
      ['/konsultaciya-ihtiopatologa/', 'Консультация ихтиопатолога по диагностике вирусных болезней'],
      ['/blog/ihnv-v-rossii-molekulyarnaya-epidemiologiya/', 'IHNV в России: что показал генетический анализ изолятов форели']
    ],
    '/blog/ihnv-v-rossii-molekulyarnaya-epidemiologiya/': [
      ['/audit-biobezopasnosti-rybovodnogo-hozyaystva/', 'Аудит биобезопасности при рисках заноса вируса'],
      ['/soprovozhdenie-rybovodnogo-hozyaystva/', 'Сопровождение хозяйства: контроль критичных точек'],
      ['/blog/ihnv-genogruppy-e-i-u/', 'IHNV у радужной форели: что показал эксперимент с геногруппами E и U']
    ],
    '/blog/iodinol-obrabotka-ikry-foreli/': [
      ['/audit-biobezopasnosti-rybovodnogo-hozyaystva/', 'Аудит биобезопасности инкубационного участка'],
      ['/soprovozhdenie-rybovodnogo-hozyaystva/', 'Сопровождение хозяйства и контроль профилактических мер'],
      ['/blog/dezkovrik-v-rybovodnom-hozyaystve/', 'Дезковрик в рыбоводном хозяйстве: как превратить раствор в реальный барьер']
    ],
    '/blog/kogda-bit-trevogu-pri-othode-ryby/': [
      ['/konsultaciya-ihtiopatologa/', 'Консультация ихтиопатолога при росте отхода'],
      ['/audit-biobezopasnosti-rybovodnogo-hozyaystva/', 'Аудит биобезопасности и диагностика рисков'],
      ['/blog/algoritm-deystviy-pri-othode-ryby/', 'Растёт отход рыбы: алгоритм первых действий на хозяйстве']
    ],
    '/blog/mikotoksiny-v-korme-dlya-ryby/': [
      ['/konsultaciya-ihtiopatologa/', 'Консультация ихтиопатолога по оценке причин проблем'],
      ['/soprovozhdenie-rybovodnogo-hozyaystva/', 'Сопровождение хозяйства: регулярный контроль показателей'],
      ['/blog/pochemu-analizy-ryby-raznye/', 'Почему анализы рыбы из одного бассейна дают разные результаты']
    ],
    '/blog/pochemu-analizy-ryby-raznye/': [
      ['/konsultaciya-ihtiopatologa/', 'Консультация ихтиопатолога по организации диагностики'],
      ['/soprovozhdenie-rybovodnogo-hozyaystva/', 'Сопровождение хозяйства и контроль данных'],
      ['/blog/kogda-bit-trevogu-pri-othode-ryby/', 'Когда бить тревогу при увеличении отхода рыбы и как правильно отбирать пробы']
    ]
  };

  const connectionLinks = articleConnections[window.location.pathname];
  const articleAuthor = document.querySelector('article.article-content .article-author');
  if (connectionLinks && articleAuthor && !document.querySelector('.article-links')) {
    const panel = document.createElement('aside');
    panel.className = 'article-links';
    panel.setAttribute('aria-labelledby', 'article-links-title');
    panel.innerHTML = `<strong id="article-links-title">По теме</strong><ul>${connectionLinks.map(([href, text]) => `<li><a href="${href}">${text}</a></li>`).join('')}</ul>`;
    articleAuthor.before(panel);

    const style = document.createElement('style');
    style.textContent = '.article-links{margin:38px 0 40px;padding:22px 24px;border:1px solid #dce7ed;border-radius:14px;background:#f7fbfc}.article-links strong{display:block;color:#0b3b5b;font-size:18px;line-height:1.3}.article-links ul{display:grid;gap:10px;margin:14px 0 0;padding:0;list-style:none}.article-links li{position:relative;padding-left:18px;color:#38536a}.article-links li:before{content:"→";position:absolute;left:0;color:#65a33f;font-weight:800}.article-links a{color:#0b3b5b;font-weight:700;text-decoration:underline;text-decoration-color:#9fc5d2;text-decoration-thickness:1px;text-underline-offset:3px}.article-links a:hover{color:#356f42;text-decoration-color:currentColor}@media(max-width:620px){.article-links{margin:30px 0 34px;padding:19px 20px}.article-links strong{font-size:17px}}';
    document.head.append(style);
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
