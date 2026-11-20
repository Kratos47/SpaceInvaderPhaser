import { ColObserver } from "../Collisions/ColObserver.js";
import { DelayedObjectMan } from "../GameObject/DelayedObjectMan.js";

export class RemoveMissileObserver extends ColObserver {
    constructor(m = null) {
        super();
        if (m !== null) {
            this.pMissile = m.pMissile;
        } else {
            this.pMissile = null;
        }
    }

    Notify() {
        // Depending on your ColPair, Missile is usually ObjA
        this.pMissile = this.pSubject.pObjA; 
        console.assert(this.pMissile !== null, "RemoveMissileObserver: Missile is null");

        if (this.pMissile.bMarkForDeath === false) {
            this.pMissile.bMarkForDeath = true;
            // Delay the teardown so it doesn't crash the physics iterator!
            const pObserver = new RemoveMissileObserver(this);
            DelayedObjectMan.Attach(pObserver);
        }
    }

    Execute() {
        this.pMissile.Remove();
    }
}