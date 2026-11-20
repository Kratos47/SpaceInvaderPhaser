import { Composite } from "../../Composite/Composite.js";
import { Iterator } from "../../Composite/Iterator.js";
import { ColPair } from "../../Collisions/ColPair.js";

export class ShieldRoot extends Composite {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;
    }

    Accept(other) {
        other.VisitShieldRoot(this);
    }

    VisitMissileGroup(m) {
        const pGameObj = Iterator.GetChild(m);
        ColPair.Collide(pGameObj, this);
    }

    VisitMissile(m) {
        const pGameObj = Iterator.GetChild(this);
        ColPair.Collide(m, pGameObj);
    }

    VisitBombRoot(b) {
        const pGameObj = Iterator.GetChild(b);
        ColPair.Collide(pGameObj, this);
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