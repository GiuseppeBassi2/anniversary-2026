// Hand-made CSS/SVG scenes for Act III and the flight transitions. No external assets.

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const GOOSE_DEFS = `
  <symbol id="goose" viewBox="0 0 60 56">
    <ellipse cx="26" cy="40" rx="22" ry="13" fill="#fffdf8" stroke="#cfc6ba" stroke-width="2"/>
    <path d="M40 36 C52 34 50 20 47 14" fill="none" stroke="#fffdf8" stroke-width="9" stroke-linecap="round"/>
    <path d="M40 36 C52 34 50 20 47 14" fill="none" stroke="#cfc6ba" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>
    <circle cx="47" cy="12" r="6.5" fill="#fffdf8" stroke="#cfc6ba" stroke-width="1.5"/>
    <path d="M52 11 L59 14 L52 16 Z" fill="#f0a04a"/>
    <circle cx="48" cy="10.5" r="1.3" fill="#2b2622"/>
    <path d="M12 38 C18 32 28 32 34 38" fill="none" stroke="#cfc6ba" stroke-width="2" stroke-linecap="round"/>
    <path d="M18 52 L18 56 M30 52 L30 56" stroke="#f0a04a" stroke-width="2.5" stroke-linecap="round"/>
  </symbol>`;

function svg(viewBox, inner, extra = "") {
  return `<svg class="art-svg" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" ${extra}>${inner}</svg>`;
}

function princetonFall() {
  const rand = seeded(11);
  const colors = ["#c8642c", "#d98a2b", "#a8432b", "#e0a43a"];
  let leaves = "";
  for (let i = 0; i < 18; i += 1) {
    leaves += `<i class="leaf" style="left:${Math.round(rand() * 96)}%;--d:${(6 + rand() * 6).toFixed(1)}s;--delay:${(-rand() * 10).toFixed(1)}s;--c:${colors[i % 4]};--s:${(10 + rand() * 12).toFixed(0)}px"></i>`;
  }
  const tower = svg(
    "0 0 360 420",
    `<defs><linearGradient id="fallsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d9b0"/><stop offset="1" stop-color="#f3efe8"/></linearGradient></defs>
     <rect width="360" height="420" fill="url(#fallsky)"/>
     <circle cx="270" cy="90" r="34" fill="#f8c98a" opacity=".8"/>
     <g fill="#5b3a2e">
       <rect x="120" y="150" width="120" height="210"/>
       <path d="M110 150 L180 60 L250 150 Z"/>
       <rect x="100" y="180" width="20" height="180"/><rect x="240" y="180" width="20" height="180"/>
       <path d="M100 180 L110 150 L120 180Z"/><path d="M240 180 L250 150 L260 180Z"/>
       <rect x="176" y="30" width="8" height="34"/>
     </g>
     <g fill="#f6d9b0"><rect x="162" y="190" width="14" height="34" rx="7"/><rect x="184" y="190" width="14" height="34" rx="7"/><rect x="162" y="250" width="14" height="34" rx="7"/><rect x="184" y="250" width="14" height="34" rx="7"/><path d="M164 330 h32 v30 h-32z" fill="#3a251e"/></g>
     <path d="M0 360 H360 V420 H0Z" fill="#a8632c"/>
     <path d="M0 360 Q90 340 180 360 T360 355 V420 H0Z" fill="#c8823a" opacity=".7"/>
     <g fill="#c8642c"><circle cx="40" cy="330" r="34"/><circle cx="70" cy="345" r="26" fill="#d98a2b"/><circle cx="320" cy="335" r="36" fill="#a8432b"/><circle cx="292" cy="350" r="24" fill="#e0a43a"/></g>
     <rect x="36" y="350" width="8" height="20" fill="#5b3a2e"/><rect x="316" y="352" width="8" height="20" fill="#5b3a2e"/>`,
  );
  return `<div class="art art--fall">${tower}<div class="leaves" aria-hidden="true">${leaves}</div></div>`;
}

