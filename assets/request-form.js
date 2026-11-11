(() => {
  const buttons = document.querySelectorAll('[data-open-request]');
  if (!buttons.length) return;
  const formUrl = "https://forms.yandex.ru/u/6af44e7d9029022fba076535/";
  const iframeUrl = "https://forms.yandex.ru/u/6af44e7d9029022fba076535/?iframe=1&theme=light";
  const dialog = document.createElement('dialog');
  dialog.className = 'request-modal';
  dialog.setAttribute('aria-labelledby', 'request-modal-title');
  dialog.innerHTML = `<div class="request-modal-inner">
    <button class="request-modal-close" type="button" aria-label="Закрыть форму">×</button>
    <h2 id="request-modal-title">Оставить заявку</h2>
    <p class="request-modal-intro">Укажите ФИО и телефон — Светлана Рудакова свяжется с вами.</p>
    <iframe title="Форма заявки" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
    <div class="request-modal-links"><a href="/consent/" target="_blank" rel="noopener">Текст согласия на обработку персональных данных</a><a href="/privacy-policy/" target="_blank" rel="noopener">Политика обработки персональных данных</a><a href="${formUrl}" target="_blank" rel="noopener">Открыть форму отдельно</a></div>
  </div>`;
  document.body.append(dialog);
  const frame = dialog.querySelector('iframe');
  const close = dialog.querySelector('.request-modal-close');
  let previousFocus = null;
  buttons.forEach(button => button.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    previousFocus = button;
    if (!frame.src) frame.src = iframeUrl;
    dialog.showModal();
    document.body.classList.add('request-modal-open');
    close.focus();
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('request-modal-open');
    previousFocus?.focus();
  });
})();
