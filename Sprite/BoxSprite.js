/**
 * @file BoxSprite.js
 * @description Represents an un-filled graphical rectangle, primarily used for collision boxes.
 */

import { SpriteBase } from "./SpriteBase.js";
import { activeScene, denormalizeToHex } from "../Globals.js";

export class BoxSprite extends SpriteBase {
    static Name = Object.freeze({
        Box1: "Box1",
        Box2: "Box2",
        Uninitialized: "Uninitialized"
    });

    constructor() {
        super();
        this.name = BoxSprite.Name.Uninitialized;
        this.poLineColor = denormalizeToHex(1, 1, 1);

        this.poBoxSprite = activeScene.make.graphics({ add: false });
        console.assert(this.poBoxSprite !== null, "Phaser Graphics creation failed");
    }

    Set(name, x, y, width, height, pLineColor = null, lineWidth = 2, Alpha = 1) {
        console.assert(this.poBoxSprite !== null);
        this.name = name;

        if (pLineColor === null) {
            this.poLineColor = denormalizeToHex(1, 1, 1);
        } else {
            this.poLineColor = denormalizeToHex(pLineColor);
        }

        this.poBoxSprite.clear();
        this.poBoxSprite.lineStyle(lineWidth, this.poLineColor, Alpha);
        this.poBoxSprite.strokeRect(0, 0, width, height);
        this.poBoxSprite.setPosition(x, y);

        this.x = x;
        this.y = y;
        this.width = width;   
        this.height = height; 
        this.angle = this.poBoxSprite.angle;
    }

    privClear() {
        this.name = BoxSprite.Name.Uninitialized;
        this.poLineColor = denormalizeToHex(1, 1, 1);
        this.x = 0.0;
        this.y = 0.0;
        this.sx = 1.0;
        this.sy = 1.0;
        this.angle = 0.0;
    }

    SwapColor(myColor, show = true) {
        console.assert(myColor !== null, "Color cannot be null");

        this.poBoxSprite.setVisible(show);
        if (!show) return;

        this.poBoxSprite.clear();
        const hexColor = denormalizeToHex(myColor);
        
        const thickness = 2;
        this.poBoxSprite.lineStyle(thickness, hexColor, 1);

        const w = this.width || 100;
        const h = this.height || 100;
        this.poBoxSprite.strokeRect(0, 0, w, h);
    }

    Wash() {
        this.privClear();
    }

    Render() {
        if (!this.poBoxSprite) return;
        const renderer = activeScene.sys.renderer;
        const camera = activeScene.cameras.main;
        this.poBoxSprite.renderWebGL(renderer, this.poBoxSprite, camera);
    }

    Update() {
        this.poBoxSprite.x = this.x;
        this.poBoxSprite.y = this.y;
        this.poBoxSprite.scaleX = this.sx;
        this.poBoxSprite.scaleY = this.sy;
        this.poBoxSprite.angle = this.angle;
        this.poBoxSprite.update();
    }
}