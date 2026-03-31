import { GameObject } from "../GameObject/GameObject.js";
import { Iterator } from "./Iterator.js";
import { Component } from "./Component.js"

export class Leaf extends GameObject {
    constructor(gameName, spriteName = null) {
        super(gameName, spriteName);
        this.holder = Component.Container.LEAF;
    }

    Add(c) {
        console.assert(false, "Cannot add to a Leaf");
    }

    Remove(c) {
        console.assert(false, "Cannot remove from a Leaf");
    }

    Print() {
        const parentHash = Iterator.GetParent(this) ? "HasParent" : "null";
        console.log(` GameObject Name: ${this.GetName()} (${this})  parent:${parentHash}`);
    }

    Move() {
        console.assert(false, "Leaf nodes should not move independently in this design");
    }

    GetFirstChild() {
        console.assert(false, "Leaf has no children");
        return null;
    }

    GetLastChild() {
        console.assert(false, "Leaf has no children");
        return null;
    }

    DumpNode() {
        const parentHash = Iterator.GetParent(this) ? "HasParent" : "null";
        console.log(` GameObject Name: ${this.GetName()} (${this}) parent:${parentHash}`);
    }
}