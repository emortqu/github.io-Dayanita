import "./style.css";

import Lenis from "lenis";
import "lenis/dist/lenis.css";

import Swiper from "swiper";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

import VanillaTilt from "vanilla-tilt";

/* ===== Smooth scroll (premium feel) ===== */
const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ===== Reveal on scroll ===== */
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

/* ===== Swiper: carrusel “polaroids” ===== */
function initSwiper() {
  new Swiper(".mySwiper", {
    modules: [EffectCoverflow, Autoplay],
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    speed: 900,
    autoplay: { delay: 2600, disableOnInteraction: false },
    coverflowEffect: {
      rotate: 10,
      depth: 180,
      modifier: 1.2,
      slideShadows: false,
    },
    on: {
      progress(swiper) {
        swiper.slides.forEach((slide) => {
          const p = slide.progress;
          const img = slide.querySelector("img");
          if (!img) return;
          img.style.transform = `translateX(${p * 12}px) scale(1.04)`;
        });
      },
      setTransition(swiper, duration) {
        swiper.slides.forEach((slide) => {
          const img = slide.querySelector("img");
          if (!img) return;
          img.style.transitionDuration = `${duration}ms`;
        });
      },
    },
  });
}

/* ===== PhotoSwipe: galería con zoom ===== */
function initPhotoSwipe() {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#gallery",
    children: "a",
    pswpModule: () => import("photoswipe"),
  });
  lightbox.init();
}

/* ===== Hearts decor (suave, elegante) ===== */
function initHearts() {
  const hearts = document.querySelector(".hearts");
  if (!hearts) return;

  const chars = ["❤", "✦", "❥", "♡"];
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("span");
    s.textContent = chars[Math.floor(Math.random() * chars.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = 80 + Math.random() * 40 + "vh";
    s.style.animationDelay = Math.random() * 4 + "s";
    s.style.fontSize = 12 + Math.random() * 14 + "px";
    hearts.appendChild(s);
  }
}

/* ===== Final: confetti + reveal ===== */
function initFinal() {
  const btnFinal = document.getElementById("btnFinal");
  const finalMsg = document.getElementById("finalMsg");

  btnFinal?.addEventListener("click", () => {
    finalMsg?.classList.remove("hidden");
    confettiBurst();
  });
}

function confettiBurst() {
  const colors = ["#C9A227", "#E6C75A", "#7A0C14", "#F2C1CC", "#F7D9E1"];
  const count = 140;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-12px";
    el.style.width = "8px";
    el.style.height = "12px";
    el.style.borderRadius = "2px";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.zIndex = "9999";
    el.style.opacity = "0.95";
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(el);

    const dur = 1400 + Math.random() * 1400;
    const x = (Math.random() * 2 - 1) * 90;

    const anim = el.animate(
      [
        { transform: el.style.transform, top: "-12px", translate: "0 0" },
        {
          transform: `rotate(${Math.random() * 720}deg)`,
          top: "110vh",
          translate: `${x}px 0`,
        },
      ],
      { duration: dur, easing: "cubic-bezier(.2,.8,.2,1)" }
    );

    anim.onfinish = () => el.remove();
  }
}

/* ===== Love Rain ===== */
function spawnLoveRain() {
  const root = document.getElementById("loveRain");
  if (!root) return;

  root.innerHTML = "";

  const stickers = ["/stickers/carta.png", "/stickers/cora.png", "/stickers/nube.png"];
  const emojis = ["❤️", "💖", "✨"];
  const total = 36;

  for (let i = 0; i < total; i++) {
    const drop = document.createElement("span");
    drop.className = "love-drop";

    const left = Math.random() * 100;
    const drift = (Math.random() * 2 - 1) * 22;
    const fall = 70 + Math.random() * 25;
    const rot = (Math.random() * 2 - 1) * 35;
    const delay = Math.random() * 280;

    drop.style.left = `${left}vw`;
    drop.style.animationDelay = `${delay}ms`;
    drop.style.setProperty("--drift", `${drift}px`);
    drop.style.setProperty("--fall", `${fall}vh`);
    drop.style.setProperty("--rot", `${rot}deg`);

    const useSticker = Math.random() < 0.4;

    if (useSticker) {
      const img = document.createElement("img");
      img.src = stickers[Math.floor(Math.random() * stickers.length)];
      img.alt = "";
      img.loading = "eager";
      img.decoding = "async";

      const size = 34 + Math.random() * 16;
      img.style.setProperty("--size", `${size}px`);

      drop.appendChild(img);
    } else {
      drop.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      drop.classList.add("emoji");
      drop.style.fontSize = `${16 + Math.random() * 14}px`;
    }

    root.appendChild(drop);
  }

  setTimeout(() => {
    root.innerHTML = "";
  }, 2300);
}

/* ===== DOM Ready ===== */
window.addEventListener("DOMContentLoaded", () => {
  // Reveal
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

  // Swiper + PhotoSwipe + hearts + final
  initSwiper();
  initPhotoSwipe();
  initHearts();
  initFinal();

  // Love rain click (bind AFTER DOM exists)
  document.getElementById("loveSeal")?.addEventListener("click", () => {
    spawnLoveRain();
  });

  // Tilt (bind AFTER DOM exists)
  VanillaTilt.init(document.querySelectorAll(".print"), {
    max: 6,
    speed: 600,
    glare: true,
    "max-glare": 0.18,
  });
});
