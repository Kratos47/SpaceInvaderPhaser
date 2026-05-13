import { Leaf } from "../../Composite/Leaf.js";

export class WallCategory extends Leaf {
    static Type = Object.freeze({
        WallGroup: "WallGroup",
        Right: "Right",
        Left: "Left",
        Bottom: "Bottom",
        Top: "Top",
        Unitialized: "Unitialized"
    });

    constructor(name, spriteName, type) {
        super(name, spriteName);
        this.type = type;
    }

    GetCategoryType() {
        return this.type;
    }
}