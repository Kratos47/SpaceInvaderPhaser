import { Composite } from "../Composite/Composite.js"

export class ShipRoot extends Composite {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;

        if (this.poColObj && this.poColObj.pColSprite) {
            this.poColObj.pColSprite.SwapColor({ r: 0, g: 0, b: 1 }); // Blue
        }
    }

    Accept(other) {
        // Call the appropriate collision reaction            
        other.VisitShipRoot(this);
    }

    Update() {
        super.BaseUpdateBoundingBox(this);
        super.Update();
    }
}