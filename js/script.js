/* ================= CARROSSEL PRINCIPAL (HERO/SERVIÇOS) ================= */
const carouselWrapper = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;
let carouselInterval;
let isCarouselAnimating = false;

function updateSlide() {
  if (isCarouselAnimating) return;
  isCarouselAnimating = true;

  track.style.transform = `translateX(-${index * 100}%)`;

  setTimeout(() => {
    isCarouselAnimating = false;
  }, 500); // tempo de transição (css) entre os slides 
}

function startCarousel() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlide();
  }, 5000);
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

nextBtn.addEventListener('click', () => {
  if (isCarouselAnimating) return;
  index = (index + 1) % slides.length;
  updateSlide();
  
  // Reseta o timer para evitar pulo duplo logo depois de clicar
  stopCarousel();
  startCarousel();
});

prevBtn.addEventListener('click', () => {
  if (isCarouselAnimating) return;
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
  
  stopCarousel();
  startCarousel();
});

// Começa automaticamente
startCarousel();

// Pausa quando o usuário coloca o mouse sobre O CARROSSEL (não apenas os slides)
if (carouselWrapper) {
  carouselWrapper.addEventListener('mouseenter', stopCarousel);
  carouselWrapper.addEventListener('mouseleave', startCarousel);
}

/* ================= NAVBAR + LOGO COM INTERSECTION OBSERVER ================= */
const navbar = document.querySelector(".navbar");
const heroLogo = document.querySelector(".hero-logo-animated");
const heroSubtitle = document.querySelector(".hero-content h1");
const navLogo = document.querySelector(".nav-logo img");
let navScrollTicking = false;

window.addEventListener("scroll", () => {
  if (!navScrollTicking) {
    window.requestAnimationFrame(() => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
        if (heroLogo) heroLogo.classList.add("blur-out");
        if (heroSubtitle) heroSubtitle.classList.add("blur-out");
        if (navLogo) navLogo.style.opacity = "1";
      } else {
        navbar.classList.remove("scrolled");
        if (heroLogo) heroLogo.classList.remove("blur-out");
        if (heroSubtitle) heroSubtitle.classList.remove("blur-out");
        if (navLogo) navLogo.style.opacity = "0";
      }
      navScrollTicking = false;
    });
    navScrollTicking = true;
  }
}, { passive: true });

/* ================= PRELOADER LOGIC ================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("fade-out");
    }, 500); // Garante que o usuário veja a logo por um breve momento
  }
});

/* ================= REVEAL COM INTERSECTION OBSERVER ================= */
const revealElements = document.querySelectorAll(".split-section, .carousel-section, .gallery, .team, .clients, .experience-section, .testimonials, .faq-section, .workflow-section, .workflow-step");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.2
});

revealElements.forEach(section => {
  revealObserver.observe(section);
});

/* ================= MOTOR DE PARALAXE OTIMIZADO (rAF) ================= */
const parallaxImages = document.querySelectorAll(".img-parallax");
let parallaxTicking = false;

function updateParallax() {
  parallaxImages.forEach(img => {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Verifica se a imagem está na tela para poupar processamento
    if (rect.top < windowHeight && rect.bottom > 0) {
      const speed = 0.15; // Ajuste para mais ou menos movimento
      // Calcula o deslocamento baseado na posição relativa ao centro da tela
      const scrollOffset = (rect.top - windowHeight / 2) * speed;
      // Usando translate3d para garantir aceleração por GPU (60fps)
      img.style.transform = `translate3d(0, ${scrollOffset}px, 0)`;
    }
  });
  parallaxTicking = false;
}

window.addEventListener("scroll", () => {
  if (!parallaxTicking) {
    window.requestAnimationFrame(updateParallax);
    parallaxTicking = true;
  }
}, { passive: true });

/* ================= NAV LINK ATIVO ================= */
const sections = document.querySelectorAll("section, header.hero, footer");
const navLinks = document.querySelectorAll(".nav-menu a");

