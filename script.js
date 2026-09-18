// ========================================
// ANDREA'S BIRTHDAY CONTENT
// EDIT YOUR CONTENT HERE
// ========================================
const birthdayContent = {
  sisterName: "Andrea Maria Jesslin",

  welcomeMessage: {
    title: "Hey Andrea Maria Jesslin ❤️",
    subtitle: "I made something special just for you..."
  },

  wishMessage: {
    title: "Andrea, make a wish... ✨",
    subtitle: "Take a moment, close your eyes, and make your birthday wish."
  },

  // PUT ANDREA'S PHOTOS INSIDE THE images FOLDER
  photos: [
    "images/photo1.jpg?v=25.0",
    "images/photo2.jpg?v=25.0",
    "images/photo3.jpg?v=25.0",
    "images/photo4.jpg?v=25.0"
  ],

  specialPhoto: "images/special-photo.jpg?v=25.0",
  finalPhoto: "images/family-photo.jpg?v=25.0",

  memoryCaptions: [
    "A memory I'll always keep ❤️",
    "One of my favorite moments ✨",
    "A moment worth remembering.",
    "Another beautiful memory ❤️"
  ],

  personalMessage: [
    "Happy Birthday, Andrea! ❤️",
    "I made this little surprise just for you because you deserve a day filled with happiness, smiles and beautiful memories.",
    "We've shared so many moments, and I hope there are many more memories waiting for us.",
    "Whatever this new year brings, I hope you always keep smiling and chasing the things that make you happy.",
    "Enjoy your day, Andrea. You deserve it. ❤️",
    "Happy Birthday! 🎂✨"
  ],

  finalPhotoCaption: "One last memory before the surprise ends ❤️",
  finalEndingNote: "Wishing you a wonderful year ahead! 🎂✨",

  // INTERACTIVE MEMORY TIMELINE (JOURNEY: Beginning -> Memories -> Special Moments -> Today)
  timeline: [
    {
      date: "Beginning ✨",
      title: "The Beginning ✨",
      desc: "Where every beautiful memory started.",
      photo: "images/photo1.jpg"
    },
    {
      date: "Memories ❤️",
      title: "Sweet Memories ❤️",
      desc: "Looking back at the moments that make us smile.",
      photo: "images/photo2.jpg"
    },
    {
      date: "Special Moments 🌸",
      title: "Special Moments 🌸",
      desc: "The times that hold a very special place in our hearts.",
      photo: "images/photo3.jpg"
    },
    {
      date: "Today 💫",
      title: "Today's Joy 💫",
      desc: "Celebrating who you are today and all that makes you amazing.",
      photo: "images/photo4.jpg"
    }
  ],
  timelineEndingTitle: "And the story continues... ❤️",
  timelineEndingWish: "Happy Birthday, Andrea Maria Jesslin! 🎂✨",

  video: "videos/birthday-video.mp4",
  music: "audio/birthday-song.mp3",
  playlist: [
    { title: "Happy Birthday Andrea", src: "audio/birthday-song.mp3" },
    { title: "Celebration Melody", src: "audio/celebration.mp3" }
  ]
};

// Backward-compatible reference
const ANDREA_BIRTHDAY_CONTENT = birthdayContent;

/* ==========================================================================
   Happy Birthday Andrea Maria Jesslin - JavaScript Engine
   Features: Stage Transitions, Particle & Heart Canvas, Candle Wish Burst,
             Photo Gallery Lightbox, Message Reveal, Interactive Gift Box,
             Stage 6 Finale Celebration Confetti & Audio Controller
   ========================================================================== */

// Global particle & confetti trigger references
let triggerWishSparkles = () => {};
let triggerConfettiShower = () => {};

document.addEventListener('DOMContentLoaded', () => {
  // 0. Smooth Loading Screen Fade Out
  initLoadingScreen();

  // 1. Apply Centralized Birthday Configuration to DOM
  applyBirthdayConfig();

  // 2. Initialize Background Particle & Confetti Canvas
  initParticleCanvas();

  // 3. Initialize Stage Navigation & Interactivity
  initStageNavigation();

  // 4. Initialize Floating & Pill Audio Controls
  initAudioPlayer();

  // 5. Initialize Photo Gallery Lightbox Modal with Swipe & Nav
  initLightboxModal();

  // 6. Initialize Scroll Reveal Animations
  initScrollReveal();

  // 7. Initialize Extra Surprise Modal (Stage 6)
  initSurpriseModal();

  // 8. Initialize Video Container Error Fallback
  initVideoContainer();

  // 9. Initialize Hidden Secret Easter Egg (Stage 6)
  initSecretSurprise();
});

/**
 * Smoothly hides loading overlay once experience is ready.
 */
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 800);
    }, 600);
  }
}

/**
 * Safely plays optional UI sound effects without throwing console errors if audio is missing.
 */
function playSound(soundId) {
  try {
    const sfx = document.getElementById(soundId);
    if (sfx) {
      sfx.currentTime = 0;
      const playPromise = sfx.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silent catch if autoplay blocked or missing sound file
        });
      }
    }
  } catch (e) {
    // Fail silently
  }
}

/* ==========================================================================
   1. APPLY CENTRAL CONFIGURATION TO DOM
   ========================================================================== */
