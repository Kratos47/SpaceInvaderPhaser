import { InputObserver } from "./InputObserver.js";
import { ShipMan } from "../Ship/ShipMan.js";

export class MoveRightObserver extends InputObserver {
    Notify() {
        const pShip = ShipMan.GetShip();
        if (pShip) pShip.MoveRight();
    }
}