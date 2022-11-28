import { makeNoise3D } from "fast-simplex-noise";
import { hsl, gray, mix } from "../color.js";

let n = makeNoise3D();

function shade(x, y, t) {

    //Total mess, make some animated water with sin and noise.
    let w = hsl(.66, 1, .3 + .15 * (Math.sin((t / 3 - 2 * y + n(x * 3, 0, t / 10) / 20) * 20) + 1));
    
    //Make a sky color
    let s = hsl(y / 2 - .4, 1, .3);
    if (y > .65) {
        s = hsl((.6 - y) / 2 - .2, 1, .3);
        if (Math.pow(1 - Math.abs(.39 - x) + (y - .2) * .1, 5) > .9) {
            s = hsl(.15, 1, .7);
        }
    }

    if (y < .65){
        //Above the horizon only return sky
        return s;
    }

    //Under the horizon use y and noise to blend sky and water
    let f = 3 * Math.pow(y, 3) * Math.abs(n(x, 20 * y, t / 10));
    return mix(s, w, f * f);
}

//Draw the simple yellow circle sun
function draw(ctx, t) {
    ctx.beginPath();
    ctx.arc(100, 145, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
}

export default { name: "Sunset", shade, draw }