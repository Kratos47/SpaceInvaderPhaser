import { InputObserver } from "./InputObserver.js";
import { ShipMan } from "../Ship/ShipMan.js";

export class ShootObserver extends InputObserver {
    constructor() {
        super();
        // Removed pSndEngine dependency
    }

    Notify() {
        const pShip = ShipMan.GetShip();
        if (pShip) {
            // Tell the ship to shoot. The ship itself can now call 
            // activeScene.sound.play('shoot') internally!
            pShip.ShootMissile(); 
        }
    }
}