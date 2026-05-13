import { Composite } from "../../Composite/Composite.js";
import { Iterator } from "../../Composite/Iterator.js";
import { ColPair } from "../../Collisions/ColPair.js";

export class AlienColumn extends Composite {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;

        if (this.poColObj && this.poColObj.pColSprite) {
            this.poColObj.pColSprite.SwapColor({ r: 1, g: 0, b: 1 }); // Magenta
        }
    }

    Accept(other) {
        // Important: at this point we have an BirdColumn
        other.VisitColumn(this);
    }

    VisitMissileGroup(m) {
        // MissileRoot vs WallRoot
        const pGameObj = Iterator.GetChild(m);
        ColPair.Collide(pGameObj, this);
    }

    VisitMissile(m) {
        // Missile vs WallRoot
        const pGameObj = Iterator.GetChild(this);
        ColPair.Collide(m, pGameObj);
    }

    Update() {
        super.BaseUpdateBoundingBox(this);
        super.Update();
    }
}