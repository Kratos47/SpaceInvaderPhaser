// Manager.js

export class Manager {


  static get ACTIVE() { return "poActive"; }
  static get RESERVE() { return "poReserve"; }

  // ------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------
  constructor() {

    this.poActive = null;
    this.poReserve = null;

    this.mDeltaGrow = 0;
    this.mTotalNumNodes = 0;
    this.mInitialNumReserved = 0;

    this.mNumReserved = 0;
    this.mNumActive = 0;
  }

  // ------------------------------------------------------------
  // BaseInitialize
  // ------------------------------------------------------------
  baseInitialize(initialNumReserved = 3, deltaGrow = 1) {

    console.assert(initialNumReserved >= 0);
    console.assert(deltaGrow > 0);

    this.mDeltaGrow = deltaGrow;
    this.mInitialNumReserved = initialNumReserved;

    this.privFillReservedPool(initialNumReserved);
  }

  // ------------------------------------------------------------
  // baseSetReserve
  // ------------------------------------------------------------
  baseSetReserve(reserveNum, reserveGrow) {

    this.mDeltaGrow = reserveGrow;

    if (reserveNum > this.mNumReserved) {
      this.privFillReservedPool(reserveNum - this.mNumReserved);
    }
  }

  // ------------------------------------------------------------
  // baseAdd
  // ------------------------------------------------------------
  baseAdd() {

    if (this.poReserve === null) {
      this.privFillReservedPool(this.mDeltaGrow);
    }

    let pLink = Manager.privPullFromFront(this, Manager.RESERVE);
    console.assert(pLink !== null);

    this.derivedWash(pLink);

    this.mNumActive++;
    this.mNumReserved--;

    Manager.privAddToFront(this, Manager.ACTIVE, pLink);

    return pLink;
  }

  // ------------------------------------------------------------
  // baseFind
  // ------------------------------------------------------------
  baseFind(pNodeTarget) {

    let pLink = this.poActive;

    while (pLink !== null) {

      if (this.derivedCompare(pLink, pNodeTarget)) {
        return pLink;
      }

      pLink = pLink.pNext;
    }

    return null;
  }

  // ------------------------------------------------------------
  // baseRemove
  // ------------------------------------------------------------
  baseRemove(pNode) {

    console.assert(pNode !== null);

    Manager.privRemoveNode(this, Manager.ACTIVE, pNode);

    this.derivedWash(pNode);

    Manager.privAddToFront(this, Manager.RESERVE, pNode);

    this.mNumActive--;
    this.mNumReserved++;
  }

  // ------------------------------------------------------------
  // baseGetActive
  // ------------------------------------------------------------
  baseGetActive() {
    return this.poActive;
  }

  // ------------------------------------------------------------
  // baseSetActive
  // ------------------------------------------------------------
  baseSetActive(pNode) {
    this.poActive = pNode;
  }

  // ------------------------------------------------------------
  // baseDump
  // ------------------------------------------------------------
  baseDump() {

    console.log("");
    console.log("****** Manager Begin ******");

    console.log("mDeltaGrow:", this.mDeltaGrow);
    console.log("mTotalNumNodes:", this.mTotalNumNodes);
    console.log("mNumReserved:", this.mNumReserved);
    console.log("mNumActive:", this.mNumActive);

    console.log("\n------ Active List ------");

    let pNode = this.poActive;
    let i = 0;

    while (pNode !== null) {

      console.log(i, "-------------");
      this.derivedDumpNode(pNode);

      pNode = pNode.pNext;
      i++;
    }

    console.log("\n------ Reserve List ------");

    pNode = this.poReserve;
    i = 0;

    while (pNode !== null) {

      console.log(i, "-------------");
      this.derivedDumpNode(pNode);

      pNode = pNode.pNext;
      i++;
    }

    console.log("****** Manager End ******\n");
  }

  // ------------------------------------------------------------
  // Abstract methods
  // ------------------------------------------------------------
  derivedCreateNode() {
    throw new Error("derivedCreateNode must be implemented");
  }

  derivedCompare(pLinkA, pLinkB) {
    throw new Error("derivedCompare must be implemented");
  }

  derivedWash(pLink) {
    throw new Error("derivedWash must be implemented");
  }

  derivedDumpNode(pLink) {
    throw new Error("derivedDumpNode must be implemented");
  }

  // ------------------------------------------------------------
  // Private methods
  // ------------------------------------------------------------
  privFillReservedPool(count) {

    console.assert(count >= 1);

    this.mTotalNumNodes += count;
    this.mNumReserved += count;

    for (let i = 0; i < count; i++) {

      let pNode = this.derivedCreateNode();
      console.assert(pNode !== null);

      Manager.privAddToFront(this, Manager.RESERVE, pNode);
    }
  }

  // ------------------------------------------------------------
  // Static Helpers
  // ------------------------------------------------------------

  static privAddToFront(man, listName, pNode) {

    console.assert(pNode !== null);

    let pHead = man[listName];

    if (pHead === null) {

      man[listName] = pNode;
      pNode.pNext = null;
      pNode.pPrev = null;

    } else {

      pNode.pPrev = null;
      pNode.pNext = pHead;

      pHead.pPrev = pNode;
      man[listName] = pNode;
    }

    console.assert(man[listName] !== null);
  }

  static privPullFromFront(man, listName) {

    let pHead = man[listName];
    console.assert(pHead !== null);

    let pNode = pHead;

    man[listName] = pHead.pNext;

    if (man[listName] !== null) {
      man[listName].pPrev = null;
    }

    // equivalent to C# Clear()
    pNode.pNext = null;
    pNode.pPrev = null;

    return pNode;
  }

  static privRemoveNode(man, listName, pNode) {

    console.assert(man[listName] !== null);
    console.assert(pNode !== null);

    if (pNode.pPrev !== null) {
      pNode.pPrev.pNext = pNode.pNext;
    }
    else {
      man[listName] = pNode.pNext;
    }

    if (pNode.pNext !== null) {
      pNode.pNext.pPrev = pNode.pPrev;
    }

    // equivalent to C# Clear()
    pNode.pNext = null;
    pNode.pPrev = null;
  }
}