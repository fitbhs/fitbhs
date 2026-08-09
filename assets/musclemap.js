// Small, standalone muscle-map badge: a generic standing physique
// silhouette shown as a front/back pair, with the targeted muscle(s)
// highlighted in an anatomically-shaped region — following the same
// idea as classic muscle-function charts (front + back body, highlighted
// region), drawn as original artwork rather than traced from any
// copyrighted reference. Shown as a corner badge on top of the real
// exercise photos — a purpose-built diagram rather than an attempt to
// align a highlight to the photo's specific pose, so it stays accurate
// regardless of camera angle or the exact moment the photo was taken.

const BADGE_NEUTRAL = "#c3cad3";
const BADGE_STROKE = "#98a1ad";
const BADGE_HILITE = "#ff5a2e";

// One body silhouette (100x160), reused for both the front and back
// panel — only the highlighted overlay differs between them.
function badgeSkeleton() {
  return `
    <ellipse cx="50" cy="13" rx="8.5" ry="9.5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.4" />
    <rect x="45" y="19" width="10" height="9" fill="${BADGE_NEUTRAL}" />

    <rect x="14" y="24" width="12.5" height="31" rx="6" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="73.5" y="24" width="12.5" height="31" rx="6" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="12" y="53" width="10.5" height="29" rx="5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="77.5" y="53" width="10.5" height="29" rx="5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <ellipse cx="17" cy="85" rx="5.5" ry="6" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <ellipse cx="83" cy="85" rx="5.5" ry="6" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />

    <path d="M27,29 C25,25 29,21 37,21 L63,21 C71,21 75,25 73,29 C70,40 66,50 63,66 L37,66 C34,50 30,40 27,29 Z"
      fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.4" />
    <path d="M37,66 L63,66 L67,84 L33,84 Z" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.4" />

    <rect x="33" y="83" width="14.5" height="37" rx="7" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="52.5" y="83" width="14.5" height="37" rx="7" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="35" y="119" width="10.5" height="30" rx="5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="54.5" y="119" width="10.5" height="30" rx="5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <ellipse cx="40" cy="153" rx="7" ry="4.2" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <ellipse cx="60" cy="153" rx="7" ry="4.2" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
  `;
}

const H = BADGE_HILITE;

// Anatomically-shaped overlay for each muscle key, positioned on the
// 100x160 body above.
const BADGE_OVERLAYS = {
  chest: () => `<ellipse cx="38.5" cy="38" rx="10" ry="9.5" fill="${H}" /><ellipse cx="61.5" cy="38" rx="10" ry="9.5" fill="${H}" />`,
  shoulders: () => `<circle cx="20" cy="28" r="9" fill="${H}" /><circle cx="80" cy="28" r="9" fill="${H}" />`,
  biceps: () => `<ellipse cx="20" cy="39" rx="7.5" ry="13.5" fill="${H}" /><ellipse cx="80" cy="39" rx="7.5" ry="13.5" fill="${H}" />`,
  forearms: () => `<ellipse cx="17.5" cy="66" rx="6.5" ry="13" fill="${H}" /><ellipse cx="82.5" cy="66" rx="6.5" ry="13" fill="${H}" />`,
  quads: () => `<ellipse cx="40" cy="101" rx="8.5" ry="17" fill="${H}" /><ellipse cx="60" cy="101" rx="8.5" ry="17" fill="${H}" />`,
  traps: () => `<polygon points="50,19 32,32 41,38 50,30 59,38 68,32" fill="${H}" />`,
  lats: () => `
    <path d="M32,31 C21,42 20,58 30,68 C35,58 37,44 35,32 Z" fill="${H}" />
    <path d="M68,31 C79,42 80,58 70,68 C65,58 63,44 65,32 Z" fill="${H}" />
  `,
  triceps: () => `<ellipse cx="20" cy="39" rx="7.5" ry="13.5" fill="${H}" /><ellipse cx="80" cy="39" rx="7.5" ry="13.5" fill="${H}" />`,
  glutes: () => `<path d="M35,84 C33,90 35,97 40,98 C45,97 47,90 45,84 Z" fill="${H}" /><path d="M55,84 C53,90 55,97 60,98 C65,97 67,90 65,84 Z" fill="${H}" />`,
  hamstrings: () => `<ellipse cx="40" cy="101" rx="8.5" ry="17" fill="${H}" /><ellipse cx="60" cy="101" rx="8.5" ry="17" fill="${H}" />`,
  calves: () => `<polygon points="40,120 46,134 40,150 34,134" fill="${H}" /><polygon points="60,120 66,134 60,150 54,134" fill="${H}" />`,
};

// Which panel(s) each muscle lights up on. Limb muscles are the same
// physical spot in silhouette whether viewed from the front or back, so
// they light up on both panels; torso muscles are only visible from one
// side.
const MUSCLE_PANELS = {
  chest: ["front"],
  shoulders: ["front", "back"],
  biceps: ["front", "back"],
  forearms: ["front", "back"],
  quads: ["front", "back"],
  traps: ["back"],
  lats: ["back"],
  triceps: ["front", "back"],
  glutes: ["back"],
  hamstrings: ["front", "back"],
  calves: ["front", "back"],
};

function panelSvg(muscles, side) {
  const overlays = muscles
    .filter((k) => (MUSCLE_PANELS[k] || []).includes(side))
    .map((k) => (BADGE_OVERLAYS[k] ? BADGE_OVERLAYS[k]() : ""))
    .join("");
  return badgeSkeleton() + overlays;
}

function muscleBadgeSvg(badge) {
  if (!badge || !badge.muscles || !badge.muscles.length) return "";
  return `
    <svg viewBox="0 0 212 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${(badge.muscles || []).join(", ")}">
      <g>${panelSvg(badge.muscles, "front")}</g>
      <g transform="translate(112 0)">${panelSvg(badge.muscles, "back")}</g>
    </svg>
  `;
}
