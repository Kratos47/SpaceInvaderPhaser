/**
 * @file Image.js
 * @description Defines a specific rectangular region (uv coordinates) within a Texture.
 */

import { DLink } from "../Manager/DLink.js";
import { activeScene } from "../Globals.js";

export class Image extends DLink {
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
        Default: "Default",
        OctopusA: "OctopusA",
        OctopusB: "OctopusB",
        AlienA: "AlienA",
        AlienB: "AlienB",
        SquidA: "SquidA",
        SquidB: "SquidB",
        NullObject: "NullObject",
        Uninitialized: "Uninitialized",
    });

    constructor() {
        super();
        this.poRect = { x: 0, y: 0, width: 0, height: 0 };
        this.privClear();
    }

    Set(name, pTexture, x, y, width, height, sourceIndex = 0) {
        this.name = name;
        console.assert(pTexture !== null, "Image must have a valid Texture");
        this.pTexture = pTexture;

        let phaserTex = activeScene.textures.get(pTexture.name);
        phaserTex.add(name, sourceIndex, x, y, width, height);

        this.poRect.x = x;
        this.poRect.y = y;
        this.poRect.width = width;
        this.poRect.height = height;
    }

    privClear() {
        this.pTexture = null;
        this.name = Image.Name.Uninitialized;
        if (this.poRect) {
            this.poRect.x = 0;
            this.poRect.y = 0;
            this.poRect.width = 0;
            this.poRect.height = 0;
        }
    }

    Wash() {
        this.clear(); 
        this.privClear();
    }

    SetName(inName) { this.name = inName; }
    GetName() { return this.name; }
}