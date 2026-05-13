import { Leaf } from "../../Composite/Leaf.js";

export class MissileCategory extends Leaf {
    static Type = Object.freeze({
        Missile: "Missile",
        MissileGroup: "MissileGroup",
        Unitialized: "Unitialized"
    });

    constructor(name, spriteName) {
        super(name, spriteName);
    }
}