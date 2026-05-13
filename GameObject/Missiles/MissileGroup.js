import { Composite } from "../../Composite/Composite.js"

export class MissileGroup extends Composite {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;

        // In JS, we use SwapColor with your custom RGB object instead of SetLineColor
        if (this.poColObj && this.poColObj.pColSprite) {
            this.poColObj.pColSprite.SwapColor({ r: 0, g: 0, b: 1 }); // Blue
        }
    }

    Accept(other) {
        // Important: at this point we have a MissileGroup
        // Call the appropriate collision reaction            
        other.VisitMissileGroup(this);
    }

    Update() {
        // Go to first child
        super.BaseUpdateBoundingBox(this);
        super.Update();
    }
}