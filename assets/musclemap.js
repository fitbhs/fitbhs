// Small, standalone muscle-map badge: a generic standing physique
// silhouette shown as a front/back pair, with the targeted muscle(s)
// highlighted in an anatomically-shaped region — following the same
// idea as classic muscle-function charts (front + back body, arms held
// slightly out from the torso, highlighted region), drawn as original
// artwork rather than traced from any copyrighted reference. Shown as a
// corner badge on top of the real exercise photos — a purpose-built
// diagram rather than an attempt to align a highlight to the photo's
// specific pose, so it stays accurate regardless of camera angle or the
// exact moment the photo was taken.

const BADGE_NEUTRAL = "#c3cad3";
const BADGE_STROKE = "#98a1ad";
const BADGE_HILITE = "#ff5a2e";

// One body silhouette (100x160), reused for both the front and back
// panel — only the highlighted overlay differs between them. Arms and
// legs are held slightly out from the torso (a relaxed reference pose)
// so each limb reads as a distinct shape.
function badgeSkeleton() {
  return `
    <ellipse cx="50" cy="12" rx="8" ry="9.5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.4" />
    <path d="M44,18 L56,18 L53,24 L47,24 Z" fill="${BADGE_NEUTRAL}" />

    <rect x="12" y="25" width="13" height="29" rx="6.5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="75" y="25" width="13" height="29" rx="6.5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="6" y="52" width="11" height="27" rx="5.5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="83" y="52" width="11" height="27" rx="5.5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <ellipse cx="9" cy="83" rx="6.5" ry="7.5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <ellipse cx="91" cy="83" rx="6.5" ry="7.5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />

    <path d="M27,29 C25,25 29,21 37,21 L63,21 C71,21 75,25 73,29 C70,40 66,50 63,66 L37,66 C34,50 30,40 27,29 Z"
      fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.4" />
    <path d="M37,66 L63,66 L67,84 L33,84 Z" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.4" />

    <rect x="32" y="83" width="15" height="36" rx="7" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="53" y="83" width="15" height="36" rx="7" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="29" y="118" width="11.5" height="29" rx="5.5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <rect x="59.5" y="118" width="11.5" height="29" rx="5.5" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <ellipse cx="33.5" cy="151" rx="8.5" ry="4.8" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
    <ellipse cx="66.5" cy="151" rx="8.5" ry="4.8" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.2" />
  `;
}

const H = BADGE_HILITE;

// Anatomically-shaped overlay for each muscle key, positioned on the
// 100x160 body above.
const BADGE_OVERLAYS = {
  chest: () => `<ellipse cx="38.5" cy="38" rx="10" ry="9.5" fill="${H}" /><ellipse cx="61.5" cy="38" rx="10" ry="9.5" fill="${H}" />`,
  shoulders: () => `<circle cx="18" cy="28" r="9.5" fill="${H}" /><circle cx="82" cy="28" r="9.5" fill="${H}" />`,
  biceps: () => `<ellipse cx="18" cy="38" rx="8" ry="13" fill="${H}" /><ellipse cx="82" cy="38" rx="8" ry="13" fill="${H}" />`,
  forearms: () => `<ellipse cx="11.5" cy="65" rx="7" ry="12.5" fill="${H}" /><ellipse cx="88.5" cy="65" rx="7" ry="12.5" fill="${H}" />`,
  quads: () => `<ellipse cx="39.5" cy="100" rx="9" ry="17" fill="${H}" /><ellipse cx="60.5" cy="100" rx="9" ry="17" fill="${H}" />`,
  traps: () => `<polygon points="50,20 30,34 42,48 50,58 58,48 70,34" fill="${H}" />`,
  lats: () => `
    <path d="M30,33 C18,44 17,60 28,72 C34,60 37,45 34,33 Z" fill="${H}" />
    <path d="M70,33 C82,44 83,60 72,72 C66,60 63,45 66,33 Z" fill="${H}" />
  `,
  triceps: () => `<ellipse cx="18" cy="38" rx="8" ry="13" fill="${H}" /><ellipse cx="82" cy="38" rx="8" ry="13" fill="${H}" />`,
  glutes: () => `<ellipse cx="41" cy="89" rx="10" ry="8.5" fill="${H}" /><ellipse cx="59" cy="89" rx="10" ry="8.5" fill="${H}" />`,
  hamstrings: () => `<ellipse cx="39.5" cy="100" rx="9" ry="17" fill="${H}" /><ellipse cx="60.5" cy="100" rx="9" ry="17" fill="${H}" />`,
  calves: () => `<polygon points="34.5,119 40,133 34.5,149 29,133" fill="${H}" /><polygon points="65.5,119 71,133 65.5,149 60,133" fill="${H}" />`,
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
