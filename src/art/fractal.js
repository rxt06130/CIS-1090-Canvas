import Complex from "complex";
import { hsl, gray } from "../color.js";

//If you are into math, this is the Mandelbrot fractal.
function shade(x, y, t) {
    //Re-scale x and y so we are centered on 0,0 and zoomed out
    x = (x - .7) * 3;
    y = (y - .5) * 3;

    //Google mandelbrot set if you are curious
    let c = new Complex(x, y);
    let z = new Complex(x, y);
    let i;
    for (i = 0; i < 40; i++) {
        z = z.pow(2).add(c);
        if (z.abs() > 60) {
            return hsl(t + i / 70, 1, i / 50);
        }
    }
    return [0, 0, 0];
}

function draw(){
    //Nothing to do here
}

export default { name: "Mandelbrot", shade, draw }