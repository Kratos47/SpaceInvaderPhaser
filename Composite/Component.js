import { DLink } from "../Manager/DLink.js"

export class Component extends DLink {
    static Container = Object.freeze({
        LEAF: "LEAF",
        COMPOSITE: "COMPOSITE",
        Unknown: "Unknown"
    });

  // Classic Space Invaders jump distances
    static deltaX = 10.0; 
    static deltaY = 5.0;

    constructor() {
        super();
        this.pParent = null;
        this.holder = Component.Container.Unknown;
    }

    // Abstract Methods - must be overridden
    Add(c) { throw new Error("Add() must be overridden"); }
    Remove(c) { throw new Error("Remove() must be overridden"); }
    Print() { throw new Error("Print() must be overridden"); }
    Move() { throw new Error("Move() must be overridden"); }
    GetFirstChild() { throw new Error("GetFirstChild() must be overridden"); }
    GetLastChild() { throw new Error("GetLastChild() must be overridden"); }
    DumpNode() { throw new Error("DumpNode() must be overridden"); }
}