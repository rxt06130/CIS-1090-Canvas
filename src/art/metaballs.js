import { makeNoise3D } from "fast-simplex-noise";
import { hsl, gray } from "../color.js";

let n = makeNoise3D();
let num = 5;
let bx;
let by;
let lastT;

function balls(x, y, t) {
    x = (x-.5)*3;
    y = (y-.5)*3;

    if ( t != lastT ){
         bx = new Array(num).fill().map( (x,i) => n(i,0,t/(i+1) ));
        by = new Array(num).fill().map( (x,i) => n(10,i,t/(i+1) ));
        lastT = t;
    }

    let s = 0;
    for ( let i = 0; i < num; i++ ){
        let dx = x - bx[i];
        let dy = y - by[i];
        let d = Math.sqrt( dx*dx + dy*dy );
        d = Math.max(0, 1-d);
        d = Math.pow(d, 3);
        s = s + d;
    }

    if ( s > .8 )
        return gray(1);
    return gray(0);
}

function empty(){}

export {
    balls as shade,
    empty as draw
}