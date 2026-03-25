// TextureMan.js
import { Manager } from "../Manager/Manager.js";
import { Texture } from "./Texture.js";

export class TextureMan extends Manager {

    // ------------------------------------------------------------
    // Constructor (PRIVATE in C#)
    // ------------------------------------------------------------

    constructor(reserveNum = 1, reserveGrow = 1) {
        super(); // base()

        // Base manager initialization
        this.baseInitialize(reserveNum, reserveGrow);

        // ------------------------------------------------------------
        // Instance Data (C# private readonly Texture poNodeCompare)
        // ------------------------------------------------------------
        this.poNodeCompare = new Texture();
    }

    // ------------------------------------------------------------
    // Static Methods
    // ------------------------------------------------------------
    static Create(reserveNum = 1, reserveGrow = 1) {
        console.assert(reserveNum > 0);
        console.assert(reserveGrow > 0);

        console.assert(TextureMan.pInstance === null);

        if (TextureMan.pInstance === null) {
            TextureMan.pInstance = new TextureMan(reserveNum, reserveGrow);
        }
    }

    static Destroy() {
        const pMan = TextureMan.privGetInstance();
        console.assert(pMan !== null);

        // Same as C#: intentionally empty
        // (future stats / cleanup hooks)
        TextureMan.pInstance = null;
    }

    static Add(name, textureName) {
        const pMan = TextureMan.privGetInstance();
        console.assert(pMan !== null);

        const pNode = pMan.baseAdd();
        console.assert(pNode !== null);

        console.assert(textureName !== null);
        pNode.Set(name, textureName);

        return pNode;
    }

    static Find(name) {
        const pMan = TextureMan.privGetInstance();
        console.assert(pMan !== null);

        // Use compare node
        pMan.poNodeCompare.name = name;

        const pData = pMan.baseFind(pMan.poNodeCompare);
        return pData;
    }

    static Remove(pNode) {
        const pMan = TextureMan.privGetInstance();
        console.assert(pMan !== null);
        console.assert(pNode !== null);

        pMan.baseRemove(pNode);
    }

    static Dump() {
        const pMan = TextureMan.privGetInstance();
        console.assert(pMan !== null);

        pMan.baseDump();
    }

    // ------------------------------------------------------------
    // Override Abstract Methods (Manager hooks)
    // ------------------------------------------------------------
    derivedCreateNode() {
        const pNode = new Texture();
        console.assert(pNode !== null);
        return pNode;
    }

    derivedCompare(pLinkA, pLinkB) {
        console.assert(pLinkA !== null);
        console.assert(pLinkB !== null);

        const pDataA = pLinkA;
        const pDataB = pLinkB;

        let status = false;

        if (pDataA.name === pDataB.name) {
            status = true;
        }

        return status;
    }

    derivedWash(pLink) {
        console.assert(pLink !== null);
        const pNode = pLink;
        pNode.Wash();
    }

    derivedDumpNode(pLink) {
        console.assert(pLink !== null);
        const pData = pLink;
        pData.dump();
    }

    // ------------------------------------------------------------
    // Private Static Helper
    // ------------------------------------------------------------
    static privGetInstance() {
        console.assert(TextureMan.pInstance !== null);
        return TextureMan.pInstance;
    }
}

// ------------------------------------------------------------
// Static Data
// ------------------------------------------------------------
TextureMan.pInstance = null;
