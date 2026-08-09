// Procedural exercise thumbnails: a simple side-view stick figure posed
// via forward kinematics, shown at both the start and end of the rep
// (the "ghost" is the start position, the solid figure is the end
// position) so the range of motion reads at a glance. Equipment is
// drawn near the moving hand/feet, and the targeted muscle group's
// body segment is colored in.

const STROKE = "#b9c0c9";
const NEUTRAL = "#dbe0e6";
const HILITE = "#e8491d";
const EQUIP = "#8b95a3";
const PROP = "#c7cdd6";

const CANVAS_HIP = { x: 74, y: 150 };
const LEN = { torso: 60, neckHead: 24, upperArm: 38, foreArm: 36, thigh: 44, shin: 42 };

function toRad(d) {
  return (d * Math.PI) / 180;
}
function polar(angleDeg, length) {
  const r = toRad(angleDeg);
  return { x: length * Math.sin(r), y: length * Math.cos(r) };
}
function add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
}
function rotateAroundOrigin(p, angleDeg) {
  const r = toRad(angleDeg);
  return {
    x: p.x * Math.cos(r) - p.y * Math.sin(r),
    y: p.x * Math.sin(r) + p.y * Math.cos(r),
  };
}
function n(v) {
  return Math.round(v * 10) / 10;
}

// Forward kinematics: given body/torso/arm/leg angles, return world (canvas) points.
function computeFK({ bodyRotate = 0, torsoLean = 0, arm, leg }) {
  const hip = { x: 0, y: 0 };
  const knee = add(hip, polar(leg.hip, LEN.thigh));
  const ankle = add(knee, polar(leg.hip + leg.knee, LEN.shin));

  const shoulder = add(hip, polar(180 + torsoLean, LEN.torso));
  const head = add(shoulder, polar(180 + torsoLean, LEN.neckHead));

  const elbow = add(shoulder, polar(torsoLean + arm.shoulder, LEN.upperArm));
  const wrist = add(elbow, polar(torsoLean + arm.shoulder + arm.elbow, LEN.foreArm));

  const raw = { hip, knee, ankle, shoulder, head, elbow, wrist };
  const out = {};
  Object.keys(raw).forEach((k) => {
    const rp = rotateAroundOrigin(raw[k], bodyRotate);
    out[k] = { x: n(rp.x + CANVAS_HIP.x), y: n(rp.y + CANVAS_HIP.y) };
  });
  out.wristAngle = bodyRotate + torsoLean + arm.shoulder + arm.elbow;
  out.ankleAngle = bodyRotate + leg.hip + leg.knee;
  return out;
}

function bone(p1, p2, width, color) {
  return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" />`;
}

function drawFigure(fk, colors) {
  const c = colors;
  return `
    ${bone(fk.hip, fk.knee, 17, c.thigh)}
    ${bone(fk.knee, fk.ankle, 12, c.calf)}
    ${c.glutes ? `<ellipse cx="${fk.hip.x}" cy="${fk.hip.y}" rx="11" ry="10" fill="${HILITE}" />` : ""}
    ${bone(fk.hip, fk.shoulder, 34, c.torso)}
    <circle cx="${fk.head.x}" cy="${fk.head.y}" r="12" fill="${NEUTRAL}" stroke="${STROKE}" stroke-width="1.5" />
    <circle cx="${fk.shoulder.x}" cy="${fk.shoulder.y}" r="8" fill="${c.shoulder}" />
    ${bone(fk.shoulder, fk.elbow, 13, c.upperArm)}
    ${bone(fk.elbow, fk.wrist, 10, c.forearm)}
    <circle cx="${fk.wrist.x}" cy="${fk.wrist.y}" r="5.5" fill="${c.forearm}" />
  `;
}

function ghostFigure(fk, colors) {
  return `<g opacity="0.32" stroke-dasharray="3 4">${drawFigure(fk, colors)}</g>`;
}

