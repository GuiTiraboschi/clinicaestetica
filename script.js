/**
 * PROTOCOLO RENASCE® FACIAL — DRA. ÉMILLE NASCIMENTO
 * JavaScript Modular, Leve e Acessível
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initProtocolTabs();
  initTreatmentsAccordion();
  initContactForm();
  initScrollTop();
  initScrollAnimations();
  initSmoothScrollLinks();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & SCROLL BEHAVIOR
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION MENU
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (!menuToggle || !mobileNav) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
    menuToggle.classList.toggle('active', isOpen);
    mobileNav.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   3. PROTOCOL TABS (FAIXA ETÁRIA: 25+, 30+, 40+, 50+)
   -------------------------------------------------------------------------- */
function initProtocolTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const protocolCards = document.querySelectorAll('.protocol-card');
  const ctaProtocolLink = document.querySelector('#protocolAgeCta');

  if (!tabButtons.length || !protocolCards.length) return;

  const updateWhatsAppAgeText = (ageGroup) => {
    if (!ctaProtocolLink) return;
    const baseNumber = '5564999477070';
    const message = encodeURIComponent(`Olá, Dra. Émille! Gostaria de saber mais e agendar uma avaliação para o Protocolo ReNasce® ${ageGroup}.`);
    ctaProtocolLink.href = `https://wa.me/${baseNumber}?text=${message}`;
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetAge = button.getAttribute('data-target');

      // Update button active state
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Update active card
      protocolCards.forEach(card => {
        if (card.id === `protocol-${targetAge}`) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      // Update CTA with specific age message
      updateWhatsAppAgeText(targetAge);
    });
  });
}

/* --------------------------------------------------------------------------
   4. ACCORDION TRATAMENTOS REGENERATIVOS
   -------------------------------------------------------------------------- */
function initTreatmentsAccordion() {
  const accordionItems = document.querySelectorAll('.treatment-accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.treatment-accordion-header');
    const body = item.querySelector('.treatment-accordion-body');

    if (!header || !body) return;

    // Set initial heights
    if (item.classList.contains('active')) {
      body.style.maxHeight = body.scrollHeight + 'px';
    } else {
      body.style.maxHeight = '0px';
    }

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Toggle this item
      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = '0px';
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 30 + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Recalculate heights on window resize
  window.addEventListener('resize', () => {
    accordionItems.forEach(item => {
      if (item.classList.contains('active')) {
        const body = item.querySelector('.treatment-accordion-body');
        if (body) {
          body.style.maxHeight = body.scrollHeight + 30 + 'px';
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE WHATSAPP CONTACT FORM
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('#whatsappInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#formName')?.value.trim() || '';
    const phone = form.querySelector('#formPhone')?.value.trim() || '';
    const protocol = form.querySelector('#formProtocol')?.value || 'Protocolo ReNasce® Facial';
    const message = form.querySelector('#formMessage')?.value.trim() || '';

    let text = `Olá, Dra. Émille! Vim pelo site institucional.\n`;
    text += `*Nome:* ${name}\n`;
    if (phone) text += `*Telefone:* ${phone}\n`;
    text += `*Interesse:* ${protocol}\n`;
    if (message) text += `*Mensagem:* ${message}\n`;
    text += `Gostaria de agendar minha avaliação.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5564999477070?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

/* --------------------------------------------------------------------------
   6. SCROLL TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.querySelector('.btn-scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   7. SCROLL INTERSECTION OBSERVER (FADE-UP ANIMATIONS)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('in-view'));
    return;
  }

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. ACTIVE NAV LINK ON SCROLL & SMOOTH CLICK
   -------------------------------------------------------------------------- */
function initSmoothScrollLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