function applyBirthdayConfig() {
  // Update Welcome Subtitle
  const welcomeSubtitle = document.querySelector('.welcome-subtitle');
  if (welcomeSubtitle && birthdayContent.welcomeMessage && birthdayContent.welcomeMessage.subtitle) {
    welcomeSubtitle.textContent = birthdayContent.welcomeMessage.subtitle;
  }

  // Update Name Highlights
  const nameHighlights = document.querySelectorAll('.name-highlight, .final-name-highlight');
  nameHighlights.forEach(el => {
    if (el.classList.contains('name-highlight')) {
      el.textContent = birthdayContent.sisterName;
    }
  });

  // Update Audio Src
  const bgMusic = document.getElementById('bg-music');
  if (bgMusic && birthdayContent.music) {
    bgMusic.src = birthdayContent.music;
  }

  // Update Gallery Photo Paths & Captions (Stage 3)
  const photoWrappers = document.querySelectorAll('.photo-gallery-grid .photo-wrapper');
  photoWrappers.forEach((wrapper, index) => {
    const photoSrc = birthdayContent.photos[index];
    const caption = birthdayContent.memoryCaptions[index];

    if (photoSrc) wrapper.setAttribute('data-src', photoSrc);
    if (caption) wrapper.setAttribute('data-caption', caption);

    const img = wrapper.querySelector('.gallery-img');
    if (img && photoSrc) img.src = photoSrc;

    const captionEl = wrapper.parentNode.querySelector('.photo-caption');
    if (captionEl && caption) captionEl.textContent = caption;
  });

  // Update Memory Timeline Items (Stage 3)
  const timelineItems = document.querySelectorAll('.memory-timeline .timeline-item');
  timelineItems.forEach((item, index) => {
    const data = birthdayContent.timeline && birthdayContent.timeline[index];
    if (!data) return;

    const dateEl = item.querySelector('.timeline-date');
    const titleEl = item.querySelector('.timeline-card-title');
    const descEl = item.querySelector('.timeline-card-desc');
    const wrapper = item.querySelector('.photo-wrapper');
    const img = item.querySelector('.gallery-img');

    if (dateEl && data.date) dateEl.textContent = data.date;
    if (titleEl && data.title) titleEl.textContent = data.title;
    if (descEl && data.desc) descEl.textContent = data.desc;

    const caption = `${data.title} — ${data.desc}`;
    if (wrapper && data.photo) {
      wrapper.setAttribute('data-src', data.photo);
      wrapper.setAttribute('data-caption', caption);
    }
    if (img && data.photo) img.src = data.photo;
  });

  // Update Timeline Conclusion Card
  const timelineFinalTitle = document.querySelector('.timeline-final-title');
  const timelineFinalWish = document.querySelector('.timeline-final-wish');
  if (timelineFinalTitle && birthdayContent.timelineEndingTitle) {
    timelineFinalTitle.textContent = birthdayContent.timelineEndingTitle;
  }
  if (timelineFinalWish && birthdayContent.timelineEndingWish) {
    timelineFinalWish.textContent = birthdayContent.timelineEndingWish;
  }

  // Update Stage 4 Personal Message Paragraphs
  const messageBody = document.getElementById('message-body');
  if (messageBody && Array.isArray(birthdayContent.personalMessage)) {
    const paragraphs = messageBody.querySelectorAll('.message-paragraph');
    paragraphs.forEach((p, idx) => {
      if (birthdayContent.personalMessage[idx]) {
        p.textContent = birthdayContent.personalMessage[idx];
      }
    });
  }

  // Update Special Photo Path (Stage 5)
  const specialWrapper = document.querySelector('.special-photo-wrapper');
  if (specialWrapper && birthdayContent.specialPhoto) {
    specialWrapper.setAttribute('data-src', birthdayContent.specialPhoto);
    const specialImg = specialWrapper.querySelector('.special-img');
    if (specialImg) specialImg.src = birthdayContent.specialPhoto;
  }

  // Update Final Photo Path & Caption (Stage 6)
  const finalWrapper = document.querySelector('.final-photo-frame');
  if (finalWrapper && birthdayContent.finalPhoto) {
    const caption = birthdayContent.finalPhotoCaption || "One last memory before the surprise ends ❤️";
    finalWrapper.setAttribute('data-src', birthdayContent.finalPhoto);
    finalWrapper.setAttribute('data-caption', caption);

    const finalImg = finalWrapper.querySelector('.final-photo-img');
    if (finalImg) finalImg.src = birthdayContent.finalPhoto;
  }

  // Update Ending Note in Stage 6
  const endingNoteEl = document.querySelector('.final-message-heart');
  if (endingNoteEl && birthdayContent.finalEndingNote) {
    endingNoteEl.textContent = birthdayContent.finalEndingNote;
  }

  // Update Video Src (Stage 5)
  const birthdayVideo = document.getElementById('birthday-video');
  if (birthdayVideo && birthdayContent.video) {
    const source = birthdayVideo.querySelector('source');
    if (source) source.src = birthdayContent.video;
  }
}

/* ==========================================================================
   2. STAGE NAVIGATION & TRANSITIONS
   ========================================================================== */
