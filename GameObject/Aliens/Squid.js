import { AlienCategory } from "./AlienCategory.js";
import { ColPairMan } from "../../Collisions/ColPairManager.js";

export class Squid extends AlienCategory {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;
    }

    Accept(other) {
        other.VisitSquid(this);
    }

    VisitMissile(m) {
        const pColPair = ColPairMan.GetActiveColPair();
        console.assert(pColPair !== null);
        
        pColPair.SetCollision(m, this);
        pColPair.NotifyListeners();
    }

    Update() {
        super.Update();
    }
}