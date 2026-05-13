import { ShipState } from "./ShipState.js";
import { ShipMan } from "./ShipMan.js";

export class ShipStateDead extends ShipState {
    Handle(pShip) {
        pShip.SetState(ShipMan.State.Ready);
    }

    MoveRight(pShip) {
        // Player is dead, no movement
    }

    MoveLeft(pShip) {
        // Player is dead, no movement
    }

    ShootMissile(pShip) {
        // Player is dead, no shooting
    }
}