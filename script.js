/**
 * ==========================================================================
 * CUTE MEMORY SCRAPBOOK BIRTHDAY SCRIPT — FOR AGNES VERONICA ROSELIN 🎀
 * Sequence of 7 Scrapbook Panels:
 *   1. Birthday Welcome (Cover & Let's Begin)
 *   2. Memory Gallery (Polaroids with captions & lightbox)
 *   3. Find the Hidden Hearts (5 hidden hearts mini-game)
 *   4. Scratch-to-Reveal (Interactive canvas scratch card)
 *   5. Photo Puzzle (Playable 3x3 tile-swap polaroid puzzle using Agnes's 1st photo)
 *   6. Secret Birthday Letter (Interactive wax seal & folding stationery)
 *   7. Final Celebration (Birthday cake, wishes, confetti & replay)
 * ==========================================================================
 */

// ==========================================================================
// 1. SISTER'S DETAILS & PERSONALIZED CONFIGURATION 💕
// ==========================================================================
const sisterConfig = {
  sisterName: "Agnes Veronica Roselin",
  
  welcomeTitle: "Happy Birthday Agnes! 💖",
  welcomeSubtitle: "\"A handmade journal of our sweetest memories, smiles & secrets.\"",

  // Agnes's Real Photos
  welcomePhoto: "images/agnes-welcome.png",
  puzzlePhoto: "images/agnes-puzzle.png", // 1st photo: Agnes meditating/zen pose
  
  photos: [
    { src: "images/agnes-photo1.png", caption: "Zen vibes & peaceful smiles 🧘‍♀️✨" },
    { src: "images/agnes-photo2.png", caption: "Sweetest sunshine & stylish pose ☀️💛" },
    { src: "images/agnes-photo3.png", caption: "Master baker with yummy cake 🎂🍰" },
    { src: "images/agnes-photo4.png", caption: "Pure joy & cuddles with puppy 🐾💕" }
  ],

  finalPhoto: "images/agnes-celebration.png",
  finalPhotoCaption: "Celebrating you today and always, Agnes! 🎂❤️",

  // Secret Birthday Letter for Agnes
  secretLetter: {
    salutation: "To My Dearest Sister Agnes Veronica Roselin,",
    date: "On Your Special Birthday 🎂",
    paragraphs: [
      "Happy Birthday to the sweetest, kindest, and most wonderful sister in the world, Agnes! 💖",
      "Having you in my life has brought endless laughter, unforgettable adventures, and memories that I will treasure for the rest of my days.",
      "Even when times get busy or days get crazy, knowing you're there always brings a warm smile to my face. You make every simple moment brighter.",
      "On your birthday, I wish you boundless joy, dreams come true, good health, and sweet surprises. May every path you choose be filled with sunshine and happiness.",
      "Never forget how truly special, talented, and deeply loved you are, Agnes. I'm so proud to be your sister / brother."
    ],
    closing: "With all my love & warmest hugs,",
    signature: "Always & Forever ❤️"
  }
};

// ==========================================================================
// 2. STATE & 7-PAGE DEFINITIONS
// ==========================================================================
const SCRAPBOOK_PAGES = ['welcome', 'memories', 'game', 'scratch', 'puzzle', 'letter', 'celebration'];

const gameState = {
  heartsTotal: 5,
  heartsFound: 0,
  collectedSet: new Set(),
  isUnlocked: false
};

const puzzleState = {
  gridSize: 3, // 3x3
  tiles: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  selectedTileIdx: null,
  moves: 0,
  isSolved: false
};

// ==========================================================================
// 3. INITIALIZATION ON DOM LOAD
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Apply Configuration
  applySisterConfig();

  // Initialize All Features
  initMagicWand();
  initPageNavigation();
  initHiddenHeartsGame();
  initScratchCard();
  initPhotoPuzzle();
  initSecretLetter();
  initCelebration();
  initPhotoLightbox();
  initMusicController();
});

// ==========================================================================
// 4. APPLY CONFIGURATION TO DOM
// ==========================================================================
function applySisterConfig() {
  const nameDisplays = document.querySelectorAll('.sister-name-display');
  nameDisplays.forEach(el => {
    el.textContent = sisterConfig.sisterName;
  });

  const welcomeSub = document.querySelector('#page-welcome .handwritten-subtext');
  if (welcomeSub && sisterConfig.welcomeSubtitle) {
    welcomeSub.textContent = sisterConfig.welcomeSubtitle;
  }
}

