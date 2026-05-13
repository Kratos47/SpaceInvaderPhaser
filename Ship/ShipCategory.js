import { Leaf } from "../Composite/Leaf.js"; // Adjust path if needed

export class ShipCategory extends Leaf {
    static Type = Object.freeze({
        Ship: "Ship",
        ShipRoot: "ShipRoot",
        Unitialized: "Unitialized"
    });

    constructor(name, spriteName, shipType) {
        super(name, spriteName);
        this.type = shipType;
    }
}