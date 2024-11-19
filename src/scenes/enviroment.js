import k from "../kaPlayCtx";
// commonElements.js
const bgScale = 3;
const platformScale = 3;

export function initializeBackground(bgPieceWidth = 768) {
  return [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(bgScale), k.opacity(0.8)]),
    k.add([k.sprite("chemical-bg"), k.pos(bgPieceWidth * 2, 0), k.scale(bgScale), k.opacity(0.8)]),
  ];
}

export function initializePlatforms(platformWidth = 1280, yPosition = 250) {
  return [
    k.add([k.sprite("platforms"), k.pos(0, yPosition), k.scale(platformScale)]),
    k.add([k.sprite("platforms"), k.pos(platformWidth * 2, yPosition), k.scale(platformScale)]),
  ];
}

export default function updateBackgroundAndPlatforms(bgPieces, platforms, bgPieceWidth, platformWidth, gameSpeed) {
  // Update background
  if (bgPieces[1].pos.x < 0) {
    bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * bgScale, 0);
    bgPieces.push(bgPieces.shift());
  }
  bgPieces[0].move(-100, 0);
  bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * bgScale, 0);

  // Update platforms
  if (platforms[1].pos.x < 0) {
    platforms[0].moveTo(platforms[1].pos.x + platformWidth * 2, platforms[0].pos.y);
    platforms.push(platforms.shift());
  }
  platforms[0].move(-gameSpeed, 0);
  platforms[1].moveTo(platforms[0].pos.x + platformWidth * 3, platforms[0].pos.y);
}