function initStageNavigation() {
  const startBtn = document.getElementById('start-btn');
  const wishBtn = document.getElementById('wish-btn');
  const stage2NextBtn = document.getElementById('stage2-next-btn');
  const stage3NextBtn = document.getElementById('stage3-next-btn');
  const musicNextBtn = document.getElementById('music-next-btn');
  const stage4NextBtn = document.getElementById('stage4-next-btn');
  const stage5NextBtn = document.getElementById('stage5-next-btn');

  const openGiftBtn = document.getElementById('open-gift-btn');
  const giftBox = document.getElementById('gift-box');
  const replayBtn = document.getElementById('replay-btn');

  // Main Nav Bar Link Smooth Scrolling
  const navItems = document.querySelectorAll('.main-nav-bar .nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute('data-section') || item.getAttribute('href').replace('#', '');
      playSound('sfx-click');
      scrollToSection(sectionId);
    });
  });

  // Stage 1 -> Special Message Section Smooth Scroll
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      playSound('sfx-click');
      scrollToSection('message');
    });
  }



  // Stage 2: Wish-making Interaction
  const rewishBtn = document.getElementById('rewish-btn');

  function handleMakeWish() {
    playSound('sfx-reveal');
    const cakeCard = document.querySelector('.cake-card');
    const flameElement = document.getElementById('candle-flame');
    const wishResponse = document.getElementById('wish-response');

    // 1. Activate bright flame & cake glow effect
    if (cakeCard) cakeCard.classList.add('wish-activated');

    // 2. Hide initial "Make My Wish 🎂" button smoothly
    if (wishBtn) wishBtn.classList.add('hidden-state');

    // 3. Trigger magical particle burst at candle position
    if (flameElement) {
      const rect = flameElement.getBoundingClientRect();
      triggerWishSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      triggerWishSparkles(window.innerWidth / 2, window.innerHeight * 0.4);
    }

    // 4. Display wish message card & Make Another Wish replay button
    if (wishResponse) wishResponse.classList.remove('hidden-state');
    if (rewishBtn) rewishBtn.classList.remove('hidden-state');

    // 5. Reveal "Open My Gift 🎁" button after a short moment
    setTimeout(() => {
      if (stage2NextBtn) stage2NextBtn.classList.remove('hidden-state');
    }, 1200);
  }

  if (wishBtn) wishBtn.addEventListener('click', handleMakeWish);
  if (rewishBtn) rewishBtn.addEventListener('click', handleMakeWish);

  // Candle wish button -> Game Transition
  if (stage2NextBtn) {
    stage2NextBtn.addEventListener('click', () => {
      playSound('sfx-click');
      scrollToSection('game');
    });
  }

  // Game Victory -> Finale Transition
  const gameNextBtn = document.getElementById('game-next-btn');
  if (gameNextBtn) {
    gameNextBtn.addEventListener('click', () => {
      playSound('sfx-click');
      scrollToSection('finale');
    });
  }

  // Page 2 (Memories) -> Page 3 (Special Message) Transition
  if (stage3NextBtn) {
    stage3NextBtn.addEventListener('click', () => {
      playSound('sfx-click');
      scrollToSection('message');
    });
  }

  // Message -> Surprise Transition
  if (stage4NextBtn) {
    stage4NextBtn.addEventListener('click', () => {
      playSound('sfx-click');
      scrollToSection('surprise');
    });
  }

  // Stage 5: Gift Open Interaction
  function handleOpenGift() {
    if (giftBox && giftBox.classList.contains('opened')) return;

    playSound('sfx-reveal');
    const preOpen = document.getElementById('surprise-pre-open');
    const revealed = document.getElementById('surprise-revealed');
    const flash = document.querySelector('.flash-burst-glow');

    if (giftBox) giftBox.classList.add('opened');

    // 1. Trigger burst of magical sparkles from gift box position
    if (giftBox) {
      const rect = giftBox.getBoundingClientRect();
      triggerWishSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    // 2. Trigger screen flash glow
    if (flash) flash.classList.add('flash-burst-active');

    // 3. Smoothly hide pre-open and show revealed content
    setTimeout(() => {
      if (preOpen) preOpen.style.display = 'none';
      if (revealed) revealed.classList.remove('hidden-state');
    }, 650);
  }

  if (openGiftBtn) openGiftBtn.addEventListener('click', handleOpenGift);
  if (giftBox) giftBox.addEventListener('click', handleOpenGift);

  // Stage 5 -> Stage 6 Transition
  if (stage5NextBtn) {
    stage5NextBtn.addEventListener('click', () => {
      playSound('sfx-click');
      scrollToSection('finale');
    });
  }

  // Stage 6 Replay Button -> Smooth Scrolls back to Welcome Section & Resets State
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      playSound('sfx-click');
      scrollToSection('welcome');
      resetExperienceState();
    });
  }  // Stage Back Navigation Buttons (Intelligent 1-by-1 Step Backward)
  const stageBackBtns = document.querySelectorAll('.stage-back-btn');
  stageBackBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playSound('sfx-click');
      const currentId = getCurrentStageId();
      const prevStage = getPreviousStageId(currentId);
      scrollToSection(prevStage);
    });
  });

}

function updateActiveNavLink(activeId) {
  const navLinks = document.querySelectorAll('.main-nav-bar .nav-item');
  const aliasMap = {
    'stage-1': 'welcome',
    'stage-2': 'message',
    'stage-3': 'game',
    'stage-4': 'finale',
    'surprise': 'finale',
    'stage-5': 'finale',
    'stage-6': 'finale'
  };
  const targetId = aliasMap[activeId] || activeId;

  navLinks.forEach(link => {
    const sec = link.getAttribute('data-section') || link.getAttribute('href').replace('#', '');
    if (sec === targetId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

const STAGE_ORDER = ['welcome', 'message', 'game', 'finale'];

function getCurrentStageId() {
  const activeStage = document.querySelector('.stage.active');
  if (!activeStage) return 'welcome';
  const secKey = activeStage.getAttribute('data-section') || activeStage.id;
  const aliasMap = {
    'stage-1': 'welcome',
    'stage-2': 'message',
    'stage-3': 'game',
    'stage-4': 'finale',
    'surprise': 'finale',
    'stage-5': 'finale',
    'stage-6': 'finale'
  };
  return aliasMap[secKey] || secKey;
}

function getPreviousStageId(currentStageId) {
  const normalizedId = currentStageId || getCurrentStageId();
  const currentIndex = STAGE_ORDER.indexOf(normalizedId);
  if (currentIndex <= 0) return 'welcome';
  return STAGE_ORDER[currentIndex - 1];
}

function scrollToSection(sectionId) {
  const aliasMap = {
    'stage-1': 'welcome',
    'stage-2': 'message',
    'stage-3': 'game',
    'stage-4': 'finale',
    'surprise': 'finale',
    'stage-5': 'finale',
    'stage-6': 'finale'
  };
  const targetId = aliasMap[sectionId] || sectionId;
  const targetIndex = STAGE_ORDER.indexOf(targetId);

  // Overlay Card Stage Transition Logic
  const stages = document.querySelectorAll('.stage');
  stages.forEach(stage => {
    const secKey = stage.getAttribute('data-section') || stage.id;
    const normSecKey = aliasMap[secKey] || secKey;
    const secIndex = STAGE_ORDER.indexOf(normSecKey);

    stage.classList.remove('active', 'underneath');

    if (secIndex === targetIndex) {
      stage.classList.add('active');
      stage.scrollTop = 0; // Reset internal card scroll position
    } else if (secIndex < targetIndex && targetIndex !== -1) {
      stage.classList.add('underneath');
    }
  });

  // Push history state for browser back button support
  if (window.history && window.history.pushState && window.location.hash !== `#${targetId}`) {
    window.history.pushState({ stage: targetId }, '', `#${targetId}`);
  }

  updateActiveNavLink(targetId);
  onStageActivated(targetId);
}

// Browser Back/Forward Gesture & PopState Navigation Handler
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.stage) {
    scrollToSection(e.state.stage);
  } else {
    const hashStage = window.location.hash.replace('#', '');
    if (hashStage && STAGE_ORDER.includes(hashStage)) {
      scrollToSection(hashStage);
    } else {
      const prevStage = getPreviousStageId(getCurrentStageId());
      scrollToSection(prevStage);
    }
  }
});

/**
 * Resets interactive states across all stages so experience can be replayed cleanly.
 */
function resetExperienceState() {
  setTimeout(() => {
    // Reset Stage 2
    const cakeCard = document.querySelector('.cake-card');
    const wishBtn = document.getElementById('wish-btn');
    const rewishBtn = document.getElementById('rewish-btn');
    const wishResponse = document.getElementById('wish-response');
    const stage2NextBtn = document.getElementById('stage2-next-btn');

    if (cakeCard) cakeCard.classList.remove('wish-activated');
    if (wishBtn) wishBtn.classList.remove('hidden-state');
    if (rewishBtn) rewishBtn.classList.add('hidden-state');
    if (wishResponse) wishResponse.classList.add('hidden-state');
    if (stage2NextBtn) stage2NextBtn.classList.remove('hidden-state');

    // Reset Game Stage
    initBirthdayGame();

    // Reset Stage 5
    const giftBox = document.getElementById('gift-box');
    const preOpen = document.getElementById('surprise-pre-open');
    const revealed = document.getElementById('surprise-revealed');
    const flash = document.querySelector('.flash-burst-glow');

    if (giftBox) giftBox.classList.remove('opened');
    if (preOpen) preOpen.style.display = 'block';
    if (revealed) revealed.classList.add('hidden-state');
    if (flash) flash.classList.remove('flash-burst-active');

    // Reset Secret Easter Egg
    resetSecretTapCounter();

    // Reset Audio
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      updateAudioUI(false);
    }
  }, 400);
}

