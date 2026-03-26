import { SpriteBase } from "./SpriteBase.js";
import { activeScene } from "../Globals.js";
import { Texture } from "../Texture/Texture.js";
import { denormalizeToHex } from "../Globals.js";

/*
 * Assumptions:
 *  - Azul.Sprite
 *  - Azul.Rect
 *  - Azul.Color
 *  - Color
 *  - Rect
 * are globally available
 */

export class GameSprite extends SpriteBase {

    // ------------------------------------------------------------
    // Enum
    // ------------------------------------------------------------
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

    // ------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------
    constructor() {
        super();

        this.name = GameSprite.Name.Uninitialized;

        // Default image
        //this.pImage = ImageMan.Find(Image.Name.Default);
        //console.assert(this.pImage != null);

        //console.assert(GameSprite.psTmpRect != null);
        //GameSprite.psTmpRect.clear?.(); // if clear() exists

        // actual news
        //this.poAzulColor = new Azul.Color(1, 1, 1);
        //console.assert(this.poAzulColor != null);



        this.poSprite = activeScene.make.sprite({
            key: Texture.Name.Default, // Use the internal default texture key
            add: false        // CRITICAL: prevents it from being added to the scene immediately
        });
        console.assert(this.poSprite != null);

        this.x = this.poSprite.x;
        this.y = this.poSprite.y;
        this.sx = this.poSprite.sx;
        this.sy = this.poSprite.sy;
        this.angle = this.poSprite.angle;
    }

    // ------------------------------------------------------------
    // Methods
    // ------------------------------------------------------------
    Set(name, pImage, textureName, x, y, width, height, myColor) {
        console.assert(pImage !== null);

        this.pImage = pImage;

        this.name = name;

        //this.poSprite = activeScene.add.sprite(x, y, textureName, pImage.name).setScale(width, height);

        this.poSprite.setPosition(x, y);
        this.poSprite.setScale(width, height);
        this.poSprite.setTexture(textureName, pImage.name);
        //activeScene.add.existing(this.poSprite); // Adds it to the display list

        console.assert(this.poSprite !== null);

        if (myColor != null)
            this.SwapColor(myColor);

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

    Dump() {
        console.log(`   Name: ${this.name} (${this})`);
        console.log(`             Image: ${this.pImage.name} (${this.pImage})`);
        console.log(`        AzulSprite: (${this.poAzulSprite})`);
        console.log(`             (x,y): ${this.x},${this.y}`);
        console.log(`           (sx,sy): ${this.sx},${this.sy}`);
        console.log(`           (angle): ${this.angle}`);

        if (this.pNext == null) {
            console.log("              next: null");
        } else {
            const pTmp = this.pNext;
            console.log(`              next: ${pTmp.name} (${pTmp})`);
        }

        if (this.pPrev == null) {
            console.log("              prev: null");
        } else {
            const pTmp = this.pPrev;
            console.log(`              prev: ${pTmp.name} (${pTmp})`);
        }
    }

    // ------------------------------------------------------------
    // Update / Render
    // ------------------------------------------------------------
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

        // 1. Access the default pipeline
        const pipeline = renderer.pipelines.get('MultiPipeline');

        // 2. Pass the sprite, the camera, and an empty parent matrix
        // The 3rd argument is often where 'copyFrom' fails if it's null/undefined
        pipeline.batchSprite(
            this.poSprite,
            camera,
            this.poSprite.parentContainer ? this.poSprite.parentContainer.getWorldTransformMatrix() : null
        );
    }



// ------------------------------------------------------------
// Swaps
// ------------------------------------------------------------
SwapColor(myColor) {
    // This ensures that whether you pass a hex code 
    // or an {r, g, b} object, it converts correctly.
    const hexColor = denormalizeToHex(myColor);
    
    this.poSprite.setTint(hexColor);
}

    //   SwapTextureRect(rect) {
    //     this.poSprite.SwapTextureRect(rect);
    //   }

    //   SwapScreenRect(rect) {
    //     this.poASprite.SwapTextureRect(rect);
    //   }

    // ------------------------------------------------------------
    // Static Data
    // ------------------------------------------------------------
    //static psTmpRect = new Azul.Rect();
    //static psTmpColor = new Azul.Color(1, 1, 1);
}