/* =====================================================
   CONFIGURACIÓN GENERAL
===================================================== */
let sceneIndex = 0;
let bgIndex = 0;
let musicStarted = false;

const scenes = document.querySelectorAll(".scene");
const app = document.getElementById("app");
const nextBtn = document.getElementById("nextBtn");
const finalText = document.getElementById("finalText");
const confirmBtn = document.getElementById("confirmBtn");
const music = document.getElementById("music");

const backgrounds = [
  "./img1.jpeg",
  "./img2.jpeg",
  "./img3.jpeg",
  "./img4.jpeg"
];

/* =====================================================
   FONDO INICIAL
===================================================== */
document.body.style.backgroundImage = `url("${backgrounds[0]}")`;

/* =====================================================
   PARTÍCULAS SUAVES ALREDEDOR DEL TEXTO
===================================================== */
function softExplosionAround(target, total = 35, duration = 2400) {
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const margin = 40;
  const symbols = ["❤️", "🎈"];
  const particles = [];

  for (let i = 0; i < total; i++) {
    const el = document.createElement("div");
    el.innerText = symbols[Math.floor(Math.random() * symbols.length)];

    const side = Math.floor(Math.random() * 4);
    let x, y;

    if (side === 0) {
      x = rect.left + Math.random() * rect.width;
      y = rect.top - margin;
    } else if (side === 1) {
      x = rect.left + Math.random() * rect.width;
      y = rect.bottom + margin;
    } else if (side === 2) {
      x = rect.left - margin;
      y = rect.top + Math.random() * rect.height;
    } else {
      x = rect.right + margin;
      y = rect.top + Math.random() * rect.height;
    }

    el.style.position = "fixed";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.fontSize = Math.random() * 16 + 22 + "px";
    el.style.opacity = "0";
    el.style.pointerEvents = "none";
    el.style.zIndex = 9999;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 60;

    particles.push({
      el,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      r: Math.random() * 180
    });

    document.body.appendChild(el);
  }

  const start = performance.now();

  function ease(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animate(now) {
    const p = Math.min((now - start) / duration, 1);
    const e = ease(p);

    particles.forEach(o => {
      o.el.style.opacity = e;
      o.el.style.transform =
        `translate(${o.x * e}px, ${o.y * e}px) rotate(${o.r * e}deg) scale(${0.9 + e * 0.4})`;
    });

    if (p < 1) {
      requestAnimationFrame(animate);
    } else {
      particles.forEach(o => {
        o.el.style.transition = "opacity 1s ease";
        o.el.style.opacity = "0";
        setTimeout(() => o.el.remove(), 1100);
      });
    }
  }

  requestAnimationFrame(animate);
}

/* =====================================================
   CLICK GLOBAL — CONTROLADO
===================================================== */
document.addEventListener("click", (e) => {

  /* PRIMER CLICK → SOLO MÚSICA */
  if (!musicStarted) {
    musicStarted = true;

    if (music) {
      music.muted = false;
      music.volume = 0.45;
      music.play().catch(() => {});
    }

    e.preventDefault();
    e.stopPropagation();
    return;
  }

  /* DESDE EL SEGUNDO CLICK → EXPERIENCIA NORMAL */
  handleExperienceClick();
});

/* =====================================================
   LÓGICA DE AVANCE
===================================================== */
function handleExperienceClick() {
  const activeScene = document.querySelector(".scene.active");
  softExplosionAround(activeScene);

  if (sceneIndex < scenes.length) {
    scenes[sceneIndex].classList.remove("active");
    sceneIndex++;

    if (sceneIndex < scenes.length) {
      scenes[sceneIndex].classList.add("active");
    } else {
      app.classList.remove("hidden");
    }
  }
}

/* =====================================================
   BOTÓN SIGUIENTE (CAMBIO DE FONDO)
===================================================== */
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  softExplosionAround(nextBtn, 45);

  bgIndex++;
  if (bgIndex < backgrounds.length) {
    document.body.style.backgroundImage = `url("${backgrounds[bgIndex]}")`;
  } else {
    finalText.classList.remove("hidden");
    confirmBtn.classList.remove("hidden");
    setTimeout(() => finalText.classList.add("show"), 150);
    nextBtn.style.display = "none";
  }
});

/* =====================================================
   CONFIRMACIÓN WHATSAPP
===================================================== */
confirmBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  window.open(
    "https://ccgvcastro.my.canva.site/danixa-ernesto"
  );
});

/* =====================================================
   CONTADOR REGRESIVO
===================================================== */
const weddingDate = new Date("2026-02-28T00:00:00").getTime();

setInterval(() => {
  const now = Date.now();
  const diff = weddingDate - now;
  if (diff < 0) return;

  days.textContent = Math.floor(diff / 86400000);
  hours.textContent = Math.floor((diff / 3600000) % 24);
  minutes.textContent = Math.floor((diff / 60000) % 60);
  seconds.textContent = Math.floor((diff / 1000) % 60);
}, 1000);
