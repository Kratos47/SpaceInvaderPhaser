import { ShipState } from "./ShipState.js";
import { ShipMan } from "./ShipMan.js";

export class ShipStateMissileFlying extends ShipState {
    Handle(pShip) {
        pShip.SetState(ShipMan.State.Ready);
    }

    MoveRight(pShip) {
        pShip.x += pShip.shipSpeed;
    }

    MoveLeft(pShip) {
        pShip.x -= pShip.shipSpeed;
    }

    ShootMissile(pShip) {
        // Ignored! The ship cannot shoot while a missile is already flying.
    }
}