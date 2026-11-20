import { Leaf } from "../../Composite/Leaf.js";

export class ShieldCategory extends Leaf {
    static Type = Object.freeze({
        Root: "Root",
        Column: "Column",
        Brick: "Brick",
        Grid: "Grid",
        LeftTop0: "LeftTop0",
        LeftTop1: "LeftTop1",
        LeftBottom: "LeftBottom",
        RightTop0: "RightTop0",
        RightTop1: "RightTop1",
        RightBottom: "RightBottom",
        Uninitialized: "Uninitialized"
    });

    constructor(name, spriteName, shieldType) {
        super(name, spriteName);
        this.type = shieldType;
    }

    GetCategoryType() {
        return this.type;
    }
}