import updateBackgroundAndPlatforms,{ initializeBackground, initializePlatforms } from "./enviroment";
import { makeKnuckles } from "../entities/Knuckles";
import k from "../kaPlayCtx"

export default function mainMenu() {
    if (!k.getData("best-score")) k.setData("best-score", 0);
    k.onButtonPress("jump", () => k.go("game"));

    const bgPieceWidth = 768;
    const bgPieces = initializeBackground(bgPieceWidth);

    const platformWidth = 1280;
    const platforms = initializePlatforms(platformWidth, -30);

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
        updateBackgroundAndPlatforms(bgPieces, platforms, bgPieceWidth, platformWidth, 300);
    })
}