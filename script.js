document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobilePanel.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  document.querySelectorAll('[data-faq-question]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

  const artistsData = {
    'd-luidgi': {
      name: 'D. LUIDGI',
      description: 'Artiste présenté par Art Freedom.',
      works: [{ title: 'Œuvre présentée', image: './Tableaux artistes/D.LUIDGI Tableau.jpg', description: 'Œuvre exposée avec Art Freedom.' }]
    },
    'guylaine-conquet': {
      name: 'GUYLAINE CONQUET',
      description: 'Artiste présentée par Art Freedom.',
      works: [{ title: 'AFRO MECHANISM', image: 'Tableaux artistes/GUYLAINE CONQUET TITRE AFRO MECHANISM 76X101X3 43 cm (2) (1)_page-0001.jpg', description: 'Œuvre exposée avec Art Freedom.' }]
    },
    'hoedie-marcellus': {
      name: 'HOEDIE MARCELLUS',
      description: 'Artiste présenté par Art Freedom.',
      works: [{ title: "J'aime mon fils", image: "Tableaux artistes/Marcellus HOEDIE Titre J'aime mon fils 80X100 cm.jpg", description: 'Œuvre exposée avec Art Freedom.' }]
    },
    'kyoko': {
      name: 'KYOKO SAKAZAKI',
      description: 'Artiste présentée par Art Freedom.',
      works: [{ title: 'Présence du sacré', image: './Tableaux artistes/Kyoko SAKAZAKI présence du sacré.jpg', description: 'Œuvre exposée avec Art Freedom.' }]
    },
    'laurence-bordon': {
      name: 'LAURENCE BORDON',
      description: 'Artiste présentée par Art Freedom.',
      works: [{ title: 'STOPOCOUPDESOLEIL', image: './Tableaux artistes/DSC02412 STOPOCOUPSDESOLEIL 81x100 cm LAURENCE BOURDON  (1).JPG', description: 'Œuvre exposée avec Art Freedom.' }]
    },
    'pari-ravan': {
      name: 'PARI RAVAN',
      description: 'Artiste présentée par Art Freedom.',
      works: [{ title: 'CAT GYym resine', image: './Tableaux artistes/PARI RAVAN 2021-07-27_Cat Gym resine EA unique blanc et noir h52 l18 p26cm 3Kg 2021 p (2).jpeg', description: 'Œuvre exposée avec Art Freedom.' }]
    },
    'roger-palie': {
      name: 'ROGER PALIE',
      description: 'Artiste présenté par Art Freedom.',
      works: [{ title: 'Œuvre présentée', image: './Tableaux artistes/ROGER PALIE .jpg', description: 'Œuvre exposée avec Art Freedom.' }]
    },
    'sandra': {
      name: 'SANDRA ANSALDI',
      description: 'Artiste présentée par Art Freedom.',
      works: [{ title: 'Œuvre présentée', image: './Tableaux artistes/SANDRA ANSALDI.jpg', description: 'Œuvre exposée avec Art Freedom.' }]
    }
  };

  const artistModal = document.querySelector('[data-artist-modal]');
  if (artistModal) {
    const modalName = artistModal.querySelector('[data-artist-name]');
    const modalDescription = artistModal.querySelector('[data-artist-description]');
    const worksGrid = artistModal.querySelector('[data-artist-works]');
    const closeButton = artistModal.querySelector('[data-modal-close]');

    document.querySelectorAll('[data-artist]').forEach((card) => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-artist');
        const artist = artistsData[key];
        if (!artist) return;
        modalName.textContent = artist.name;
        modalDescription.textContent = artist.description;
        worksGrid.innerHTML = artist.works.map((work) => `
          <article class="work-card">
            <img src="${work.image}" alt="${work.title}">
            <div class="work-body">
              <h3>${work.title || 'Œuvre présentée'}</h3>
              <p>${work.description || ''}</p>
            </div>
          </article>
        `).join('');
        artistModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      artistModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    closeButton?.addEventListener('click', closeModal);
    artistModal.addEventListener('click', (event) => {
      if (event.target === artistModal) closeModal();
    });
  }

  const expoModal = document.querySelector('[data-expo-modal]');
  if (expoModal) {
    const expoImage = expoModal.querySelector('[data-expo-image]');
    const expoClose = expoModal.querySelector('[data-expo-close]');
    document.querySelectorAll('[data-expo-trigger]').forEach((button) => {
      button.addEventListener('click', () => {
        expoImage.src = button.getAttribute('data-expo-image');
        expoModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const closeExpo = () => {
      expoModal.classList.remove('open');
      document.body.style.overflow = '';
    };
    expoClose?.addEventListener('click', closeExpo);
    expoModal.addEventListener('click', (event) => {
      if (event.target === expoModal) closeExpo();
    });
  }

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const note = document.querySelector('[data-form-note]');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      note?.classList.add('show');
      contactForm.reset();
    });
  }
});

const dustCanvas = document.getElementById("dust-canvas");
const mouseLight = document.querySelector(".mouse-light");

if (dustCanvas) {
  const ctx = dustCanvas.getContext("2d");

  let w = 0;
  let h = 0;
  let particles = [];

  const mouse = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5
  };

  const light = {
    x: mouse.x,
    y: mouse.y
  };

  function resizeDustCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    w = window.innerWidth;
    h = window.innerHeight;

    dustCanvas.width = w * dpr;
    dustCanvas.height = h * dpr;
    dustCanvas.style.width = w + "px";
    dustCanvas.style.height = h + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createDustParticles();
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createDustParticles() {
    particles = [];

    const amount = Math.floor((w * h) / 3200);

    for (let i = 0; i < amount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: random(0.4, 1.8),
        vx: random(-0.12, 0.12),
        vy: random(-0.08, 0.08),
        alpha: random(0.18, 0.85),
        twinkle: random(0.002, 0.018),
        phase: random(0, Math.PI * 2),
        tone: Math.random()
      });
    }
  }

  function getParticleColor(alpha, tone) {
    if (tone < 0.33) {
      return `rgba(255, 224, 196, ${alpha})`;
    }
    if (tone < 0.66) {
      return `rgba(255, 205, 160, ${alpha})`;
    }
    return `rgba(255, 244, 220, ${alpha})`;
  }

  function updateMouseLight() {
    light.x += (mouse.x - light.x) * 0.06;
    light.y += (mouse.y - light.y) * 0.06;

    if (mouseLight) {
      mouseLight.style.transform = `translate3d(${light.x - 210}px, ${light.y - 210}px, 0)`;
    }
  }

  function drawDust() {
    ctx.clearRect(0, 0, w, h);

    updateMouseLight();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.twinkle;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const dx = p.x - light.x;
      const dy = p.y - light.y;
      const dist = Math.hypot(dx, dy);

      let glowBoost = 1;
      if (dist < 220) {
        glowBoost = 1 + (1 - dist / 220) * 1.8;
      }

      const pulse = 0.65 + Math.sin(p.phase) * 0.35;
      const alpha = Math.min(1, p.alpha * pulse * glowBoost);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * glowBoost * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = getParticleColor(alpha, p.tone);
      ctx.fill();

      if (alpha > 0.75) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 180, ${alpha * 0.08})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(drawDust);
  }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("resize", resizeDustCanvas);

  resizeDustCanvas();
  drawDust();
}

