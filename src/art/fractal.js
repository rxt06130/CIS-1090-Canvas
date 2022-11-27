import Complex from "complex";
import { hsl, gray } from "../color.js";

function mandlebrot(x, y, t) {
    x = (x - .7) * 3;
    y = (y - .5) * 3;
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

function empty(){

}

export {
    mandlebrot as shade,
    empty as draw
}