import gsap from 'gsap';

/**
 * THE SOCIAL VINE STUDIO — NEUV.FR LUXURY ENGINE & INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuvCursor();
  initThemeToggle();
  initMobileNavigation();
  initHeroIntro();
  initHeroScrollAnimation();
  initHorizontalGallery();
  initProjectModals();
  initBookingModal();
  initPricingInteractions();
  initPricingAnimations();
  initFormPills();
  initConsultationForm();
});

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer (Hamburger Toggle & Smooth Section Jumps)
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menuLabel = document.getElementById('mobileMenuLabel');
  const drawer = document.getElementById('mobileNavDrawer');
  const drawerBookBtn = document.getElementById('mobileDrawerBookBtn');

  if (!menuBtn || !drawer) return;

  function closeDrawer() {
    menuBtn.classList.remove('is-active');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (menuLabel) menuLabel.textContent = 'Menu';
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal-backdrop.open')) {
      document.body.style.overflow = '';
    }
  }

  function toggleDrawer() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      menuBtn.classList.add('is-active');
      menuBtn.setAttribute('aria-expanded', 'true');
      if (menuLabel) menuLabel.textContent = 'Close';
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  menuBtn.addEventListener('click', toggleDrawer);

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  if (drawerBookBtn) {
    drawerBookBtn.addEventListener('click', () => {
      closeDrawer();
      openBookingWithPlan('Growth', '₹7,999/month');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   0. Cinematic Hero Opening Sequence (neuv.fr Architectural Choreo)
   -------------------------------------------------------------------------- */
function initHeroIntro() {
  const introOverlay = document.getElementById('introOverlay');
  if (!introOverlay) return;

  const introBackdrop = document.getElementById('introBackdrop');
  const introHairlineH = document.getElementById('introHairlineH');
  const introHairlineV = document.getElementById('introHairlineV');
  const introBrand = document.getElementById('introBrand');
  const introLogoBox = document.getElementById('introLogoBox');
  const introWord = document.getElementById('introWord');
  const introSub = document.getElementById('introSub');
  const introCotes = introOverlay.querySelectorAll('.intro-cote');

  // Hero targets to orchestrate
  const mainHeader = document.getElementById('mainHeader');
  const motRadical = document.getElementById('motRadical');
  const motGrowth = document.getElementById('motGrowth');
  const motDirection = document.getElementById('motDirection');
  const heroIndicator = document.getElementById('heroIndicator');
  const heroMeta = document.getElementById('heroMeta');
  const heroScrollCue = document.getElementById('heroScrollCue');

  function playTimeline() {
    // Stage 1: Initial starting states
    gsap.set(introOverlay, { display: 'flex', pointerEvents: 'auto' });
    gsap.set(introBackdrop, { clipPath: 'inset(0% 0% 0% 0%)' });
    gsap.set([introHairlineH, introHairlineV], { opacity: 0 });
    gsap.set(introHairlineH, { scaleX: 0 });
    gsap.set(introHairlineV, { scaleY: 0 });
    gsap.set(introBrand, { scale: 1, opacity: 1, y: 0 });
    gsap.set(introLogoBox, { scale: 0.8, opacity: 0 });
    gsap.set([introWord, introSub], { yPercent: 110 });
    gsap.set(introCotes, { opacity: 0 });

    // Underlying hero starting states
    if (motRadical && motGrowth && motDirection) {
      gsap.set([motRadical, motGrowth, motDirection], { yPercent: 110 });
    }
    if (mainHeader) gsap.set(mainHeader, { y: -24, opacity: 0 });
    if (heroIndicator) gsap.set(heroIndicator, { scale: 0.5, opacity: 0 });
    if (heroMeta) gsap.set(heroMeta, { y: 16, opacity: 0 });
    if (heroScrollCue) gsap.set(heroScrollCue, { y: 14, opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        sessionStorage.setItem('tsv_hero_intro_seen', 'true');
        introOverlay.classList.add('intro-complete');
        document.documentElement.classList.remove('intro-active');

        // Clear inline transforms from hero text to restore exact natural CSS styles and scroll handling
        if (motRadical && motGrowth && motDirection) {
          gsap.set([motRadical, motGrowth, motDirection], { clearProps: 'transform' });
        }
        if (mainHeader) gsap.set(mainHeader, { clearProps: 'opacity,transform' });
        if (heroIndicator) gsap.set(heroIndicator, { clearProps: 'opacity,transform' });
        if (heroMeta) gsap.set(heroMeta, { clearProps: 'opacity,transform' });
        if (heroScrollCue) gsap.set(heroScrollCue, { clearProps: 'opacity,transform' });
      }
    });

    // Mark session storage so subsequent internal navigation skips immediately
    sessionStorage.setItem('tsv_hero_intro_seen', 'true');

    // Stage 2: Brand Reveal (0.15s - 0.95s)
    tl.to(introHairlineH, { scaleX: 1, opacity: 0.22, duration: 0.55, ease: 'power2.inOut' }, 0.15)
      .to(introHairlineV, { scaleY: 1, opacity: 0.22, duration: 0.55, ease: 'power2.inOut' }, 0.15)
      .to(introLogoBox, { scale: 1, opacity: 1, duration: 0.5, ease: 'power4.out' }, 0.25)
      .to(introWord, { yPercent: 0, duration: 0.55, ease: 'power4.out' }, 0.35)
      .to(introSub, { yPercent: 0, duration: 0.45, ease: 'power4.out' }, 0.45)
      .to(introCotes, { opacity: 0.6, duration: 0.4, stagger: 0.03, ease: 'power2.out' }, 0.48);

    // Stage 3: Cinematic Expansion / Architectural Aperture (0.95s - 1.6s)
    tl.to(introBrand, { scale: 1.05, opacity: 0, y: -16, duration: 0.45, ease: 'power3.inOut' }, 0.95)
      .to([introHairlineH, introHairlineV], { opacity: 0, duration: 0.35, ease: 'power2.in' }, 0.95)
      .to(introCotes, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.95)
      .to(introBackdrop, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.7,
        ease: 'power4.inOut'
      }, 1.05);

    // Stage 4: Hero Settles into Exact Natural Position (1.3s - 2.1s)
    if (motRadical && motGrowth && motDirection) {
      tl.to([motRadical, motGrowth, motDirection], {
        yPercent: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: 'power4.out'
      }, 1.3);
    }

    if (heroIndicator) {
      tl.to(heroIndicator, { scale: 1, opacity: 0.85, duration: 0.5, ease: 'power3.out' }, 1.45);
    }
    if (heroMeta) {
      tl.to(heroMeta, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 1.52);
    }
    if (heroScrollCue) {
      tl.to(heroScrollCue, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 1.58);
    }
    if (mainHeader) {
      tl.to(mainHeader, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 1.5);
    }

    return tl;
  }

  // Expose global replay method for development and user testing
  window.replayIntro = () => {
    introOverlay.classList.remove('intro-complete');
    document.documentElement.classList.add('intro-active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    playTimeline();
  };

  // Keyboard shortcut: Shift + R to replay
  window.addEventListener('keydown', (e) => {
    if (e.shiftKey && (e.key === 'R' || e.key === 'r')) {
      window.replayIntro();
    }
  });

  // Clicking the logo monogram while at top triggers replay
  const logoMonogram = document.querySelector('.logo-monogram');
  if (logoMonogram) {
    logoMonogram.addEventListener('click', (e) => {
      if (window.scrollY < 80) {
        e.preventDefault();
        window.replayIntro();
      }
    });
  }

  // Check URL query parameters for dev replay
  const urlParams = new URLSearchParams(window.location.search);
  const forceReplay = urlParams.has('intro') || urlParams.has('replay');
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasSeenIntro = sessionStorage.getItem('tsv_hero_intro_seen');

  // If already seen in this session (and not forced) or reduced motion, skip intro immediately
  if ((hasSeenIntro && !forceReplay) || isReducedMotion) {
    introOverlay.classList.add('intro-complete');
    document.documentElement.classList.remove('intro-active');
    return;
  }

  // Active intro state
  document.documentElement.classList.add('intro-active');
  window.scrollTo(0, 0);

  playTimeline();
}

