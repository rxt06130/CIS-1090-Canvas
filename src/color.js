//Clamp n between 0 and 1
function clamp(n) {
    return Math.max(0, Math.min(1, n));
}

function mix(a, b, f = .5) {
    f = clamp(f);
    return [
        a[0] * (1 - f) + b[0] * f,
        a[1] * (1 - f) + b[1] * f,
        a[2] * (1 - f) + b[2] * f,
    ]
}

/**
 * Provides an rgb gray color
 *  
 * @param {number} n 
 * @returns A grayscale between black (n=0) and white (n=1)
 */
function gray(n) {
    n = clamp(n);
    return [n, n, n];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hsl(h, s, l) {
    var r, g, b;

    h = h % 1;
    s = clamp(s);
    l = clamp(l);

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r, g, b];
}

export { hsl, gray, mix };