/**
 * @file Texture.js
 * @description Represents a base texture loaded into the Phaser engine.
 */

import { DLink } from "../Manager/DLink.js";
import { activeScene } from '../Globals.js';

export class Texture extends DLink {
    static Name = Object.freeze({
        Default: "Default",
        Birds: "Birds",
        PacMan: "PacMan",
        Aliens: "Aliens",
        Stitch: "Stitch",
        Uninitialized: "Uninitialized"
    });

    static psDefaultPhaserTexture = "DefaultTex";

    constructor() {
        super();
        this.poPhaserTexture = Texture.psDefaultPhaserTexture;
        this.name = Texture.Name.Default;
    }

    Set(name, textureName) {
        this.name = name;
        this.poPhaserTexture = activeScene.load.image(name, textureName);
        console.assert(this.poPhaserTexture !== null, "Failed to load Phaser texture");
    }

    privClear() {
        this.poPhaserTexture = null;
        this.name = Texture.Name.Uninitialized;
    }

    Wash() {
        this.privClear();
    }
}