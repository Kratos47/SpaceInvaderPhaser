import { Iterator } from "./Iterator.js";

export class ForwardIterator extends Iterator {
    constructor(pStart) {
        super();
        console.assert(pStart !== null);
        console.assert(pStart.holder === "COMPOSITE");

        this.pCurr = pStart;
        this.pRoot = pStart;
    }

    PrivNextStep(pNode, pParent, pChild, pSibling) {
        if (pChild !== null) {
            pNode = pChild;
        } else {
            if (pSibling !== null) {
                pNode = pSibling;
            } else {
                while (pParent !== null) {
                    pNode = Iterator.GetSibling(pParent);
                    if (pNode !== null) {
                        break; 
                    } else {
                        pParent = Iterator.GetParent(pParent); 
                    }
                }
            }
        }
        return pNode;
    }

    First() {
        console.assert(this.pRoot !== null);
        this.pCurr = this.pRoot;
        return this.pCurr;
    }

    Next() {
        console.assert(this.pCurr !== null);

        let pNode = this.pCurr;
        let pChild = Iterator.GetChild(pNode);
        let pSibling = Iterator.GetSibling(pNode);
        let pParent = Iterator.GetParent(pNode);

        pNode = this.PrivNextStep(pNode, pParent, pChild, pSibling);
        this.pCurr = pNode;

        return this.pCurr;
    }

    IsDone() {
        return (this.pCurr === null);
    }
}