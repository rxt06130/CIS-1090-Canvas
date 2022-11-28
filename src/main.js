import meta from "./art/metaballs.js";
import fire from "./art/fire.js";
import fractal from "./art/fractal.js";
import sunset from "./art/sunset.js";

let choices = [
    meta,
    fire,
    fractal,
    sunset
];
let current = choices[0];

let select = document.querySelector("#select");
choices.forEach( (c,i) => {
    select.appendChild(new Option(c.name, i, i) );
});
select.addEventListener('change', e => {
    current = choices[select.value];
});

let size = 256;
let app = document.querySelector("#app");
let c = document.querySelector("#canvas");

var ctx = c.getContext("2d");
let d = ctx.createImageData(size, size);

let start = new Date().getTime();
function frame() {
    let now = new Date().getTime();
    let t = now - start;
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            let c = current.shade(x / size, y / size, t / 1000);
            let i = 4 * (size * y + x);
            d.data[i + 0] = c[0] * 255; //R
            d.data[i + 1] = c[1] * 255; //G
            d.data[i + 2] = c[2] * 255; //B
            d.data[i + 3] = 255;        //A
        }
    }
    ctx.putImageData(d, 0, 0);
    current.draw(ctx, t);
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);