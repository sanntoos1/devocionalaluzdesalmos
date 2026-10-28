(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    }));
  }

  const revealItems = document.querySelectorAll('.benefit, .content-copy, .psalm-card, .offer-card, .faq-list details, .intro-copy');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach(item => item.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  }

  // Configure aqui o link real do checkout antes de publicar.
  const CHECKOUT_URL = 'https://pay.cakto.com.br/39gjigp_1252858';
  const buyButton = document.querySelector('#buyButton');
  if (buyButton) {
    buyButton.addEventListener('click', event => {
      if (CHECKOUT_URL.trim()) {
        event.preventDefault();
        window.location.href = CHECKOUT_URL;
      } else {
        event.preventDefault();
        const card = document.querySelector('.offer-card-content');
        let notice = document.querySelector('.checkout-warning');
        if (!notice) {
          notice = document.createElement('p');
          notice.className = 'checkout-warning';
          notice.setAttribute('role', 'status');
          notice.textContent = 'O link de pagamento ainda não foi configurado. Adicione a URL do seu checkout no arquivo script.js antes de publicar a página.';
          card.appendChild(notice);
        }
        notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
})();
