/**
 * @file GameSprite.js
 * @description Represents a standard 2D texture sprite in the game world.
 */

import { SpriteBase } from "./SpriteBase.js";
import { activeScene, denormalizeToHex } from "../Globals.js";
import { Texture } from "../Texture/Texture.js";

export class GameSprite extends SpriteBase {
    static Name = Object.freeze({
        SquidA: "SquidA",
        AlienA: "AlienA",
        OctopusA: "OctopusA",
        NullObject: "NullObject",
        Uninitialized: "Uninitialized"
    });

    constructor() {
        super();
        this.name = GameSprite.Name.Uninitialized;

        this.poSprite = activeScene.make.sprite({
            key: Texture.Name.Default,
            add: true // MUST BE TRUE so Phaser's animation clock ticks!
        });
        
        // Hide the base sprite! We only use it for data and animation frames
        this.poSprite.setVisible(false); 

        this.x = this.poSprite.x;
        this.y = this.poSprite.y;
        this.sx = this.poSprite.scaleX;
        this.sy = this.poSprite.scaleY;
        this.angle = this.poSprite.angle;
    }

    Set(name, pImage, textureName, x, y, width, height, myColor = null) {
        console.assert(pImage !== null);
        
        this.pImage = pImage;
        this.name = name;

        this.poSprite.setPosition(x, y);
        // CRITICAL FIX: setDisplaySize forces exact pixel size. setScale(33) would make it 33x bigger!
        this.poSprite.setDisplaySize(width, height);
        this.poSprite.setTexture(textureName, pImage.name);

        if (myColor !== null) this.SwapColor(myColor);

        this.x = x;
        this.y = y;
        this.sx = width;
        this.sy = height;
        this.angle = this.poSprite.angle;
    }

    privClear() {
        this.pImage = null;
        this.name = GameSprite.Name.Uninitialized;
    }

    Wash() {
        this.privClear();
    }

    Update() {
        this.poSprite.x = this.x;
        this.poSprite.y = this.y;
        this.poSprite.angle = this.angle;
    }

    Render() {
        // Handled natively by ProxySprite in Phaser
    }

    PlayAnimation(animKey) {
        this.poSprite.play(animKey);
    }

    SwapColor(myColor) {
        const hexColor = denormalizeToHex(myColor);
        this.poSprite.setTint(hexColor);
    }
}