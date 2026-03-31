import { DLink } from "../Manager/DLink.js";

export class GameObjectNode extends DLink {
    constructor() {
        super();
        this.poGameObj = null;
    }

    Set(pGameObject) {
        console.assert(pGameObject !== null);
        this.poGameObj = pGameObject;
    }

    Wash() {
        this.poGameObj = null;
    }

    GetName() {
        return this.poGameObj.name;
    }

    Dump() {
        console.assert(this.poGameObj !== null);
        console.log(`\t\t     GameObject: ${this}`);
        this.poGameObj.Dump();
    }
}