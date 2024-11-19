import k from "../kaPlayCtx";
import { makeKnuckles } from "../entities/Knuckles";
import initGame from "./enviroment";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";

export default function game() {
  k.setGravity(3100);
  const citySfx = k.play("city", { volume: 0.2, loop: true });

  const bgPieceWidth = 768;
  const bgPieces = [
      k.add([k.sprite("chemical-bg"), k.pos(0,0), k.scale(3), k.opacity(0.8)]), //this creates a game object with the specified sprite 
      k.add([k.sprite("chemical-bg"), k.pos(bgPieceWidth * 2), k.scale(3), k.opacity(0.8)])
  ];

  const platformWidth = 1280;
  const platforms = [
      k.add([k.sprite("platforms"), k.pos(0, 250), k.scale(2)]),
      k.add([k.sprite("platforms"), k.pos(platformWidth * 2, 250), k.scale(2)]),
  ];


  let score = 0;
  let scoreMultiplier = 0;

  const scoreText = k.add([
    k.text("SCORE : 0", { font: "mania", size: 72}),
    k.pos(20,20)
  ])


  const sonic = makeKnuckles(k.vec2(200, 745));
  sonic.setControls();
  sonic.setEvents();
  sonic.glide();

  sonic.onCollide("enemy", (enemy) => {
    if (!sonic.isGrounded()){
        k.play("destroy", {volume: 0.5});
        k.play("hyper-ring", {volume: 0.5});
        k.destroy(enemy);
        sonic.play("jump", {volume: 0.2});
        sonic.jump();
        scoreMultiplier += 1;

        score += 10 * scoreMultiplier;
        scoreText.text = `SCORE : ${score}`
        if (scoreMultiplier === 1)
          sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`;
        if (scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
        k.wait(1, () => {
          sonic.ringCollectUI.text = "";
        });
        return;
    }
    else if (sonic.isGrounded()){
        k.play("hurt", {volume: 0.2});
        k.setData("current-score", score)
        k.go("gameover", {citySfx});
    }
  })
  sonic.onCollide("ring", (ring) => {
    k.play("ring", {volume: 0.5});
    k.destroy(ring)
    score++;
    scoreText.text = `SCORE : ${score}`
    sonic.ringCollectUI.text = "+1";
    k.wait(1, () => {
      sonic.ringCollectUI.text = "";
    });
    
  })

  let gameSpeed = 300;
  k.loop(1, () => {
    if (gameSpeed < 3000){
      gameSpeed += 20;
    }
    
  });

  const spawnMotoBug = () => {
    const motobug = makeMotobug(k.vec2(1950, 773));
    motobug.onUpdate(() => {
      if (gameSpeed < 3000) {
        motobug.move(-(gameSpeed + 300), 0);
        return;
      }
      motobug.move(-gameSpeed, 0);
    });

    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) k.destroy(motobug);
    });

    const waitTime = k.rand(1.0, 2.0);

    k.wait(waitTime, spawnMotoBug);
  };
  spawnMotoBug();


  const spawnRing = () => {
    const ring = makeRing(k.vec2(1950, 745));
    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) k.destroy(ring);
    })
    const waitTime = k.rand(0.5, 5);
    k.wait(waitTime, spawnRing);
  }
  spawnRing();


  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
    "platform",
  ]);

  k.onUpdate(() => {
    if (sonic.isGrounded()) scoreMultiplier = 0;
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }

    if (bgPieces[1].pos.x < 0){
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 3, 0);
      bgPieces.push(bgPieces.shift());
  };
  
  bgPieces[0].move(-100, 0)
  bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 3, 0)
  
  if (platforms[1].pos.x < 0){
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 2, 250);
      platforms.push(platforms.shift());
  };

  platforms[0].move(-gameSpeed, 0)
  platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 2, 250)
  });
}