// ==========================================================================
// 5. MAGIC WAND TOUCH & DRAG TRAIL EFFECT ✨🪄 (Ultra-Smooth & Lightweight)
// ==========================================================================
function initMagicWand() {
  const canvas = document.getElementById('wand-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 150);
  }, { passive: true });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const particles = [];
  const MAX_PARTICLES = 24;
  const colors = ['#ff8fa3', '#ffd166', '#a0c4ff', '#bdb2ff', '#ffc6ff', '#fcd5ce'];

  let lastX = 0;
  let lastY = 0;
  let lastSpawnTime = 0;
  let isLoopRunning = false;

  function spawnWandParticles(x, y) {
    if (particles.length >= MAX_PARTICLES) particles.shift();

    const types = ['star', 'circle', 'heart'];
    const pType = types[Math.floor(Math.random() * types.length)];

    particles.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.5,
      type: pType,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 5 + 4,
      alpha: 1,
      life: 0,
      maxLife: Math.floor(Math.random() * 16 + 16)
    });

    if (!isLoopRunning) {
      isLoopRunning = true;
      requestAnimationFrame(renderWandTrail);
    }
  }

  function handlePointer(clientX, clientY) {
    const now = performance.now();
    if (now - lastSpawnTime < 28) return; // Cap at ~35 FPS spawn rate

    const dx = clientX - lastX;
    const dy = clientY - lastY;
    if (dx * dx + dy * dy > 64) { // 8px threshold
      lastSpawnTime = now;
      lastX = clientX;
      lastY = clientY;
      spawnWandParticles(clientX, clientY);
    }
  }

  window.addEventListener('pointerdown', (e) => {
    lastX = e.clientX;
    lastY = e.clientY;
    lastSpawnTime = performance.now();
    spawnWandParticles(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    handlePointer(e.clientX, e.clientY);
  }, { passive: true });

  // Pure GPU 2D Vector Paths (Zero font rendering / zero text layout churn)
  function drawSparkleStar(cx, cy, s) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - s);
    ctx.quadraticCurveTo(cx, cy, cx + s, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy + s);
    ctx.quadraticCurveTo(cx, cy, cx - s, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy - s);
    ctx.fill();
  }

  function drawTinyHeart(cx, cy, s) {
    ctx.beginPath();
    const topY = cy - s * 0.3;
    ctx.moveTo(cx, cy + s * 0.7);
    ctx.bezierCurveTo(cx - s, cy - s * 0.2, cx - s * 0.8, topY, cx, cy - s * 0.1);
    ctx.bezierCurveTo(cx + s * 0.8, topY, cx + s, cy - s * 0.2, cx, cy + s * 0.7);
    ctx.fill();
  }

  function renderWandTrail() {
    if (particles.length === 0) {
      ctx.clearRect(0, 0, width, height);
      isLoopRunning = false;
      return; // Sleep! 0.0% CPU and GPU load when idle!
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      p.alpha = 1 - p.life / p.maxLife;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.type === 'star') {
        drawSparkleStar(p.x, p.y, p.size);
      } else if (p.type === 'heart') {
        drawTinyHeart(p.x, p.y, p.size * 0.85);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, 6.283);
        ctx.fill();
      }
    }

    requestAnimationFrame(renderWandTrail);
  }
}

// ==========================================================================
// 6. OVERLAY PAGE-BY-PAGE SCRAPBOOK NAVIGATION
// ==========================================================================
function initPageNavigation() {
  const tabButtons = document.querySelectorAll('.bookmark-tabs .tab-item');
  tabButtons.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = tab.getAttribute('data-page');
      playSyntheticSound('click');
      navigateToPage(pageId);
    });
  });

  const nextButtons = document.querySelectorAll('.next-page-btn');
  nextButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextPage = btn.getAttribute('data-next-page');
      playSyntheticSound('turn');
      navigateToPage(nextPage);
    });
  });

  const backButtons = document.querySelectorAll('.scrapbook-back-btn');
  backButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const backTo = btn.getAttribute('data-back-to');
      playSyntheticSound('turn');
      navigateToPage(backTo);
    });
  });

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
      showPage(e.state.page, false);
    }
  });

  history.replaceState({ page: 'welcome' }, '', '#welcome');
}

function navigateToPage(pageId) {
  if (!SCRAPBOOK_PAGES.includes(pageId)) return;
  showPage(pageId, true);
}