/**
 * Smooth transition fallback helper
 */
function transitionToStage(currentStageId, nextStageId) {
  scrollToSection(nextStageId);
  onStageActivated(nextStageId);
}

/**
 * Hook for executing custom logic when a specific stage becomes active.
 */
function onStageActivated(stageId) {
  console.log(`✨ Switched to stage: ${stageId}`);

  switch (stageId) {
    case 'game':
      console.log('🎮 Stage 3 (Birthday Mini-Game) Active');
      initBirthdayGame();
      break;

    case 'stage-2':
      console.log('🕯️ Stage 2 (Candle & Wish Scene) Ready');
      break;

    case 'stage-3':
      console.log('📸 Stage 3 (Photo & Memories Section) Active');
      initScrollReveal();
      break;

    case 'stage-4':
      console.log('💌 Stage 4 (Personal Message Scene) Active');
      triggerStage4MessageReveal();
      break;

    case 'stage-5':
      console.log('🎁 Stage 5 (Surprise Reveal Scene) Active');
      break;

    case 'stage-6':
      console.log('🎉 Stage 6 (Final Birthday Moment) Active');
      playSound('sfx-celebration');
      triggerConfettiShower();
      triggerStage6MessageReveal();
      triggerWishSparkles(window.innerWidth / 2, window.innerHeight * 0.35);
      break;

    default:
      break;
  }
}

/* ==========================================================================
   3. STAGE 4 LINE-BY-LINE MESSAGE REVEAL ENGINE
   ========================================================================== */
function triggerStage4MessageReveal() {
  const stage4 = document.getElementById('message') || document.getElementById('stage-4');
  if (!stage4) return;

  const revealLines = stage4.querySelectorAll('.reveal-line');
  revealLines.forEach(line => line.classList.add('visible'));
}

function triggerStage6MessageReveal() {
  const stage6 = document.getElementById('stage-6');
  if (!stage6) return;

  const revealLines = stage6.querySelectorAll('.reveal-line');
  revealLines.forEach(line => line.classList.remove('visible'));

  revealLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('visible');
    }, index * 550);
  });
}

/* ==========================================================================
   4. PHOTO GALLERY LIGHTBOX MODAL WITH NAVIGATION & SWIPE
   ========================================================================== */
function initLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  const overlay = document.getElementById('lightbox-overlay');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxFallback = document.getElementById('lightbox-fallback');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (!modal) return;

  const photoWrappers = Array.from(document.querySelectorAll('.photo-wrapper'));
  let currentIndex = 0;

  function showPhoto(index) {
    if (index < 0) index = photoWrappers.length - 1;
    if (index >= photoWrappers.length) index = 0;
    currentIndex = index;

    const wrapper = photoWrappers[currentIndex];
    const caption = wrapper.getAttribute('data-caption') || '';
    const img = wrapper.querySelector('.gallery-img');
    const hasFallback = wrapper.classList.contains('has-fallback');

    if (lightboxCaption) lightboxCaption.textContent = caption;

    if (hasFallback || !img || !img.src || img.classList.contains('img-fallback')) {
      if (lightboxImg) lightboxImg.style.display = 'none';
      if (lightboxFallback) lightboxFallback.classList.remove('hidden-state');
    } else {
      if (lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.style.display = 'block';
      }
      if (lightboxFallback) lightboxFallback.classList.add('hidden-state');
    }
  }

  photoWrappers.forEach((wrapper, index) => {
    const openLightbox = () => {
      showPhoto(index);
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    };

    wrapper.addEventListener('click', openLightbox);
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox();
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', () => showPhoto(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showPhoto(currentIndex + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) showPhoto(currentIndex + 1);
      else showPhoto(currentIndex - 1);
    }
  }
}

/* ==========================================================================
   5. ONE MORE SURPRISE MODAL (STAGE 6)
   ========================================================================== */
function initSurpriseModal() {
  const modal = document.getElementById('surprise-modal');
  const overlay = document.getElementById('surprise-modal-overlay');
  const closeBtn = document.getElementById('surprise-modal-close');
  const dismissBtn = document.getElementById('surprise-modal-dismiss');
  const extraSurpriseBtn = document.getElementById('extra-surprise-btn');

  if (!modal) return;

  function handleTapSparkle(e) {
    if (modal.classList.contains('active')) {
      const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
      const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);
      triggerWishSparkles(x, y);
    }
  }

  if (extraSurpriseBtn) {
    extraSurpriseBtn.addEventListener('click', () => {
      playSound('sfx-reveal');
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');

      // Trigger initial celebration sparkle burst
      triggerWishSparkles(window.innerWidth / 2, window.innerHeight * 0.45);
    });
  }

  // Interactive tap anywhere for sparkles when modal is open
  modal.addEventListener('click', (e) => {
    // Avoid re-triggering sparkle if clicking dismiss button
    if (e.target.closest('#surprise-modal-dismiss') || e.target.closest('#surprise-modal-close')) {
      return;
    }
    handleTapSparkle(e);
  });

  function closeModal() {
    playSound('sfx-click');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. SCROLL REVEAL ANIMATION OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (index % 3) * 120);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

