export class InputSubject {
    constructor() {
        this.head = null;
    }

    Attach(observer) {
        // protection
        console.assert(observer !== null, "InputSubject.Attach: observer is null");

        observer.pSubject = this;

        // add to front
        if (this.head === null) {
            this.head = observer;
            observer.pNext = null;
            observer.pPrev = null;
        } else {
            observer.pNext = this.head;
            observer.pPrev = null;
            this.head.pPrev = observer;
            this.head = observer;
        }
    }

    Notify() {
        let pNode = this.head;

        while (pNode !== null) {
            // Fire off listener
            pNode.Notify();
            pNode = pNode.pNext;
        }
    }

    Detach() {
        // To be implemented
    }
}