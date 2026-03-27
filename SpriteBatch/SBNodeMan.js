/**
 * @file SBNodeMan.js
 * @description Manages a list of SBNodes attached to a specific SpriteBatch.
 */

import { Manager } from "../Manager/Manager.js";
import { SBNode } from "./SBNode.js";

export class SBNodeMan_Link extends Manager {
    constructor() {
        super();
        this.poActive = null;
        this.poReserve = null;
    }
}

export class SBNodeMan extends SBNodeMan_Link {
    constructor(reserveNum = 3, reserveGrow = 1) {
        super();
        this.baseInitialize(reserveNum, reserveGrow);
        this.poNodeCompare = new SBNode();
        this.name = null;
    }

    Set(name, reserveNum, reserveGrow) {
        this.name = name;
        console.assert(reserveNum > 0);
        console.assert(reserveGrow > 0);
        this.baseSetReserve(reserveNum, reserveGrow);
    }

    Attach(name) {
        const pNode = this.baseAdd();
        console.assert(pNode !== null);
        pNode.Set(name);
        return pNode;
    }

    Draw() {
        let pNode = this.baseGetActive();
        while (pNode !== null) {
            pNode.pSpriteBase.Render();
            pNode = pNode.pNext;
        }
    }

    Remove(pNode) {
        console.assert(pNode !== null);
        this.baseRemove(pNode);
    }

    Dump() { this.baseDump(); }

    // --- Manager Overrides ---
    derivedCreateNode() { return new SBNode(); }
    derivedCompare(pLinkA, pLinkB) { return false; } // Node comparison usually not needed here
    derivedWash(pLink) { pLink.Wash(); }
    derivedDumpNode(pLink) { /* Custom Dump Logic */ }
}