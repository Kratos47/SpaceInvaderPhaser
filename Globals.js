/**
 * @file Globals.js
 * @description Global state and utility functions for the Space Invaders engine.
 */

export let activeScene = null;

/**
 * Sets the active Phaser scene reference globally.
 * @param {Phaser.Scene} scene - The main game scene.
 */
export const setActiveScene = (scene) => {
    activeScene = scene;
};

/**
 * Converts normalized RGB values (0.0 - 1.0) to a Hexadecimal color integer.
 * @param {number|Object} r - Red value or an object {r, g, b}
 * @param {number} [g] - Green value (if r is a number)
 * @param {number} [b] - Blue value (if r is a number)
 * @returns {number} The hex color integer (e.g., 0xFF0000)
 */
export function denormalizeToHex(r, g, b) {
    if (typeof r === 'object') {
        const color = r;
        r = color.r || 0;
        g = color.g || 0;
        b = color.b || 0;
    }

    const R = Math.round(r * 255) << 16;
    const G = Math.round(g * 255) << 8;
    const B = Math.round(b * 255);

    return (R | G | B) >>> 0; 
}