import { Manager } from "../Manager/Manager.js";
import { GameObjectNode } from "./GameObjectNode.js";
import { ReverseIterator } from "../Composite/ReverseIterator.js"; 

import { Component } from "../Composite/Component.js";
import { GameObject } from "./GameObject.js";
import { Leaf } from "../Composite/Leaf.js";
import { Composite } from "../Composite/Composite.js";
import { NullGameObject } from "./NullGameObject.js";

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
        console.assert(pNode !== null);
        const pMan = GameObjectMan.privGetInstance();

        // JS Hack for Method Overloading: 
        if (pNode.poGameObj !== undefined) {
            // Remove(GameObjectNode pNode)
            pMan.baseRemove(pNode);
        } else {
            // Remove(GameObject pNode) (Keenan 23.E)
            let pTmp = pNode;
            let pRoot = null;

            while (pTmp !== null) {
                pRoot = pTmp;
                pTmp = pTmp.pParent; 
            }

            let pTree = pMan.baseGetActive();
            while (pTree !== null) {
                if (pTree.poGameObj === pRoot) break;
                pTree = pTree.pNext;
            }

            console.assert(pTree !== null, "Tree not found in active list");
            console.assert(pTree.poGameObj !== null);
            console.assert(pTree.poGameObj !== pNode, "Cannot delete tree root directly");

            let pParent = pNode.pParent;
            console.assert(pParent !== null, "Node has no parent");

            pParent.Remove(pNode);
        }
    }

    static Update() {
        const pMan = GameObjectMan.privGetInstance();
        let pGameObjectNode = pMan.baseGetActive();

        while (pGameObjectNode !== null) {
            const pRev = new ReverseIterator(pGameObjectNode.poGameObj);
            let pNode = pRev.First();

            while (!pRev.IsDone()) {
                pNode.Update();
                pNode = pRev.Next();
            }
            pGameObjectNode = pGameObjectNode.pNext;
        }
    }

    static Dump() { 
        GameObjectMan.privGetInstance().baseDump(); 
    }

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

// --- DEPENDENCY INJECTION FIX ---
// Hand the fully built GameObjectMan back to GameObject so it can use .Remove()
GameObject.GameObjectManRef = GameObjectMan;