/* --------------------------------------------------------------------------
   1. neuv.fr Magnetic Difference Cursor (.c-point & .c-anneau)
   -------------------------------------------------------------------------- */
function initNeuvCursor() {
  const dot = document.getElementById('customCursorDot');
  const ring = document.getElementById('customCursorRing');
  const label = document.getElementById('customCursorLabel');

  if (!dot || !ring || !label) return;

  // Don't activate on touch / coarse pointer devices
  if (window.matchMedia('(pointer: coarse), (hover: none)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMoving) {
      isMoving = true;
      dot.style.opacity = '1';
      ring.style.opacity = '0.5';
    }

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  // Tactile mousedown click feedback
  window.addEventListener('mousedown', () => {
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(0.75)`;
  });

  window.addEventListener('mouseup', () => {
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(1)`;
  });

  // Hide cursor on window exit
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    document.body.classList.remove('sur-interactif');
    isMoving = false;
  });

  // Smooth RAF lerp loop for the trailing ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Interactive Target Detection
  const interactiveSelector = 'a, button, .interactive-target, .projet-lien, .discipline-lien, input, textarea, .neuv-pill';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(interactiveSelector);
    if (target) {
      document.body.classList.add('sur-interactif');

      if (target.closest('.projet-lien')) {
        label.textContent = target.dataset.cursor || 'View';
      } else if (target.id === 'openBookingModalBtn' || target.type === 'submit') {
        label.textContent = 'Book';
      } else if (target.classList.contains('btn-whatsapp-minimal')) {
        label.textContent = 'Chat';
      } else {
        label.textContent = 'Explore';
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(interactiveSelector);
    if (target) {
      document.body.classList.remove('sur-interactif');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Pure Dark Noir Theme (Permanently locked, zero white overlays)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const root = document.documentElement;
  const metaThemeColor = document.getElementById('metaThemeColor');

  // Purge any stored 'creme' theme from localStorage and enforce noir
  try {
    localStorage.removeItem('tsv_theme');
    localStorage.setItem('tsv_theme', 'noir');
  } catch (e) {}

  root.setAttribute('data-theme', 'noir');
  if (metaThemeColor) {
    metaThemeColor.content = '#010109';
  }
}

/* --------------------------------------------------------------------------
   3. Horizontal Living Gallery (neuv.fr Scroll-Pinned Living Gallery)
   -------------------------------------------------------------------------- */
function initHorizontalGallery() {
  const scene = document.getElementById('work');
  const stage = document.getElementById('galerieStage');
  const glisseur = document.getElementById('glisseurWrap');
  const piste = document.getElementById('galeriePiste');
  const compteur = document.getElementById('galerieCompteur');
  const progressBar = document.getElementById('galerieProgressBar');
  const prevBtn = document.getElementById('galeriePrevBtn');
  const nextBtn = document.getElementById('galerieNextBtn');

  if (!scene || !glisseur || !piste) return;

  const items = piste.querySelectorAll('.projet-item');
  const totalItems = items.length;
  if (totalItems === 0) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let sceneTop = 0;
  let sceneHeight = 0;
  let windowHeight = 0;
  let maxScroll = 0;
  let pisteWidth = 0;
  let windowWidth = 0;
  let maxShift = 0;

  function updateDimensions() {
    sceneTop = scene.getBoundingClientRect().top + window.scrollY;
    sceneHeight = scene.offsetHeight;
    windowHeight = window.innerHeight;
    maxScroll = Math.max(1, sceneHeight - windowHeight);
    pisteWidth = piste.scrollWidth;
    windowWidth = window.innerWidth;
    // Ensure track shifts enough so the last item is framed with comfortable margin
    const endMargin = windowWidth < 768 ? 32 : 80;
    maxShift = Math.max(0, pisteWidth - windowWidth + endMargin);
  }

  updateDimensions();
  window.addEventListener('load', () => {
    updateDimensions();
    onScroll();
  });

  let targetProgress = 0;
  let currentProgress = 0;
  let isTicking = false;
  let activeIndex = 0;

  function onScroll() {
    if (maxScroll <= 0) return;
    const scrollY = window.scrollY;
    const raw = (scrollY - sceneTop) / maxScroll;
    targetProgress = Math.min(1, Math.max(0, raw));

    if (prefersReduced) {
      currentProgress = targetProgress;
      renderGalleryFrame();
      return;
    }

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(renderGalleryFrame);
    }
  }

  function renderGalleryFrame() {
    // Weighted luxury lerp damping
    const lerpFactor = prefersReduced ? 1 : 0.14;
    currentProgress += (targetProgress - currentProgress) * lerpFactor;

    if (Math.abs(targetProgress - currentProgress) < 0.0005) {
      currentProgress = targetProgress;
    }

    // A. Horizontal translation of gallery track
    const currentShift = currentProgress * maxShift;
    piste.style.transform = `translate3d(-${currentShift.toFixed(1)}px, 0, 0)`;

    // B. Progress hairline fill
    if (progressBar) {
      const pct = 20 + currentProgress * 80;
      progressBar.style.width = `${pct.toFixed(1)}%`;
    }

    // C. Internal image parallax and active index tracking
    const viewportCenter = window.innerWidth * 0.5;
    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(itemCenter - viewportCenter);

      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = index;
      }

      // Parallax shift calculation inside overflow:hidden frame
      const normDist = (itemCenter - viewportCenter) / (window.innerWidth * 0.6);
      const clampedDist = Math.max(-1.5, Math.min(1.5, normDist));
      const parallaxPx = clampedDist * 28;

      const img = item.querySelector('.projet-cadre img');
      if (img) {
        img.style.transform = `translate3d(calc(-8.5% + ${parallaxPx.toFixed(1)}px), 0, 0) scale(1.05)`;
      }
    });

    // D. Dynamic active index based on scroll progress (01 -> 05)
    activeIndex = Math.min(totalItems - 1, Math.max(0, Math.round(currentProgress * (totalItems - 1))));

    if (compteur) {
      compteur.textContent = `0${activeIndex + 1} / 0${totalItems}`;
    }

    if (!prefersReduced && Math.abs(targetProgress - currentProgress) > 0.0004) {
      requestAnimationFrame(renderGalleryFrame);
    } else {
      isTicking = false;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateDimensions();
      onScroll();
    }, 150);
  });

  // Navigation Arrow Buttons (smoothly scroll to target project)
  function scrollToProject(idx) {
    const clampedIdx = Math.max(0, Math.min(totalItems - 1, idx));
    const targetY = sceneTop + (clampedIdx / (totalItems - 1)) * maxScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToProject(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToProject(activeIndex + 1);
    });
  }

  // Keyboard navigation when gallery is in viewport
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const inView = window.scrollY >= sceneTop - 120 && window.scrollY <= sceneTop + maxScroll + 120;
      const modalOpen = document.querySelector('.modal-backdrop.open');
      if (inView && !modalOpen) {
        if (e.key === 'ArrowRight') {
          scrollToProject(activeIndex + 1);
        } else {
          scrollToProject(activeIndex - 1);
        }
      }
    }
  });

  // Mouse Drag interaction
  let isDown = false;
  let startX = 0;
  let scrollYStart = 0;
  let hasDragged = false;

  glisseur.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Primary button only
    isDown = true;
    hasDragged = false;
    startX = e.pageX;
    scrollYStart = window.scrollY;
    glisseur.classList.add('glisse');
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      glisseur.classList.remove('glisse');
      setTimeout(() => {
        hasDragged = false;
      }, 50);
    }
  });

  glisseur.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const deltaX = e.pageX - startX;
    if (Math.abs(deltaX) > 6) {
      hasDragged = true;
    }
    e.preventDefault();
    const scrollRatio = maxScroll / (maxShift || 1);
    const targetY = scrollYStart - deltaX * scrollRatio * 1.2;
    window.scrollTo({
      top: Math.max(sceneTop, Math.min(sceneTop + maxScroll, targetY)),
      behavior: 'auto'
    });
  });

  // Prevent accidental project modal opening when releasing a drag
  piste.addEventListener('click', (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Mobile horizontal touch swipe support
  let touchStartX = 0;
  let touchStartY = 0;
  let touchScrollYStart = 0;
  let isHorizontalSwipe = false;

  glisseur.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].pageX;
    touchStartY = e.touches[0].pageY;
    touchScrollYStart = window.scrollY;
    isHorizontalSwipe = false;
  }, { passive: true });

  glisseur.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 1) return;
    const currentX = e.touches[0].pageX;
    const currentY = e.touches[0].pageY;
    const deltaX = currentX - touchStartX;
    const deltaY = currentY - touchStartY;

    if (!isHorizontalSwipe && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      isHorizontalSwipe = true;
    }

    if (isHorizontalSwipe) {
      const scrollRatio = maxScroll / (maxShift || 1);
      const targetY = touchScrollYStart - deltaX * scrollRatio * 1.1;
      window.scrollTo({
        top: Math.max(sceneTop, Math.min(sceneTop + maxScroll, targetY)),
        behavior: 'auto'
      });
    }
  }, { passive: true });

  // Initial calculation and frame render
  onScroll();
}