function showPage(pageId, pushToHistory = true) {
  const pages = document.querySelectorAll('.scrapbook-page');
  const tabs = document.querySelectorAll('.bookmark-tabs .tab-item');

  pages.forEach(p => {
    if (p.id === `page-${pageId}`) {
      p.classList.add('active');
      window.scrollTo(0, 0);
    } else {
      p.classList.remove('active');
    }
  });

  tabs.forEach(tab => {
    if (tab.getAttribute('data-page') === pageId) {
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    } else {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    }
  });

  if (pageId === 'celebration') {
    triggerConfettiShower();
  }

  if (pageId === 'scratch') {
    resizeScratchCanvas();
  }

  if (pushToHistory) {
    history.pushState({ page: pageId }, '', `#${pageId}`);
  }
}

// ==========================================================================
// 7. FIND THE HIDDEN HEARTS MINI-GAME 🎮💕
// ==========================================================================
function initHiddenHeartsGame() {
  const heartTargets = document.querySelectorAll('.hidden-heart-target');
  const countDisplay = document.getElementById('hearts-count-num');
  const hintBtn = document.getElementById('game-hint-btn');
  const resetBtn = document.getElementById('game-reset-btn');
  const winCard = document.getElementById('game-win-card');
  const winToScratchBtn = document.getElementById('win-to-scratch-btn');

  heartTargets.forEach(target => {
    target.addEventListener('click', (e) => {
      e.stopPropagation();
      const heartId = target.getAttribute('data-heart-id');
      collectHeart(heartId, target);
    });
  });

  function collectHeart(heartId, targetEl) {
    if (gameState.collectedSet.has(heartId)) return;

    gameState.collectedSet.add(heartId);
    gameState.heartsFound = gameState.collectedSet.size;

    playSyntheticSound('heart');
    targetEl.classList.add('collected');

    if (countDisplay) {
      countDisplay.textContent = gameState.heartsFound;
    }

    const slotEl = document.querySelector(`.heart-slot[data-slot="${heartId}"]`);
    if (slotEl) {
      slotEl.textContent = '💖';
      slotEl.classList.add('filled');
    }

    const rect = targetEl.getBoundingClientRect();
    spawnHeartSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);

    if (gameState.heartsFound >= gameState.heartsTotal) {
      triggerGameVictory();
    }
  }

  function triggerGameVictory() {
    gameState.isUnlocked = true;
    playSyntheticSound('victory');
    triggerConfettiShower();

    if (winCard) {
      winCard.classList.remove('hidden-state');
    }

    const tabLock = document.getElementById('tab-lock-icon');
    if (tabLock) {
      tabLock.textContent = '✨';
      const letterTab = document.querySelector('.tab-item[data-page="letter"]');
      if (letterTab) letterTab.classList.add('unlocked');
    }

    unlockSecretLetterPage();
  }

  if (winToScratchBtn) {
    winToScratchBtn.addEventListener('click', () => {
      playSyntheticSound('turn');
      navigateToPage('scratch');
    });
  }

  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      playSyntheticSound('click');
      let uncollected = [];
      heartTargets.forEach(target => {
        const id = target.getAttribute('data-heart-id');
        if (!gameState.collectedSet.has(id)) {
          uncollected.push(target);
        }
      });

      if (uncollected.length === 0) return;

      const targetHint = uncollected[Math.floor(Math.random() * uncollected.length)];
      targetHint.classList.add('hint-pulse');
      setTimeout(() => {
        targetHint.classList.remove('hint-pulse');
      }, 2500);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      playSyntheticSound('click');
      resetGame();
    });
  }

  function resetGame() {
    gameState.collectedSet.clear();
    gameState.heartsFound = 0;
    if (countDisplay) countDisplay.textContent = '0';

    heartTargets.forEach(target => {
      target.classList.remove('collected', 'hint-pulse');
    });

    const slots = document.querySelectorAll('.heart-slot');
    slots.forEach(slot => {
      slot.textContent = '🤍';
      slot.classList.remove('filled');
    });

    if (winCard) winCard.classList.add('hidden-state');
  }
}

function spawnHeartSparkles(x, y) {
  const container = document.body;
  const emojis = ['✨', '💖', '⭐', '🌸'];
  const count = 5;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.fontSize = `${Math.random() * 8 + 14}px`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '99999';
    sparkle.style.willChange = 'transform, opacity';
    sparkle.style.transform = 'translate3d(0, 0, 0)';
    sparkle.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease';
    container.appendChild(sparkle);

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
    const distance = Math.random() * 45 + 30;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      sparkle.style.transform = `translate3d(${destX}px, ${destY}px, 0) scale(0)`;
      sparkle.style.opacity = '0';
    });

    setTimeout(() => {
      sparkle.remove();
    }, 600);
  }
}

