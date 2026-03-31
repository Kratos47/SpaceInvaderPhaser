import { Leaf } from "../Composite/Leaf.js";
import { GameObject } from "./GameObject.js";

export class NullGameObject extends Leaf {
    constructor() {
        super(GameObject.Name.Null_Object, null);
    }

    Update() {
        // do nothing - its a null object
    }
}