// Mapeamento de seções para links do Menu
const sectionToNavLink = {
  "inicio": "inicio",
  "historia": "inicio",
  "missao": "inicio",
  "objetivo": "inicio",
  "servicos": "servicos",
  "oque-fazemos": "servicos",
  "galeria": "galeria",
  "experiencia": "galeria",
  "clientes": "clientes",
  "depoimentos": "clientes",
  "gerenciamento": "gerenciamento",
  "duvidas": "duvidas",
  "contato": "contato"
};

function activateLink(id) {
  const targetNavId = sectionToNavLink[id] || id;
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${targetNavId}`) {
      link.classList.add("active");
    }
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activateLink(entry.target.id);
    }
  });
}, {
  rootMargin: "-50% 0px -49% 0px",
  threshold: 0
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

/* ================= SCROLL ================= */
let bottomScrollTicking = false;
window.addEventListener("scroll", () => {
  if (!bottomScrollTicking) {
    window.requestAnimationFrame(() => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        activateLink("contato");
      }
      bottomScrollTicking = false;
    });
    bottomScrollTicking = true;
  }
}, { passive: true });

/* ================= MENU HAMBÚRGUER (MOBILE) ================= */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

/* ================= GERADOR DINÂMICO DA GALERIA ================= */
async function loadGalleryImages() {
  const galleryTrack = document.getElementById('dynamic-gallery');
  if (!galleryTrack) return;

  const maxImages = 50; 
  const imagePath = 'css/images/'; 

  const imagePromises = [];

  for (let i = 1; i <= maxImages; i++) {
    const imageName = `g${i}.jpg`;
    const fullPath = imagePath + imageName;

    imagePromises.push(new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ exists: true, index: i, fullPath });
      img.onerror = () => resolve({ exists: false, index: i, fullPath });
      img.src = fullPath;
    }));
  }

  // Promise.all executa todos em paralelo sem travar o navegador
  const results = await Promise.all(imagePromises);
  
  // Pega apenas as fotos válidas e ordena pelo índice para garantir a ordem correta
  const validImages = results.filter(res => res.exists).sort((a, b) => a.index - b.index);

  validImages.forEach(res => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    const galleryImage = document.createElement('div');
    galleryImage.className = `gallery-image img-enhanced g${res.index} loaded`;
    galleryImage.style.backgroundImage = `url('${res.fullPath}')`;

    const title = document.createElement('p');
    title.className = 'gallery-title';

    galleryItem.appendChild(galleryImage);
    galleryItem.appendChild(title);
    galleryTrack.appendChild(galleryItem);
  });
}

/* ================= FUNÇÕES DE INICIALIZAÇÃO DA GALERIA (CHAMADAS APÓS O CARREGAMENTO) ================= */

function initGalleryCarousel() {
  const galleryTrack = document.querySelector('.gallery-track');
  const galleryNextBtn = document.querySelector('.gallery-next');
  const galleryPrevBtn = document.querySelector('.gallery-prev');
  let isAnimating = false; 

  if (!galleryTrack || !galleryNextBtn || !galleryPrevBtn) return;

  function getStep() {
    const item = document.querySelector('.gallery-item');
    if (!item) return 0;
    const style = window.getComputedStyle(galleryTrack);
    const gap = parseFloat(style.gap) || 30;
    return item.offsetWidth + gap;
  }

  galleryNextBtn.addEventListener('click', () => {
    if (isAnimating) return; 
    isAnimating = true;

    const step = getStep();
    galleryTrack.style.transition = 'transform 0.4s ease-in-out';
    galleryTrack.style.transform = `translateX(-${step}px)`;

    galleryTrack.addEventListener('transitionend', function handleTransition() {
      galleryTrack.removeEventListener('transitionend', handleTransition); 
      galleryTrack.style.transition = 'none';
      galleryTrack.appendChild(galleryTrack.firstElementChild);
      galleryTrack.style.transform = 'translateX(0)';
      isAnimating = false; 
    });
  });

  galleryPrevBtn.addEventListener('click', () => {
    if (isAnimating) return; 
    isAnimating = true;

    const step = getStep();
    galleryTrack.prepend(galleryTrack.lastElementChild);
    galleryTrack.style.transition = 'none';
    galleryTrack.style.transform = `translateX(-${step}px)`;
    
    void galleryTrack.offsetWidth;

    galleryTrack.style.transition = 'transform 0.4s ease-in-out';
    galleryTrack.style.transform = 'translateX(0)';

    galleryTrack.addEventListener('transitionend', function handleTransition() {
      galleryTrack.removeEventListener('transitionend', handleTransition);
      isAnimating = false;
    });
  });
}

function initLightbox() {
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.querySelector(".close-modal");
  const prevModalBtn = document.querySelector(".prev-modal");
  const nextModalBtn = document.querySelector(".next-modal");

  if (!modal || !prevModalBtn || !nextModalBtn) return; 

  // Procura as imagens que acabaram de ser criadas pelo JS
  const galleryImages = document.querySelectorAll(".gallery-image"); 
  let currentIndex = 0;

  galleryImages.forEach((div, index) => {
    div.style.cursor = "pointer";
    div.addEventListener("click", () => {
      modal.style.display = "flex";
      const bgImg = window.getComputedStyle(div).backgroundImage;
      modalImg.src = bgImg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      currentIndex = index;
    });
  });

  function changeImage(direction) {
    if (modalImg.classList.contains("changing")) return;

    modalImg.classList.add("changing");

    setTimeout(() => {
      currentIndex += direction;
      if (currentIndex >= galleryImages.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = galleryImages.length - 1;
      
      const bgImg = window.getComputedStyle(galleryImages[currentIndex]).backgroundImage;
      modalImg.src = bgImg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      
      modalImg.onload = () => {
        modalImg.classList.remove("changing");
      };
    }, 250); // Metade do tempo da transição CSS para trocar o src no "pior momento" (invisível)
  }

  nextModalBtn.addEventListener("click", () => changeImage(1));
  prevModalBtn.addEventListener("click", () => changeImage(-1));

  closeModal.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

/* ================= ARRANQUE DO SISTEMA (A MÁGICA ACONTECE AQUI) ================= */
document.addEventListener("DOMContentLoaded", async () => {
  // 1º - O código espera as fotos serem geradas e inseridas no ecrã
  await loadGalleryImages();
  
  // 2º - Só DEPOIS de existirem fotos, é que ativa o Carrossel e o Lightbox
  initGalleryCarousel();
  initLightbox();

  // 3º - FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const activeItem = document.querySelector(".faq-item.active");
      if (activeItem && activeItem !== item) {
        activeItem.classList.remove("active");
      }
      item.classList.toggle("active");
    });
  });

  // ================= MENU DE CONTATO EXPANDIDO =================
  const btnTrigger = document.getElementById("btn-contact-trigger");
  const contactPopover = document.getElementById("contact-popover");

  if (btnTrigger && contactPopover) {
    btnTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      contactPopover.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!contactPopover.contains(e.target) && e.target !== btnTrigger) {
        contactPopover.classList.remove("active");
      }
    });
  }

  // ================= SISTEMA DE IDADE E ANIVERSÁRIO =================
  function updateCompanyAge() {
    const foundationDate = new Date('2015-07-27');
    const today = new Date();
    
    let age = today.getFullYear() - foundationDate.getFullYear();
    const m = today.getMonth() - foundationDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < foundationDate.getDate())) {
      age--;
    }
    
    const ageElement = document.getElementById("company-age");
    if (ageElement) {
      ageElement.innerText = age;
    }

    // Checa se é aniversário hoje (27/07)
    if (today.getDate() === 27 && today.getMonth() === 6) {
      document.getElementById("age-badge")?.classList.add("celebrating");
      
      // Gatilho de Fogos Premium (Lançados de baixo para cima)
      const duration = 6 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { 
        startVelocity: 45, 
        spread: 360, 
        ticks: 100, 
        zIndex: 0, 
        colors: ['#f5c400', '#ffffff', '#ffdf5d'] // Dourado EstruMac e Prata
      };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        
        // Lançamento da esquerda (baixo)
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: 0.8 },
          gravity: 0.7,
          scalar: 1.1,
          drift: randomInRange(-0.4, 0.4),
          startVelocity: 35
        });
        
        // Lançamento da direita (baixo)
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: 0.8 },
          gravity: 0.7,
          scalar: 1.1,
          drift: randomInRange(-0.4, 0.4),
          startVelocity: 35
        });
      }, 700); // Dobro do tempo anterior para uma cadência mais calma
    }
  }

  updateCompanyAge();

  // ================= SISTEMA DE WORKFLOW INTERATIVO =================
  const workflowSteps = document.querySelectorAll(".workflow-step");
  const progressLine = document.getElementById("progress-line");
  const workflowWrapper = document.querySelector(".workflow-grid-wrapper");

  function alignWorkflowLine() {
    const rail = document.querySelector(".workflow-line-rail");
    if (!rail || workflowSteps.length < 2 || !workflowWrapper) return;

    if (window.innerWidth <= 992) {
      const firstIcon = workflowSteps[0].querySelector(".step-icon");
      const lastIcon = workflowSteps[workflowSteps.length - 1].querySelector(".step-icon");
      if (!firstIcon || !lastIcon) return;

      const firstRect = firstIcon.getBoundingClientRect();
      const lastRect = lastIcon.getBoundingClientRect();
      const wrapperRect = workflowWrapper.getBoundingClientRect();

      const topOffset = (firstRect.top + firstRect.height / 2) - wrapperRect.top;
      const bottomOffset = wrapperRect.bottom - (lastRect.top + lastRect.height / 2);

      rail.style.top = `${topOffset}px`;
      rail.style.bottom = `${bottomOffset}px`;
      rail.style.height = 'auto';
    } else {
      rail.style.top = '';
      rail.style.bottom = '';
      rail.style.height = '';
    }
  }

  function updateWorkflowProgress(index) {
    if (!progressLine || workflowSteps.length < 2) return;

    const progressPercent = (index / (workflowSteps.length - 1)) * 100;
    if (window.innerWidth <= 992) {
      progressLine.style.height = `${progressPercent}%`;
      progressLine.style.width = '100%';
    } else {
      progressLine.style.width = `${progressPercent}%`;
      progressLine.style.height = '100%';
    }

    workflowSteps.forEach((s, idx) => {
      if (idx <= index) {
        s.classList.add("visited");
        if (idx === index) {
          s.classList.add("hovered-active");
        } else {
          s.classList.remove("hovered-active");
        }
      } else {
        s.classList.remove("visited");
        s.classList.remove("hovered-active");
      }
    });
  }

  if (workflowSteps.length > 0 && progressLine) {
    alignWorkflowLine();
    window.addEventListener("resize", alignWorkflowLine);
    window.addEventListener("load", alignWorkflowLine);

    workflowSteps.forEach((step, index) => {
      step.addEventListener("mouseenter", () => {
        updateWorkflowProgress(index);
      });

      step.addEventListener("mouseleave", () => {
        step.classList.remove("hovered-active");
      });
    });

    // IntersectionObserver to light up steps on scroll
    const workflowObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepIndex = Array.from(workflowSteps).indexOf(entry.target);
          updateWorkflowProgress(stepIndex);
        }
      });
    }, {
      rootMargin: "-25% 0px -40% 0px", // triggers when element crosses the center region of screen
      threshold: 0.1
    });

    workflowSteps.forEach(step => {
      workflowObserver.observe(step);
    });
  }
});