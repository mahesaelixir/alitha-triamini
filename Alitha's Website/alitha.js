/* =========================
         POPUP
      ========================= */

function openPopup() {
  document.getElementById("popup").classList.add("active");
}

function closePopup() {
  document.getElementById("popup").classList.remove("active");
}

/* =========================
         FLOWER FRAME
      ========================= */

const flowerSVG = `
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill="#fff1c9"/>

          <circle cx="12" cy="5" r="4" fill="#c8a892"/>
          <circle cx="19" cy="12" r="4" fill="#b6937a"/>
          <circle cx="12" cy="19" r="4" fill="#dbc0ad"/>
          <circle cx="5" cy="12" r="4" fill="#ead7ca"/>
        </svg>
      `;

function createFlower(x, y) {
  const flower = document.createElement("div");

  flower.className = "flower-frame";

  flower.innerHTML = flowerSVG;

  flower.style.left = x + "px";
  flower.style.top = y + "px";

  document.body.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, 5000);
}

function flowerFrame() {
  const gap = 42;

  for (let x = 0; x < window.innerWidth; x += gap) {
    createFlower(x, 0);
  }

  for (let x = 0; x < window.innerWidth; x += gap) {
    createFlower(x, window.innerHeight - 40);
  }

  for (let y = 0; y < window.innerHeight; y += gap) {
    createFlower(0, y);
  }

  for (let y = 0; y < window.innerHeight; y += gap) {
    createFlower(window.innerWidth - 40, y);
  }
}

/* =========================
         CAT CLICK
      ========================= */

const catSVG = `
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#f4ede7"/>

          <path
            d="M8 9l-2-3M16 9l2-3"
            stroke="#8f7866"
            stroke-width="1.5"
            stroke-linecap="round"
          />

          <circle cx="9" cy="13" r="1" fill="#8f7866"/>
          <circle cx="15" cy="13" r="1" fill="#8f7866"/>

          <path
            d="M10 16c.5.5 1 .7 2 .7s1.5-.2 2-.7"
            stroke="#8f7866"
            stroke-width="1.3"
            stroke-linecap="round"
          />
        </svg>
      `;

document.addEventListener("click", (e) => {
  if (e.target.closest("button")) return;

  const cat = document.createElement("div");

  cat.className = "cat-float";

  cat.innerHTML = catSVG;

  cat.style.left = e.clientX + "px";
  cat.style.top = e.clientY + "px";

  document.body.appendChild(cat);

  setTimeout(() => {
    cat.remove();
  }, 1800);
});

/* =========================
         PARTICLES
      ========================= */

function createParticle() {
  const particle = document.createElement("div");

  particle.className = "particle";

  // RANDOM SIZE
  const random = Math.random();

  if (random > 0.7) {
    particle.classList.add("large");
  } else if (random < 0.35) {
    particle.classList.add("small");
  }

  // RANDOM POSITION
  particle.style.left = Math.random() * window.innerWidth + "px";

  particle.style.bottom = "-20px";

  // RANDOM DRIFT
  const drift = -40 + Math.random() * 80;

  particle.style.setProperty("--drift", drift + "px");

  // RANDOM DURATION
  particle.style.animationDuration = 5 + Math.random() * 5 + "s";

  // RANDOM DELAY FEEL
  particle.style.opacity = 0.3 + Math.random() * 0.5;

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 10000);
}

setInterval(() => {
  createParticle();
}, 220);

/* =========================
         SPOTIFY PLAYER
      ========================= */

const cards = document.querySelectorAll(".spotify-card");

const audios = [
  document.getElementById("audio0"),
  document.getElementById("audio1"),
  document.getElementById("audio2"),
];

let currentAudio = null;

function playSong(index) {
  const selectedAudio = audios[index];
  const selectedCard = cards[index];

  // KALAU CARD YANG SAMA DIPENCET LAGI
  if (currentAudio === selectedAudio && !selectedAudio.paused) {
    selectedAudio.pause();

    selectedAudio.currentTime = 0;

    selectedCard.classList.remove("playing");

    currentAudio = null;

    return;
  }

  // RESET SEMUA AUDIO & CARD
  audios.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });

  cards.forEach((card) => {
    card.classList.remove("playing");
  });

  // AUDIO KE-2 MULAI DARI 1:50
  if (index === 2) {
    selectedAudio.currentTime = 105;
  }

  selectedAudio.play();

  selectedCard.classList.add("playing");

  currentAudio = selectedAudio;

  selectedAudio.onended = () => {
    selectedCard.classList.remove("playing");
    currentAudio = null;
  };
}

/* =========================
         CAROUSEL
      ========================= */

let currentSlide = 0;

const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".cat-slide");

function getVisibleSlides() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function updateCarousel() {
  const visibleSlides = getVisibleSlides();

  const slideWidth = slides[0].offsetWidth + 19; // 19 dari gap 1.2rem
  const maxSlide = slides.length - visibleSlides;

  if (currentSlide > maxSlide) {
    currentSlide = 0;
  }

  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function moveSlide(direction) {
  const visibleSlides = getVisibleSlides();
  const maxSlide = slides.length - visibleSlides;

  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = maxSlide;
  }

  if (currentSlide > maxSlide) {
    currentSlide = 0;
  }

  updateCarousel();
}

window.addEventListener("resize", updateCarousel);

updateCarousel();

setInterval(() => {
  moveSlide(1);
}, 3200);

/* =========================
        AVATAR TOGGLE
      ========================= */

const avatarImage = document.getElementById("avatarImage");

const avatarWrapper = document.getElementById("avatarToggle");

const avatarPhotos = [
  "/img/Screenshot 2026-05-26 220601.png",
  "/img/WhatsApp Image 2026-05-27 at 00.51.56.jpeg",
];

let currentAvatar = 0;

avatarWrapper.addEventListener("click", () => {
  currentAvatar++;

  if (currentAvatar >= avatarPhotos.length) {
    currentAvatar = 0;
  }

  avatarImage.style.opacity = "0";

  avatarImage.style.transform = "scale(0.92)";

  setTimeout(() => {
    avatarImage.src = avatarPhotos[currentAvatar];

    avatarImage.style.opacity = "1";

    avatarImage.style.transform = "scale(1)";
  }, 180);
});
