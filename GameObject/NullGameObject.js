import { Leaf } from "../Composite/Leaf.js"; // Adjust path if needed
import { GameObject } from "./GameObject.js";
import { GameSprite } from "../Sprite/GameSprite.js"; // Need this for the enum!

export class NullGameObject extends Leaf {
    constructor() {
        // MATCHING C# EXACTLY
        super(GameObject.Name.Null_Object, GameSprite.Name.NullObject);
    }

    Accept(other) {
        other.VisitNullGameObject(this);
    }

    Update() {
        // do nothing - its a null object
    }
}