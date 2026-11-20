import { Composite } from "../../Composite/Composite.js";

export class BombRoot extends Composite {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;

        // Set the debug collision box to white
        if (this.poColObj && this.poColObj.pColSprite) {
            this.poColObj.pColSprite.SetLineColor(1, 1, 1);
        }
    }

    Accept(other) {
        other.VisitBombRoot(this);
    }

    Update() {
        super.BaseUpdateBoundingBox(this);
        super.Update();
    }
}