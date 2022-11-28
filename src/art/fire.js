import { makeNoise3D } from "fast-simplex-noise";
import { hsl, gray } from "../color.js";

let n = makeNoise3D();

function shade(x, y, t) {
    let v = n(x * 3, y * 3, t) * .25 + n(x, y, t / 2) * .75;
    return hsl(Math.abs(v / 6), 1, v + Math.pow(y, 5));
}

function draw(ctx, t) {
    function circle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
    }
    //All lines 2px wide and black
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    //Head
    circle(100, 100, 20);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();
    //Mouth
    ctx.beginPath();
    ctx.arc(100, 95, 15, .25 * Math.PI, .75 * Math.PI);
    ctx.stroke();
    //Eyes...
    ctx.fillStyle = 'black';
    //Left
    circle(92, 94, 2);
    ctx.fill();
    //Right
    circle(108, 94, 2);
    ctx.fill();
}

export default { name: "Everything is Fine", shade, draw }