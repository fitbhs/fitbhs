// Small, standalone muscle-map badge: a generic standing body silhouette
// (front or back view) with the targeted muscle(s) highlighted. Shown as
// a corner badge on top of the real exercise photos — it's a purpose-built
// diagram rather than an attempt to align a highlight to the photo's
// specific pose, so it stays accurate regardless of camera angle or the
// exact moment the photo was taken.

const BADGE_NEUTRAL = "#c7cdd6";
const BADGE_STROKE = "#9aa3b0";
const BADGE_HILITE = "#ff5a2e";

// Shared skeleton (viewBox 0 0 100 160), reused for front and back —
// only the highlighted overlay differs.
function badgeSkeleton() {
  return `
    <line x1="32" y1="34" x2="24" y2="70" stroke="${BADGE_NEUTRAL}" stroke-width="10" stroke-linecap="round" />
    <line x1="68" y1="34" x2="76" y2="70" stroke="${BADGE_NEUTRAL}" stroke-width="10" stroke-linecap="round" />
    <line x1="24" y1="70" x2="20" y2="100" stroke="${BADGE_NEUTRAL}" stroke-width="8" stroke-linecap="round" />
    <line x1="76" y1="70" x2="80" y2="100" stroke="${BADGE_NEUTRAL}" stroke-width="8" stroke-linecap="round" />
    <rect x="30" y="28" width="40" height="52" rx="12" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.5" />
    <line x1="42" y1="80" x2="38" y2="128" stroke="${BADGE_NEUTRAL}" stroke-width="13" stroke-linecap="round" />
    <line x1="58" y1="80" x2="62" y2="128" stroke="${BADGE_NEUTRAL}" stroke-width="13" stroke-linecap="round" />
    <line x1="38" y1="128" x2="36" y2="154" stroke="${BADGE_NEUTRAL}" stroke-width="9" stroke-linecap="round" />
    <line x1="62" y1="128" x2="64" y2="154" stroke="${BADGE_NEUTRAL}" stroke-width="9" stroke-linecap="round" />
    <circle cx="50" cy="14" r="10" fill="${BADGE_NEUTRAL}" stroke="${BADGE_STROKE}" stroke-width="1.5" />
  `;
}

const BADGE_OVERLAYS = {
  chest: () => `<ellipse cx="41" cy="42" rx="9" ry="8" fill="${BADGE_HILITE}" /><ellipse cx="59" cy="42" rx="9" ry="8" fill="${BADGE_HILITE}" />`,
  shoulders: () => `<circle cx="31" cy="33" r="7" fill="${BADGE_HILITE}" /><circle cx="69" cy="33" r="7" fill="${BADGE_HILITE}" />`,
  biceps: () => `<line x1="32" y1="34" x2="24" y2="70" stroke="${BADGE_HILITE}" stroke-width="10" stroke-linecap="round" /><line x1="68" y1="34" x2="76" y2="70" stroke="${BADGE_HILITE}" stroke-width="10" stroke-linecap="round" />`,
  forearms: () => `<line x1="24" y1="70" x2="20" y2="100" stroke="${BADGE_HILITE}" stroke-width="8" stroke-linecap="round" /><line x1="76" y1="70" x2="80" y2="100" stroke="${BADGE_HILITE}" stroke-width="8" stroke-linecap="round" />`,
  quads: () => `<line x1="42" y1="80" x2="38" y2="128" stroke="${BADGE_HILITE}" stroke-width="13" stroke-linecap="round" /><line x1="58" y1="80" x2="62" y2="128" stroke="${BADGE_HILITE}" stroke-width="13" stroke-linecap="round" />`,

  traps: () => `<polygon points="50,27 34,38 66,38" fill="${BADGE_HILITE}" />`,
  rearDelts: () => `<circle cx="31" cy="33" r="7" fill="${BADGE_HILITE}" /><circle cx="69" cy="33" r="7" fill="${BADGE_HILITE}" />`,
  lats: () => `<ellipse cx="35" cy="52" rx="8" ry="16" fill="${BADGE_HILITE}" /><ellipse cx="65" cy="52" rx="8" ry="16" fill="${BADGE_HILITE}" />`,
  triceps: () => `<line x1="32" y1="34" x2="24" y2="70" stroke="${BADGE_HILITE}" stroke-width="10" stroke-linecap="round" /><line x1="68" y1="34" x2="76" y2="70" stroke="${BADGE_HILITE}" stroke-width="10" stroke-linecap="round" />`,
  glutes: () => `<ellipse cx="42" cy="82" rx="8" ry="8" fill="${BADGE_HILITE}" /><ellipse cx="58" cy="82" rx="8" ry="8" fill="${BADGE_HILITE}" />`,
  hamstrings: () => `<line x1="42" y1="80" x2="38" y2="128" stroke="${BADGE_HILITE}" stroke-width="13" stroke-linecap="round" /><line x1="58" y1="80" x2="62" y2="128" stroke="${BADGE_HILITE}" stroke-width="13" stroke-linecap="round" />`,
  calves: () => `<line x1="38" y1="128" x2="36" y2="154" stroke="${BADGE_HILITE}" stroke-width="9" stroke-linecap="round" /><line x1="62" y1="128" x2="64" y2="154" stroke="${BADGE_HILITE}" stroke-width="9" stroke-linecap="round" />`,
};

function muscleBadgeSvg(badge) {
  if (!badge || !badge.muscles || !badge.muscles.length) return "";
  const overlays = badge.muscles.map((k) => (BADGE_OVERLAYS[k] ? BADGE_OVERLAYS[k]() : "")).join("");
  return `
    <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${badge.view} view">
      ${badgeSkeleton()}
      ${overlays}
    </svg>
  `;
}
