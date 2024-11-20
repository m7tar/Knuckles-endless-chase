import k from "../kaPlayCtx"
export function makeKnuckles(pos) {
    let canGlide= true;
    const knuckles = k.add([
        k.sprite("knuckles", {anim: "run"}),
        k.scale(4),
        k.area({shape: new k.Rect(k.vec2(0,9), 28, 32)}), //hitbox
        k.anchor("center"), //change where the charachter is drawn
        k.pos(pos),
        k.body({ jumpForce: 1500, gravityScale: 1 }),
    {
        ringCollectUI: null,

        setControls() {
            k.onButtonPress("jump", () => {
              if (this.isGrounded()) {
                this.play("jump");
                this.jump();
                k.play("jump", { volume: 0.2 });
              }
            });
          },
          setEvents() {
            this.onGround(() => {
              this.play("run");
              canGlide = true;
              this.gravityScale = 1;
            });
          },
          
          // gliding in the air move
          glide() {
            k.onButtonDown ("jump", () => {
              if (this.isFalling() && canGlide == true) {
                //console.log("gliding")
                this.play("glide");
                this.gravityScale = 0.2;
                canGlide = false;
                this.onCollide(("enemy"), (enemy) => {
                  this.gravityScale = 1;
                })
              }
            })
            k.onButtonRelease ("jump", () => {
              if (this.isFalling()) {
                //console.log("falling")
                this.play("jump");
                this.gravityScale = 1;
                }
            });
          },
        },
        
    ]);

    knuckles.ringCollectUI = knuckles.add([
      k.text("", { font: "mania", size: 24 }),
      k.color(255, 255, 0),
      k.anchor("center"),
      k.pos(30, -10),
    ]);

    return knuckles;
}