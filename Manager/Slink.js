/**
 * @file SLink.js
 * @description Base class for singly-linked list nodes (e.g., ImageHolder).
 */

export class SLink {
    constructor() {
        this.pSNext = null;
    }

    /**
     * Adds a node to the front of a singly-linked list.
     * @param {Object} headRef - Wrapper object containing the head pointer { head: pHead }
     * @param {SLink} pNode - The node to insert
     */
    static AddToFront(headRef, pNode) {
        console.assert(pNode !== null, "Cannot add null node to SLink");

        if (headRef.head === null) {
            headRef.head = pNode;
            pNode.pSNext = null;
        } else {
            pNode.pSNext = headRef.head;
            headRef.head = pNode;
        }

        console.assert(headRef.head !== null, "SLink head is null after insertion");
    }
}