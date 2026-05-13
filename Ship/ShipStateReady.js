import { ShipState } from "./ShipState.js";
import { ShipMan } from "./ShipMan.js";
import { activeScene } from "../Globals.js";

export class ShipStateReady extends ShipState {
    Handle(pShip) {
        pShip.SetState(ShipMan.State.MissileFlying);
    }

    MoveRight(pShip) {
        pShip.x += pShip.shipSpeed;
    }

    MoveLeft(pShip) {
        pShip.x -= pShip.shipSpeed;
    }

    ShootMissile(pShip) {
        const pMissile = ShipMan.ActivateMissile();

        // Subtracted 20 because in web coordinates, UP is negative Y!
        pMissile.SetPos(pShip.x, pShip.y - 20);
        pMissile.SetActive(true);
        
        // Use Phaser's native sound system
        activeScene.sound.play('shoot', { volume: 0.2 }); 

        // switch states
        this.Handle(pShip);
    }
}