import { ColObserver } from "../Collisions/ColObserver.js";
import { DelayedObjectMan } from "../GameObject/DelayedObjectMan.js";

export class RemoveBombObserver extends ColObserver {
    constructor(b = null) {
        super();
        if (b !== null) {
            this.pBomb = b.pBomb;
        } else {
            this.pBomb = null;
        }
    }

    Notify() {
        this.pBomb = this.pSubject.pObjA;
        console.assert(this.pBomb !== null, "RemoveBombObserver: Bomb is null");

        if (this.pBomb.bMarkForDeath === false) {
            this.pBomb.bMarkForDeath = true;
            const pObserver = new RemoveBombObserver(this);
            DelayedObjectMan.Attach(pObserver);
        }
    }

    Execute() {
        this.pBomb.Remove();
    }
}