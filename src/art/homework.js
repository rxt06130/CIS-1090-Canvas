import { makeNoise3D } from "fast-simplex-noise";
import { hsl, gray } from "../color.js";

let n = makeNoise3D();

/**
 * I call this shade function once for every pixel in the image, and 
 * set the color equal to whatever you return.
 * 
 * I call it 30 times a second so you can animate things
 * 
 * @param x - The x position in the image, from 0 (left) to 1 (right)
 * @param y - The y position in the image, from 0 (top) to 1 (bottom)
 * @param t - The time passed, in seconds
 * @returns The RGB color to display at the x,y location at time t
 */
function shade(x, y, t) {
  return [0,0,y];
    // return [
     //   Math.sin(t*10 + 20*x),
       // Math.cos(t*10 + 20*y),
        //0];
}

/**
 * I call this draw function 30 times per second.
 * @param ctx - The 2d drawing context
 * @param t -The time in seconds
 */
function draw(ctx, t) {
    //See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#F0E68C';
    ctx.beginPath(130, 135);
ctx.moveTo(130, 40);
ctx.lineTo(40, 40);
ctx.lineTo(110, 120);
ctx.lineTo(80,10);
ctx.lineTo(30, 115);
ctx.closePath();
ctx.stroke();


ctx.beginPath(230, 240);
ctx.moveTo(230, 140);
ctx.lineTo(140, 140);
ctx.lineTo(210, 220);
ctx.lineTo(180,110);
ctx.lineTo(130, 215);
ctx.closePath();
ctx.stroke();
 {
    ctx.beginPath();
    ctx.arc(200, 45, 20, 10, 100 * Math.PI);
    ctx.fillStyle = '#FFFACD';
    ctx.fill();
}


    //❓❓ Question 5
    //❓❓ Question 6
   //ctx.strokeRect(75, 100, 150 + 10 * Math.sin(t), 100 + 10 * Math.cos(t)); 
}

export default { name: "My Homework", shade, draw }

