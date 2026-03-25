// SpriteBatchMan.js

import { Manager } from "../Manager/Manager.js"
import { SpriteBatch } from "./SpriteBatch.js";

export class SpriteBatchMan_Link extends Manager {

    constructor() {
        super();
        this.poActive = null;
        this.poReserve = null;
    }
}

export class SpriteBatchMan extends SpriteBatchMan_Link {

    constructor(reserveNum = 3, reserveGrow = 1) {

        super();

        this.baseInitialize(reserveNum, reserveGrow);

        this.poNodeCompare = new SpriteBatch();
    }

    // Singleton
    static pInstance = null;

    static Create(reserveNum = 3, reserveGrow = 1) {

        console.assert(reserveNum > 0);
        console.assert(reserveGrow > 0);

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

        // SortedInsert returns the new head of the list
        const newHead = pMan.SortedInsert(name, head, priority, reserveNum, reserveGrow);

        // You MUST tell the base Manager that the active list head has changed
        pMan.baseSetActive(newHead);

        // Now find the specific node you just added to return it to Game.js
        let pNode = newHead;
        while (pNode !== null) {
            if (pNode.name === name) return pNode;
            pNode = pNode.pNext;
        }
    }

    // ------------------------------------------------------------
    // Sorted Insert (FIXED)
    // ------------------------------------------------------------
    SortedInsert(name, head, priority, reserveNum, reserveGrow) {
        const pMan = SpriteBatchMan.privGetInstance();
        console.assert(pMan !== null);

        const pNode = pMan.baseAdd();
        console.assert(pNode !== null);

        pNode.Set(name, priority, reserveNum, reserveGrow);

        // 🔥 CRITICAL: detach node (prevents cycles)
        pNode.pNext = null;
        pNode.pPrev = null;

        // empty OR insert at front
        if (head === null || priority < head.priority) {
            pNode.pNext = head;

            if (head !== null) {
                head.pPrev = pNode;
            }

            return pNode; // new head
        }

        let current = head;

        // walk to correct position
        while (current.pNext !== null && current.pNext.priority <= priority) {
            current = current.pNext;
        }

        // insert AFTER current
        pNode.pNext = current.pNext;
        pNode.pPrev = current;

        if (current.pNext !== null) {
            current.pNext.pPrev = pNode;
        }

        current.pNext = pNode;

        return head; // unchanged head
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

    static Dump() {

        const pMan = SpriteBatchMan.privGetInstance();

        pMan.baseDump();
    }

    // Manager overrides

    derivedCreateNode() {

        const pNode = new SpriteBatch();

        console.assert(pNode !== null);

        return pNode;
    }

    derivedCompare(pLinkA, pLinkB) {

        const pDataA = pLinkA;
        const pDataB = pLinkB;

        return pDataA.name === pDataB.name;
    }

    derivedWash(pLink) {

        const pNode = pLink;

        pNode.Wash();
    }

    derivedDumpNode(pLink) {

        const pNode = pLink;

        pNode.Dump();
    }
}