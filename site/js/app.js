import { sceneTypes, story } from "./story.js";
import { renderArt, renderFlightArt } from "./art.js";

const experience = document.querySelector(".experience");
const stage = document.querySelector("#stage");
const previousButton = document.querySelector("#previous-scene");
const nextButton = document.querySelector("#next-scene");
const progressBar = document.querySelector("#progress-bar");
const progressLabel = document.querySelector("#progress-label");
const sceneContext = document.querySelector("#scene-context");

let currentIndex = getInitialIndex();
let rapidTimer = null;
let lastDirection = "next";

function getInitialIndex() {
  const id = window.location.hash.slice(1);
  const requestedIndex = story.findIndex((scene) => scene.id === id);
  return requestedIndex >= 0 ? requestedIndex : 0;
}

function el(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

/* ───────────── card layouts (natural aspect, never cropped) ───────────── */

const PRESETS = {
  1: [{ c: true, w: 100, h: 100, rot: 0 }],
  2: [
    { l: 0, t: 0, w: 66, h: 56, rot: -2 },
    { r: 0, b: 0, w: 66, h: 56, rot: 2 },
  ],
  3: [
    { l: 0, t: 0, w: 60, h: 50, rot: -1.5 },
    { r: 0, t: 14, w: 46, h: 40, rot: 2 },
    { l: 10, b: 0, w: 62, h: 46, rot: 1 },
  ],
  4: [
    { l: 0, t: 0, w: 50, h: 46, rot: -2 },
    { r: 0, t: 4, w: 50, h: 46, rot: 2 },
    { l: 0, b: 4, w: 50, h: 46, rot: 1.5 },
    { r: 0, b: 0, w: 50, h: 46, rot: -1.5 },
  ],
};

function dumpPreset(count) {
  const cols = 3;
  const rows = Math.ceil(count / cols);
  const cw = 100 / cols;
  const ch = 100 / rows;
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const jitter = ((i * 37) % 7) - 3;
    return { l: col * cw + 0.8, t: row * ch + 0.6, w: cw - 2, h: ch - 1.6, rot: jitter * 0.9 };
  });
}

function presetFor(scene) {
  const count = scene.media.length;
  if (scene.layout === "dump" || count > 4) return dumpPreset(count);
  return PRESETS[count] || dumpPreset(count);
}

function setAspect(card, ratio, orient) {
  if (!ratio || !Number.isFinite(ratio)) return;
  card.style.setProperty("--ar", ratio.toFixed(4));
  card.dataset.orient = orient || (ratio > 1.05 ? "landscape" : ratio < 0.95 ? "portrait" : "square");
}

function createCard(media, preset, z) {
  const card = el("figure", "card");
  card.style.setProperty("--ar", String(media.ar));
  card.dataset.orient = media.ar > 1.05 ? "landscape" : media.ar < 0.95 ? "portrait" : "square";
  card.dataset.kind = media.kind;
  card.style.zIndex = String(z);
  if (preset.c) card.classList.add("card--center");
  ["l", "t", "r", "b"].forEach((key) => {
    if (preset[key] !== undefined) card.style.setProperty(`--${key}`, `${preset[key]}%`);
  });
  card.style.setProperty("--w", preset.w);
  card.style.setProperty("--h", preset.h);
  card.style.setProperty("--rot", `${preset.rot || 0}deg`);
  return card;
}

function fillCard(card, media, { autoplay = false } = {}) {
  if (media.kind === "video") {
    const video = document.createElement("video");
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.preload = "metadata";
    video.controls = true;
    video.loop = autoplay;
    video.muted = autoplay;
    video.src = `${media.src}#t=0.1`;
    video.addEventListener("loadedmetadata", () => {
      if (video.videoWidth && video.videoHeight) setAspect(card, video.videoWidth / video.videoHeight);
      if (autoplay) video.play().catch(() => {});
    });
    video.addEventListener("play", () => {
      stage.querySelectorAll("video").forEach((other) => {
        if (other !== video) other.pause();
      });
    });
    video.addEventListener("error", () => {
      if (!video.dataset.stopped) dropCard(card);
    });
    card.append(video);
  } else {
    const image = document.createElement("img");
    image.alt = "";
    image.decoding = "async";
    image.addEventListener("load", () => {
      if (image.naturalWidth && image.naturalHeight) setAspect(card, image.naturalWidth / image.naturalHeight);
    });
    image.addEventListener("error", () => dropCard(card));
    image.src = media.src;
    card.append(image);
  }
}