function princetonSnow() {
  const rand = seeded(23);
  let flakes = "";
  for (let i = 0; i < 40; i += 1) {
    flakes += `<i class="flake" style="left:${Math.round(rand() * 98)}%;--d:${(5 + rand() * 6).toFixed(1)}s;--delay:${(-rand() * 10).toFixed(1)}s;--s:${(2 + rand() * 4).toFixed(1)}px"></i>`;
  }
  const buildings = [
    [200, 200, 22], [224, 160, 18], [244, 230, 20], [266, 130, 16], [284, 190, 24], [310, 150, 20], [332, 210, 22],
  ]
    .map(([x, h, w]) => `<rect x="${x}" y="${360 - h}" width="${w}" height="${h}" fill="#4a5568"/>`)
    .join("");
  const inner = `
    <defs><linearGradient id="snowsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8d6e5"/><stop offset="1" stop-color="#eef2f6"/></linearGradient></defs>
    <rect width="360" height="420" fill="url(#snowsky)"/>
    ${buildings}
    <rect x="278" y="120" width="3" height="20" fill="#4a5568"/>
    <rect x="0" y="360" width="360" height="60" fill="#fdfdff"/>
    <path d="M20 340 C 120 340, 160 300, 330 300" fill="none" stroke="#4a5568" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>
    <circle cx="20" cy="340" r="7" fill="#c8642c"/>
    <circle cx="330" cy="300" r="7" fill="#4a5568"/>
    <text x="20" y="372" font-size="12" font-family="Inter, sans-serif" letter-spacing="1.4" fill="#4a5568">PRINCETON</text>
    <text x="240" y="330" font-size="12" font-family="Inter, sans-serif" letter-spacing="1.4" fill="#4a5568" text-anchor="middle">NEW YORK</text>
    <g><rect x="-11" y="-6" width="22" height="12" rx="4" fill="#c8642c"/><rect x="-6" y="-3" width="4" height="4" fill="#fdfdff"/><rect x="2" y="-3" width="4" height="4" fill="#fdfdff"/>
      <animateMotion dur="7s" repeatCount="indefinite" path="M20 340 C 120 340, 160 300, 330 300"/></g>`;
  return `<div class="art art--snow">${svg("0 0 360 420", inner)}<div class="leaves" aria-hidden="true">${flakes}</div></div>`;
}