/* --------------------------------------------------------------------------
   4. Project Showcase Modals & Data Mapping
   -------------------------------------------------------------------------- */
const AUTHENTIC_VISION_SLIDES = [
  {
    src: '/assets/images/authentic-vision/slide_1.jpg',
    thumb: '/assets/images/authentic-vision/thumb_1.jpg',
    caption: 'See Different. Live Bolder.',
    sub: 'Gucci Eyewear Collection',
    counter: '01 / 06'
  },
  {
    src: '/assets/images/authentic-vision/slide_2.jpg',
    thumb: '/assets/images/authentic-vision/thumb_2.jpg',
    caption: 'More Than Just Eyewear.',
    sub: 'Signature Boutique Framing',
    counter: '02 / 06'
  },
  {
    src: '/assets/images/authentic-vision/slide_3.jpg',
    thumb: '/assets/images/authentic-vision/thumb_3.jpg',
    caption: 'Confidence Looks Good On You.',
    sub: 'Gucci Luxury Display',
    counter: '03 / 06'
  },
  {
    src: '/assets/images/authentic-vision/slide_4.jpg',
    thumb: '/assets/images/authentic-vision/thumb_4.jpg',
    caption: 'Timeless Style. Modern You.',
    sub: 'Montblanc Collection',
    counter: '04 / 06'
  },
  {
    src: '/assets/images/authentic-vision/slide_5.jpg',
    thumb: '/assets/images/authentic-vision/thumb_5.jpg',
    caption: 'Premium Craftsmanship. Superior Vision.',
    sub: 'Montblanc Designer Lounge',
    counter: '05 / 06'
  },
  {
    src: '/assets/images/authentic-vision/slide_6.jpg',
    thumb: '/assets/images/authentic-vision/thumb_6.jpg',
    caption: 'Elevate Your Look.',
    sub: 'Dolce & Gabbana Finishing Touch',
    counter: '06 / 06'
  }
];

