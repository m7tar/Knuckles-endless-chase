import k from "../kaPlayCtx"

export function makeEggman(pos) {
    return k.add([
        k.sprite("eggman", {anim: "fly"}),
        k.area({ shape: new k.Rect(k.vec2(0,0), 32, 32) }),
        k.scale(4),
        k.opacity(0.9),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),
        "enemy",
    ]);
}