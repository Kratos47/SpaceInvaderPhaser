export class ColSubject {
    constructor() {
        this.pObjB = null;
        this.pObjA = null;
        this.pHead = null;
    }

    Attach(observer) {
        // protection
        console.assert(observer !== null);

        observer.pSubject = this;

        // add to front
        if (this.pHead === null) {
            this.pHead = observer;
            observer.pNext = null;
            observer.pPrev = null;
        } else {
            observer.pNext = this.pHead;
            this.pHead.pPrev = observer;
            this.pHead = observer;
        }
    }

    Notify() {
        let pNode = this.pHead;

        while (pNode !== null) {
            // Fire off listener
            pNode.Notify();

            pNode = pNode.pNext;
        }
    }

    Detach() {
        // Implementation pending
    }
}