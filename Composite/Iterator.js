export class Iterator {
    Next() { throw new Error("Next() must be implemented"); }
    IsDone() { throw new Error("IsDone() must be implemented"); }
    First() { throw new Error("First() must be implemented"); }

    static GetParent(pNode) {
        console.assert(pNode !== null);
        return pNode.pParent;
    }

    static GetChild(pNode) {
        console.assert(pNode !== null);
        
        if (pNode.holder === "COMPOSITE") {
            return pNode.GetFirstChild();
        }
        return null;
    }

    static GetSibling(pNode) {
        console.assert(pNode !== null);
        return pNode.pNext;
    }
}