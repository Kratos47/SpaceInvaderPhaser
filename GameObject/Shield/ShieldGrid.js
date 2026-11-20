import { Composite } from "../../Composite/Composite.js";
import { Iterator } from "../../Composite/Iterator.js";
import { ColPair } from "../../Collisions/ColPair.js";

export class ShieldGrid extends Composite {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;
    }

    Accept(other) {
        other.VisitShieldGrid(this);
    }

    VisitMissile(m) {
        const pGameObj = Iterator.GetChild(this);
        ColPair.Collide(m, pGameObj);
    }

    Update() {
        super.BaseUpdateBoundingBox(this);
        super.Update();
    }
}