function dropCard(card) {
  const scene = card.closest(".scene");
  card.remove();
  if (!scene) return;
  if (scene.querySelector(".card") || scene.querySelector(".scene__copy")?.childElementCount || scene.querySelector(".art")) return;
  goToScene(currentIndex + (lastDirection === "next" ? 1 : -1));
}

/* ───────────── copy ───────────── */

function createCopy(scene) {
  const copy = el("div", "scene__copy");
  if (scene.kicker) copy.append(el("p", "scene__kicker", scene.kicker));
  if (scene.title) copy.append(el("h1", "scene__title", scene.title));
  (scene.lines || []).forEach((line) => copy.append(el("p", "scene__line", line)));
  if (scene.last) {
    const restart = el("button", "restart", "Start again");
    restart.type = "button";
    restart.addEventListener("click", (event) => {
      event.stopPropagation();
      goToScene(0);
    });
    copy.append(restart);
  }
  return copy;
}

/* ───────────── renderers ───────────── */

function renderText(scene, element) {
  element.append(createCopy(scene));
}

function renderMedia(scene, element) {
  const box = el("div", "scene__media");
  const presets = presetFor(scene);
  scene.media.forEach((media, index) => {
    const card = createCard(media, presets[index], index + 1);
    fillCard(card, media);
    box.append(card);
  });
  element.append(box, createCopy(scene));
}

function renderVideo(scene, element) {
  const box = el("div", "scene__media");
  const media = scene.media[0];
  const card = createCard(media, PRESETS[1][0], 1);
  fillCard(card, media, { autoplay: true });
  box.append(card);
  element.append(box);
  if (scene.lines?.length || scene.title) element.append(createCopy(scene));
}

function renderFlight(scene, element) {
  const box = el("div", "scene__media");
  box.innerHTML = renderFlightArt(scene.from, scene.to);
  element.append(box, createCopy(scene));
}

function renderArtScene(scene, element) {
  const box = el("div", "scene__media");
  box.innerHTML = renderArt(scene);
  if (scene.count) {
    const badge = el("p", `count-badge${scene.apocalypse ? " count-badge--big" : ""}`, scene.count);
    box.append(badge);
  }
  element.append(box, createCopy(scene));
}

function renderRapid(scene, element) {
  const box = el("div", "scene__media");
  const cards = scene.items.map((item, index) => {
    const card = createCard(item.media, PRESETS[1][0], index + 1);
    card.classList.add("card--rapid");
    fillCard(card, item.media);
    box.append(card);
    return card;
  });
  const label = el("p", "rapid-label", "");
  const copy = el("div", "scene__copy");
  copy.append(label);
  element.append(box, copy);

  let index = 0;
  const show = (i) => {
    cards.forEach((card, n) => card.classList.toggle("is-active", n === i));
    label.textContent = scene.items[i].label;
  };
  show(0);
  rapidTimer = window.setInterval(() => {
    if (index >= cards.length - 1) {
      window.clearInterval(rapidTimer);
      rapidTimer = null;
      return;
    }
    index += 1;
    show(index);
  }, 950);
}

const renderers = {
  text: renderText,
  media: renderMedia,
  video: renderVideo,
  flight: renderFlight,
  art: renderArtScene,
  rapid: renderRapid,
};

/* ───────────── stage ───────────── */

