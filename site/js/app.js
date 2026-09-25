import { sceneTypes, story } from "./story.js";

const stage = document.querySelector("#stage");
const previousButton = document.querySelector("#previous-scene");
const nextButton = document.querySelector("#next-scene");
const progressBar = document.querySelector("#progress-bar");
const progressLabel = document.querySelector("#progress-label");
const sceneContext = document.querySelector("#scene-context");
const tapHint = document.querySelector("#tap-hint");

let currentIndex = getInitialIndex();
let isTransitioning = false;
let lazyObserver;

function getInitialIndex() {
  const id = window.location.hash.slice(1);
  const requestedIndex = story.findIndex((scene) => scene.id === id);
  return requestedIndex >= 0 ? requestedIndex : 0;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createCopy(scene) {
  const copy = createElement("div", "scene__copy");
  copy.append(
    createElement("p", "scene__act", scene.act),
    createElement("h1", "scene__title", scene.title),
    createElement("p", "scene__caption", scene.caption),
  );
  return copy;
}

function createPlaceholder(media, index) {
  const placeholder = createElement("div", "media-placeholder");
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", media.alt);

  const content = createElement("div");
  content.append(
    createElement("span", "media-placeholder__index", String(index + 1).padStart(2, "0")),
    createElement("span", "media-placeholder__label", media.label),
  );
  placeholder.append(content);
  return placeholder;
}

function createMediaItem(media, index) {
  const frame = createElement("figure", "media-item");
  frame.dataset.fit = media.fit || "contain";
  frame.style.setProperty("--media-position", media.position || "center");

  if (media.placeholder || !media.src) {
    frame.append(createPlaceholder(media, index));
    return frame;
  }

  if (media.kind === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "none";
    video.poster = media.poster || "";
    video.dataset.src = media.src;
    video.setAttribute("aria-label", media.alt || "Story video");
    frame.append(video);
    return frame;
  }

  const image = document.createElement("img");
  image.alt = media.alt || "Story photo";
  image.loading = "lazy";
  image.decoding = "async";
  image.dataset.src = media.src;
  frame.append(image);
  return frame;
}

function resolveLayout(scene) {
  if (scene.layout && scene.layout !== "auto") return scene.layout;
  if (scene.type === "photoStack") return "stack";
  if (scene.type === "memoryDump") return "memory-dump";
  if (scene.type === "video") return "video";

  const layoutsByCount = {
    1: "hero",
    2: "split",
    3: "asymmetric",
    4: "grid",
    5: "focus-grid",
  };
  return layoutsByCount[scene.media.length] || "memory-dump";
}

function createMediaLayout(scene) {
  const layoutName = resolveLayout(scene);
  const layout = createElement("div", `media-layout layout--${layoutName}`);
  layout.dataset.layout = layoutName;

  scene.media.forEach((media, index) => {
    const item = createMediaItem(media, index);
    if (layoutName === "stack") {
      const offset = index - (scene.media.length - 1) / 2;
      item.style.setProperty("--stack-x", `${offset * 0.55}rem`);
      item.style.setProperty("--stack-y", `${Math.abs(offset) * 0.35}rem`);
      item.style.setProperty("--stack-r", `${offset * 2.2}deg`);
      item.style.zIndex = String(index + 1);
    }
    layout.append(item);
  });

  return layout;
}

function renderStandardScene(scene, element) {
  const mediaFirst = ["hero", "collage", "photoStack", "video", "memoryDump", "ending"].includes(scene.type);
  if (mediaFirst && scene.media.length) element.append(createMediaLayout(scene));
  element.append(createCopy(scene));
  if (!mediaFirst && scene.media.length) element.append(createMediaLayout(scene));
}

function renderFlight(scene, element) {
  element.append(createCopy(scene));
  const line = createElement("div", "flight-line");
  line.setAttribute("aria-hidden", "true");
  const route = createElement("div", "flight-route");
  route.append(createElement("span", "", scene.route.from), createElement("span", "", scene.route.to));
  element.append(line, route);
}

function renderJokeReveal(scene, element) {
  element.append(createMediaLayout(scene));
  const copy = createCopy(scene);
  copy.prepend(createElement("p", "joke-step", scene.reveal));
  element.append(copy);
}

const renderers = {
  intro: renderStandardScene,
  hero: renderStandardScene,
  collage: renderStandardScene,
  photoStack: renderStandardScene,
  video: renderStandardScene,
  memoryDump: renderStandardScene,
  flight: renderFlight,
  text: renderStandardScene,
  jokeReveal: renderJokeReveal,
  ending: renderStandardScene,
};

function observeLazyMedia(container) {
  lazyObserver?.disconnect();
  const pending = container.querySelectorAll("[data-src]");
  if (!pending.length) return;

  lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const media = entry.target;
      media.src = media.dataset.src;
      delete media.dataset.src;
      if (media.tagName === "VIDEO") media.load();
      lazyObserver.unobserve(media);
    });
  }, { root: stage, rootMargin: "120px" });

  pending.forEach((media) => lazyObserver.observe(media));
}