/* ==========================================================================
   7. AUDIO CONTROLLER & MUSIC PLAYER ENGINE
   ========================================================================== */
let currentTrackIndex = 0;
let isMutedState = false;
let previousVolume = 0.7;

function getPlaylist() {
  if (Array.isArray(birthdayContent.playlist) && birthdayContent.playlist.length > 0) {
    return birthdayContent.playlist;
  }
  return [
    { title: "Happy Birthday Andrea", src: birthdayContent.music || "audio/birthday-song.mp3" }
  ];
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function initAudioPlayer() {
  const bgMusic = document.getElementById('bg-music');
  const widget = document.getElementById('music-player-widget');
  const toggleBtn = document.getElementById('player-toggle-btn');
  const playBtn = document.getElementById('player-play-btn');
  const prevBtn = document.getElementById('player-prev-btn');
  const nextBtn = document.getElementById('player-next-btn');
  const seekBar = document.getElementById('music-seek-bar');
  const volumeSlider = document.getElementById('player-volume-slider');
  const volumeBtn = document.getElementById('player-volume-btn');
  const musicToggleBtn = document.getElementById('music-toggle-btn');

  if (!bgMusic) return;

  const playlist = getPlaylist();

  // 1. Load Current Track Title & Source
  function loadTrack(index) {
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;
    currentTrackIndex = index;

    const track = playlist[currentTrackIndex];
    if (track && track.src) {
      // Avoid resetting src if it's already set to the same file
      const currentSrc = bgMusic.getAttribute('src');
      if (!currentSrc || !currentSrc.endsWith(track.src)) {
        bgMusic.src = track.src;
      }
    }

    const title = (track && track.title) ? track.title : "Happy Birthday Track";
    const miniTitle = document.getElementById('player-mini-title');
    const songTitle = document.getElementById('player-song-title');
    const secTrackTitle = document.getElementById('sec-track-title');

    if (miniTitle) miniTitle.textContent = title;
    if (songTitle) songTitle.textContent = title;
    if (secTrackTitle) secTrackTitle.textContent = title;
  }

  // Initial Track Setup
  loadTrack(0);
  bgMusic.volume = previousVolume;

  // 2. Play / Pause Logic
  function toggleAudio() {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        updateAudioUI(true);
      }).catch(err => {
        console.log('Audio playback issue or file missing:', err);
        updateAudioUI(false);
      });
    } else {
      bgMusic.pause();
      updateAudioUI(false);
    }
  }

  // 3. Track Switching Logic
  function prevTrack() {
    loadTrack(currentTrackIndex - 1);
    bgMusic.play().then(() => updateAudioUI(true)).catch(() => updateAudioUI(false));
  }

  function nextTrack() {
    loadTrack(currentTrackIndex + 1);
    bgMusic.play().then(() => updateAudioUI(true)).catch(() => updateAudioUI(false));
  }

  // 4. Expand / Collapse Widget Toggle
  if (toggleBtn && widget) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      widget.classList.toggle('collapsed');
    });
  }

  // Section 3 Dedicated Music Player Controls
  const secPlayBtn = document.getElementById('sec-play-btn');
  const secPrevBtn = document.getElementById('sec-prev-btn');
  const secNextBtn = document.getElementById('sec-next-btn');
  const secSeekBar = document.getElementById('sec-seek-bar');
  const secVolumeSlider = document.getElementById('sec-volume-slider');

  // Control Buttons Event Listeners
  if (playBtn) playBtn.addEventListener('click', toggleAudio);
  if (secPlayBtn) secPlayBtn.addEventListener('click', toggleAudio);
  if (musicToggleBtn) musicToggleBtn.addEventListener('click', toggleAudio);
  if (prevBtn) prevBtn.addEventListener('click', prevTrack);
  if (secPrevBtn) secPrevBtn.addEventListener('click', prevTrack);
  if (nextBtn) nextBtn.addEventListener('click', nextTrack);
  if (secNextBtn) secNextBtn.addEventListener('click', nextTrack);

  // 5. Progress & Seeking
  bgMusic.addEventListener('timeupdate', () => {
    if (!bgMusic.duration || isNaN(bgMusic.duration)) return;
    const currentTime = document.getElementById('music-current-time');
    const totalTime = document.getElementById('music-total-time');
    const secCurrentTime = document.getElementById('sec-current-time');
    const secTotalTime = document.getElementById('sec-total-time');

    const pct = (bgMusic.currentTime / bgMusic.duration) * 100;
    if (seekBar) seekBar.value = pct;
    if (secSeekBar) secSeekBar.value = pct;

    const formattedCurrent = formatTime(bgMusic.currentTime);
    const formattedTotal = formatTime(bgMusic.duration);

    if (currentTime) currentTime.textContent = formattedCurrent;
    if (totalTime) totalTime.textContent = formattedTotal;
    if (secCurrentTime) secCurrentTime.textContent = formattedCurrent;
    if (secTotalTime) secTotalTime.textContent = formattedTotal;
  });

  bgMusic.addEventListener('loadedmetadata', () => {
    const totalTime = document.getElementById('music-total-time');
    const secTotalTime = document.getElementById('sec-total-time');
    const formattedTotal = formatTime(bgMusic.duration);
    if (totalTime) totalTime.textContent = formattedTotal;
    if (secTotalTime) secTotalTime.textContent = formattedTotal;
  });

  bgMusic.addEventListener('ended', () => {
    if (playlist.length > 1) {
      nextTrack();
    } else {
      bgMusic.currentTime = 0;
      bgMusic.play().catch(() => updateAudioUI(false));
    }
  });

  if (seekBar) {
    const seekHandler = (e) => {
      if (bgMusic.duration) {
        const seekTo = (e.target.value / 100) * bgMusic.duration;
        bgMusic.currentTime = seekTo;
      }
    };
    seekBar.addEventListener('input', seekHandler);
    seekBar.addEventListener('change', seekHandler);
  }

  if (secSeekBar) {
    const secSeekHandler = (e) => {
      if (bgMusic.duration) {
        const seekTo = (e.target.value / 100) * bgMusic.duration;
        bgMusic.currentTime = seekTo;
      }
    };
    secSeekBar.addEventListener('input', secSeekHandler);
    secSeekBar.addEventListener('change', secSeekHandler);
  }

  // 6. Volume Slider & Mute Control
  if (volumeSlider) {
    volumeSlider.value = previousVolume;
    volumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      bgMusic.volume = val;
      previousVolume = val;
      isMutedState = (val === 0);
      if (secVolumeSlider) secVolumeSlider.value = val;
      updateVolumeIcon();
    });
  }

  if (secVolumeSlider) {
    secVolumeSlider.value = previousVolume;
    secVolumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      bgMusic.volume = val;
      previousVolume = val;
      isMutedState = (val === 0);
      if (volumeSlider) volumeSlider.value = val;
      updateVolumeIcon();
    });
  }

  if (volumeBtn) {
    volumeBtn.addEventListener('click', () => {
      if (isMutedState) {
        isMutedState = false;
        bgMusic.volume = previousVolume > 0 ? previousVolume : 0.7;
        if (volumeSlider) volumeSlider.value = bgMusic.volume;
        if (secVolumeSlider) secVolumeSlider.value = bgMusic.volume;
      } else {
        isMutedState = true;
        previousVolume = bgMusic.volume;
        bgMusic.volume = 0;
        if (volumeSlider) volumeSlider.value = 0;
        if (secVolumeSlider) secVolumeSlider.value = 0;
      }
      updateVolumeIcon();
    });
  }

  function updateVolumeIcon() {
    const volIcon = document.getElementById('player-volume-icon');
    if (!volIcon) return;
    if (bgMusic.volume === 0 || isMutedState) {
      volIcon.textContent = '🔇';
    } else if (bgMusic.volume < 0.5) {
      volIcon.textContent = '🔉';
    } else {
      volIcon.textContent = '🔊';
    }
  }

  // Auto-start music on first stage button interaction
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (bgMusic.paused) {
        playBackgroundMusic();
      }
    }, { once: true });
  }
}

