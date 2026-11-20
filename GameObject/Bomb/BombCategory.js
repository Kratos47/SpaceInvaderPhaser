import { Leaf } from "../../Composite/Leaf.js";

export class BombCategory extends Leaf {
    static Type = Object.freeze({
        Bomb: "Bomb",
        BombRoot: "BombRoot",
        Uninitialized: "Uninitialized"
    });

    constructor(name, spriteName, bombType) {
        super(name, spriteName);
        this.type = bombType;
    }
}