// ==========================================================================
// 8. SCRATCH-TO-REVEAL SURPRISE CARD ✨🎫
// ==========================================================================
function initScratchCard() {
  const canvas = document.getElementById('scratch-canvas');
  const wrapper = document.getElementById('scratch-card-wrapper');
  const progressText = document.getElementById('scratch-progress-text');
  const revealBtn = document.getElementById('scratch-reveal-all-btn');

  if (!canvas || !wrapper) return;

  const ctx = canvas.getContext('2d');
  let isScratching = false;
  let scratchedPercent = 0;
  let hasAutoRevealed = false;

  function paintScratchCover() {
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#fcd5ce');
    grad.addColorStop(0.3, '#fed976');
    grad.addColorStop(0.7, '#ffccd5');
    grad.addColorStop(1, '#e8dff5');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 20px "Patrick Hand", cursive, sans-serif';
    ctx.fillStyle = '#4a3b48';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Rub / Scratch Here ✨', canvas.width / 2, canvas.height / 2 - 12);

    ctx.font = '15px "Caveat", cursive, sans-serif';
    ctx.fillStyle = '#7a5b68';
    ctx.fillText('To reveal a sweet surprise for Agnes! 💕', canvas.width / 2, canvas.height / 2 + 18);
  }

  window.resizeScratchCanvas = function() {
    if (!hasAutoRevealed) {
      paintScratchCover();
    }
  };

  paintScratchCover();

  function scratchAt(clientX, clientY) {
    if (hasAutoRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.x;
    const y = clientY - rect.y;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    checkScratchProgress();
  }

  let lastCheckTime = 0;
  function checkScratchProgress() {
    const now = Date.now();
    if (now - lastCheckTime < 200) return;
    lastCheckTime = now;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;
      const step = 32;

      for (let i = 3; i < pixels.length; i += step * 4) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const totalSampled = pixels.length / (step * 4);
      scratchedPercent = Math.min(100, Math.round((transparentCount / totalSampled) * 100));

      if (progressText) {
        progressText.textContent = `Scratched: ${scratchedPercent}%`;
      }

      if (scratchedPercent >= 48 && !hasAutoRevealed) {
        autoRevealCard();
      }
    } catch (e) {
      // Ignore security errors
    }
  }

  function autoRevealCard() {
    hasAutoRevealed = true;
    playSyntheticSound('victory');
    canvas.style.opacity = '0';
    setTimeout(() => {
      canvas.style.display = 'none';
    }, 500);

    if (progressText) {
      progressText.textContent = '100% Revealed! 🎉';
    }
    triggerConfettiShower();
  }

  if (revealBtn) {
    revealBtn.addEventListener('click', () => {
      playSyntheticSound('turn');
      autoRevealCard();
    });
  }

  canvas.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    isScratching = true;
    scratchAt(e.clientX, e.clientY);
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!isScratching) return;
    e.stopPropagation();
    scratchAt(e.clientX, e.clientY);
  });

  window.addEventListener('pointerup', () => {
    isScratching = false;
  });
}

