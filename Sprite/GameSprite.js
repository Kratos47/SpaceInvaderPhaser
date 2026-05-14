/**
 * @file GameSprite.js
 * @description Represents a standard 2D texture sprite in the game world.
 */

import { SpriteBase } from "./SpriteBase.js";
import { activeScene, denormalizeToHex } from "../Globals.js";
import { Texture } from "../Texture/Texture.js";

export class GameSprite extends SpriteBase {
    static Name = Object.freeze({

        OctopusA: "OctopusA",
        OctopusB: "OctopusB",
        AlienA: "AlienA",
        AlienB: "AlienB",
        SquidA: "SquidA",
        SquidB: "SquidB",

        PlayerShot: "PlayerShot",
        Ship: "Ship",
        Wall: "Wall",
        Missile: "Missile",
        NullObject: "NullObject",
        Uninitialized: "Uninitialized"

    });

    constructor() {
        super();
        this.name = GameSprite.Name.Uninitialized;

        this.poSprite = activeScene.make.sprite({
            key: Texture.Name.Default,
            add: false // MUST BE TRUE so Phaser's animation clock ticks!
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
        this.poSprite.setDisplaySize(width, height);
        
        // 🔥 OCTOPUS KILLER FIX: Handle string vs Object natively
        let frameName = (typeof pImage === 'string') ? pImage : pImage.name;
        this.poSprite.setTexture(textureName, frameName);

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

    SwapImage(pNewImage) {
        console.assert(pNewImage !== null, "GameSprite.SwapImage: pNewImage is null");
        this.pImage = pNewImage;

        // In Phaser, swapping an image from a sprite sheet/atlas means changing the frame
        this.poSprite.setFrame(this.pImage.name);
    }

    SetName(inName) {
        this.name = inName;
    }

    GetName() {
        return this.name;
    }

    PlayAnimation(animKey) {
        this.poSprite.play(animKey);
    }

    SwapColor(myColor) {
        const hexColor = denormalizeToHex(myColor);
        this.poSprite.setTint(hexColor);
    }
}