const PROJECT_DATA = {
  koffie: {
    title: 'Koffie Culture Roasters',
    category: 'Specialty Hospitality & Artisanal Dining',
    metric: '3.8M Views · 4.2x Footfall',
    scope: 'Cinematic Reels Production, Visual Identity, Meta Ads',
    image: '/assets/images/cafe-craft.jpg',
    description: 'Transforming an artisanal Mumbai cafe into an Instagram cultural destination. Developed signature scroll-stopping barista reels, community tasting events, and high-frequency story coverage that drove daily lines out the door.'
  },
  luma: {
    title: 'Luma Botanicals',
    category: 'D2C Clean Skincare & Wellness',
    metric: '+185% D2C Orders · 5.1x ROAS',
    scope: 'Organic Reels, Paid Social Ads, Aesthetic Product Styling',
    image: '/assets/images/d2c-skincare.jpg',
    description: 'A complete organic and paid social scaling program. Crafted ultra-satisfying botanical skincare routines, UGC creator funnels, and Meta performance ads delivering record revenue months.'
  },
  authentic: {
    title: 'Authentic Vision & Shades',
    category: 'Luxury Designer Eyewear & Boutique Retail',
    metric: '4.8x Engagement · 850K+ Reach',
    scope: 'On-Site Model Direction, In-Store Campaign, Editorial Lookbook',
    image: '/assets/images/authentic-vision/slide_1.jpg',
    description: 'A cinematic in-store and lookbook production for premier eyewear boutique Authentic Vision & Shades. Highlighting luxury collections from Gucci, Montblanc, and Dolce & Gabbana with intentional fashion direction, warm editorial lighting, and scroll-stopping Instagram storytelling.',
    slides: AUTHENTIC_VISION_SLIDES
  },
  // Backwards-compatibility alias for previous mock client
  verve: {
    title: 'Authentic Vision & Shades',
    category: 'Luxury Designer Eyewear & Boutique Retail',
    metric: '4.8x Engagement · 850K+ Reach',
    scope: 'On-Site Model Direction, In-Store Campaign, Editorial Lookbook',
    image: '/assets/images/authentic-vision/slide_1.jpg',
    description: 'A cinematic in-store and lookbook production for premier eyewear boutique Authentic Vision & Shades. Highlighting luxury collections from Gucci, Montblanc, and Dolce & Gabbana with intentional fashion direction, warm editorial lighting, and scroll-stopping Instagram storytelling.',
    slides: AUTHENTIC_VISION_SLIDES
  },
  forma: {
    title: 'Studio Forma Architecture',
    category: 'Luxury Architecture & Interior Spaces',
    metric: '120+ High-Ticket Client Inquiries',
    scope: 'Architectural Walkthroughs, Editorial Storytelling, Lead Gen',
    image: '/assets/images/portfolio-architecture.jpg',
    description: 'Monetizing architectural prestige. Produced slow-panning, cinematic residential walkthroughs and architectural storytelling that attracted premier residential and commercial commissions.'
  },
  soma: {
    title: 'Soma Movement Collective',
    category: 'Boutique Fitness & Performance',
    metric: '100% Membership Capacity',
    scope: 'Community Reels, Member Transformation Spotlights, Retainer',
    image: '/assets/images/portfolio-fitness.jpg',
    description: 'Fostering a tight-knit high-energy community. Documented coach masterclasses and athlete stories, driving the waitlist to full capacity within 90 days.'
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeProjectModalBtn');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalMetric = document.getElementById('modalProjectMetric');
  const modalScope = document.getElementById('modalProjectScope');
  const modalDesc = document.getElementById('modalProjectDescription');
  const modalInquireBtn = document.getElementById('modalProjectInquireBtn');

  // Lookbook elements
  const modalGalleryContainer = document.getElementById('modalGalleryContainer');
  const modalGalleryStage = document.getElementById('modalGalleryStage');
  const modalImage = document.getElementById('modalProjectImage');
  const modalGalleryNav = document.getElementById('modalGalleryNav');
  const modalPrevSlideBtn = document.getElementById('modalPrevSlideBtn');
  const modalNextSlideBtn = document.getElementById('modalNextSlideBtn');
  const modalSlideCaption = document.getElementById('modalSlideCaption');
  const modalSlideSub = document.getElementById('modalSlideSub');
  const modalSlideCounter = document.getElementById('modalSlideCounter');
  const modalThumbnailsStrip = document.getElementById('modalThumbnailsStrip');

  if (!modal) return;

  let activeProjectSlides = null;
  let currentSlideIdx = 0;
  let isSlideTransitioning = false;

  function goToSlide(targetIdx) {
    if (!activeProjectSlides || activeProjectSlides.length <= 1) return;
    if (targetIdx < 0) targetIdx = activeProjectSlides.length - 1;
    if (targetIdx >= activeProjectSlides.length) targetIdx = 0;
    if (targetIdx === currentSlideIdx && modalImage.src) return;
    if (isSlideTransitioning) return;

    isSlideTransitioning = true;
    currentSlideIdx = targetIdx;
    const slide = activeProjectSlides[currentSlideIdx];

    if (modalImage) {
      modalImage.classList.add('fade-out');
      setTimeout(() => {
        modalImage.src = slide.src;
        modalImage.alt = `${slide.caption} — ${slide.sub}`;
        if (modalSlideCaption) modalSlideCaption.textContent = slide.caption;
        if (modalSlideSub) modalSlideSub.textContent = slide.sub;
        if (modalSlideCounter) modalSlideCounter.textContent = slide.counter;

        // Update active thumbnail
        if (modalThumbnailsStrip) {
          const thumbs = modalThumbnailsStrip.querySelectorAll('.modal-thumb-btn');
          thumbs.forEach((tb, i) => {
            if (i === currentSlideIdx) {
              tb.classList.add('active');
              tb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
              tb.classList.remove('active');
            }
          });
        }

        modalImage.classList.remove('fade-out');
        isSlideTransitioning = false;
      }, 160);
    }
  }

  // Open modal on project card click or discipline link click
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project]');
    if (trigger) {
      e.preventDefault();
      const projectKey = trigger.dataset.project;
      const data = PROJECT_DATA[projectKey];

      if (data) {
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalCategory) modalCategory.textContent = data.category;
        if (modalMetric) modalMetric.textContent = data.metric;
        if (modalScope) modalScope.textContent = data.scope;
        if (modalDesc) modalDesc.textContent = data.description;

        // Check if project has multi-slide lookbook
        if (data.slides && data.slides.length > 1) {
          activeProjectSlides = data.slides;
          currentSlideIdx = 0;

          if (modalGalleryContainer) modalGalleryContainer.classList.add('has-lookbook');
          if (modalGalleryNav) modalGalleryNav.style.display = 'flex';
          if (modalThumbnailsStrip) {
            modalThumbnailsStrip.style.display = 'flex';
            modalThumbnailsStrip.innerHTML = activeProjectSlides.map((slide, i) => `
              <button type="button" class="modal-thumb-btn interactive-target ${i === 0 ? 'active' : ''}" data-slide-index="${i}" aria-label="View frame ${i + 1}: ${slide.caption}">
                <img src="${slide.thumb || slide.src}" alt="${slide.caption}" loading="lazy" />
              </button>
            `).join('');
          }

          const firstSlide = activeProjectSlides[0];
          if (modalImage) {
            modalImage.src = firstSlide.src;
            modalImage.alt = `${firstSlide.caption} — ${firstSlide.sub}`;
            modalImage.classList.remove('fade-out');
          }
          if (modalSlideCaption) modalSlideCaption.textContent = firstSlide.caption;
          if (modalSlideSub) modalSlideSub.textContent = firstSlide.sub;
          if (modalSlideCounter) modalSlideCounter.textContent = firstSlide.counter;
        } else {
          // Standard single-image project modal
          activeProjectSlides = null;
          if (modalGalleryContainer) modalGalleryContainer.classList.remove('has-lookbook');
          if (modalGalleryNav) modalGalleryNav.style.display = 'none';
          if (modalThumbnailsStrip) {
            modalThumbnailsStrip.style.display = 'none';
            modalThumbnailsStrip.innerHTML = '';
          }
          if (modalImage) {
            modalImage.src = data.image;
            modalImage.alt = data.title;
            modalImage.classList.remove('fade-out');
          }
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  // Next / Prev buttons
  if (modalPrevSlideBtn) {
    modalPrevSlideBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentSlideIdx - 1);
    });
  }

  if (modalNextSlideBtn) {
    modalNextSlideBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentSlideIdx + 1);
    });
  }

  // Thumbnail click
  if (modalThumbnailsStrip) {
    modalThumbnailsStrip.addEventListener('click', (e) => {
      const thumbBtn = e.target.closest('.modal-thumb-btn');
      if (thumbBtn && thumbBtn.dataset.slideIndex !== undefined) {
        e.stopPropagation();
        const idx = parseInt(thumbBtn.dataset.slideIndex, 10);
        goToSlide(idx);
      }
    });
  }

  // Mobile swipe support on lookbook stage
  if (modalGalleryStage) {
    let touchStartX = 0;
    let touchStartY = 0;

    modalGalleryStage.addEventListener('touchstart', (e) => {
      if (!activeProjectSlides || e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    modalGalleryStage.addEventListener('touchend', (e) => {
      if (!activeProjectSlides || e.changedTouches.length !== 1) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;

      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX < 0) {
          goToSlide(currentSlideIdx + 1);
        } else {
          goToSlide(currentSlideIdx - 1);
        }
      }
    }, { passive: true });
  }

  // Close modal
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (activeProjectSlides) {
      if (e.key === 'ArrowRight') {
        goToSlide(currentSlideIdx + 1);
      } else if (e.key === 'ArrowLeft') {
        goToSlide(currentSlideIdx - 1);
      }
    }
  });

  // Switch to booking modal from project modal
  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', () => {
      closeModal();
      const bookingModal = document.getElementById('bookingModal');
      if (bookingModal) {
        bookingModal.classList.add('open');
        bookingModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   5. Discovery Consultation Booking Modal & Retainer Preselection
   -------------------------------------------------------------------------- */
function openBookingWithPlan(planName = 'Growth', planPrice = '₹9,999/month') {
  const bookingModal = document.getElementById('bookingModal');
  if (!bookingModal) return;

  const badgeText = document.getElementById('formPlanBadgeText');
  const planPills = document.querySelectorAll('#planPillsContainer .neuv-pill');

  let targetValue = 'Growth — ₹9,999/month';
  const nameLower = planName.toLowerCase();

  if (nameLower.includes('starter')) {
    targetValue = 'Starter — ₹4,999/month';
  } else if (nameLower.includes('growth')) {
    targetValue = 'Growth — ₹9,999/month';
  } else if (nameLower.includes('premium')) {
    targetValue = 'Premium — ₹17,999/month';
  } else if (nameLower.includes('shoot') || nameLower.includes('model')) {
    targetValue = 'On-Site Model Shoot — ₹3,500–₹5,000/session';
  } else if (nameLower.includes('custom')) {
    targetValue = 'Custom Retainer / Bespoke';
  }

  if (badgeText) {
    badgeText.textContent = targetValue;
  }

  planPills.forEach(pill => {
    const radio = pill.querySelector('input[type="radio"]');
    if (radio) {
      if (radio.value === targetValue) {
        radio.checked = true;
        pill.classList.add('selected');
      } else {
        radio.checked = false;
        pill.classList.remove('selected');
      }
    }
  });

  // Pre-adjust focus services if model shoot was requested
  if (nameLower.includes('shoot') || nameLower.includes('model')) {
    const reelsCb = document.querySelector('input[name="services"][value="Reels & Video"]');
    if (reelsCb) {
      reelsCb.checked = true;
      reelsCb.closest('.neuv-pill')?.classList.add('selected');
    }
  }

  bookingModal.classList.add('open');
  bookingModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const nameInput = document.getElementById('clientName');
  if (nameInput) {
    setTimeout(() => nameInput.focus(), 150);
  }
}

function initBookingModal() {
  const bookingModal = document.getElementById('bookingModal');
  const openBtn = document.getElementById('openBookingModalBtn');
  const closeBtn = document.getElementById('closeBookingModalBtn');

  if (!bookingModal) return;

  function openBooking() {
    openBookingWithPlan('Growth', '₹9,999/month');
  }

  function closeBooking() {
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openBooking);
  if (closeBtn) closeBtn.addEventListener('click', closeBooking);

  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBooking();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('open')) {
      closeBooking();
    }
  });
}

