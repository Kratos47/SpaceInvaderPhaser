import { BombCategory } from "./BombCategory.js";

export class Bomb extends BombCategory {
    constructor(name, spriteName, strategy, posX, posY) {
        super(name, spriteName, BombCategory.Type.Bomb);
        this.x = posX;
        this.y = posY;
        
        // 🔥 PHASER FIX: Keep it positive. We will ADD it to Y in Update()
        this.delta = 4.0;

        console.assert(strategy !== null, "Bomb strategy cannot be null");
        this.pStrategy = strategy;
        this.pStrategy.Reset(this.y);

        if (this.poColObj && this.poColObj.pColSprite) {
            this.poColObj.pColSprite.SetLineColor(1, 1, 0); // Yellow
        }
    }

    Reset() {
        this.y = 100.0; // 🔥 PHASER FIX: Start near the TOP of the screen, not 700!
        this.pStrategy.Reset(this.y);
    }

   Remove() {
        // 🔥 C# SYNTAX RESTORED: Passes 4 floats directly into Set()
        if (this.poColObj && this.poColObj.poColRect) {
            this.poColObj.poColRect.Set(0, 0, 0, 0);
        }
        
        super.Update();

        if (this.pParent) {
            this.pParent.Update();
        }

        super.Remove();
    }

    Update() {
        super.Update();
        
        // 🔥 PHASER FIX: Add delta so it falls DOWN the screen
        this.y += this.delta; 

        this.pStrategy.Fall(this);
    }

    GetBoundingBoxHeight() {
        return this.poColObj.poColRect.height;
    }

    Accept(other) {
        other.VisitBomb(this);
    }

    SetPos(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
    }

    MultiplyScale(sx, sy) {
        console.assert(this.pProxySprite !== null, "Bomb ProxySprite is null");
        
        // Phaser handles flips gracefully if we apply them to the physical dimensions
        this.pProxySprite.sx *= sx;
        this.pProxySprite.sy *= sy;
    }
}