/**
 * @file DLink.js
 * @description Base class for doubly-linked list nodes used by Managers.
 */

export class DLink {
    constructor() {
        this.clear();
    }

    /**
     * Resets the linked list pointers.
     */
    clear() {
        this.pNext = null;
        this.pPrev = null;
    }
}