// ---------- Equipment ----------
function dumbbell(pt, angle) {
  return `<g transform="translate(${pt.x} ${pt.y}) rotate(${n(angle)})">
    <rect x="-10" y="-2.5" width="20" height="5" rx="2" fill="${EQUIP}" />
    <rect x="-13" y="-6" width="5.5" height="12" rx="2" fill="${EQUIP}" />
    <rect x="7.5" y="-6" width="5.5" height="12" rx="2" fill="${EQUIP}" />
  </g>`;
}
function ezBar(pt, angle) {
  return `<g transform="translate(${pt.x} ${pt.y}) rotate(${n(angle)})">
    <path d="M-15,0 Q-7,-5 0,0 Q7,5 15,0" fill="none" stroke="${EQUIP}" stroke-width="3.5" stroke-linecap="round" />
    <rect x="-18" y="-3.5" width="5" height="7" rx="1.5" fill="${EQUIP}" />
    <rect x="13" y="-3.5" width="5" height="7" rx="1.5" fill="${EQUIP}" />
  </g>`;
}
function handle(pt, angle) {
  return `<g transform="translate(${pt.x} ${pt.y}) rotate(${n(angle)})">
    <rect x="-8" y="-2" width="16" height="4" rx="2" fill="${EQUIP}" />
  </g>`;
}
function cableTo(pulley, pt) {
  return `<line x1="${pulley.x}" y1="${pulley.y}" x2="${pt.x}" y2="${pt.y}" stroke="${EQUIP}" stroke-width="1.6" stroke-dasharray="2.5 3" />
          <circle cx="${pulley.x}" cy="${pulley.y}" r="4.5" fill="${EQUIP}" />`;
}
function seatBlock(hip) {
  return `<rect x="${hip.x - 20}" y="${hip.y - 3}" width="44" height="11" rx="4" fill="${PROP}" stroke="${STROKE}" />`;
}
function benchBlock(hip, angle) {
  return `<g transform="translate(${hip.x} ${hip.y}) rotate(${n(angle)})">
    <rect x="-24" y="15" width="96" height="13" rx="6" fill="${PROP}" stroke="${STROKE}" />
  </g>`;
}
function platformBlock(ankle) {
  return `<rect x="${ankle.x - 6}" y="${ankle.y + 8}" width="38" height="9" rx="3" fill="${PROP}" stroke="${STROKE}" />`;
}
function pad(pt) {
  return `<rect x="${pt.x - 9}" y="${pt.y - 4}" width="18" height="8" rx="3" fill="${EQUIP}" />`;
}
function plateStack(x, y) {
  return `<g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="24" height="5.5" fill="${EQUIP}" />
    <rect x="0" y="7.5" width="24" height="5.5" fill="${EQUIP}" />
    <rect x="0" y="15" width="24" height="5.5" fill="${EQUIP}" />
  </g>`;
}
function footplate(pt, angle) {
  return `<g transform="translate(${pt.x} ${pt.y}) rotate(${n(angle)})">
    <rect x="-6" y="-22" width="12" height="44" rx="4" fill="${PROP}" stroke="${STROKE}" />
  </g>`;
}
function machinePost(head) {
  return `<line x1="${head.x + 20}" y1="${head.y - 20}" x2="${head.x + 20}" y2="${head.y + 96}" stroke="${EQUIP}" stroke-width="3.5" stroke-linecap="round" />`;
}

const PULLEYS = {
  high: { x: 46, y: 8 },
  highBar: { x: 74, y: 4 },
  lowBehind: { x: 30, y: 150 },
  lowFront: { x: 150, y: 214 },
};

// ---------- Pose library ----------
// Angle convention: 0 = hanging/pointing straight down, positive rotates
// forward. `torsoLean` tilts the torso (and everything attached to it —
// head + arms) forward/back around the hip. `bodyRotate` rotates the
// whole figure (used to depict lying on a bench, or prone machines).
function normPose(p) {
  return {
    bodyRotate: p.bodyRotate || 0,
    torsoLeanStart: p.torsoLeanStart ?? p.torsoLean ?? 0,
    torsoLeanEnd: p.torsoLeanEnd ?? p.torsoLean ?? 0,
    legStart: p.legStart || p.leg,
    legEnd: p.legEnd || p.leg,
    armStart: p.armStart || p.arm,
    armEnd: p.armEnd || p.arm,
    seat: !!p.seat,
    bench: !!p.bench,
    platform: !!p.platform,
    shinPad: !!p.shinPad,
    kneePad: !!p.kneePad,
    plateStack: !!p.plateStack,
    footplate: !!p.footplate,
    machinePost: !!p.machinePost,
    cable: p.cable || null,
    handPosition: p.handPosition || "wrist",
  };
}