// ==========================================================================
// 9. PLAYABLE PHOTO PUZZLE 🧩📸 (Uses Agnes's 1st photo: Zen pose!)
// ==========================================================================
function initPhotoPuzzle() {
  const board = document.getElementById('puzzle-board');
  const movesDisplay = document.getElementById('puzzle-moves-count');
  const shuffleBtn = document.getElementById('puzzle-shuffle-btn');
  const peekBtn = document.getElementById('puzzle-peek-btn');
  const solveBtn = document.getElementById('puzzle-solve-btn');
  const peekOverlay = document.getElementById('puzzle-peek-overlay');
  const winCard = document.getElementById('puzzle-solved-card');
  const puzzleToLetterBtn = document.getElementById('puzzle-to-letter-btn');

  if (!board) return;

  // Use Agnes's 1st photo as requested!
  const photoUrl = sisterConfig.puzzlePhoto || 'images/agnes-puzzle.png';

  function renderPuzzleBoard() {
    board.innerHTML = '';
    const size = puzzleState.gridSize; // 3
    const tileSize = 300 / size; // 100px

    puzzleState.tiles.forEach((originalIndex, currentPosition) => {
      const tile = document.createElement('div');
      tile.className = 'puzzle-tile';
      tile.setAttribute('data-position', currentPosition);
      tile.setAttribute('data-original-index', originalIndex);

      if (puzzleState.selectedTileIdx === currentPosition) {
        tile.classList.add('selected');
      }

      const origCol = originalIndex % size;
      const origRow = Math.floor(originalIndex / size);
      const pctX = (origCol / (size - 1)) * 100;
      const pctY = (origRow / (size - 1)) * 100;
      tile.style.backgroundImage = `url('${photoUrl}')`;
      tile.style.backgroundSize = `${size * 100}% ${size * 100}%`;
      tile.style.backgroundPosition = `${pctX}% ${pctY}%`;

      tile.addEventListener('click', () => handleTileClick(currentPosition));
      board.appendChild(tile);
    });
  }

  function handleTileClick(clickedPos) {
    if (puzzleState.isSolved) return;

    if (puzzleState.selectedTileIdx === null) {
      puzzleState.selectedTileIdx = clickedPos;
      playSyntheticSound('click');
      renderPuzzleBoard();
    } else if (puzzleState.selectedTileIdx === clickedPos) {
      puzzleState.selectedTileIdx = null;
      renderPuzzleBoard();
    } else {
      const firstPos = puzzleState.selectedTileIdx;
      const temp = puzzleState.tiles[firstPos];
      puzzleState.tiles[firstPos] = puzzleState.tiles[clickedPos];
      puzzleState.tiles[clickedPos] = temp;

      puzzleState.moves++;
      if (movesDisplay) movesDisplay.textContent = puzzleState.moves;

      puzzleState.selectedTileIdx = null;
      playSyntheticSound('turn');
      renderPuzzleBoard();

      checkPuzzleWin();
    }
  }

  function checkPuzzleWin() {
    const isWin = puzzleState.tiles.every((val, idx) => val === idx);
    if (isWin) {
      puzzleState.isSolved = true;
      playSyntheticSound('victory');
      triggerConfettiShower();
      if (winCard) winCard.classList.remove('hidden-state');
    }
  }

  function shuffleTiles() {
    puzzleState.isSolved = false;
    puzzleState.moves = 0;
    if (movesDisplay) movesDisplay.textContent = '0';
    if (winCard) winCard.classList.add('hidden-state');

    for (let i = 0; i < 18; i++) {
      const idxA = Math.floor(Math.random() * 9);
      const idxB = Math.floor(Math.random() * 9);
      if (idxA !== idxB) {
        const temp = puzzleState.tiles[idxA];
        puzzleState.tiles[idxA] = puzzleState.tiles[idxB];
        puzzleState.tiles[idxB] = temp;
      }
    }
    renderPuzzleBoard();
  }

  function autoSolve() {
    puzzleState.tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    puzzleState.selectedTileIdx = null;
    renderPuzzleBoard();
    checkPuzzleWin();
  }

  if (shuffleBtn) shuffleBtn.addEventListener('click', shuffleTiles);
  if (solveBtn) solveBtn.addEventListener('click', autoSolve);

  if (peekBtn && peekOverlay) {
    peekBtn.addEventListener('click', () => {
      playSyntheticSound('click');
      peekOverlay.classList.toggle('hidden-state');
    });
    peekOverlay.addEventListener('click', () => {
      peekOverlay.classList.add('hidden-state');
    });
  }

  if (puzzleToLetterBtn) {
    puzzleToLetterBtn.addEventListener('click', () => {
      playSyntheticSound('turn');
      navigateToPage('letter');
    });
  }

  shuffleTiles();
}

// ==========================================================================
// 10. SECRET BIRTHDAY LETTER INTERACTION 💌
// ==========================================================================
function initSecretLetter() {
  const openSealBtn = document.getElementById('open-envelope-btn');
  const vintageEnvelope = document.getElementById('vintage-envelope');
  const stationeryLetter = document.getElementById('stationery-letter');
  const emergencyUnlockBtn = document.getElementById('emergency-unlock-btn');
  const goPlayGameBtn = document.getElementById('go-play-game-btn');

  if (openSealBtn) {
    openSealBtn.addEventListener('click', () => {
      playSyntheticSound('victory');
      if (vintageEnvelope) vintageEnvelope.classList.add('opened');

      setTimeout(() => {
        if (vintageEnvelope) vintageEnvelope.style.display = 'none';
        if (stationeryLetter) stationeryLetter.classList.remove('hidden-state');
      }, 550);
    });
  }

  if (emergencyUnlockBtn) {
    emergencyUnlockBtn.addEventListener('click', () => {
      playSyntheticSound('turn');
      unlockSecretLetterPage();
    });
  }

  if (goPlayGameBtn) {
    goPlayGameBtn.addEventListener('click', () => {
      playSyntheticSound('click');
      navigateToPage('game');
    });
  }
}