function updateChrome(scene) {
  const number = currentIndex + 1;
  progressBar.style.width = `${(number / story.length) * 100}%`;
  progressLabel.textContent = `${number} / ${story.length}`;
  sceneContext.textContent = scene.period ? `${scene.act} · Period ${scene.period}` : scene.act;
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === story.length - 1;
  nextButton.querySelector("span:first-child").textContent = currentIndex === story.length - 1 ? "End" : "Next";
  tapHint.textContent = currentIndex === story.length - 1 ? "End of prototype" : "Tap the story to continue";
}

function renderScene(direction = "next") {
  const scene = story[currentIndex];
  const renderer = renderers[scene.type];

  if (!renderer || !sceneTypes.includes(scene.type)) {
    throw new Error(`Unsupported scene type: ${scene.type}`);
  }

  const element = createElement("article", `scene scene--${scene.type} is-entering-${direction}`);
  element.dataset.sceneId = scene.id;
  renderer(scene, element);
  stage.replaceChildren(element);
  updateChrome(scene);
  observeLazyMedia(element);
  document.title = `${scene.title} — Anniversary 2026`;
  window.history.replaceState({ sceneIndex: currentIndex }, "", `#${scene.id}`);
}

function goToScene(nextIndex) {
  if (isTransitioning || nextIndex < 0 || nextIndex >= story.length || nextIndex === currentIndex) return;
  isTransitioning = true;

  const direction = nextIndex > currentIndex ? "next" : "previous";
  const currentScene = stage.querySelector(".scene");
  currentScene?.classList.add(`is-leaving-${direction}`);

  window.setTimeout(() => {
    currentIndex = nextIndex;
    renderScene(direction);
    isTransitioning = false;
  }, 190);
}

previousButton.addEventListener("click", () => goToScene(currentIndex - 1));
nextButton.addEventListener("click", () => goToScene(currentIndex + 1));

stage.addEventListener("click", (event) => {
  if (event.target.closest("button, a, video")) return;
  const stageBounds = stage.getBoundingClientRect();
  const tapPosition = (event.clientX - stageBounds.left) / stageBounds.width;
  goToScene(tapPosition < 0.25 ? currentIndex - 1 : currentIndex + 1);
});

window.addEventListener("keydown", (event) => {
  if (["ArrowRight", "Enter", " "].includes(event.key)) {
    event.preventDefault();
    goToScene(currentIndex + 1);
  }
  if (["ArrowLeft", "Backspace"].includes(event.key)) {
    event.preventDefault();
    goToScene(currentIndex - 1);
  }
});

window.addEventListener("hashchange", () => {
  const requestedIndex = getInitialIndex();
  if (requestedIndex !== currentIndex) goToScene(requestedIndex);
});

renderScene();
