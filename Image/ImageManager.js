import { Manager } from "../Manager/Manager.js";
import { Image } from "./Image.js";
import { TextureMan } from "../Texture/TextureManager.js";
import { Texture } from "../Texture/Texture.js";

export class ImageMan extends Manager {
    static pInstance = null;

    constructor(reserveNum = 3, reserveGrow = 1) {
        super();
        this.baseInitialize(reserveNum, reserveGrow);
        this.poNodeCompare = new Image();
    }

    static Create(reserveNum = 3, reserveGrow = 1) {
        if (ImageMan.pInstance === null) {
            ImageMan.pInstance = new ImageMan(reserveNum, reserveGrow);
        }

        // Initialize default objects exactly like ImageMan.cs
        ImageMan.Add(Image.Name.NullObject, Texture.Name.Default, 0, 0, 128, 128);
        ImageMan.Add(Image.Name.Default, Texture.Name.Default, 0, 0, 128, 128);
    }

    static Add(imageName, textureName, x, y, width, height) {
        const pMan = ImageMan.privGetInstance();
        const pNode = pMan.baseAdd();

        let pTexture = TextureMan.Find(textureName);
        
        // Safety Fallback to prevent null reference errors
        if (pTexture === null) {
            pTexture = TextureMan.Find(Texture.Name.Default);
        }

        pNode.Set(imageName, pTexture, x, y, width, height);
        return pNode;
    }

    static Find(name) {
        const pMan = ImageMan.privGetInstance();
        pMan.poNodeCompare.SetName(name);
        return pMan.baseFind(pMan.poNodeCompare);
    }

    static privGetInstance() {
        console.assert(ImageMan.pInstance !== null);
        return ImageMan.pInstance;
    }

    derivedCreateNode() { return new Image(); }
    derivedCompare(pA, pB) { return pA.GetName() === pB.GetName(); }
    derivedWash(pLink) { pLink.Wash(); }
    derivedDumpNode(pLink) { pLink.Dump(); }
}