function updateAudioUI(isPlaying) {
  const widget = document.getElementById('music-player-widget');
  const playIcon = document.getElementById('player-play-icon');
  const secPlayIcon = document.getElementById('sec-play-icon');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicIcon = document.getElementById('music-icon');
  const musicLabel = document.getElementById('music-label');

  if (isPlaying) {
    if (widget) widget.classList.add('playing');
    if (playIcon) playIcon.textContent = '⏸️';
    if (secPlayIcon) secPlayIcon.textContent = '⏸️ Pause';

    if (musicToggleBtn) musicToggleBtn.classList.add('playing');
    if (musicIcon) musicIcon.textContent = '⏸️';
    if (musicLabel) musicLabel.textContent = 'Pause Song';
  } else {
    if (widget) widget.classList.remove('playing');
    if (playIcon) playIcon.textContent = '▶️';
    if (secPlayIcon) secPlayIcon.textContent = '▶️ Play';

    if (musicToggleBtn) musicToggleBtn.classList.remove('playing');
    if (musicIcon) musicIcon.textContent = '🎵';
    if (musicLabel) musicLabel.textContent = 'Play Song';
  }
}

function playBackgroundMusic() {
  const bgMusic = document.getElementById('bg-music');
  if (!bgMusic) return;
  bgMusic.play().then(() => updateAudioUI(true)).catch(() => updateAudioUI(false));
}

/* ==========================================================================
   8. VIDEO CONTAINER FALLBACK HANDLER
   ========================================================================== */
function initVideoContainer() {
  const video = document.getElementById('birthday-video');
  const wrapper = document.getElementById('video-wrapper');

  if (!video || !wrapper) return;

  video.addEventListener('error', () => {
    wrapper.style.display = 'none';
    console.log('Birthday video missing or unplayable; video section hidden gracefully.');
  });
}

