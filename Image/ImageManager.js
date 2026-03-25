// ImageMan.js

import { Manager } from "../Manager/Manager.js";
import { Image } from "./Image.js";
import { TextureMan } from "../Texture/TextureManager.js";

export class ImageMan extends Manager {
  // ------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------
  constructor(reserveNum = 3, reserveGrow = 1) {
    super(); // base()

    this.baseInitialize(reserveNum, reserveGrow);

    // derived data
    this.poNodeCompare = new Image();
  }

  // ------------------------------------------------------------
  // Static Methods
  // ------------------------------------------------------------
  static Create(reserveNum = 3, reserveGrow = 1) {
    console.assert(reserveNum > 0);
    console.assert(reserveGrow > 0);
    console.assert(ImageMan.pInstance === null);

    if (ImageMan.pInstance === null) {
      ImageMan.pInstance = new ImageMan(reserveNum, reserveGrow);
    }
  }

  static Destroy() {
    const pMan = ImageMan.privGetInstance();
    console.assert(pMan !== null);

    // intentionally empty (same as C#)
  }

  static Add(imageName, textureName, x, y, width, height, sourceIndex = 0) {
    const pMan = ImageMan.privGetInstance();
    console.assert(pMan !== null);

    const pNode = pMan.baseAdd();
    console.assert(pNode !== null);

    const pTexture = TextureMan.Find(textureName);
    console.assert(pTexture !== null);

    pNode.Set(imageName, pTexture,  x, y, width, height, sourceIndex,);
    return pNode;
  }

  static Find(name) {
    const pMan = ImageMan.privGetInstance();
    console.assert(pMan !== null);

    pMan.poNodeCompare.name = name;
    return pMan.baseFind(pMan.poNodeCompare);
  }

  static Remove(pNode) {
    const pMan = ImageMan.privGetInstance();
    console.assert(pMan !== null);
    console.assert(pNode !== null);

    pMan.baseRemove(pNode);
  }

  static Dump() {
    const pMan = ImageMan.privGetInstance();
    console.assert(pMan !== null);

    pMan.baseDump();
  }

  // ------------------------------------------------------------
  // Override abstract methods
  // ------------------------------------------------------------
  derivedCreateNode() {
    const pNode = new Image();
    console.assert(pNode !== null);
    return pNode;
  }

  derivedCompare(pLinkA, pLinkB) {
    console.assert(pLinkA !== null);
    console.assert(pLinkB !== null);

    return pLinkA.name === pLinkB.name;
  }

  derivedWash(pLink) {
    console.assert(pLink !== null);
    pLink.Wash();
  }

  derivedDumpNode(pLink) {
    console.assert(pLink !== null);
    pLink.Dump();
  }

  // ------------------------------------------------------------
  // Private methods
  // ------------------------------------------------------------
  static privGetInstance() {
    console.assert(ImageMan.pInstance !== null);
    return ImageMan.pInstance;
  }

  // ------------------------------------------------------------
  // Data
  // ------------------------------------------------------------
  static pInstance = null;
  // poNodeCompare
}
