// ============================================
// Aryan Saini — Portfolio Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initActiveNavLink();
  initScrollReveal();
  initBackToTop();
  initContactForm();
  initProjectFilters();
});

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const toggle = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

function initMobileNav() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  if (!header || !nav) return;

  let toggleBtn = header.querySelector('.nav-toggle');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'nav-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = '<span></span><span></span><span></span>';
    header.insertBefore(toggleBtn, header.querySelector('.hire-btn'));
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

function initActiveNavLink() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  sections.forEach((section) => observer.observe(section));
}

function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.skill-card, .project-card, .service-card, .about-image, .about-content, .contact-info, .contact-form, .section-heading'
  );
  if (!targets.length) return;

  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), i % 3 * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

function initBackToTop() {
  let btn = document.querySelector('.back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(btn);
  }

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  let status = form.querySelector('.form-status');
  if (!status) {
    status = document.createElement('p');
    status.className = 'form-status';
    form.appendChild(status);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const subject = form.querySelector('[name="subject"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      showStatus('Please fill in your name, email, and message.', 'error');
      return;
    }

    if (!emailPattern.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const mailSubject = encodeURIComponent(subject || `Portfolio inquiry from ${name}`);
    const mailBody = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:aryansaini101007@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    showStatus('Opening your email client…', 'success');
    setTimeout(() => {
      form.reset();
      if (submitBtn) submitBtn.disabled = false;
    }, 800);
  });

  function showStatus(text, type) {
    status.textContent = text;
    status.className = `form-status ${type}`;
  }
}


const isDesktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (isDesktopPointer) {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let rafId = null;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        if (spotlight) {
          spotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }
        rafId = null;
      });
    }
  }, { passive: true });

  document.querySelectorAll(".project-card").forEach((card) => {
    let cardRaf = null;

    card.addEventListener("mousemove", (e) => {
      if (cardRaf) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cardRaf = requestAnimationFrame(() => {
        const rotateY = ((x / rect.width) - 0.5) * 10;
        const rotateX = ((y / rect.height) - 0.5) * -10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        cardRaf = null;
      });
    }, { passive: true });

    card.addEventListener("mouseleave", () => {
      if (cardRaf) cancelAnimationFrame(cardRaf);
      card.style.transform = "";
    });
  });
}

const counters = document.querySelectorAll(".stat-number");

counters.forEach(counter => {

  const target = parseInt(counter.dataset.target);

  if (isNaN(target)) return;

  let current = 0;

  const duration = 2000;
  const increment = target / (duration / 16);

  function animate() {

    current += increment;

    if (current < target) {

      counter.textContent = Math.floor(current);

      requestAnimationFrame(animate);

    } else {

      counter.textContent = target;

    }

  }

  animate();

});



const particles = document.createElement("div");
particles.className = "particles";

document.body.appendChild(particles);

for (let i = 0; i < 25; i++) {

  const dot = document.createElement("span");

  dot.style.left = Math.random() * 100 + "%";

  dot.style.animationDelay = Math.random() * 8 + "s";

  dot.style.animationDuration =
    (6 + Math.random() * 8) + "s";

  particles.appendChild(dot);

}


document.querySelectorAll(
  '.btn-primary,.btn-secondary,.hire-btn'
).forEach(btn => {

  btn.addEventListener('mousemove', (e) => {

    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform =
      `translate(${x * 0.08}px,${y * 0.08}px)`;
  });

  btn.addEventListener('mouseleave', () => {

    btn.style.transform = '';

  });

});

let spotlight = null;
if (isDesktopPointer) {
  spotlight = document.createElement('div');
  spotlight.className = 'spotlight';
  document.body.appendChild(spotlight);
}


const roles = [
  "Frontend Developer",
  "Crafting Modern Interfaces",
  "Modern UI Builder",
  "Responsive Web Designer",
  "Turning Ideas Into Reality"
];

const typing =
  document.getElementById(
    "typing-text"
  );

if (typing) {

  let role = 0;
  let char = 0;
  let deleting = false;

  function type() {

    const current =
      roles[role];

    typing.textContent =
      current.substring(0, char);

    if (!deleting) {

      char++;

      if (char >
        current.length) {

        deleting = true;

        setTimeout(type, 1500);

        return;
      }

    } else {

      char--;

      if (char === 0) {

        deleting = false;

        role =
          (role + 1) % roles.length;

      }

    }

    setTimeout(type,
      deleting ? 50 : 100);

  }

  type();

}


document
  .querySelectorAll(
    '.project-card img'
  )
  .forEach(img => {

    img.addEventListener(
      'click',
      () => {

        const overlay =
          document.createElement('div');

        overlay.className =
          'lightbox';

        overlay.innerHTML =
          `<img src="${img.src}">`;

        document.body.appendChild(
          overlay
        );

        overlay.onclick = () => {

          overlay.remove();

        };

      });

  });