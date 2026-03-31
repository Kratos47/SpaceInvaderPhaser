import { AlienCategory } from "./AlienCategory.js";

export class Squid extends AlienCategory {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;
    }
}