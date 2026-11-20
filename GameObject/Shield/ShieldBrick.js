import { ShieldCategory } from "../Shield/ShieldCategory.js";
import { ColPairMan } from "../../Collisions/ColPairManager.js";

export class ShieldBrick extends ShieldCategory {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName, ShieldCategory.Type.Brick);
        this.x = posX;
        this.y = posY;

        // Set debug box to White
        if (this.poColObj && this.poColObj.pColSprite) {
            this.poColObj.pColSprite.SetLineColor(1.0, 1.0, 1.0); 
        }
    }

    Accept(other) {
        other.VisitShieldBrick(this);
    }

    VisitMissile(m) {
        const pColPair = ColPairMan.GetActiveColPair();
        pColPair.SetCollision(m, this);
        pColPair.NotifyListeners();
    }

    VisitBomb(b) {
        const pColPair = ColPairMan.GetActiveColPair();
        pColPair.SetCollision(b, this);
        pColPair.NotifyListeners();
    }

    Update() {
        super.Update();
    }
}