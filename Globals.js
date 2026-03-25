export let activeScene = null;
export const setActiveScene = (scene) => activeScene = scene;

export function denormalizeToHex(r, g, b) {
    // If 'r' is an object {r, g, b}, extract the values
    if (typeof r === 'object') {
        const color = r;
        r = color.r || 0;
        g = color.g || 0;
        b = color.b || 0;
    }

    const R = Math.round(r * 255) << 16;
    const G = Math.round(g * 255) << 8;
    const B = Math.round(b * 255);

    return (R | G | B) >>> 0; // Use unsigned right shift to ensure a positive integer
}
