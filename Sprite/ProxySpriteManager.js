import { Manager } from "../Manager/Manager.js";
import { ProxySprite } from "./ProxySprite.js";

export class ProxySpriteMan_Link extends Manager {
    constructor() {
        super();
        this.poActive = null;
        this.poReserve = null;
    }
}

export class ProxySpriteMan extends ProxySpriteMan_Link {
    
    constructor(reserveNum = 3, reserveGrow = 1) {
        super();
        this.baseInitialize(reserveNum, reserveGrow);
        this.poNodeCompare = new ProxySprite();
    }

    //----------------------------------------------------------------------
    // Static Methods
    //----------------------------------------------------------------------
    static Create(reserveNum = 3, reserveGrow = 1) {
        console.assert(reserveNum > 0);
        console.assert(reserveGrow > 0);
        console.assert(ProxySpriteMan.pInstance === null);

        if (ProxySpriteMan.pInstance === null) {
            ProxySpriteMan.pInstance = new ProxySpriteMan(reserveNum, reserveGrow);
        }
    }

    static Destroy() {
        const pMan = ProxySpriteMan.privGetInstance();
        console.assert(pMan !== null);
        
        // Track peak number of active nodes, print stats, invalidate singleton
        ProxySpriteMan.pInstance = null;
    }

    static Add(name) {
        const pMan = ProxySpriteMan.privGetInstance();
        console.assert(pMan !== null);

        const pNode = pMan.baseAdd();
        console.assert(pNode !== null);

        pNode.Set(name);
        return pNode;
    }

    static Find(name) {
        const pMan = ProxySpriteMan.privGetInstance();
        console.assert(pMan !== null);

        pMan.poNodeCompare.SetName(name);

        const pData = pMan.baseFind(pMan.poNodeCompare);
        return pData;
    }

    static Remove(pNode) {
        const pMan = ProxySpriteMan.privGetInstance();
        console.assert(pMan !== null);
        console.assert(pNode !== null);
        
        pMan.baseRemove(pNode);
    }

    static Dump() {
        const pMan = ProxySpriteMan.privGetInstance();
        console.assert(pMan !== null);

        pMan.baseDump();
    }

    //----------------------------------------------------------------------
    // Override Abstract methods
    //----------------------------------------------------------------------
    derivedCreateNode() {
        const pNode = new ProxySprite();
        console.assert(pNode !== null);
        return pNode;
    }

    derivedCompare(pLinkA, pLinkB) {
        console.assert(pLinkA !== null);
        console.assert(pLinkB !== null);

        const status = (pLinkA.GetName() === pLinkB.GetName());
        return status;
    }

    derivedWash(pLink) {
        console.assert(pLink !== null);
        pLink.Wash();
    }

    derivedDumpNode(pLink) {
        console.assert(pLink !== null);
        pLink.Dump();
    }

    //----------------------------------------------------------------------
    // Private methods
    //----------------------------------------------------------------------
    static privGetInstance() {
        console.assert(ProxySpriteMan.pInstance !== null, "ProxySpriteMan not initialized! Call Create() first.");
        return ProxySpriteMan.pInstance;
    }
}

//----------------------------------------------------------------------
// Static Data
//----------------------------------------------------------------------
ProxySpriteMan.pInstance = null;