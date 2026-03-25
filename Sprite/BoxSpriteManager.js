// BoxSpriteMan.js

import { Manager } from "../Manager/Manager.js"
import { BoxSprite } from "./BoxSprite.js"


export class BoxSpriteMan extends Manager {

  // ------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------
  constructor(reserveNum = 3, reserveGrow = 1) {
    super(); // base()

    this.baseInitialize(reserveNum, reserveGrow);

    this.poNodeCompare = new BoxSprite();
  }

  // ------------------------------------------------------------
  // Static Methods
  // ------------------------------------------------------------
  static Create(reserveNum = 3, reserveGrow = 1) {
    console.assert(reserveNum > 0);
    console.assert(reserveGrow > 0);
    console.assert(BoxSpriteMan.pInstance === null);

    if (BoxSpriteMan.pInstance === null) {
      BoxSpriteMan.pInstance = new BoxSpriteMan(reserveNum, reserveGrow);
    }
  }

  static Destroy() {
    const pMan = BoxSpriteMan.privGetInstance();
    console.assert(pMan !== null);
    // intentionally empty (same as C#)
  }

  static Add(name, x, y, width, height, pLineColor = null,lineWidth = 2, Alpha = 1) {
    const pMan = BoxSpriteMan.privGetInstance();
    console.assert(pMan !== null);

    const pNode = pMan.baseAdd();
    console.assert(pNode !== null);

    pNode.Set(name, x, y, width, height, pLineColor, lineWidth, Alpha);

    return pNode;
  }

  static Find(name) {
    const pMan = BoxSpriteMan.privGetInstance();
    console.assert(pMan !== null);

    pMan.poNodeCompare.name = name;

    return pMan.baseFind(pMan.poNodeCompare);
  }

  static Remove(pNode) {
    const pMan = BoxSpriteMan.privGetInstance();
    console.assert(pMan !== null);
    console.assert(pNode !== null);

    pMan.baseRemove(pNode);
  }

  static Dump() {
    const pMan = BoxSpriteMan.privGetInstance();
    console.assert(pMan !== null);

    pMan.baseDump();
  }

  // ------------------------------------------------------------
  // Overrides
  // ------------------------------------------------------------
  derivedCreateNode() {
    const pNode = new BoxSprite();
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
  // Private
  // ------------------------------------------------------------
  static privGetInstance() {
    console.assert(BoxSpriteMan.pInstance !== null);
    return BoxSpriteMan.pInstance;
  }

  // ------------------------------------------------------------
  // Data
  // ------------------------------------------------------------
  static pInstance = null;
}