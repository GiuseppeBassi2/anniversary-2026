// Chapter-five Italy destination art. Photos: Wikimedia Commons files released under CC0 / public domain.
const commons = (filename) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=500`;
const photos = [
  [commons("Val D Orcia In Autumn (179351679).jpeg"), "Colline della Val d'Orcia in autunno", "VAL D'ORCIA"],
  [commons("View-from-Rialto-Bridge-Venice-20050524-013.jpg"), "Canal Grande visto dal Ponte di Rialto a Venezia", "VENEZIA"],
  [commons("Positano 2005a.jpg"), "Positano sulla Costiera Amalfitana", "COSTIERA AMALFITANA"],
  [commons("Torre di Pisa, Pisa, Toscana, Italia.jpg"), "Torre pendente di Pisa", "PISA"],
];

export function renderItalyAgainArt(from, to) {
  const figures = photos.map(([src, alt, label]) => `
      <figure class="destination-photo">
        <img src="${src}" alt="${alt}" loading="eager">
        <figcaption>${label}</figcaption>
      </figure>`).join("");
  return `<div class="art art--flight art--destination art--italy">
    <div class="destination-route">
      <svg viewBox="0 0 320 135" role="img" aria-label="Flight from ${from} to ${to}">
        <path d="M26 93 Q160 2 294 93" fill="none" stroke="var(--route-accent)" stroke-width="1.7" stroke-dasharray="4 7" stroke-linecap="round"/>
        <circle cx="26" cy="93" r="4.5" fill="var(--route-accent)"/><circle cx="294" cy="93" r="4.5" fill="var(--route-accent)"/>
        <g class="plane" fill="none" stroke="var(--route-dark)" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M-10 0 L10 0 L4 -5 M10 0 L4 5 M-10 0 L-13 -5 M-10 0 L-13 5"/>
          <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path="M26 93 Q160 2 294 93"/>
        </g>
        <text x="26" y="119" text-anchor="start" class="destination-label">${from.toUpperCase()}</text>
        <text x="294" y="119" text-anchor="end" class="destination-label">${to.toUpperCase()}</text>
      </svg>
    </div>
    <div class="destination-photo-grid">${figures}
    </div>
  </div>`;
}