function home() {
  const inner = `
    <defs><linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7c9a1"/><stop offset="0.6" stop-color="#f9e5cb"/><stop offset="1" stop-color="#f3efe8"/></linearGradient></defs>
    <rect width="360" height="420" fill="url(#dusk)"/>
    <circle cx="300" cy="70" r="26" fill="#fbe9c0"/>
    <rect y="340" width="360" height="80" fill="#8fae7a"/>
    <rect y="372" width="360" height="48" fill="#7f9e6c"/>
    <path d="M150 420 L172 340 H208 L230 420Z" fill="#e9dcc8"/>
    <!-- house -->
    <rect x="90" y="210" width="190" height="135" fill="#f6ead6"/>
    <path d="M76 214 L185 130 L294 214 Z" fill="#a4514a"/>
    <rect x="236" y="140" width="22" height="46" fill="#8b4540"/>
    <g fill="#e6dccb" opacity=".9"><circle cx="248" cy="124" r="9"><animate attributeName="cy" values="128;100" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="4s" repeatCount="indefinite"/></circle></g>
    <rect x="164" y="270" width="42" height="75" rx="3" fill="#4d7f86"/>
    <circle cx="198" cy="308" r="2.6" fill="#f2c15a"/>
    <rect x="106" y="242" width="40" height="44" fill="#ffd77a"/><path d="M126 242 v44 M106 264 h40" stroke="#c99c3e" stroke-width="2"/>
    <rect x="224" y="242" width="40" height="44" fill="#ffd77a"/><path d="M244 242 v44 M224 264 h40" stroke="#c99c3e" stroke-width="2"/>
    <use href="#goose" x="106" y="255" width="22" height="20"/>
    <!-- porch -->
    <rect x="84" y="336" width="202" height="10" fill="#c9b08f"/>
    <rect x="156" y="250" width="58" height="8" fill="#a4514a"/>
    <circle cx="185" cy="264" r="4" fill="#ffe08a"><animate attributeName="opacity" values="1;.55;1" dur="3s" repeatCount="indefinite"/></circle>
    <!-- fairy lights -->
    <path d="M84 224 Q 130 244 185 226 T 286 224" fill="none" stroke="#7a5a3a" stroke-width="1"/>
    ${[100, 130, 160, 190, 220, 250, 278]
      .map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 236 : 232}" r="3" fill="#ffe08a"><animate attributeName="opacity" values="1;.4;1" dur="${2 + (i % 3)}s" repeatCount="indefinite"/></circle>`)
      .join("")}
    <!-- tree -->
    <rect x="30" y="270" width="10" height="76" fill="#6b4a36"/>
    <circle cx="35" cy="252" r="38" fill="#d9822b"/><circle cx="16" cy="270" r="24" fill="#c8642c"/><circle cx="58" cy="272" r="22" fill="#e0a43a"/>
    <!-- mailbox + fence -->
    <rect x="308" y="316" width="5" height="32" fill="#6b4a36"/><rect x="300" y="304" width="22" height="14" rx="6" fill="#4d7f86"/>
    ${[290, 306, 322, 338, 354].map((x) => `<rect x="${x - 6}" y="328" width="6" height="22" fill="#fffaf0"/>`).join("")}
    <!-- chairs -->
    <rect x="106" y="312" width="22" height="24" fill="#c9b08f" rx="3"/><rect x="238" y="312" width="22" height="24" fill="#c9b08f" rx="3"/>`;
  return `<div class="art art--home"><svg class="art-svg" viewBox="0 0 360 420" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs>${GOOSE_DEFS}</defs>${inner}</svg></div>`;
}

function kitchen() {
  const pans = [60, 110, 160, 210, 260]
    .map((x, i) => `<g><line x1="${x}" y1="70" x2="${x}" y2="90" stroke="#5c5852" stroke-width="2"/><circle cx="${x}" cy="108" r="${16 - (i % 2) * 3}" fill="#8a8580" stroke="#5c5852" stroke-width="2"/></g>`)
    .join("");
  const tiles = Array.from({ length: 10 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<rect x="${c * 40}" y="${140 + r * 22}" width="38" height="20" fill="#f7f1e6"/>`).join("")).join("");
  const inner = `
    <rect width="360" height="420" fill="#efe6d6"/>
    ${tiles}
    <rect x="70" y="14" width="220" height="38" rx="6" fill="#2b2622"/>
    <text x="180" y="40" font-family="Georgia, serif" font-size="20" text-anchor="middle" fill="#f6ead6" letter-spacing="3">MIN’S OFFICE</text>
    ${pans}
    <!-- hood -->
    <path d="M90 168 L270 168 L250 126 L110 126 Z" fill="#b9b3ab" stroke="#8a8580" stroke-width="2"/>
    <!-- stove -->
    <rect x="70" y="262" width="220" height="100" rx="6" fill="#4b4741"/>
    <rect x="86" y="292" width="188" height="60" rx="4" fill="#2f2c28"/><circle cx="180" cy="322" r="14" fill="#f2c15a" opacity=".5"/>
    <g fill="#8a8580"><rect x="98" y="272" width="14" height="6" rx="3"/><rect x="132" y="272" width="14" height="6" rx="3"/><rect x="214" y="272" width="14" height="6" rx="3"/><rect x="248" y="272" width="14" height="6" rx="3"/></g>
    <g><rect x="94" y="236" width="70" height="26" rx="4" fill="#a4514a"/><rect x="164" y="242" width="16" height="6" fill="#5c5852"/></g>
    <g><rect x="196" y="230" width="70" height="32" rx="4" fill="#4d7f86"/></g>
    ${[130, 230].map((x, i) => `<path d="M${x} 224 q-8 -14 0 -26 q8 -14 0 -26" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"><animate attributeName="opacity" values=".7;0;.7" dur="${3 + i}s" repeatCount="indefinite"/></path>`).join("")}
    <!-- counter with cake -->
    <rect x="0" y="362" width="360" height="58" fill="#c9b08f"/>
    <rect x="16" y="330" width="46" height="32" rx="4" fill="#fff"/><path d="M16 342 q23 -18 46 0" fill="#f3a1b0"/><circle cx="39" cy="326" r="4" fill="#c8232c"/>
    <rect x="300" y="330" width="42" height="32" rx="6" fill="#f6ead6" stroke="#8a8580" stroke-width="2"/><path d="M304 330 q17 -26 34 0" fill="#fff" stroke="#8a8580" stroke-width="2"/>
    <text x="320" y="392" font-family="Inter, sans-serif" font-size="9" fill="#5c5852" text-anchor="middle" letter-spacing="1">TASTE TESTER</text>
    <text x="320" y="404" font-family="Inter, sans-serif" font-size="9" fill="#5c5852" text-anchor="middle" letter-spacing="1">(GIUSEPPE)</text>`;
  return `<div class="art art--kitchen">${svg("0 0 360 420", inner)}</div>`;
}

const BED_SPOTS = [
  [122, 216, 62, 0], [176, 222, 60, 8], [80, 232, 56, -10], [214, 236, 54, 6], [140, 252, 58, -4], [96, 262, 52, 12],
  [190, 268, 56, -8], [230, 274, 50, 10], [120, 282, 52, -6], [170, 296, 50, 4], [60, 300, 46, -12], [250, 296, 46, 8],
];

function bedroom({ geese = 0, apocalypse = false }) {
  let gooseMarkup = "";
  if (geese > 0 && !apocalypse) {
    const rand = seeded(5);
    const spots = geese <= 12 ? BED_SPOTS.slice(0, geese) : [];
    if (geese === 1) spots[0] = [140, 208, 66, -4];
    spots.forEach(([x, y, s, r], i) => {
      gooseMarkup += `<use class="goose" href="#goose" x="${x}" y="${y}" width="${s}" height="${s * 0.93}" transform="rotate(${r} ${x + s / 2} ${y + s / 2})" style="--i:${(rand() * 2).toFixed(2)}s"/>`;
    });
  }
  if (apocalypse) {
    const rand = seeded(97);
    for (let i = 0; i < geese; i += 1) {
      const s = 38 + rand() * 70;
      const x = -10 + rand() * 330;
      const y = 10 + rand() * 360;
      const r = -40 + rand() * 80;
      gooseMarkup += `<use class="goose" href="#goose" x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${s.toFixed(0)}" height="${(s * 0.93).toFixed(0)}" transform="rotate(${r.toFixed(0)} ${(x + s / 2).toFixed(0)} ${(y + s / 2).toFixed(0)})" style="--i:${(rand() * 1.5).toFixed(2)}s"/>`;
    }
  }
  const inner = `
    <defs>${GOOSE_DEFS}</defs>
    <rect width="360" height="420" fill="${apocalypse ? "#f0d6d0" : "#efe3d2"}"/>
    <rect y="330" width="360" height="90" fill="#d5bfa0"/>
    <!-- window -->
    <rect x="240" y="40" width="88" height="112" rx="4" fill="#1f2c4d" stroke="#fffaf0" stroke-width="6"/>
    <circle cx="298" cy="76" r="14" fill="#f7e9b0"/><circle cx="291" cy="72" r="12" fill="#1f2c4d"/>
    <path d="M284 40 v112 M240 96 h88" stroke="#fffaf0" stroke-width="3"/>
    <!-- headboard, bed -->
    <rect x="50" y="150" width="240" height="130" rx="12" fill="#8b6a52"/>
    <rect x="42" y="230" width="256" height="110" rx="10" fill="#f7f1e6"/>
    <rect x="42" y="286" width="256" height="54" rx="10" fill="#7c9aa3"/>
    <rect x="60" y="200" width="88" height="44" rx="14" fill="#ffffff" stroke="#e2d8c9" stroke-width="2"/>
    <rect x="152" y="200" width="88" height="44" rx="14" fill="#ffffff" stroke="#e2d8c9" stroke-width="2"/>
    <rect x="52" y="340" width="10" height="24" fill="#6b4a36"/><rect x="278" y="340" width="10" height="24" fill="#6b4a36"/>
    <!-- lamp -->
    <rect x="304" y="252" width="40" height="88" rx="4" fill="#8b6a52"/>
    <rect x="320" y="216" width="8" height="38" fill="#5c5852"/>
    <path d="M304 216 L344 216 L336 180 L312 180Z" fill="#ffe08a"/>
    <circle cx="324" cy="196" r="46" fill="#ffe08a" opacity=".2"/>
    <!-- rug -->
    <ellipse cx="170" cy="392" rx="120" ry="18" fill="#e3b9a4"/>
    ${gooseMarkup}`;
  return `<div class="art art--bedroom ${apocalypse ? "is-apocalypse" : ""}">${svg("0 0 360 420", inner)}</div>`;
}

