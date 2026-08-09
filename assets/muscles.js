// Minimal muscle-map thumbnails: a shared front/back body silhouette
// with colored overlays for whichever muscles an exercise targets,
// plus a small badge showing the movement's plane of motion.

const BODY_NEUTRAL = "#dbe0e6";
const BODY_STROKE = "#b9c0c9";
const HIGHLIGHT = "#e8491d";

// Shared limb/torso skeleton coordinates (viewBox 0 0 160 240).
// Arms and legs are pre-split into segments (upper/lower) so a single
// muscle group can recolor just its segment.
const SKELETON = {
  head: { cx: 80, cy: 21, r: 15 },
  neck: { x: 72, y: 34, w: 16, h: 10 },
  torso: { x: 48, y: 44, w: 64, h: 78, r: 18 },
  armUpperL: { x1: 42, y1: 54, x2: 26, y2: 102, w: 16 },
  armUpperR: { x1: 118, y1: 54, x2: 134, y2: 102, w: 16 },
  armLowerL: { x1: 26, y1: 102, x2: 19, y2: 146, w: 12 },
  armLowerR: { x1: 134, y1: 102, x2: 141, y2: 146, w: 12 },
  thighL: { x1: 62, y1: 122, x2: 58, y2: 176, w: 20 },
  thighR: { x1: 98, y1: 122, x2: 102, y2: 176, w: 20 },
  calfL: { x1: 58, y1: 176, x2: 56, y2: 224, w: 14 },
  calfR: { x1: 102, y1: 176, x2: 104, y2: 224, w: 14 },
};

function line(seg, color) {
  return `<line x1="${seg.x1}" y1="${seg.y1}" x2="${seg.x2}" y2="${seg.y2}" stroke="${color}" stroke-width="${seg.w}" stroke-linecap="round" />`;
}

function baseSkeleton() {
  const s = SKELETON;
  return `
    <rect x="${s.torso.x}" y="${s.torso.y}" width="${s.torso.w}" height="${s.torso.h}" rx="${s.torso.r}" fill="${BODY_NEUTRAL}" stroke="${BODY_STROKE}" stroke-width="2" />
    ${line(s.armUpperL, BODY_NEUTRAL)}${line(s.armUpperR, BODY_NEUTRAL)}
    ${line(s.armLowerL, BODY_NEUTRAL)}${line(s.armLowerR, BODY_NEUTRAL)}
    ${line(s.thighL, BODY_NEUTRAL)}${line(s.thighR, BODY_NEUTRAL)}
    ${line(s.calfL, BODY_NEUTRAL)}${line(s.calfR, BODY_NEUTRAL)}
    <rect x="${s.neck.x}" y="${s.neck.y}" width="${s.neck.w}" height="${s.neck.h}" rx="4" fill="${BODY_NEUTRAL}" stroke="${BODY_STROKE}" stroke-width="1.5" />
    <circle cx="${s.head.cx}" cy="${s.head.cy}" r="${s.head.r}" fill="${BODY_NEUTRAL}" stroke="${BODY_STROKE}" stroke-width="2" />
  `;
}

// Muscle overlays, keyed by the `thumb.muscles` values used in data.js.
const MUSCLE_OVERLAYS = {
  chest: () => `
    <ellipse cx="63" cy="65" rx="14" ry="12" fill="${HIGHLIGHT}" />
    <ellipse cx="97" cy="65" rx="14" ry="12" fill="${HIGHLIGHT}" />
  `,
  shoulders: () => `
    <circle cx="42" cy="54" r="11" fill="${HIGHLIGHT}" />
    <circle cx="118" cy="54" r="11" fill="${HIGHLIGHT}" />
  `,
  biceps: () => line(SKELETON.armUpperL, HIGHLIGHT) + line(SKELETON.armUpperR, HIGHLIGHT),
  forearms: () => line(SKELETON.armLowerL, HIGHLIGHT) + line(SKELETON.armLowerR, HIGHLIGHT),
  quads: () => line(SKELETON.thighL, HIGHLIGHT) + line(SKELETON.thighR, HIGHLIGHT),

  traps: () => `<polygon points="80,42 53,60 107,60" fill="${HIGHLIGHT}" />`,
  rearDelts: () => `
    <circle cx="42" cy="54" r="11" fill="${HIGHLIGHT}" />
    <circle cx="118" cy="54" r="11" fill="${HIGHLIGHT}" />
  `,
  lats: () => `
    <ellipse cx="55" cy="82" rx="13" ry="26" fill="${HIGHLIGHT}" />
    <ellipse cx="105" cy="82" rx="13" ry="26" fill="${HIGHLIGHT}" />
  `,
  triceps: () => line(SKELETON.armUpperL, HIGHLIGHT) + line(SKELETON.armUpperR, HIGHLIGHT),
  glutes: () => `
    <ellipse cx="62" cy="128" rx="13" ry="14" fill="${HIGHLIGHT}" />
    <ellipse cx="98" cy="128" rx="13" ry="14" fill="${HIGHLIGHT}" />
  `,
  hamstrings: () => line(SKELETON.thighL, HIGHLIGHT) + line(SKELETON.thighR, HIGHLIGHT),
  calves: () => line(SKELETON.calfL, HIGHLIGHT) + line(SKELETON.calfR, HIGHLIGHT),
};

// Small movement-plane badges drawn in the corner of the thumbnail.
const MOTION_ICONS = {
  vertical: `<g transform="translate(122 8)"><circle r="13" cx="13" cy="13" fill="#fff" stroke="${BODY_STROKE}" stroke-width="1.5"/><path d="M13 6 L13 20 M9 10 L13 6 L17 10 M9 16 L13 20 L17 16" stroke="${HIGHLIGHT}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  horizontal: `<g transform="translate(122 8)"><circle r="13" cx="13" cy="13" fill="#fff" stroke="${BODY_STROKE}" stroke-width="1.5"/><path d="M6 13 L20 13 M10 9 L6 13 L10 17 M16 9 L20 13 L16 17" stroke="${HIGHLIGHT}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  rotate: `<g transform="translate(122 8)"><circle r="13" cx="13" cy="13" fill="#fff" stroke="${BODY_STROKE}" stroke-width="1.5"/><path d="M8 9 A7 7 0 1 1 7 18" stroke="${HIGHLIGHT}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M7 14 L7 18 L11 18" stroke="${HIGHLIGHT}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`,
};

const MOTION_LABELS = {
  vertical: "Vertical press/pull",
  horizontal: "Horizontal press/pull",
  rotate: "Rotational / curling motion",
};

function muscleMapSvg(thumb) {
  if (!thumb) return "";
  const overlays = (thumb.muscles || [])
    .map((key) => (MUSCLE_OVERLAYS[key] ? MUSCLE_OVERLAYS[key]() : ""))
    .join("");
  const motion = thumb.motion && MOTION_ICONS[thumb.motion] ? MOTION_ICONS[thumb.motion] : "";
  return `
    <svg viewBox="0 0 160 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${(thumb.muscles || []).join(', ')}">
      ${baseSkeleton()}
      ${overlays}
      ${motion}
    </svg>
  `;
}
