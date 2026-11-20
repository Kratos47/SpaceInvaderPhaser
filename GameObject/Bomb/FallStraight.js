import { FallStrategy } from "./FallStrategy.js";

export class FallStraight extends FallStrategy {
    constructor() {
        super();
        this.oldPosY = 0.0;
    }

    Reset(posY) {
        this.oldPosY = posY;
    }

    Fall(pBomb) {
        console.assert(pBomb !== null);
        // Do nothing for this strategy
    }
}