function person(x, y, h, color, hair = "#3a2c26") {
  const head = h * 0.2;
  return `<g>
    <circle cx="${x}" cy="${y}" r="${head}" fill="${color}"/>
    <path d="M${x - head} ${y - 2} q${head} ${-head * 1.6} ${head * 2} 0" fill="${hair}"/>
    <path d="M${x - h * 0.16} ${y + head + 2} h${h * 0.32} l${h * 0.06} ${h * 0.55} h${-h * 0.44} z" fill="${color}"/>
  </g>`;
}

function familyCover() {
  const inner = `
    <defs><linearGradient id="dlc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd6a5"/><stop offset="1" stop-color="#f7a8b8"/></linearGradient>${GOOSE_DEFS}</defs>
    <rect x="30" y="20" width="300" height="380" rx="16" fill="url(#dlc)" stroke="#2b2622" stroke-width="3"/>
    <text x="180" y="66" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" letter-spacing="4" fill="#2b2622">EXPANSION PACK</text>
    <text x="180" y="120" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#2b2622">Highly</text>
    <text x="180" y="156" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#2b2622">speculative</text>
    <text x="180" y="200" text-anchor="middle" font-family="Georgia, serif" font-size="38" font-weight="700" fill="#a4514a">FAMILY DLC</text>
    ${person(120, 262, 110, "#5a7fa8")}${person(196, 262, 104, "#c96f8a")}
    ${person(250, 300, 56, "#e0a43a")}
    <use href="#goose" x="70" y="330" width="52" height="48"/>
    <rect x="200" y="352" width="100" height="26" rx="13" fill="#2b2622"/>
    <text x="250" y="369" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" letter-spacing="2" fill="#fff">E FOR EVERYONE</text>`;
  return `<div class="art art--family">${svg("0 0 360 420", inner)}</div>`;
}