const POSES = {
  seatedOverheadPress: normPose({
    leg: { hip: 90, knee: -90 },
    armStart: { shoulder: 75, elbow: 95 },
    armEnd: { shoulder: 168, elbow: 15 },
    seat: true,
  }),
  standingLateralRaise: normPose({
    leg: { hip: 0, knee: 0 },
    armStart: { shoulder: 6, elbow: 8 },
    armEnd: { shoulder: 86, elbow: 10 },
  }),
  inclinePress: normPose({
    bodyRotate: -58,
    leg: { hip: 0, knee: 0 },
    armStart: { shoulder: 96, elbow: 96 },
    armEnd: { shoulder: 96, elbow: 8 },
    bench: true,
  }),
  inclineFly: normPose({
    bodyRotate: -58,
    leg: { hip: 0, knee: 0 },
    armStart: { shoulder: 42, elbow: 16 },
    armEnd: { shoulder: 94, elbow: 18 },
    bench: true,
  }),
  cablePushdown: normPose({
    leg: { hip: 0, knee: 0 },
    armStart: { shoulder: 16, elbow: 96 },
    armEnd: { shoulder: 16, elbow: 6 },
    cable: "high",
  }),
  overheadTricepExt: normPose({
    leg: { hip: 0, knee: 0 },
    armStart: { shoulder: 152, elbow: 100 },
    armEnd: { shoulder: 152, elbow: 14 },
    cable: "lowBehind",
  }),
  seatedCalfRaise: normPose({
    leg: { hip: 90, knee: -90 },
    arm: { shoulder: 10, elbow: 10 },
    seat: true,
    kneePad: true,
  }),
  standingCalfRaise: normPose({
    leg: { hip: 0, knee: 0 },
    arm: { shoulder: 8, elbow: 8 },
    platform: true,
  }),
  bentOverRow: normPose({
    torsoLean: -55,
    leg: { hip: 0, knee: 14 },
    armStart: { shoulder: 62, elbow: 10 },
    armEnd: { shoulder: -55, elbow: 95 },
  }),
  latPulldown: normPose({
    leg: { hip: 90, knee: -90 },
    armStart: { shoulder: 172, elbow: 78 },
    armEnd: { shoulder: 55, elbow: 78 },
    seat: true,
    cable: "highBar",
  }),
  seatedCableRow: normPose({
    leg: { hip: 70, knee: -20 },
    armStart: { shoulder: 60, elbow: 88 },
    armEnd: { shoulder: -28, elbow: 88 },
    seat: true,
    cable: "lowFront",
  }),
  rearDeltFly: normPose({
    torsoLean: -55,
    leg: { hip: 0, knee: 14 },
    armStart: { shoulder: 14, elbow: 16 },
    armEnd: { shoulder: 92, elbow: 16 },
  }),
  bicepCurl: normPose({
    leg: { hip: 0, knee: 0 },
    armStart: { shoulder: 10, elbow: 168 },
    armEnd: { shoulder: 10, elbow: 22 },
  }),
  standingShrug: normPose({
    leg: { hip: 0, knee: 0 },
    armStart: { shoulder: 8, elbow: 8 },
    armEnd: { shoulder: 8, elbow: 8 },
  }),
  legPress: normPose({
    bodyRotate: -25,
    legStart: { hip: 95, knee: -108 },
    legEnd: { hip: 58, knee: -18 },
    arm: { shoulder: 10, elbow: 10 },
    seat: true,
    footplate: true,
  }),
  gobletSquat: normPose({
    torsoLean: -8,
    legStart: { hip: 0, knee: 0 },
    legEnd: { hip: 55, knee: -100 },
    arm: { shoulder: 92, elbow: 148 },
    handPosition: "chest",
  }),
  legExtension: normPose({
    legStart: { hip: 90, knee: -90 },
    legEnd: { hip: 90, knee: 0 },
    arm: { shoulder: 10, elbow: 10 },
    seat: true,
    shinPad: true,
  }),
  hamstringCurlProne: normPose({
    bodyRotate: 88,
    legStart: { hip: 0, knee: 0 },
    legEnd: { hip: 0, knee: -112 },
    arm: { shoulder: 25, elbow: 25 },
    bench: true,
    shinPad: true,
  }),
  romanianDeadlift: normPose({
    torsoLeanStart: 0,
    torsoLeanEnd: -62,
    leg: { hip: 0, knee: 14 },
    arm: { shoulder: 8, elbow: 4 },
  }),
};

