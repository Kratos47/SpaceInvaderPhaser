import { ColObserver } from "../Collisions/ColObserver.js";
import { DelayedObjectMan } from "../GameObject/DelayedObjectMan.js";
import { Iterator } from "../Composite/Iterator.js";

export class RemoveBrickObserver extends ColObserver {
    constructor(b = null) {
        super();
        if (b !== null) {
            console.assert(b !== null);
            this.pBrick = b.pBrick;
        } else {
            this.pBrick = null;
        }
    }

    Notify() {
        // Assuming ShieldBrick is ObjB based on your ColPair setup
        this.pBrick = this.pSubject.pObjB; 
        console.assert(this.pBrick !== null, "RemoveBrickObserver: Brick is null");

        if (this.pBrick.bMarkForDeath === false) {
            this.pBrick.bMarkForDeath = true;
            const pObserver = new RemoveBrickObserver(this);
            DelayedObjectMan.Attach(pObserver);
        }
    }

    Execute() {
        const pA = this.pBrick;
        const pB = Iterator.GetParent(pA); // The Column

        pA.Remove(); // Remove the brick

        // If the Column is now empty, remove the Column!
        if (this.privCheckParent(pB) === true) {
            const pC = Iterator.GetParent(pB); // The ShieldRoot
            pB.Remove();

            if (this.privCheckParent(pC) === true) {
                // pC.Remove(); // Optional: Remove the whole Shield if all columns are gone
            }
        }
    }

    privCheckParent(pObj) {
        const pGameObj = Iterator.GetChild(pObj);
        if (pGameObj === null) {
            return true; // No children left
        }
        return false;
    }
}