import { Manager } from "../Manager/Manager.js";
import { ColPair } from "./ColPair.js";

export class ColPairMan extends Manager {
    constructor(reserveNum = 3, reserveGrow = 1) {
        super();
        this.baseInitialize(reserveNum, reserveGrow);
        this.pActiveColPair = null;
        this.poNodeCompare = new ColPair();
    }

    static Create(reserveNum = 3, reserveGrow = 1) {
        if (ColPairMan.pInstance === null) {
            ColPairMan.pInstance = new ColPairMan(reserveNum, reserveGrow);
        }
    }

    static Add(colpairName, treeRootA, treeRootB) {
        const pMan = ColPairMan.privGetInstance();
        const pColPair = pMan.baseAdd();
        pColPair.Set(colpairName, treeRootA, treeRootB);
        return pColPair;
    }

    static Process() {
        const pMan = ColPairMan.privGetInstance();
        let pColPair = pMan.baseGetActive();

        while (pColPair !== null) {
            pMan.pActiveColPair = pColPair;
            pColPair.Process();
            pColPair = pColPair.pNext;
        }
    }

    static GetActiveColPair() {
        return ColPairMan.privGetInstance().pActiveColPair;
    }

    derivedCreateNode() { return new ColPair(); }
    derivedCompare(pA, pB) { return pA.GetName() === pB.GetName(); }
    derivedWash(pLink) { pLink.Wash(); }

    static privGetInstance() {
        console.assert(ColPairMan.pInstance !== null);
        return ColPairMan.pInstance;
    }
}
ColPairMan.pInstance = null;