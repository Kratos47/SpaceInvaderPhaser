import { GameObject } from "../GameObject/GameObject.js";
import { Iterator } from "./Iterator.js";
import { Component } from "./Component.js";

export class Composite extends GameObject {
    constructor(gameName = GameObject.Name.Uninitialized, spriteName = null) {
        super(gameName, spriteName);
        this.holder = Component.Container.COMPOSITE;
        this.poHead = null;
        this.poLast = null;
    }

    Add(pComponent) {
        console.assert(pComponent !== null);
        this.privAddToLast(pComponent);
        pComponent.pParent = this;
    }

    Remove(pComponent) {
        console.assert(pComponent !== null);
        this.privRemoveNode(pComponent);
    }

    Print() {
        let pNode = this.poHead;
        while (pNode !== null) {
            pNode.Print();
            pNode = pNode.pNext;
        }
    }

    GetFirstChild() {
        console.assert(this.poHead !== null);
        return this.poHead;
    }

    GetLastChild() {
        console.assert(this.poLast !== null);
        return this.poLast;
    }

    DumpNode() {
        if (Iterator.GetParent(this) !== null) {
            console.log(` GameObject Name:(${this}) parent:HasParent <---- Composite`);
        } else {
            console.log(` GameObject Name:(${this}) parent:null <---- Composite`);
        }
    }

    Move() {
        let pNode = this.poHead;
        while (pNode !== null) {
            pNode.Move();
            pNode = pNode.pNext;
        }
    }

    privRemoveNode(pNode) {
        console.assert(pNode !== null);

        if (pNode.pPrev !== null) {
            pNode.pPrev.pNext = pNode.pNext;
            if (pNode === this.poLast) {
                this.poLast = pNode.pPrev;
            }
        } else {
            this.poHead = pNode.pNext;
            if (pNode === this.poLast) {
                this.poLast = pNode.pNext;
            }
        }

        if (pNode.pNext !== null) {
            pNode.pNext.pPrev = pNode.pPrev;
        }

        pNode.clear();
    }

    privAddToLast(pNode) {
        console.assert(pNode !== null);

        if (this.poLast === this.poHead && this.poHead === null) {
            this.poHead = pNode;
            this.poLast = pNode;
            pNode.pNext = null;
            pNode.pPrev = null;
        } else {
            console.assert(this.poLast !== null);
            this.poLast.pNext = pNode;
            pNode.pPrev = this.poLast;
            pNode.pNext = null;
            this.poLast = pNode;
        }

        console.assert(this.poHead !== null);
        console.assert(this.poLast !== null);
    }
}