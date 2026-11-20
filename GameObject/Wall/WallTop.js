import { WallCategory } from "./WallCategory.js";
import { Iterator } from "../../Composite/Iterator.js";
import { ColPair } from "../../Collisions/ColPair.js";
import { ColPairMan } from "../../Collisions/ColPairManager.js";

export class WallTop extends WallCategory {
    constructor(name, spriteName, posX, posY, width, height) {
        super(name, spriteName, WallCategory.Type.Top);
        
        this.x = posX;
        this.y = posY;

         // 🔥 C# SYNTAX RESTORED: One line to set the box size
        if (this.poColObj && this.poColObj.poColRect) {
            this.poColObj.poColRect.Set(this.x, this.y, width, height);
        }
        
        // 🔥 C# SYNTAX RESTORED: Uses your new wrapper method for colors
        this.SetCollisionColor(1.0, 1.0, 0.0); // Yellow
    }

    Accept(other) {          
        other.VisitWallTop(this);
    }

    Update() {
        super.Update();
    }

    VisitMissileGroup(m) {
        const pGameObj = Iterator.GetChild(m);
        ColPair.Collide(pGameObj, this);
    }

    VisitMissile(m) {
        const pColPair = ColPairMan.GetActiveColPair();
        console.assert(pColPair !== null, "WallTop: Active ColPair is null");

        pColPair.SetCollision(m, this);
        pColPair.NotifyListeners();
    }
}