function initPricingInteractions() {
  const pricingButtons = document.querySelectorAll('.btn-pricing-cta');
  pricingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || 'Growth';
      const price = btn.getAttribute('data-price') || '₹9,999/month';
      openBookingWithPlan(plan, price);
    });
  });
}

function initPricingAnimations() {
  const pricingSection = document.getElementById('pricing');
  if (!pricingSection) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const kicker = pricingSection.querySelector('.pricing-kicker');
  const subnote = pricingSection.querySelector('.pricing-subnote');
  const words = pricingSection.querySelectorAll('.pricing-titre-section .mot');
  const lead = pricingSection.querySelector('.pricing-lead');
  const cards = pricingSection.querySelectorAll('.pricing-card');
  const addon = document.getElementById('shootAddon');

  // Initial setup with subtle displacement
  gsap.set([kicker, subnote], { opacity: 0, y: 14 });
  if (words.length) gsap.set(words, { yPercent: 110, opacity: 0 });
  if (lead) gsap.set(lead, { opacity: 0, y: 20 });
  if (cards.length) gsap.set(cards, { opacity: 0, y: 36 });
  if (addon) gsap.set(addon, { opacity: 0, y: 30 });

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to([kicker, subnote], { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 })
          .to(words, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, '-=0.35')
          .to(lead, { opacity: 1, y: 0, duration: 0.65 }, '-=0.4')
          .to(cards, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 }, '-=0.3')
          .to(addon, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  observer.observe(pricingSection);
}

