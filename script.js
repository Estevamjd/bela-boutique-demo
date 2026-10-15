const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  mobileNav.hidden = true;
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  mobileNav.hidden = isOpen;
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const groups = [...document.querySelectorAll('.service-group')];
groups.forEach((group) => group.addEventListener('toggle', () => {
  if (group.open) groups.filter((other) => other !== group).forEach((other) => { other.open = false; });
}));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach((item) => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.image;
  lightboxImage.alt = item.dataset.alt;
  lightbox.showModal();
  document.body.classList.add('no-scroll');
}));
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('close', () => {
  document.body.classList.remove('no-scroll');
  lightboxImage.removeAttribute('src');
});

const contactDialog = document.querySelector('.contact-dialog');
contactDialog.querySelector('.contact-close').addEventListener('click', () => contactDialog.close());
contactDialog.querySelector('.contact-ok').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('click', (event) => { if (event.target === contactDialog) contactDialog.close(); });

const number = String(window.BELA_BOUTIQUE_WHATSAPP || '').replace(/\D/g, '');
const message = String(window.BELA_BOUTIQUE_MENSAGEM || 'Olá! Gostaria de conhecer os serviços da Bela Boutique.');
document.querySelectorAll('.whatsapp-link').forEach((link) => {
  if (number) {
    link.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      closeMenu();
      contactDialog.showModal();
    });
  }
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px 50px 0px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}
