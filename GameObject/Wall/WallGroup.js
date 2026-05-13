import { Composite } from "../../Composite/Composite.js";
import { Iterator } from "../../Composite/Iterator.js";
import { ColPair } from "../../Collisions/ColPair.js";

export class WallGroup extends Composite {
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
        other.VisitWallGroup(this);
    }

    Update() {
        super.BaseUpdateBoundingBox(this);
        super.Update();
    }

    VisitGrid(a) {
        // BirdGroup vs WallGroup
        //              go down a level in Wall Group.
        const pGameObj = Iterator.GetChild(this);
        ColPair.Collide(a, pGameObj);
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
}