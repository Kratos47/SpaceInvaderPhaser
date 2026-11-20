import { Composite } from "../../Composite/Composite.js";
import { Iterator } from "../../Composite/Iterator.js";
import { ColPair } from "../../Collisions/ColPair.js";

export class ShieldColumn extends Composite {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;
    }

    Accept(other) {
        other.VisitShieldColumn(this);
    }

    VisitMissile(m) {
        const pGameObj = Iterator.GetChild(this);
        ColPair.Collide(m, pGameObj);
    }

    VisitBomb(b) {
        const pGameObj = Iterator.GetChild(this);
        ColPair.Collide(b, pGameObj);
    }

    Update() {
        super.BaseUpdateBoundingBox(this);
        super.Update();
    }
}