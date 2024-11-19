import kaplay from "kaplay";
import mainMenu from "./scenes/mainMenu";

const k = kaplay({  //init canvas
    width: 1920,
    height: 1080,
    letterbox: true, //keeps aspect ration
    background: [0,0,0], //background color
    global: false,
    touchToMouse: true, //for mobile
    buttons: {
        jump: {
            keyboard: ["space","w", "up"],
            mouse: "left"
        },
        groundSpin: {
            keyboard: ["ctrl", "s", "down"],
            mouse: "left",
        }
    },
    debugKey: "0",
    debug: true,
});

export default k;