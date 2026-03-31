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
        this.baseSetReserve(reserveNum, reserveGrow);
    }

    Attach(spriteParam) {
        const pNode = this.baseAdd();
        console.assert(pNode !== null);
        pNode.Set(spriteParam);
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
        this.baseRemove(pNode);
    }

    Dump() { this.baseDump(); }

    derivedCreateNode() { return new SBNode(); }
    derivedCompare(pLinkA, pLinkB) { return false; } 
    derivedWash(pLink) { pLink.Wash(); }
    derivedDumpNode(pLink) { }
}