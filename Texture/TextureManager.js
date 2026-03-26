import { Manager } from "../Manager/Manager.js";
import { Texture } from "./Texture.js";

export class TextureMan extends Manager {
    static pInstance = null;

    constructor(reserveNum = 1, reserveGrow = 1) {
        super();
        this.baseInitialize(reserveNum, reserveGrow);
        this.poNodeCompare = new Texture();
    }

    static Create(reserveNum = 1, reserveGrow = 1) {
        if (TextureMan.pInstance === null) {
            TextureMan.pInstance = new TextureMan(reserveNum, reserveGrow);
            
            // 🔥 Add Default texture immediately to prevent ImageMan null errors
            TextureMan.Add(Texture.Name.Default, Texture.psDefaultPhaserTexture);
        }
    }

    static Add(name, textureName) {
        const pMan = TextureMan.privGetInstance();
        const pNode = pMan.baseAdd();
        pNode.Set(name, textureName);
        return pNode;
    }

    static Find(name) {
        const pMan = TextureMan.privGetInstance();
        pMan.poNodeCompare.name = name;
        return pMan.baseFind(pMan.poNodeCompare);
    }

    static privGetInstance() {
        console.assert(TextureMan.pInstance !== null);
        return TextureMan.pInstance;
    }

    derivedCreateNode() { return new Texture(); }
    derivedCompare(pA, pB) { return pA.name === pB.name; }
    derivedWash(pLink) { pLink.Wash(); }
    derivedDumpNode(pLink) { pLink.Dump(); }
}