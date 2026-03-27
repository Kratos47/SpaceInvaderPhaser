/**
 * @file SpriteBase.js
 * @description Abstract base class for all game sprites (GameSprite, BoxSprite, etc.).
 */

import { DLink } from "../Manager/DLink.js";

export class SpriteBase extends DLink {
    constructor() {
        super();
        this.x = 0.0;
        this.y = 0.0;
        this.sx = 1.0;
        this.sy = 1.0;
        this.angle = 0.0;
    }

    Update() {
        throw new Error("Update() must be overridden in derived class");
    }

    Render() {
        throw new Error("Render() must be overridden in derived class");
    }
}