/* ==========================================================================
   9. PARTICLES, FLOATING HEARTS & CONFETTI SHOWER ENGINE
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let floatingHearts = [];
  let wishSparkles = [];
  let confettiPieces = [];
  let isTabActive = true;

  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
  });

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.8 + 0.2;
      this.speedAlpha = (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1);
      this.speedY = Math.random() * 0.3 + 0.1;
      this.color = Math.random() < 0.3 ? '#ff9a9e' : (Math.random() < 0.6 ? '#fecfef' : '#ffffff');
    }

    update() {
      this.y -= this.speedY;
      this.alpha += this.speedAlpha;

      if (this.alpha <= 0.1 || this.alpha >= 0.95) {
        this.speedAlpha = -this.speedAlpha;
      }

      if (this.y < -10) {
        this.y = height + 10;
        this.x = Math.random() * width;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class FloatingHeart {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 40;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.oscillationSpeed = Math.random() * 0.03 + 0.01;
      this.oscillationDistance = Math.random() * 30 + 10;
      this.initialX = this.x;
      this.angle = Math.random() * Math.PI * 2;
      this.opacity = Math.random() * 0.5 + 0.25;
      this.color = Math.random() < 0.5 ? '#ff4b72' : '#ff9a9e';
    }

    update() {
      this.y -= this.speedY;
      this.angle += this.oscillationSpeed;
      this.x = this.initialX + Math.sin(this.angle) * this.oscillationDistance;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 75, 114, 0.4)';

      const topCurveHeight = this.size * 0.3;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + topCurveHeight);
      ctx.bezierCurveTo(
        this.x, this.y,
        this.x - this.size / 2, this.y,
        this.x - this.size / 2, this.y + topCurveHeight
      );
      ctx.bezierCurveTo(
        this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
        this.x, this.y + this.size,
        this.x, this.y + this.size
      );
      ctx.bezierCurveTo(
        this.x, this.y + this.size,
        this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2,
        this.x + this.size / 2, this.y + topCurveHeight
      );
      ctx.bezierCurveTo(
        this.x + this.size / 2, this.y,
        this.x, this.y,
        this.x, this.y + topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  class WishSparkle {
    constructor(originX, originY) {
      this.x = originX;
      this.y = originY;
      this.size = Math.random() * 4 + 1.5;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 1.8;
      this.gravity = 0.06;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.008;
      this.color = Math.random() < 0.4 ? '#ffd700' : (Math.random() < 0.7 ? '#ff9a9e' : '#ffffff');
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class ConfettiParticle {
    constructor() {
      this.x = Math.random() * width;
      this.y = -20 - Math.random() * 100;
      this.width = Math.random() * 8 + 6;
      this.height = Math.random() * 12 + 6;
      this.vy = Math.random() * 2.5 + 1.5;
      this.vx = Math.random() * 1.5 - 0.75;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.1 - 0.05;
      this.color = ['#ffd700', '#ff4b72', '#ff9a9e', '#9b51e0', '#ffffff', '#7b2cbf'][Math.floor(Math.random() * 6)];
      this.opacity = Math.random() * 0.8 + 0.2;
    }

    update() {
      this.y += this.vy;
      this.x += Math.sin(this.y * 0.02) + this.vx;
      this.rotation += this.rotationSpeed;
    }

    draw() {
      if (this.y > height + 20) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
    }
  }

  class TwinkleStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 1.5;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.pulseSpeed = Math.random() * 0.03 + 0.01;
      this.angle = Math.random() * Math.PI * 2;
      this.color = Math.random() < 0.5 ? '#ffd700' : '#ffffff';
    }

    update() {
      this.angle += this.pulseSpeed;
      this.alpha = 0.3 + Math.abs(Math.sin(this.angle)) * 0.6;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;

      // Draw 4-point star
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.size * 2);
      ctx.lineTo(this.x + this.size * 0.6, this.y - this.size * 0.6);
      ctx.lineTo(this.x + this.size * 2, this.y);
      ctx.lineTo(this.x + this.size * 0.6, this.y + this.size * 0.6);
      ctx.lineTo(this.x, this.y + this.size * 2);
      ctx.lineTo(this.x - this.size * 0.6, this.y + this.size * 0.6);
      ctx.lineTo(this.x - this.size * 2, this.y);
      ctx.lineTo(this.x - this.size * 0.6, this.y - this.size * 0.6);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  class CursorTrailParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3.5 + 1.5;
      this.alpha = 1;
      this.decay = Math.random() * 0.04 + 0.02;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2 - 0.5;
      this.color = Math.random() < 0.5 ? '#ff6584' : (Math.random() < 0.8 ? '#ffd700' : '#ffffff');
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  let cursorParticles = [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Desktop Cursor Trail Event Listener
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      if (cursorParticles.length < 20) {
        cursorParticles.push(new CursorTrailParticle(e.clientX, e.clientY));
      }
    });
  }

  // Mobile Tap Sparkle Event Listener
  if (!prefersReducedMotion) {
    window.addEventListener('pointerdown', (e) => {
      // Avoid spawning tap sparkles if clicking on interactive form controls/buttons to keep UI responsive
      if (e.target.closest('button, input, select, video, a')) return;
      const originX = e.clientX;
      const originY = e.clientY;
      for (let i = 0; i < 5; i++) {
        wishSparkles.push(new WishSparkle(originX, originY));
      }
    });
  }

  triggerWishSparkles = (originX, originY) => {
    if (prefersReducedMotion) return;
    const count = width < 480 ? 30 : 60;
    for (let i = 0; i < count; i++) {
      wishSparkles.push(new WishSparkle(originX, originY));
    }
  };

  triggerConfettiShower = () => {
    if (prefersReducedMotion) return;
    const count = width < 480 ? 45 : 85;
    for (let i = 0; i < count; i++) {
      confettiPieces.push(new ConfettiParticle());
    }
  };

  const isMobile = width < 480;
  const particleCount = prefersReducedMotion ? 10 : (isMobile ? 25 : Math.floor((width * height) / 18000));
  const heartCount = prefersReducedMotion ? 4 : (isMobile ? 10 : Math.floor((width * height) / 45000));
  const starCount = prefersReducedMotion ? 6 : (isMobile ? 12 : 25);

  let stars = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  for (let i = 0; i < heartCount; i++) {
    floatingHearts.push(new FloatingHeart());
  }

  for (let i = 0; i < starCount; i++) {
    stars.push(new TwinkleStar());
  }

  function render() {
    if (isTabActive) {
      ctx.clearRect(0, 0, width, height);

      stars.forEach(s => {
        s.update();
        s.draw();
      });

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      floatingHearts.forEach(h => {
        h.update();
        h.draw();
      });

      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const cp = cursorParticles[i];
        cp.update();
        cp.draw();
        if (cp.alpha <= 0) {
          cursorParticles.splice(i, 1);
        }
      }

      for (let i = wishSparkles.length - 1; i >= 0; i--) {
        const s = wishSparkles[i];
        s.update();
        s.draw();
        if (s.alpha <= 0) {
          wishSparkles.splice(i, 1);
        }
      }

      for (let i = confettiPieces.length - 1; i >= 0; i--) {
        const c = confettiPieces[i];
        c.update();
        c.draw();
        if (c.y > height + 20) {
          confettiPieces.splice(i, 1);
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   9. STEP 12: HIDDEN SECRET SURPRISE (EASTER EGG)
   ========================================================================== */
let resetSecretTapCounter = () => {};

