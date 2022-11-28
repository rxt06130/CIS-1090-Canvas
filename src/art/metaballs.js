import { makeNoise3D } from "fast-simplex-noise";
import { hsl, gray } from "../color.js";

let n = makeNoise3D();
let num = 5;
let bx;
let by;
let lastT;

function shade(x, y, t) {
    //Re-scale x and y so we are centered on 0,0 and zoomed out
    x = (x - .5) * 3;
    y = (y - .5) * 3;

    //Every time t changes update the positions of the balls.
    //The if statement is for performance only, we could compute
    //ball position for every pixel
    if (t != lastT) {
        bx = new Array(num).fill().map((x, i) => n(i, 0, t / (i + 1)));
        by = new Array(num).fill().map((x, i) => n(10, i, t / (i + 1)));
        lastT = t;
    }

    let sum = 0; //A place to sum the distance values

    //For each ball...
    for (let i = 0; i < num; i++) {
        //Compute the distance from this pixel to the ball
        let dx = x - bx[i];
        let dy = y - by[i];
        let d = Math.sqrt(dx * dx + dy * dy);

        //Invert it and clamp it positive
        d = Math.max(0, 1 - d);

        //Make the dropoff sharper
        d = Math.pow(d, 3);

        //Add it to the sum
        sum = sum + d;
    }

    //If the sum is high return a light gray based
    //on the sum
    if (sum > .8)
        return hsl(.55, 1, sum/2+.3);

    //Otherwise black
    return gray(0);
}

function draw() {
    //do nothing
}

export default { name: "Metaballs", shade, draw }