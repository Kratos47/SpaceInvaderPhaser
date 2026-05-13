import { Iterator } from "./Iterator.js";
import { ForwardIterator } from "./ForwardIterator.js";
import { Component } from "./Component.js";

export class ReverseIterator extends Iterator {
    constructor(pStart) {
        super();
        console.assert(pStart !== null, "ReverseIterator: pStart cannot be null");
        
        // 🛡️ RESTORED: Strict enforcement of Composite roots
        console.assert(pStart.holder === Component.Container.COMPOSITE, "ReverseIterator: Root must be a COMPOSITE node");

        this.pRoot = pStart;
        this.pCurr = null;
        this.stack = [];
        this.index = -1;

        const pForward = new ForwardIterator(pStart);
        let pNode = pForward.First();

        while (!pForward.IsDone()) {
            this.stack.push(pNode);
            pNode = pForward.Next();
        }
    }

    First() {
        console.assert(this.pRoot !== null, "ReverseIterator.First(): pRoot is null");

        // Start at the very end of the stack array
        this.index = this.stack.length - 1;
        this.pCurr = this.index >= 0 ? this.stack[this.index] : null;
        
        return this.pCurr;
    }

    Next() {
        // Move backward through the array
        this.index--;
        this.pCurr = this.index >= 0 ? this.stack[this.index] : null;
        
        return this.pCurr;
    }

    IsDone() {
        // We are done when the index drops below 0
        return this.index < 0;
    }
}