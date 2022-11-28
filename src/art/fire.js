import { makeNoise3D } from "fast-simplex-noise";
import { hsl, gray } from "../color.js";

//This is a source of "Noise" or random-ish values
//See https://en.wikipedia.org/wiki/Simplex_noise
//I use 3d noise so I can animate the fire, x, y, time.
let n = makeNoise3D();

//Draw sone fire 🔥
function shade(x, y, t) {

    //Compute a fire brightness for the pixel
    let v = 0;
    //75% low frequency noise
    v = v + n(x, y, t / 2) * .75;
    //25% higher frequency noise
    v = v + n(x * 3, y * 3, t) * .25;
    
    //HSL is another way to represent colors...
    return hsl(
        Math.abs(v / 6),    //Hue, lower values are red-ish
        1,                  //Saturation - very red
        v + Math.pow(y, 5)  //Lightness - how bright
    );
}

//This function just draws a smily face 😊
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