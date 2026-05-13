import { ColObserver } from "../Collisions/ColObserver.js"
import { DelayedObjectMan } from "../GameObject/DelayedObjectMan.js";

export class ShipRemoveMissileObserver extends ColObserver {
    // Mimics C# constructor overloading
    constructor(m = null) {
        super();
        if (m !== null) {
            console.assert(m.pMissile !== null, "ShipRemoveMissileObserver clone missing pMissile");
            this.pMissile = m.pMissile;
        } else {
            this.pMissile = null;
        }
    }

    Notify() {
        // At this point we have two game objects
        // Alphabetical ordering... A is missile
        this.pMissile = this.pSubject.pObjA;

        if (this.pMissile.bMarkForDeath === false) {
            this.pMissile.bMarkForDeath = true;
               
            // Delay - remove object later
            const pObserver = new ShipRemoveMissileObserver(this);
            DelayedObjectMan.Attach(pObserver);
        }
    }

    Execute() {
        // Let the gameObject deal with this... 
        this.pMissile.Remove();       
    }
}