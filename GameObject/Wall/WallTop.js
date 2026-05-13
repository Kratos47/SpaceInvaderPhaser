import { WallCategory } from "./WallCategory.js";
import { Iterator } from "../../Composite/Iterator.js";
import { ColPair } from "../../Collisions/ColPair.js";
import { ColPairMan } from "../../Collisions/ColPairManager.js";

export class WallTop extends WallCategory {
    constructor(name, spriteName, posX, posY, width, height) {
        super(name, spriteName, WallCategory.Type.Top);
        
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
                this.poColObj.pColSprite.SwapColor({ r: 0, g: 0, b: 0 }); // Black
            }
            this.poColObj.UpdatePos(this.x, this.y);
        }
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