import { ShipStateReady } from "./ShipStateReady.js";
import { ShipStateMissileFlying } from "./ShipStateMissileFlying.js";
import { ShipStateDead } from "./ShipStateDead.js";
import { Ship } from "./Ship.js";
import { Missile } from "../GameObject/Missiles/Missile.js"
import { GameObject } from "../GameObject/GameObject.js";
import { GameSprite } from "../Sprite/GameSprite.js";
import { GameObjectMan } from "../GameObject/GameObjectMan.js";

export class ShipMan {
    static State = Object.freeze({
        Ready: "Ready",
        MissileFlying: "MissileFlying",
        Dead: "Dead"
    });

    constructor() {
        // Store the states
        this.pStateReady = new ShipStateReady();
        this.pStateMissileFlying = new ShipStateMissileFlying();
        this.pStateDead = new ShipStateDead();

        // set active
        this.pShip = null;
        this.pMissile = null;
    }

    static Create() {
        console.assert(ShipMan.instance === null, "ShipMan already initialized");
        if (ShipMan.instance === null) {
            ShipMan.instance = new ShipMan();
        }

        ShipMan.instance.pShip = ShipMan.ActivateShip();
        ShipMan.instance.pShip.SetState(ShipMan.State.Ready);
    }

    static PrivInstance() {
        console.assert(ShipMan.instance !== null, "ShipMan not initialized");
        return ShipMan.instance;
    }

    static GetShip() {
        const pShipMan = ShipMan.PrivInstance();
        console.assert(pShipMan !== null);
        console.assert(pShipMan.pShip !== null);
        return pShipMan.pShip;
    }

    static GetState(state) {
        const pShipMan = ShipMan.PrivInstance();
        let pShipState = null;

        switch (state) {
            case ShipMan.State.Ready:
                pShipState = pShipMan.pStateReady;
                break;
            case ShipMan.State.MissileFlying:
                pShipState = pShipMan.pStateMissileFlying;
                break;
            case ShipMan.State.Dead:
                pShipState = pShipMan.pStateDead;
                break;
            default:
                console.assert(false, "Unknown Ship State");
                break;
        }

        return pShipState;
    }

    static GetMissile() {
        const pShipMan = ShipMan.PrivInstance();
        return pShipMan.pMissile;
    }

    static ActivateMissile() {
        const pShipMan = ShipMan.PrivInstance();

        // Copy over safe copy
        const pMissile = new Missile(GameObject.Name.PlayerShot, GameSprite.Name.PlayerShot, 400, 100);
        pShipMan.pMissile = pMissile;

        // Attach the missile to the missile root
        const pMissileGroup = GameObjectMan.Find(GameObject.Name.MissileGroup);
        console.assert(pMissileGroup !== null);

        // Add to GameObject Tree - {update and collisions}
        pMissileGroup.Add(pShipMan.pMissile);

        return pShipMan.pMissile;
    }

    static ActivateShip() {
        const pShipMan = ShipMan.PrivInstance();

        // Adjusted Y coordinate to 900 to sit at the bottom of the Phaser screen
        const pShip = new Ship(GameObject.Name.Ship, GameSprite.Name.Ship, 448, 900); 
        pShipMan.pShip = pShip;

        // Attach the ship to the ship root
        const pShipRoot = GameObjectMan.Find(GameObject.Name.ShipRoot);
        console.assert(pShipRoot !== null);

        // Add to GameObject Tree - {update and collisions}
        pShipRoot.Add(pShipMan.pShip);

        return pShipMan.pShip;
    }
}

ShipMan.instance = null;