/* --------------------------------------------------------------------------
   6. Form Pill Selections (Radio & Checkbox)
   -------------------------------------------------------------------------- */
function syncFormPills(form) {
  if (!form) return;
  const pills = form.querySelectorAll('.neuv-pill');
  pills.forEach(pill => {
    const input = pill.querySelector('input');
    if (input) {
      pill.classList.toggle('selected', input.checked);
    }
  });

  const checkedRadio = form.querySelector('input[type="radio"]:checked');
  const badgeText = form.querySelector('[data-plan-badge]');
  if (checkedRadio && badgeText) {
    badgeText.textContent = checkedRadio.value;
  }
}

function initFormPills() {
  const pills = document.querySelectorAll('.neuv-pill');

  pills.forEach(pill => {
    const input = pill.querySelector('input');
    if (!input) return;

    input.addEventListener('change', () => {
      const parentForm = pill.closest('form') || document;
      if (input.type === 'radio') {
        const groupName = input.name;
        parentForm.querySelectorAll(`input[name="${groupName}"]`).forEach(radio => {
          radio.closest('.neuv-pill')?.classList.toggle('selected', radio.checked);
        });

        const badgeText = parentForm.querySelector('[data-plan-badge]');
        if (badgeText) {
          badgeText.textContent = input.value;
        }
      } else if (input.type === 'checkbox') {
        pill.classList.toggle('selected', input.checked);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Consultation Form Submission & Direct WhatsApp Forwarding
   -------------------------------------------------------------------------- */
const WHATSAPP_NUMBER = '918446190244';

function initConsultationForm() {
  const forms = document.querySelectorAll('.whatsapp-inquiry-form, #luxuryInquiryForm, #inlineContactForm');
  const uniqueForms = Array.from(new Set(forms));

  uniqueForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="clientName"], #clientName');
      const emailInput = form.querySelector('input[name="clientEmail"], #clientEmail');
      const phoneInput = form.querySelector('input[name="clientPhone"], #clientPhone');
      const detailsInput = form.querySelector('textarea[name="brandDetails"], #brandDetails');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const details = detailsInput ? detailsInput.value.trim() : '';

      const selectedPlan = form.querySelector('input[type="radio"]:checked')?.value || 'Growth — ₹9,999/month';

      const selectedServices = Array.from(form.querySelectorAll('input[name="services"]:checked'))
        .map(cb => cb.value)
        .join(', ') || 'All Focus Services';

      const messageLines = [
        'Hello The Social Vine Studio!',
        '',
        `*Name:* ${name}`,
        `*Phone / WhatsApp:* ${phone}`,
        `*Email:* ${email}`,
        `*Interested Retainer:* ${selectedPlan}`,
        `*Services:* ${selectedServices}`,
        `*Brand Goals:* ${details || 'Let us discuss my brand goals'}`
      ];

      const encodedMessage = encodeURIComponent(messageLines.join('\n'));
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Open WhatsApp window directly & synchronously on submit so popup blockers never block it
      const waWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!waWindow) {
        window.location.href = whatsappUrl;
      }

      // Immediate UI feedback & clean reset
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'WhatsApp Concierge Opened ✓';
        submitBtn.style.backgroundColor = 'var(--accent-vine)';
        submitBtn.style.color = '#ffffff';

        setTimeout(() => {
          const modal = form.closest('.modal-backdrop');
          if (modal && modal.classList.contains('open')) {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
          }
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
          form.reset();
          syncFormPills(form);
        }, 1200);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. neuv.fr Hero Architectural Scroll Animation & Kinetic Blueprint
   -------------------------------------------------------------------------- */
function initHeroScrollAnimation() {
  const heroScene = document.getElementById('heroScene');
  const planGrid = document.getElementById('planGrid');
  const heroStatement = document.getElementById('heroStatement');
  const motRadical = document.getElementById('motRadical');
  const motGrowth = document.getElementById('motGrowth');
  const motDirection = document.getElementById('motDirection');
  const heroIndicator = document.getElementById('heroIndicator');
  const heroMeta = document.getElementById('heroMeta');
  const heroScrollCue = document.getElementById('heroScrollCue');

  if (!heroScene || !planGrid || !heroStatement || !motRadical || !motDirection) return;

  // Don't run heavy transforms if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let vLines = [];
  let hLines = [];
  let coteEls = [];

  // 1. Build the architectural blueprint plan grid
  function buildPlanGrid() {
    planGrid.innerHTML = '';
    vLines = [];
    hLines = [];
    coteEls = [];

    const isMobile = window.innerWidth < 768;
    const marge = isMobile ? 16 : 32;
    const larg = window.innerWidth - 2 * marge;
    const colCount = isMobile ? 4 : 12;

    // Vertical column guidelines (4 columns on mobile, 12 on desktop)
    for (let i = 0; i <= colCount; i++) {
      const v = document.createElement('i');
      v.className = (i === 0 || i === colCount) ? 'v bord' : 'v';
      v.style.left = `${marge + (larg * i) / colCount}px`;
      planGrid.appendChild(v);
      vLines.push(v);
    }

    // 3 horizontal guidelines (at 14%, 50%, 86%)
    [0.14, 0.50, 0.86].forEach((y) => {
      const h = document.createElement('i');
      h.className = 'h';
      h.style.top = `${y * 100}%`;
      planGrid.appendChild(h);
      hLines.push(h);
    });

    // Blueprint annotations (cotes)
    const annotations = [
      { text: 'COL 01', x: `${marge + 6}px`, y: 'calc(14% + 8px)' },
      { text: isMobile ? 'COL 04' : 'COL 12', x: `${window.innerWidth - marge - 58}px`, y: 'calc(14% + 8px)' },
      { text: `GRID · ${colCount} × ${Math.round(larg / colCount)} PX`, x: `${marge + 6}px`, y: 'calc(86% + 8px)' }
    ];

    annotations.forEach(({ text, x, y }) => {
      const c = document.createElement('span');
      c.className = 'cote';
      c.textContent = text;
      c.style.left = x;
      c.style.top = y;
      planGrid.appendChild(c);
      coteEls.push(c);
    });
  }

  buildPlanGrid();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildPlanGrid, 150);
  });

  // 2. Smooth Lerp Scroll Animation Loop
  let targetProgress = 0;
  let currentProgress = 0;
  let isTicking = false;

  function onScroll() {
    const sceneTop = heroScene.offsetTop;
    const sceneHeight = heroScene.offsetHeight;
    const maxScroll = sceneHeight - window.innerHeight;

    if (maxScroll <= 0) return;

    targetProgress = Math.min(1, Math.max(0, (window.scrollY - sceneTop) / maxScroll));

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(renderScrollFrame);
    }
  }

  function renderScrollFrame() {
    // Smooth lerp damping
    currentProgress += (targetProgress - currentProgress) * 0.16;

    if (Math.abs(targetProgress - currentProgress) < 0.001) {
      currentProgress = targetProgress;
    }

    const p = currentProgress;
    const isMobile = window.innerWidth < 768;
    const shift = isMobile ? window.innerWidth * 0.035 : window.innerWidth * 0.15;
    const wdthSpan = isMobile ? 7 : 18;

    // A. Animate Vertical Guidelines (drawn downwards)
    vLines.forEach((v, i) => {
      const localP = Math.min(1, Math.max(0, (p - i * 0.012) / 0.48));
      v.style.transform = `scaleY(${localP.toFixed(4)})`;
    });

    // B. Animate Horizontal Guidelines (drawn across)
    hLines.forEach((h, i) => {
      const localP = Math.min(1, Math.max(0, (p - 0.04 - i * 0.02) / 0.42));
      h.style.transform = `scaleX(${localP.toFixed(4)})`;
    });

    // C. Fade In Blueprint Cotes
    coteEls.forEach((c) => {
      c.style.opacity = p > 0.12 ? Math.min(0.7, (p - 0.12) / 0.22).toFixed(3) : '0';
    });

    // D. Kinetic Word Transforms (RADICAL right, DIRECTION. left, GROWTH centered)
    motRadical.style.transform = `translate3d(${(p * shift).toFixed(1)}px, 0, 0)`;
    if (motGrowth) {
      motGrowth.style.transform = `scale(${(1 + p * 0.04).toFixed(3)})`;
    }
    motDirection.style.transform = `translate3d(${(-p * shift).toFixed(1)}px, 0, 0)`;

    // E. Variable Font Width & 3D Perspective Depth
    heroStatement.style.fontVariationSettings = `'wdth' ${(62 + p * wdthSpan).toFixed(1)}`;
    heroStatement.style.transform = `perspective(1100px) translate3d(0, ${(-p * 32).toFixed(1)}px, ${(-p * 140).toFixed(1)}px)`;

    // F. Fade Out Hero Meta, Indicator, and Scroll Cue
    const fade = Math.max(0, 1 - p * 2.6).toFixed(3);
    if (heroIndicator) heroIndicator.style.opacity = (fade * 0.85).toString();
    if (heroMeta) heroMeta.style.opacity = fade;
    if (heroScrollCue) heroScrollCue.style.opacity = fade;

    if (Math.abs(targetProgress - currentProgress) > 0.0005) {
      requestAnimationFrame(renderScrollFrame);
    } else {
      isTicking = false;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

