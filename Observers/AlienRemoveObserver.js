import { ColObserver } from "../Collisions/ColObserver.js"
import { DelayedObjectMan } from "../GameObject/DelayedObjectMan.js";

export class AlienRemoveObserver extends ColObserver {
    // Mimics C# constructor overloading
    constructor(m = null) {
        super();
        if (m !== null) {
            console.assert(m.pInvader !== null, "AlienRemoveObserver clone missing pInvader");
            this.pInvader = m.pInvader;
        } else {
            this.pInvader = null;
        }
    }

    Notify() {
        // At this point we have two game objects
        // Alphabetical ordering... A is missile, B is wall (or Alien)
        this.pInvader = this.pSubject.pObjB;

        if (this.pInvader.bMarkForDeath === false) {
            this.pInvader.bMarkForDeath = true;

            // Delay - remove object later
            const pObserver = new AlienRemoveObserver(this);
            DelayedObjectMan.Attach(pObserver);
        }
    }

    Execute() {
        let tmp = this.pInvader.pParent.GetFirstChild();
        // Let the gameObject deal with this...

        // gotta check if the column has more than one children to skip deleting the column
        if (tmp.pNext !== null) {
            this.pInvader.Remove();
        } else {
            // column's last child so delete the column after deleting the child
            this.pInvader.Remove();
            tmp = this.pInvader.pParent;
            tmp.Remove();
        }
    }
}