function stopMedia() {
  if (rapidTimer) {
    window.clearInterval(rapidTimer);
    rapidTimer = null;
  }
  stage.querySelectorAll("video").forEach((video) => {
    video.dataset.stopped = "1";
    video.pause();
    video.removeAttribute("src");
    video.load();
  });
}

function preloadNeighbours() {
  [currentIndex + 1, currentIndex + 2].forEach((index) => {
    const scene = story[index];
    if (!scene) return;
    const list = scene.media || (scene.items || []).map((item) => item.media);
    (list || []).forEach((media) => {
      if (media.kind === "image") {
        const image = new Image();
        image.src = media.src;
      }
    });
  });
}

function updateChrome(scene) {
  const number = currentIndex + 1;
  progressBar.style.width = `${(number / story.length) * 100}%`;
  progressLabel.textContent = `${number}/${story.length}`;
  sceneContext.textContent = scene.act;
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === story.length - 1;
  experience.dataset.tone = scene.tone || "default";
}

function renderScene(direction = "next") {
  const scene = story[currentIndex];
  const renderer = renderers[scene.type];
  if (!renderer || !sceneTypes.includes(scene.type)) throw new Error(`Unsupported scene type: ${scene.type}`);

  stopMedia();
  const element = el("article", `scene scene--${scene.type} is-entering-${direction}`);
  element.dataset.sceneId = scene.id;
  try {
    renderer(scene, element);
  } catch (error) {
    console.warn("Scene failed to render", scene.id, error);
  }
  stage.replaceChildren(element);
  updateChrome(scene);
  preloadNeighbours();
  document.title = "Anniversary 2026";
  window.history.replaceState({ sceneIndex: currentIndex }, "", `#${scene.id}`);
}

function goToScene(nextIndex) {
  if (nextIndex < 0 || nextIndex >= story.length || nextIndex === currentIndex) return;
  lastDirection = nextIndex > currentIndex ? "next" : "previous";
  currentIndex = nextIndex;
  renderScene(lastDirection);
}

previousButton.addEventListener("click", () => goToScene(currentIndex - 1));
nextButton.addEventListener("click", () => goToScene(currentIndex + 1));

stage.addEventListener("click", (event) => {
  if (event.target.closest("button, a")) return;
  if (event.target.closest(VIDEO_SELECTOR)) return; // native controls own every tap inside a video card
  const bounds = stage.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  if (x < 0.22) return goToScene(currentIndex - 1);
  if (x > 0.78) return goToScene(currentIndex + 1);
  goToScene(currentIndex + 1);
});

const VIDEO_SELECTOR = "video, .card[data-kind='video']";
let touchStart = null;
stage.addEventListener("touchstart", (event) => {
  if (event.target.closest(VIDEO_SELECTOR)) {
    touchStart = null;
    return;
  }
  const touch = event.changedTouches[0];
  touchStart = { x: touch.clientX, y: touch.clientY };
}, { passive: true });
stage.addEventListener("touchend", (event) => {
  if (!touchStart) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStart.x;
  const dy = touch.clientY - touchStart.y;
  touchStart = null;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    goToScene(currentIndex + (dx < 0 ? 1 : -1));
    stage.dataset.swiped = "1";
    window.setTimeout(() => delete stage.dataset.swiped, 350);
  }
}, { passive: true });
stage.addEventListener("click", (event) => {
  if (stage.dataset.swiped) event.stopImmediatePropagation();
}, true);

window.addEventListener("keydown", (event) => {
  if (["ArrowRight", "Enter", "PageDown"].includes(event.key) || (event.key === " " && !event.target.closest?.("video, button"))) {
    event.preventDefault();
    goToScene(currentIndex + 1);
  }
  if (["ArrowLeft", "Backspace", "PageUp"].includes(event.key)) {
    event.preventDefault();
    goToScene(currentIndex - 1);
  }
});

window.addEventListener("hashchange", () => {
  const requestedIndex = getInitialIndex();
  if (requestedIndex !== currentIndex) goToScene(requestedIndex);
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stage.querySelectorAll("video").forEach((video) => video.pause());
});

renderScene();
