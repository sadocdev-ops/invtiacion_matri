let sceneIndex = 0;
let bgIndex = 0;
let musicStarted = false;

const scenes = document.querySelectorAll(".scene");
const app = document.getElementById("app");
const nextBtn = document.getElementById("nextBtn");
const finalText = document.getElementById("finalText");
const confirmBtn = document.getElementById("confirmBtn");
const music = document.getElementById("music");

const backgrounds = ["img1.jpeg","img2.jpeg","img3.jpeg","img4.jpeg"];
document.body.style.backgroundImage = `url("${backgrounds[0]}")`;

/* ❤️🎈 Partículas alrededor del texto */
function softExplosionAround(target, total = 30) {
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const symbols = ["❤️","🎈"];

  for (let i = 0; i < total; i++) {
    const el = document.createElement("div");
    el.innerText = symbols[Math.floor(Math.random()*2)];
    el.style.position = "fixed";
    el.style.left = rect.left + rect.width/2 + "px";
    el.style.top = rect.top + rect.height/2 + "px";
    el.style.fontSize = Math.random()*14+22+"px";
    el.style.pointerEvents = "none";
    el.style.opacity = "1";
    el.style.zIndex = 9999;

    document.body.appendChild(el);

    const angle = Math.random()*Math.PI*2;
    const dist = Math.random()*120+60;

    el.animate([
      { transform:"translate(0,0)", opacity:1 },
      { transform:`translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px)`, opacity:0 }
    ], { duration: 2200, easing:"ease-out" });

    setTimeout(()=>el.remove(),2200);
  }
}

/* 🖱️ CLICK GLOBAL */
document.addEventListener("click", (e)=>{
  if(!musicStarted){
    musicStarted = true;
    music.muted = false;
    music.volume = 0.45;
    music.play().catch(()=>{});
    e.stopPropagation();
    return;
  }

  const active = document.querySelector(".scene.active");
  softExplosionAround(active);

  if(sceneIndex < scenes.length-1){
    scenes[sceneIndex].classList.remove("active");
    sceneIndex++;
    scenes[sceneIndex].classList.add("active");
  } else {
    app.classList.remove("hidden");
  }
});

/* 🖼️ CAMBIO FONDO */
nextBtn.addEventListener("click",(e)=>{
  e.stopPropagation();
  bgIndex++;
  if(bgIndex < backgrounds.length){
    document.body.style.backgroundImage = `url("${backgrounds[bgIndex]}")`;
  } else {
    finalText.classList.remove("hidden");
    confirmBtn.classList.remove("hidden");
    finalText.classList.add("show");
    nextBtn.style.display="none";
  }
});

/* 📲 WHATSAPP */
confirmBtn.addEventListener("click",(e)=>{
  e.stopPropagation();
  window.open(
    "https://wa.me/56912345678?text=Confirmo%20mi%20asistencia%20al%20matrimonio%20de%20Ernesto%20y%20Danixa%20💍",
    "_blank"
  );
});

/* ⏳ CONTADOR */
const weddingDate = new Date("2026-02-28T00:00:00").getTime();
setInterval(()=>{
  const d = weddingDate - Date.now();
  if(d<0) return;
  days.textContent = Math.floor(d/86400000);
  hours.textContent = Math.floor(d/3600000%24);
  minutes.textContent = Math.floor(d/60000%60);
  seconds.textContent = Math.floor(d/1000%60);
},1000);
