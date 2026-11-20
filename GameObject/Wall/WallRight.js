import { WallCategory } from "./WallCategory.js";
import { ColPairMan } from "../../Collisions/ColPairManager.js";

export class WallRight extends WallCategory {
    constructor(name, spriteName, posX, posY, width, height) {
        super(name, spriteName, WallCategory.Type.Right);
        
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
        other.VisitWallRight(this);
    }

    Update() {
        super.Update();
    }

    VisitGrid(a) {
        const pColPair = ColPairMan.GetActiveColPair();
        console.assert(pColPair !== null, "WallRight: Active ColPair is null");

        pColPair.SetCollision(a, this);
        pColPair.NotifyListeners();
    }

    VisitBomb(b) {
        // Ignore bombs overlapping non-bottom walls
    }
}