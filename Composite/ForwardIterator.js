import { Iterator } from "./Iterator.js";

export class ForwardIterator extends Iterator {
    constructor(pStart) {
        super();
        console.assert(pStart !== null);
        this.pCurr = pStart;
        this.pRoot = pStart;
    }

    First() {
        console.assert(this.pRoot !== null);
        this.pCurr = this.pRoot;
        return this.pCurr;
    }

    Next() {
        console.assert(this.pCurr !== null);
        let pNode = this.pCurr;

        // 1. Try to go down to a child
        let pChild = Iterator.GetChild(pNode);
        if (pChild !== null) {
            this.pCurr = pChild;
            return this.pCurr;
        }

        // 2. CRITICAL FIX: If we are evaluating the Root itself, and it has no children, 
        // we MUST STOP. Do not look for the root's siblings, or we bleed out of the tree!
        if (pNode === this.pRoot) {
            this.pCurr = null;
            return null;
        }

        // 3. Try to go to a sibling
        let pSibling = Iterator.GetSibling(pNode);
        if (pSibling !== null) {
            this.pCurr = pSibling;
            return this.pCurr;
        }

        // 4. Climb back up the tree looking for a parent's sibling
        let pParent = Iterator.GetParent(pNode);
        while (pParent !== null) {
            
            // CRITICAL FIX: If we have climbed all the way back up to the Root, 
            // the traversal for this subtree is completely finished.
            if (pParent === this.pRoot) {
                this.pCurr = null;
                return null;
            }

            pSibling = Iterator.GetSibling(pParent);
            if (pSibling !== null) {
                this.pCurr = pSibling;
                return this.pCurr;
            }

            pParent = Iterator.GetParent(pParent);
        }

        // Failsafe exit
        this.pCurr = null;
        return null;
    }

    IsDone() {
        return (this.pCurr === null);
    }
}