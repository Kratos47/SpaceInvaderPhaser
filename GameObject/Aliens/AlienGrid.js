import { Composite } from "../../Composite/Composite.js";

export class AlienGrid extends Composite {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;
    }
}