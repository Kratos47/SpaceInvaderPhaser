import { ColObserver } from "../Collisions/ColObserver.js"
import { ShipMan } from "../Ship/ShipMan.js"; // Adjust path as necessary

export class ShipReadyObserver extends ColObserver {
    Notify() {
        const pShip = ShipMan.GetShip();
        if (pShip) {
            // Correction... only method that changes state is Handle
            pShip.Handle();
        }
    }
}