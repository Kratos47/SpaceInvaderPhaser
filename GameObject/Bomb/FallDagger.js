import { FallStrategy } from "./FallStrategy.js";

export class FallDagger extends FallStrategy {
    constructor() {
        super();
        this.oldPosY = 0.0;
    }

    Reset(posY) {
        this.oldPosY = posY;
    }

    Fall(pBomb) {
        console.assert(pBomb !== null);

        // 🔥 PHASER Y-AXIS FIX: Add height instead of subtract!
        const targetY = this.oldPosY + (1.0 * pBomb.GetBoundingBoxHeight());

        if (pBomb.y > targetY) {
            pBomb.MultiplyScale(1.0, -1.0);
            this.oldPosY = targetY;
        }
    }
}