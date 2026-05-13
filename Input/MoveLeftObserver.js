import { InputObserver } from "./InputObserver.js";
import { ShipMan } from "../Ship/ShipMan.js"; 

export class MoveLeftObserver extends InputObserver {
    Notify() {
        const pShip = ShipMan.GetShip();
        if (pShip) pShip.MoveLeft();
    }
}