function initSecretSurprise() {
  const trigger = document.getElementById('secret-heart-trigger');
  const modal = document.getElementById('secret-modal');
  const overlay = document.getElementById('secret-modal-overlay');
  const closeBtn = document.getElementById('secret-modal-close');
  const dismissBtn = document.getElementById('secret-modal-dismiss');

  let tapCount = 0;

  resetSecretTapCounter = () => {
    tapCount = 0;
    if (modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  };

  if (!trigger || !modal) return;

  trigger.addEventListener('click', (e) => {
    tapCount++;

    // Trigger subtle sparkles at heart position
    const rect = trigger.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerWishSparkles(x, y);

    if (tapCount < 3) {
      playSound('sfx-click');
    } else {
      // 3rd tap unlocks secret surprise!
      tapCount = 0;
      playSound('sfx-reveal');
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   11. ENHANCED BIRTHDAY MINI-GAME LOGIC (FLOWERS, STARS, GIFTS & BOMBS)
   ========================================================================== */
let gameScore = 0;
let gameStreak = 0;
const GAME_TARGET_SCORE = 5;

function initBirthdayGame() {
  const arena = document.getElementById('game-arena');
  const scoreElement = document.getElementById('game-score-count');
  const streakElement = document.getElementById('game-streak-count');
  const progressFill = document.getElementById('game-progress-fill');
  const winCard = document.getElementById('game-win-card');
  const resetBtn = document.getElementById('game-reset-btn');

  if (!arena) return;

  // Reset Game State
  gameScore = 0;
  gameStreak = 0;
  if (scoreElement) scoreElement.textContent = '0';
  if (streakElement) streakElement.textContent = '0';
  if (progressFill) progressFill.style.width = '0%';
  if (winCard) winCard.classList.add('hidden-state');

  arena.innerHTML = '';
  arena.style.display = 'block';

  // Spawn initial 6 floating game items with staggered entry
  for (let i = 0; i < 6; i++) {
    spawnGameItem(arena, i * 160);
  }

  if (resetBtn) {
    resetBtn.onclick = () => initBirthdayGame();
  }
}

function updateGameUI() {
  const scoreElement = document.getElementById('game-score-count');
  const streakElement = document.getElementById('game-streak-count');
  const progressFill = document.getElementById('game-progress-fill');

  if (scoreElement) scoreElement.textContent = gameScore;
  if (streakElement) streakElement.textContent = gameStreak;

  if (progressFill) {
    const pct = Math.min(100, Math.max(0, (gameScore / GAME_TARGET_SCORE) * 100));
    progressFill.style.width = `${pct}%`;
  }
}

function spawnGameItem(arena, delay = 0) {
  setTimeout(() => {
    if (!arena || gameScore >= GAME_TARGET_SCORE) return;

    const item = document.createElement('div');
    
    // Weighted item generator:
    // 58% Pink Flower (🌸 +1)
    // 15% Golden Star (⭐ +2)
    // 7% Birthday Gift (🎁 +3)
    // 20% Bomb (💣 -1, resets streak)
    const rand = Math.random();
    let type = 'flower';
    let symbol = '🌸';

    if (rand < 0.20) {
      type = 'bomb';
      symbol = '💣';
    } else if (rand < 0.35) {
      type = 'star';
      symbol = '⭐';
    } else if (rand < 0.42) {
      type = 'gift';
      symbol = '🎁';
    } else {
      type = 'flower';
      symbol = '🌸';
    }

    item.className = `game-item game-item-${type}`;
    item.textContent = symbol;

    // Random positioning inside arena bounds
    const topPos = Math.floor(Math.random() * 56) + 16; // 16% to 72%
    const leftPos = Math.floor(Math.random() * 70) + 12; // 12% to 82%
    item.style.top = `${topPos}%`;
    item.style.left = `${leftPos}%`;

    // Vary float animation style
    const animVariant = Math.floor(Math.random() * 3);
    if (animVariant === 1) {
      item.style.animationName = 'floatGameItemDrift';
    } else if (animVariant === 2) {
      item.style.animationName = 'floatGameItemPulse';
    } else {
      item.style.animationName = 'floatGameItem';
    }

    item.style.animationDuration = `${(Math.random() * 1.4 + 2.0).toFixed(1)}s`;

    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = item.getBoundingClientRect();
      const arenaRect = arena.getBoundingClientRect();
      const relativeX = rect.left - arenaRect.left + rect.width / 2;
      const relativeY = rect.top - arenaRect.top;

      if (type === 'flower') {
        playSound('sfx-click');
        triggerWishSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        gameScore = Math.min(GAME_TARGET_SCORE, gameScore + 1);
        gameStreak++;

        const popMsg = gameStreak >= 3 ? `+1 🌸 (${gameStreak}x STREAK!)` : '+1 🌸';
        showFloatingFeedback(arena, popMsg, '#ff4b72', relativeX, relativeY);

        item.style.transform = 'scale(1.4)';
        item.style.opacity = '0';
        setTimeout(() => item.remove(), 150);

      } else if (type === 'star') {
        playSound('sfx-reveal');
        triggerWishSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        gameScore = Math.min(GAME_TARGET_SCORE, gameScore + 2);
        gameStreak++;

        showFloatingFeedback(arena, '+2 ⭐ GOLDEN STAR!', '#d97706', relativeX, relativeY);

        item.style.transform = 'scale(1.6) rotate(15deg)';
        item.style.opacity = '0';
        setTimeout(() => item.remove(), 150);

      } else if (type === 'gift') {
        playSound('sfx-celebration');
        triggerWishSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        triggerConfettiShower();
        gameScore = Math.min(GAME_TARGET_SCORE, gameScore + 3);
        gameStreak++;

        showFloatingFeedback(arena, '+3 🎁 SUPER BONUS!', '#9333ea', relativeX, relativeY);

        item.style.transform = 'scale(1.8)';
        item.style.opacity = '0';
        setTimeout(() => item.remove(), 150);

      } else {
        // Hit Bomb! (-1 score, reset streak)
        playSound('sfx-click');
        triggerBombFlash(arena);
        gameScore = Math.max(0, gameScore - 1);
        gameStreak = 0;

        showFloatingFeedback(arena, '-1 💣 Streak Reset!', '#e11d48', relativeX, relativeY);

        item.style.transform = 'scale(1.5) rotate(25deg)';
        item.style.opacity = '0';
        setTimeout(() => item.remove(), 150);
      }

      updateGameUI();

      // Respawn next item if target not reached yet
      if (gameScore < GAME_TARGET_SCORE) {
        spawnGameItem(arena, 320);
      } else {
        handleGameVictory();
      }
    });

    arena.appendChild(item);
  }, delay);
}

function showFloatingFeedback(arena, text, color, x, y) {
  const pop = document.createElement('div');
  pop.className = 'game-feedback-pop';
  pop.textContent = text;
  pop.style.color = color;
  pop.style.left = `${x}px`;
  pop.style.top = `${y}px`;
  arena.appendChild(pop);
  setTimeout(() => pop.remove(), 900);
}

function triggerBombFlash(arena) {
  arena.style.boxShadow = '0 0 30px rgba(225, 29, 72, 0.7)';
  arena.style.transform = 'translateX(6px)';
  setTimeout(() => {
    arena.style.transform = 'translateX(-6px)';
    setTimeout(() => {
      arena.style.transform = 'none';
      arena.style.boxShadow = 'none';
    }, 100);
  }, 100);
}

function handleGameVictory() {
  playSound('sfx-celebration');
  triggerConfettiShower();

  const arena = document.getElementById('game-arena');
  const winCard = document.getElementById('game-win-card');

  if (arena) {
    setTimeout(() => {
      arena.innerHTML = '';
      arena.style.display = 'none';
    }, 200);
  }

  if (winCard) {
    setTimeout(() => {
      winCard.classList.remove('hidden-state');
    }, 250);
  }
}
