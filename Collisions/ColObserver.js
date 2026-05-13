import { DLink } from "../Manager/DLink.js";

export class ColObserver extends DLink {
    constructor() {
        super();
        this.pSubject = null;
    }

    Notify() {
        console.assert(false, "Notify() must be implemented by subclass");
    }

    // WHY not add a state pattern into our Observer!
    Execute() {
        // default implementation
    }
}