function familyLineup() {
  const inner = `
    <defs>${GOOSE_DEFS}</defs>
    <rect width="360" height="420" fill="#f9e7d8"/>
    <rect y="330" width="360" height="90" fill="#e9c9a6"/>
    ${person(70, 200, 150, "#5a7fa8")}${person(140, 204, 140, "#c96f8a")}
    ${person(206, 240, 96, "#e0a43a")}${person(256, 262, 66, "#7fb08a")}
    <circle cx="298" cy="298" r="7" fill="#7fb08a"/><path d="M290 306 h16 v28 h-16z" fill="#7fb08a"/>
    <use href="#goose" x="292" y="330" width="60" height="56"/>
    <text x="180" y="52" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" letter-spacing="3" fill="#5c5852">CHARACTER SELECT</text>
    <g font-family="Inter, sans-serif" font-size="9" letter-spacing="1.5" fill="#5c5852" text-anchor="middle">
      <text x="70" y="366">MIN</text><text x="140" y="366">ME</text><text x="206" y="366">???</text><text x="256" y="366">???</text>
    </g>
    <rect x="50" y="384" width="260" height="10" rx="5" fill="#fff"/><rect x="50" y="384" width="26" height="10" rx="5" fill="#a4514a"/>
    <text x="180" y="414" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" letter-spacing="2" fill="#5c5852">LOADING… 10%</text>`;
  return `<div class="art art--family">${svg("0 0 360 420", inner)}</div>`;
}

export function renderFlightArt(from, to) {
  const path = "M30 150 Q 180 10 330 150";
  return `<div class="art art--flight">
    <svg class="art-svg" viewBox="0 0 360 200" aria-hidden="true">
      <path d="${path}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 7" stroke-linecap="round" opacity=".55"/>
      <circle cx="30" cy="150" r="5" fill="currentColor"/><circle cx="330" cy="150" r="5" fill="currentColor"/>
      <g class="plane"><path d="M-10 0 L10 0 L4 -5 M10 0 L4 5 M-10 0 L-13 -5 M-10 0 L-13 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto" path="${path}"/></g>
      <text x="30" y="180" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" letter-spacing="1.6" fill="currentColor">${from.toUpperCase()}</text>
      <text x="330" y="180" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" letter-spacing="1.6" fill="currentColor">${to.toUpperCase()}</text>
    </svg></div>`;
}

const builders = {
  "princeton-fall": princetonFall,
  "princeton-snow": princetonSnow,
  home,
  kitchen,
  bedroom,
  "family-cover": familyCover,
  "family-lineup": familyLineup,
};

export function renderArt(scene) {
  const build = builders[scene.art];
  return build ? build(scene) : "";
}
