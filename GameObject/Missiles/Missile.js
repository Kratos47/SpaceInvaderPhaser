import { MissileCategory } from "./MissileCategory.js";

export class Missile extends MissileCategory {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;
        this.enable = false;
        
        // C# had 20.0f, but remember in Phaser top-left is (0,0). 
        // If your ship is at the bottom shooting UP, this might need to be -20.0 later!
        this.delta = 20.0; 
    }

    Update() {
        super.Update();
        this.y += this.delta;
    }

    Remove() {
        // Keenan(23.E)
        // Since the Root object is being drawn
        // 1st set its size to zero
        if (this.poColObj && this.poColObj.poColRect) {
            this.poColObj.poColRect.x = 0;
            this.poColObj.poColRect.y = 0;
            this.poColObj.poColRect.width = 0;
            this.poColObj.poColRect.height = 0;
        }
        super.Update();

        // Update the parent (missile root)
        if (this.pParent) {
            this.pParent.Update();
        }

        // Now remove it
        super.Remove();
    }

    Accept(other) {
        // Important: at this point we have a Missile
        // Call the appropriate collision reaction            
        other.VisitMissile(this);
    }

    SetPos(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
    }

    SetActive(state) {
        this.enable = state;
    }
}