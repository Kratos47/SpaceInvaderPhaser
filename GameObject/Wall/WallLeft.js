import { WallCategory } from "./WallCategory.js";
import { ColPairMan } from "../../Collisions/ColPairManager.js";

export class WallLeft extends WallCategory {
    constructor(name, spriteName, posX, posY, width, height) {
        super(name, spriteName, WallCategory.Type.Left);
        
        this.x = posX;
        this.y = posY;

        // 🔥 CRITICAL FIX: Inflate the 0x0 dummy box AND the debug BoxSprite!
        if (this.poColObj && this.poColObj.poColRect) {
            this.poColObj.poColRect.x = posX;
            this.poColObj.poColRect.y = posY;
            this.poColObj.poColRect.width = width;
            this.poColObj.poColRect.height = height;
            
            if (this.poColObj.pColSprite) {
                this.poColObj.pColSprite.width = width;
                this.poColObj.pColSprite.height = height;
                this.poColObj.pColSprite.SwapColor({ r: 1, g: 0, b: 0 }); // Red
            }
            this.poColObj.UpdatePos(this.x, this.y);
        }
    }

    Accept(other) {         
        other.VisitWallLeft(this);
    }

    Update() {
        super.Update();
    }

    VisitGrid(a) {
        const pColPair = ColPairMan.GetActiveColPair();
        console.assert(pColPair !== null, "WallLeft: Active ColPair is null");

        pColPair.SetCollision(a, this);
        pColPair.NotifyListeners();
    }
}