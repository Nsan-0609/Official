const revealTargets = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealTargets.forEach((target) => observer.observe(target));

const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.tab;

    tabButtons.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });

    tabPanels.forEach((panel) => {
      panel.classList.remove('active');
    });

    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) targetPanel.classList.add('active');
  });
});

const faqItems = document.querySelectorAll('.faq-list details');

faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;

    faqItems.forEach((other) => {
      if (other !== item) other.removeAttribute('open');
    });
  });
});

const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const headerOffset = 84;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

const progressBar = document.querySelector('.scroll-progress span');
const backToTop = document.querySelector('.back-to-top');

const updateScrollUI = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) progressBar.style.width = `${Math.min(progress, 100)}%`;

  if (backToTop) {
    backToTop.classList.toggle('visible', scrollTop > 560);
  }
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// CTAクリック数をブラウザ内だけで簡易保存。外部送信はしません。
const registerLinks = document.querySelectorAll('.js-register-link');
registerLinks.forEach((link) => {
  link.addEventListener('click', () => {
    try {
      const current = Number(localStorage.getItem('bitradeX_cta_clicks') || '0');
      localStorage.setItem('bitradeX_cta_clicks', String(current + 1));
    } catch (error) {
      // localStorageが使えない環境では何もしません。
    }
  });
});
