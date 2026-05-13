import { AlienCategory } from "./AlienCategory.js";
import { ColPairMan } from "../../Collisions/ColPairManager.js";

export class Alien extends AlienCategory {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;
    }

    Accept(other) {
        // Important: at this point we have an RedBird
        // Call the appropriate collision reaction            
        other.VisitAlien(this);
    }

    VisitMissile(m) {
        // Missile vs WallTop
        const pColPair = ColPairMan.GetActiveColPair();
        console.assert(pColPair !== null);
        
        pColPair.SetCollision(m, this);
        pColPair.NotifyListeners();
    }

    Update() {
        super.Update();
    }
}