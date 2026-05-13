/**
 * @file DelayedObjectMan.js
 */

export class DelayedObjectMan {
    constructor() {
        this.head = null;
    }

    static Attach(observer) {
        // protection
        console.assert(observer !== null, "DelayedObjectMan: observer is null");

        const pDelayMan = DelayedObjectMan.PrivGetInstance();

        // add to front
        if (pDelayMan.head === null) {
            pDelayMan.head = observer;
            observer.pNext = null;
            observer.pPrev = null;
        } else {
            observer.pNext = pDelayMan.head;
            observer.pPrev = null;
            pDelayMan.head.pPrev = observer;
            pDelayMan.head = observer;
        }
    }

    PrivDetach(node) {
        // protection
        console.assert(node !== null, "DelayedObjectMan.PrivDetach: node is null");

        if (node.pPrev !== null) {
            // middle or last node
            node.pPrev.pNext = node.pNext;
        } else {
            // first
            // Note: Replaced C# 'ref head' with direct instance assignment
            this.head = node.pNext; 
        }

        if (node.pNext !== null) {
            // middle node
            node.pNext.pPrev = node.pPrev;
        }
    }

    static Process() {
        const pDelayMan = DelayedObjectMan.PrivGetInstance();

        let pNode = pDelayMan.head;

        while (pNode !== null) {
            // Fire off listener (e.g., RemoveAlienObserver.Execute())
            pNode.Execute();

            pNode = pNode.pNext;
        }

        // remove
        pNode = pDelayMan.head;
        let pTmp = null;

        while (pNode !== null) {
            pTmp = pNode;
            pNode = pNode.pNext;

            // remove
            pDelayMan.PrivDetach(pTmp);
        }
    }

    static PrivGetInstance() {
        // Do the initialization
        if (DelayedObjectMan.instance === null) {
            DelayedObjectMan.instance = new DelayedObjectMan();
        }

        // Safety - this forces users to call create first
        console.assert(DelayedObjectMan.instance !== null);

        return DelayedObjectMan.instance;
    }
}

// -------------------------------------------
// Static Data
// -------------------------------------------
DelayedObjectMan.instance = null;