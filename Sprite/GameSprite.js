/**
 * @file GameSprite.js
 * @description Represents a standard 2D texture sprite in the game world.
 */

import { SpriteBase } from "./SpriteBase.js";
import { activeScene, denormalizeToHex } from "../Globals.js";
import { Texture } from "../Texture/Texture.js";

export class GameSprite extends SpriteBase {
    static Name = Object.freeze({
        RedBird: "RedBird",
        YellowBird: "YellowBird",
        GreenBird: "GreenBird",
        WhiteBird: "WhiteBird",
        Alien_Crab: "Alien_Crab",
        Alien_Octopus: "Alien_Octopus",
        Alien_Squid: "Alien_Squid",
        Alien_UFO: "Alien_UFO",
        Stitch: "Stitch",
        RedGhost: "RedGhost",
        PinkGhost: "PinkGhost",
        BlueGhost: "BlueGhost",
        OrangeGhost: "OrangeGhost",
        MsPacMan: "MsPacMan",
        PowerUpGhost: "PowerUpGhost",
        Prezel: "Prezel",
        Uninitialized: "Uninitialized"
    });

    constructor() {
        super();
        this.name = GameSprite.Name.Uninitialized;

        this.poSprite = activeScene.make.sprite({
            key: Texture.Name.Default,
            add: false 
        });
        console.assert(this.poSprite !== null, "Phaser Sprite creation failed");

        this.x = this.poSprite.x;
        this.y = this.poSprite.y;
        this.sx = this.poSprite.scaleX;
        this.sy = this.poSprite.scaleY;
        this.angle = this.poSprite.angle;
    }

    Set(name, pImage, textureName, x, y, width, height, myColor = null) {
        console.assert(pImage !== null, "GameSprite must have a valid Image");
        
        this.pImage = pImage;
        this.name = name;

        this.poSprite.setPosition(x, y);
        this.poSprite.setScale(width, height);
        this.poSprite.setTexture(textureName, pImage.name);

        if (myColor !== null) {
            this.SwapColor(myColor);
        }

        this.x = x;
        this.y = y;
        this.sx = width;
        this.sy = height;
        this.angle = this.poSprite.angle;
    }

    privClear() {
        this.pImage = null;
        this.name = GameSprite.Name.Uninitialized;
        this.x = 0.0;
        this.y = 0.0;
        this.sx = 1.0;
        this.sy = 1.0;
        this.angle = 0.0;
    }

    Wash() {
        this.privClear();
    }

    Update() {
        this.poSprite.x = this.x;
        this.poSprite.y = this.y;
        this.poSprite.scaleX = this.sx;
        this.poSprite.scaleY = this.sy;
        this.poSprite.angle = this.angle;
        this.poSprite.update();
    }

    Render() {
        const renderer = activeScene.sys.renderer;
        const camera = activeScene.cameras.main;
        const pipeline = renderer.pipelines.get('MultiPipeline');

        pipeline.batchSprite(
            this.poSprite,
            camera,
            this.poSprite.parentContainer ? this.poSprite.parentContainer.getWorldTransformMatrix() : null
        );
    }

    SwapColor(myColor) {
        const hexColor = denormalizeToHex(myColor);
        this.poSprite.setTint(hexColor);
    }
}