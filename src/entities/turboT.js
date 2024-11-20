import k from "../kaPlayCtx"

export function makeTurboT(pos) {
    return k.add([
        k.sprite("turboT", {anim: "run"}),
        k.area({shape: new k.Rect(k.vec2(0,0), 28, 30)}),
        k.scale(4),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),
        "enemy2",
    ]);
}