function unlockSecretLetterPage() {
  const lockedBox = document.getElementById('letter-locked-container');
  const unlockedBox = document.getElementById('letter-unlocked-container');

  if (lockedBox) lockedBox.classList.add('hidden-state');
  if (unlockedBox) unlockedBox.classList.remove('hidden-state');
}

// ==========================================================================
// 11. FINAL CELEBRATION & REPLAY
// ==========================================================================
function initCelebration() {
  const confettiBtn = document.getElementById('confetti-shower-btn');
  const replayBtn = document.getElementById('replay-journey-btn');

  if (confettiBtn) {
    confettiBtn.addEventListener('click', () => {
      playSyntheticSound('victory');
      triggerConfettiShower();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      playSyntheticSound('turn');
      navigateToPage('welcome');
    });
  }
}

// ==========================================================================
// 12. PHOTO CLOSEUP LIGHTBOX MODAL
// ==========================================================================
function initPhotoLightbox() {
  const polaroids = document.querySelectorAll('.polaroid-wrapper');
  const lightbox = document.getElementById('scrapbook-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const backdrop = document.getElementById('lightbox-backdrop');

  if (!lightbox) return;

  polaroids.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const img = wrapper.querySelector('.polaroid-img');
      const caption = wrapper.querySelector('.caption-text');

      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Scrapbook Photo";
      }

      if (caption && lightboxCaption) {
        lightboxCaption.textContent = caption.textContent;
      }

      playSyntheticSound('click');
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
}

// ==========================================================================
// 13. AUDIO CONTROLLER & BACKGROUND MUSIC
// ==========================================================================
function initMusicController() {
  const musicBtn = document.getElementById('music-pill-btn');
  const bgAudio = document.getElementById('bg-music');
  const musicLabel = document.getElementById('music-text-label');
  let isPlaying = false;

  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    playSyntheticSound('click');
    if (!isPlaying) {
      if (bgAudio && bgAudio.src) {
        bgAudio.play().then(() => {
          isPlaying = true;
          musicBtn.classList.add('playing');
          if (musicLabel) musicLabel.textContent = 'Pause Music';
        }).catch(() => {
          playSyntheticSound('victory');
          musicBtn.classList.add('playing');
          if (musicLabel) musicLabel.textContent = 'Melody ✨';
          isPlaying = true;
        });
      }
    } else {
      if (bgAudio) bgAudio.pause();
      isPlaying = false;
      musicBtn.classList.remove('playing');
      if (musicLabel) musicLabel.textContent = 'Play Music';
    }
  });
}

// ==========================================================================
// 14. LIGHTWEIGHT WEB AUDIO API SYNTHESIZER
// ==========================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSyntheticSound(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'turn') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'heart') {
      [587.33, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.18, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.22);
      });
    } else if (type === 'victory') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0.15, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.35);
      });
    }
  } catch (err) {
    // Fail silently
  }
}

// ==========================================================================
// 15. CONFETTI SHOWER CELEBRATION
// ==========================================================================
function triggerConfettiShower() {
  const container = document.body;
  const colors = ['#ff8fa3', '#ffd166', '#a0c4ff', '#bdb2ff', '#ffc6ff', '#fcd5ce'];
  const count = 26;

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `-20px`;
    confetti.style.width = `${Math.random() * 7 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 7}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '99998';
    confetti.style.opacity = '1';
    confetti.style.willChange = 'transform, opacity';
    confetti.style.transform = `translate3d(0, 0, 0) rotate(${Math.random() * 360}deg)`;
    confetti.style.transition = `transform ${Math.random() * 1.2 + 1.8}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 2.2s ease`;
    container.appendChild(confetti);

    const fallDistance = window.innerHeight + 30;
    const drift = (Math.random() - 0.5) * 100;
    const finalRot = Math.random() * 600;

    requestAnimationFrame(() => {
      confetti.style.transform = `translate3d(${drift}px, ${fallDistance}px, 0) rotate(${finalRot}deg)`;
      confetti.style.opacity = '0';
    });

    setTimeout(() => {
      confetti.remove();
    }, 2400);
  }
}
