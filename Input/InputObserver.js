import { DLink } from "../Manager/DLink.js";

export class InputObserver extends DLink {
    constructor() {
        super();
        this.pSubject = null;
    }

    Notify() {
        console.assert(false, "InputObserver.Notify() must be implemented by concrete class");
    }
}