function equipDraw(kind, fkStart, fkEnd, pose) {
  const handAt =
    pose.handPosition === "chest" ? { x: fkEnd.shoulder.x, y: fkEnd.shoulder.y + 20 } : fkEnd.wrist;
  const angleAt = pose.handPosition === "chest" ? 0 : fkEnd.wristAngle;
  switch (kind) {
    case "dumbbellPair":
    case "dumbbellSingle":
      return dumbbell(handAt, angleAt);
    case "ezBar":
      return ezBar(handAt, angleAt);
    case "cableHigh":
      return cableTo(PULLEYS.high, fkEnd.wrist) + handle(fkEnd.wrist, fkEnd.wristAngle);
    case "cableHighBar":
      return cableTo(PULLEYS.highBar, fkEnd.wrist) + handle(fkEnd.wrist, fkEnd.wristAngle);
    case "cableLowBehind":
      return cableTo(PULLEYS.lowBehind, fkEnd.wrist) + handle(fkEnd.wrist, fkEnd.wristAngle);
    case "cableLowFront":
      return cableTo(PULLEYS.lowFront, fkEnd.wrist) + handle(fkEnd.wrist, fkEnd.wristAngle);
    case "machinePost":
      return machinePost(fkEnd.head) + handle(fkEnd.wrist, fkEnd.wristAngle);
    default:
      return "";
  }
}

function highlightColors(hi) {
  hi = hi || {};
  return {
    torso: hi.torso ? HILITE : NEUTRAL,
    shoulder: hi.shoulders ? HILITE : NEUTRAL,
    upperArm: hi.upperArm ? HILITE : NEUTRAL,
    forearm: hi.forearm ? HILITE : NEUTRAL,
    thigh: hi.thigh ? HILITE : NEUTRAL,
    calf: hi.calf ? HILITE : NEUTRAL,
    glutes: !!hi.glutes,
  };
}

function muscleMapSvg(thumb) {
  if (!thumb || !POSES[thumb.pose]) return "";
  const pose = POSES[thumb.pose];
  const colors = highlightColors(thumb.highlight);

  const fkStart = computeFK({
    bodyRotate: pose.bodyRotate,
    torsoLean: pose.torsoLeanStart,
    arm: pose.armStart,
    leg: pose.legStart,
  });
  const fkEnd = computeFK({
    bodyRotate: pose.bodyRotate,
    torsoLean: pose.torsoLeanEnd,
    arm: pose.armEnd,
    leg: pose.legEnd,
  });

  const movesAtAll =
    JSON.stringify(pose.armStart) !== JSON.stringify(pose.armEnd) ||
    JSON.stringify(pose.legStart) !== JSON.stringify(pose.legEnd) ||
    pose.torsoLeanStart !== pose.torsoLeanEnd;

  let props = "";
  if (pose.bench) props += benchBlock(fkStart.hip, pose.bodyRotate);
  if (pose.seat) props += seatBlock(fkStart.hip);
  if (pose.platform) props += platformBlock(fkEnd.ankle);
  if (pose.footplate) props += footplate(fkEnd.ankle, pose.bodyRotate + pose.legEnd.hip + pose.legEnd.knee);
  if (pose.shinPad) props += pad(fkEnd.ankle);
  if (pose.kneePad) props += pad(fkStart.knee);

  const equip = thumb.equip ? equipDraw(thumb.equip, fkStart, fkEnd, pose) : "";

  return `
    <svg viewBox="0 0 160 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${(thumb.targets || "").replace(/"/g, "")}">
      ${props}
      ${movesAtAll ? ghostFigure(fkStart, colors) : ""}
      ${drawFigure(fkEnd, colors)}
      ${equip}
    </svg>
  `;
}
