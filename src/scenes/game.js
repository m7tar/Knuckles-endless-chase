import k from "../kaPlayCtx";
import updateBackgroundAndPlatforms,{ initializeBackground, initializePlatforms } from "./enviroment";
import { makeKnuckles } from "../entities/Knuckles";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";
import { makeTurboT } from "../entities/turboT";

export default function game() {
  k.setGravity(3100);
  const citySfx = k.play("city", { volume: 0.2, loop: true });

  const bgPieceWidth = 768;
  const bgPieces = initializeBackground(bgPieceWidth);

  const platformWidth = 1280;
  const platforms = initializePlatforms(platformWidth, -40);


  let score = 0;
  let scoreMultiplier = 0;

  const scoreText = k.add([
    k.text("SCORE : 0", { font: "mania", size: 72}),
    k.pos(20,20)
  ])


  const knuckles = makeKnuckles(k.vec2(200, 745));
  knuckles.setControls();
  knuckles.setEvents();
  knuckles.glide();

  knuckles.onCollide("enemy", (enemy) => {
    if (!knuckles.isGrounded()){
        k.play("destroy", {volume: 0.5});
        k.play("hyper-ring", {volume: 0.5});
        k.destroy(enemy);
        knuckles.play("jump", {volume: 0.2});
        knuckles.jump();
        scoreMultiplier += 1;

        score += 10 * scoreMultiplier;
        scoreText.text = `SCORE : ${score}`
        if (scoreMultiplier === 1)
          knuckles.ringCollectUI.text = `+${10 * scoreMultiplier}`;
        if (scoreMultiplier > 1) knuckles.ringCollectUI.text = `x${scoreMultiplier}`;
        k.wait(1, () => {
          knuckles.ringCollectUI.text = "";
        });
        return;
    }
    else if (knuckles.isGrounded()){
        k.play("hurt", {volume: 0.2});
        k.setData("current-score", score)
        k.go("gameover", {citySfx});
    }
  })
  knuckles.onCollide("enemy2", (enemy) => {
    if (!knuckles.isGrounded()){
      k.play("hurt", {volume: 0.2});
      k.setData("current-score", score)
      k.go("gameover", {citySfx});
        return;
    }
    //else if (knuckles.isGrounded()){
    //    TODO
    //}
  })
  knuckles.onCollide("ring", (ring) => {
    k.play("ring", {volume: 0.5});
    k.destroy(ring)
    score++;
    scoreText.text = `SCORE : ${score}`
    knuckles.ringCollectUI.text = "+1";
    k.wait(1, () => {
      knuckles.ringCollectUI.text = "";
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

  const spawnTurboT = () => {
    const turboT = makeTurboT(k.vec2(2500, 740));

    turboT.onUpdate(() => {
      if (gameSpeed < 3000) {
        turboT.move(-(gameSpeed + 300), 0);
        return;
      }
      turboT.move(-gameSpeed, 0);
    });
    turboT.onExitScreen(() => {
      if (turboT.pos.x < 0) k.destroy(turboT);
    });
    
    const waitTime = k.rand(2, 3.0);
    k.wait(waitTime, spawnTurboT);
  };
  
  spawnTurboT();
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
    if (knuckles.isGrounded()) scoreMultiplier = 0;
    updateBackgroundAndPlatforms(bgPieces, platforms, bgPieceWidth, platformWidth, gameSpeed);
  });
}
