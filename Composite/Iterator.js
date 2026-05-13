import { Component } from "./Component.js";

export class Iterator {
    Next() { throw new Error("Next() must be implemented"); }
    IsDone() { throw new Error("IsDone() must be implemented"); }
    First() { throw new Error("First() must be implemented"); }

    static GetParent(pNode) {
        // Force undefined to null
        return pNode.pParent || null; 
    }

    static GetChild(pNode) {
        if (pNode.holder === Component.Container.COMPOSITE) {
            return pNode.GetFirstChild() || null;
        }
        return null;
    }

    static GetSibling(pNode) {
        // Force undefined to null
        return pNode.pNext || null; 
    }
}