//---------------------------------------------------------------------------------------------------------
// Design Notes:
//
//  Only "new" happens in the default constructor Sprite()
//
//  Managers - create a pool of them...
//  Add - Takes one and reuses it by using Set() 
//
//---------------------------------------------------------------------------------------------------------

import { activeScene } from "../Globals.js";
import { SpriteBase } from "./SpriteBase.js";
import { denormalizeToHex } from "../Globals.js";

export class BoxSprite extends SpriteBase {
    //---------------------------------------------------------------------------------------------------------
    // Enum
    //---------------------------------------------------------------------------------------------------------
    static Name = {
        Box1: 0,
        Box2: 1,
        Uninitialized: 2
    };

    static Name = Object.freeze({
        Box1: "Box1",
        Box2: "Box2",
        Uninitialized: "Uninitialized"
    });

    //---------------------------------------------------------------------------------------------------------
    // Constructor
    //---------------------------------------------------------------------------------------------------------
    constructor() {
        super();

        this.name = BoxSprite.Name.Uninitialized;

        this.poLineColor = denormalizeToHex(1, 1, 1);

        // 1. Create the outline in memory (add: false)
        this.poBoxSprite = activeScene.make.graphics({ add: false });

        console.assert(this.poBoxSprite != null);
    }

    //---------------------------------------------------------------------------------------------------------
    // Methods
    //---------------------------------------------------------------------------------------------------------
    Set(name, x, y, width, height, pLineColor, lineWidth, Alpha) {
        console.assert(this.poBoxSprite != null);

        this.name = name;

        // 1. Handle Color (Normalized to Hex)
        if (pLineColor == null) {
            this.poLineColor = denormalizeToHex(1, 1, 1);
        } else {
            this.poLineColor = denormalizeToHex(pLineColor);
        }

        // 2. Draw the Outline
        this.poBoxSprite.clear();
        // Pass the hex number directly, NOT the SwapColor function
        this.poBoxSprite.lineStyle(lineWidth, this.poLineColor, Alpha);
        this.poBoxSprite.strokeRect(0, 0, width, height);

        // 3. Position and Display
        this.poBoxSprite.setPosition(x, y);
        //activeScene.add.existing(this.poBoxSprite);

        // 4. Update internal state
        this.x = x;
        this.y = y;
        this.width = width;   // Store the actual size
        this.height = height; // Store the actual size
        this.angle = this.poBoxSprite.angle;
    }

    privClear() {
        this.name = BoxSprite.Name.Uninitialized;

        // NOTE:
        // Do not null the poAzulBoxSprite it is created once in Default then reused
        // Do not null the poLineColor it is created once in Default then reused

        this.poLineColor = denormalizeToHex(1, 1, 1);
        this.x = 0.0;
        this.y = 0.0;
        this.scaleX = 1.0;
        this.scaleY = 1.0;
        this.angle = 0.0;
    }

    SwapColor(myColor, show = true) {
        console.assert(myColor != null, "Color cannot be null");

        // 1. Visibility toggle
        this.poBoxSprite.setVisible(show);
        if (!show) return;

        // 2. Wipe the old drawing
        this.poBoxSprite.clear();

        // 3. Convert your single color variable to a hex number
        const hexColor = denormalizeToHex(myColor);

        // 4. Set the line style (Outline)
        // Use a fixed width (like 2) or a variable this.lineWidth
        const thickness = 2;
        this.poBoxSprite.lineStyle(thickness, hexColor, 1);

        // 5. STROKE THE RECTANGLE (Outline only)
        // Ensure width and height are the actual pixel dimensions (e.g., 100)
        const w = this.width || 100;
        const h = this.height || 100;

        this.poBoxSprite.strokeRect(0, 0, w, h);
    }

    Wash() {
        this.privClear();
    }

    Dump() {
        console.log("   Name:", this.name);
        console.log(
            "      Color(r,g,b):",
            this.poLineColor.red,
            this.poLineColor.green,
            this.poLineColor.blue
        );

        console.log("        AzulSprite:", this.poAzulBoxSprite);
        console.log("             (x,y):", this.x, this.y);
        console.log("           (sx,sy):", this.sx, this.sy);
        console.log("           (angle):", this.angle);

        if (this.pNext == null) {
            console.log("              next: null");
        }
        else {
            let pTmp = this.pNext;
            console.log("              next:", pTmp.name);
        }

        if (this.pPrev == null) {
            console.log("              prev: null");
        }
        else {
            let pTmp = this.pPrev;
            console.log("              prev:", pTmp.name);
        }
    }

    Render() {
        // 1. Safety check
        if (!this.poBoxSprite) return;

        const renderer = activeScene.sys.renderer;
        const camera = activeScene.cameras.main;

        // 2. Use the Graphics object's internal WebGL render call
        // This draws the lines/rects you defined in Set() or SwapColor()
        // It respects the current transformation (x, y, scale, angle)
        this.poBoxSprite.renderWebGL(renderer, this.poBoxSprite, camera);
    }


    //---------------------------------------------------------------------------------------------------------
    // Methods
    //---------------------------------------------------------------------------------------------------------
    Update() {
        this.poBoxSprite.x = this.x;
        this.poBoxSprite.y = this.y;
        this.poBoxSprite.scaleX = this.sx;
        this.poBoxSprite.scaleY = this.sy;
        this.poBoxSprite.angle = this.angle;

        this.poBoxSprite.update();
    }

}


// End of file