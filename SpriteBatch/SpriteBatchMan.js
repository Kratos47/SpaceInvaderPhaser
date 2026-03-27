/**
 * @file SpriteBatchMan.js
 * @description Manages all SpriteBatches, ensuring they are drawn in priority order.
 */

import { Manager } from "../Manager/Manager.js";
import { SpriteBatch } from "./SpriteBatch.js";

export class SpriteBatchMan_Link extends Manager {
    constructor() {
        super();
        this.poActive = null;
        this.poReserve = null;
    }
}

export class SpriteBatchMan extends SpriteBatchMan_Link {
    static pInstance = null;

    constructor(reserveNum = 3, reserveGrow = 1) {
        super();
        this.baseInitialize(reserveNum, reserveGrow);
        this.poNodeCompare = new SpriteBatch();
    }

    static Create(reserveNum = 3, reserveGrow = 1) {
        console.assert(reserveNum > 0 && reserveGrow > 0);
        if (SpriteBatchMan.pInstance === null) {
            SpriteBatchMan.pInstance = new SpriteBatchMan(reserveNum, reserveGrow);
        }
    }

    static privGetInstance() {
        console.assert(SpriteBatchMan.pInstance !== null);
        return SpriteBatchMan.pInstance;
    }

    static Add(name, priority, reserveNum = 3, reserveGrow = 1) {
        const pMan = SpriteBatchMan.privGetInstance();
        const head = pMan.baseGetActive();

        const newHead = pMan.SortedInsert(name, head, priority, reserveNum, reserveGrow);
        pMan.baseSetActive(newHead);

        let pNode = newHead;
        while (pNode !== null) {
            if (pNode.name === name) return pNode;
            pNode = pNode.pNext;
        }
    }

    /**
     * Inserts a SpriteBatch into the active list sorted by priority (Z-Order).
     */
    SortedInsert(name, head, priority, reserveNum, reserveGrow) {
        const pMan = SpriteBatchMan.privGetInstance();
        const pNode = pMan.baseAdd();
        pNode.Set(name, priority, reserveNum, reserveGrow);

        pNode.pNext = null;
        pNode.pPrev = null;

        if (head === null || priority < head.priority) {
            pNode.pNext = head;
            if (head !== null) head.pPrev = pNode;
            return pNode; 
        }

        let current = head;
        while (current.pNext !== null && current.pNext.priority <= priority) {
            current = current.pNext;
        }

        pNode.pNext = current.pNext;
        pNode.pPrev = current;

        if (current.pNext !== null) current.pNext.pPrev = pNode;
        current.pNext = pNode;

        return head; 
    }

    static Draw() {
        const pMan = SpriteBatchMan.privGetInstance();
        let pSpriteBatch = pMan.poActive;

        while (pSpriteBatch !== null) {
            const pSBNodeMan = pSpriteBatch.GetSBNodeMan();
            console.assert(pSBNodeMan !== null);
            pSBNodeMan.Draw();
            pSpriteBatch = pSpriteBatch.pNext;
        }
    }

    static Find(name) {
        const pMan = SpriteBatchMan.privGetInstance();
        pMan.poNodeCompare.name = name;
        return pMan.baseFind(pMan.poNodeCompare);
    }

    static Remove(pNode) {
        const pMan = SpriteBatchMan.privGetInstance();
        console.assert(pNode !== null);
        pMan.baseRemove(pNode);
    }

    static Dump() { SpriteBatchMan.privGetInstance().baseDump(); }

    // --- Manager Overrides ---
    derivedCreateNode() { return new SpriteBatch(); }
    derivedCompare(pLinkA, pLinkB) { return pLinkA.name === pLinkB.name; }
    derivedWash(pLink) { pLink.Wash(); }
    derivedDumpNode(pLink) { pLink.Dump(); }
}