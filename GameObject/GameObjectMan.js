import { Manager } from "../Manager/Manager.js";
import { GameObjectNode } from "./GameObjectNode.js";
import { NullGameObject } from "./NullGameObject.js";
import { ForwardIterator } from "../Composite/ForwardIterator.js";

export class GameObjectMan extends Manager {
    static pInstance = null;

    constructor(reserveNum = 3, reserveGrow = 1) {
        super();
        this.baseInitialize(reserveNum, reserveGrow);

        this.poNodeCompare = new GameObjectNode();
        this.poNullGameObject = new NullGameObject();
        this.poNodeCompare.poGameObj = this.poNullGameObject;
    }

    static Create(reserveNum = 3, reserveGrow = 1) {
        console.assert(reserveNum > 0 && reserveGrow > 0);
        if (GameObjectMan.pInstance === null) {
            GameObjectMan.pInstance = new GameObjectMan(reserveNum, reserveGrow);
        }
    }

    static Attach(pGameObject) {
        const pMan = GameObjectMan.privGetInstance();
        const pNode = pMan.baseAdd();
        console.assert(pNode !== null);

        pNode.Set(pGameObject);
        return pNode;
    }

    static Find(name) {
        const pMan = GameObjectMan.privGetInstance();
        pMan.poNodeCompare.poGameObj.name = name;

        const pNode = pMan.baseFind(pMan.poNodeCompare);
        console.assert(pNode !== null, `GameObjectMan could not find: ${name}`);

        return pNode.poGameObj;
    }

    static Remove(pNode) {
        const pMan = GameObjectMan.privGetInstance();
        console.assert(pNode !== null);
        pMan.baseRemove(pNode);
    }

    static Update() {
        const pMan = GameObjectMan.privGetInstance();
        const pNode = pMan.baseGetActive();

        if (pNode === null) return;

        let root = pNode.poGameObj;
        if (root && root.pParent && root.pParent.pParent) {
             root = root.pParent.pParent;
        }
        
        const pIt = new ForwardIterator(root);
        let pComponentNode = pIt.First();

        while (!pIt.IsDone()) {
            pNode.poGameObj = pComponentNode;
            pNode.poGameObj.Update();
            pComponentNode = pIt.Next();
        }
    }

    static Dump() { GameObjectMan.privGetInstance().baseDump(); }

    // --- Manager Overrides ---
    derivedCreateNode() { return new GameObjectNode(); }
    derivedCompare(pLinkA, pLinkB) {
        return pLinkA.poGameObj.GetName() === pLinkB.poGameObj.GetName();
    }
    derivedWash(pLink) { pLink.Wash(); }
    derivedDumpNode(pLink) { pLink.Dump(); }

    static privGetInstance() {
        console.assert(GameObjectMan.pInstance !== null);
        return GameObjectMan.pInstance;
    }
}