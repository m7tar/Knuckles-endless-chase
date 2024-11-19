import k from "./kaPlayCtx"
import mainMenu from "./scenes/mainMenu";
import game from "./scenes/game"
import gameover from "./scenes/gameover"
import disclaimer from "./scenes/disclaimer"


k.loadSprite("chemical-bg", "graphics/saloon-bg2.png");
k.loadSprite("platforms", "graphics/platforms.png");
k.loadSprite("knuckles", "graphics/knuckles.png", {
    sliceX: 8,
    sliceY: 3,
    anims:{
        run:{from: 0, to: 7, loop:true, speed: 30 },
        jump: {from: 8, to: 15, loop:true, speed: 100 },
        glide: {from: 16, to: 18, loop:true, speed: 30 },
    }
});
k.loadSprite("ring", "graphics/ring.png", {
    sliceX: 16,
    sliceY: 1,
    anims: {
      spin: { from: 0, to: 15, loop: true, speed: 30 },
    },
  });
  k.loadSprite("motobug", "graphics/motobug.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
      run: { from: 0, to: 4, loop: true, speed: 8 },
    },
  });

//fonts
k.loadFont("mania", "fonts/mania.ttf") //ghayer

//sounds
k.loadFont("mania", "fonts/mania.ttf");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("city", "sounds/city.mp3");

k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("gameover", gameover);
k.scene("disclaimer", disclaimer);

k.go("main-menu");