// Image.js
import { DLink } from "../Manager/DLink.js";
import { Texture } from "../Texture/Texture.js";
import { activeScene } from "../Globals.js";

/*
 * NOTE:
 * Azul.Rect is assumed to exist globally, exactly like Azul.Texture
 */

export class Image extends DLink {
    // ------------------------------------------------------------
    // Enum replacement
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

        Uninitialized: "Uninitialized",
    });

    // ------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------
    constructor() {
        super(); // base()

        //this.poRect = new Azul.Rect();
        //console.assert(this.poRect !== null);

        this.clear();
    }

    // ------------------------------------------------------------
    // Methods/
    // ------------------------------------------------------------
    Set(name, pTexture, x, y, width, height,sourceIndex = 0) {
        // Copy the data over
        this.name = name;

        console.assert(pTexture !== null);
        this.pTexture = pTexture;

        //this.poRect.set(x, y, width, height);
        let image = activeScene.textures.get(pTexture.name);

        //Second Argument sourceIndex	0	The index of the Image Source 
        //to use (usually 0 if the texture only has one image/file).
        image.add(name, sourceIndex, x, y, width, height); //
    }

    // C# "new Clear()"
    Clear() {
        this.pTexture = null;
        this.name = Image.Name.Uninitialized;
        this.poRect.clear();
    }

    Wash() {
        this.clear();
    }

    Dump() {
        console.log(`   Name: ${this.name} (${this})`);
        console.log(
            `      Rect: [${this.poRect.x} ${this.poRect.y} ${this.poRect.width} ${this.poRect.height}]`
        );

        if (this.pTexture !== null) {
            console.log(`   Texture: ${this.pTexture.name}`);
        } else {
            console.log("   Texture: null");
        }

        if (this.pNext === null) {
            console.log("      next: null");
        } else {
            const pTmp = this.pNext;
            console.log(`      next: ${pTmp.name} (${pTmp})`);
        }

        if (this.pPrev === null) {
            console.log("      prev: null");
        } else {
            const pTmp = this.pPrev;
            console.log(`      prev: ${pTmp.name} (${pTmp})`);
        }
    }

    // ------------------------------------------------------------
    // Data
    // ------------------------------------------------------------
    // name
    // poRect
    // pTexture
}
