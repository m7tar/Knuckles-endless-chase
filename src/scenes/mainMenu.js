import { makeKnuckles } from "../entities/Knuckles";
import k from "../kaPlayCtx"

export default function mainMenu() {
    if (!k.getData("best-score")) k.setData("best-score", 0);
    k.onButtonPress("jump", () => k.go("game"));

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
    k.add([ //text displaying game name
        k.text("Knuckles'\nendless\nchase\n\n", {font: "mania", size: 96, align: "center"}),
        k.anchor("center"),
        k.pos(k.center().x,k.center().y - 200 ),
    ])
    k.add([
        k.text("Press Space/Click/Touch to Play", { font: "mania", size: 32 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 100),
    ]);
    
    makeKnuckles(k.vec2(200,745));
    k.onUpdate(() => {
        if (bgPieces[1].pos.x < 0){
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 3, 0);
            bgPieces.push(bgPieces.shift());
        };
        
        bgPieces[0].move(-100, 0)
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 3, 0)
        
        if (platforms[1].pos.x < 0){
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * 2, 250);
            platforms.push(platforms.shift());
        };

        platforms[0].move(-300, 0)
        platforms[1].moveTo(platforms[0].pos.x + platformWidth * 2, 250)

    })
}