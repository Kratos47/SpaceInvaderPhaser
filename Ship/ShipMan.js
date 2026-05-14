import { ShipStateReady } from "./ShipStateReady.js";
import { ShipStateMissileFlying } from "./ShipStateMissileFlying.js";
import { ShipStateDead } from "./ShipStateDead.js";
import { Ship } from "./Ship.js";
import { Missile } from "../GameObject/Missiles/Missile.js"
import { GameObject } from "../GameObject/GameObject.js";
import { GameSprite } from "../Sprite/GameSprite.js";
import { GameObjectMan } from "../GameObject/GameObjectMan.js";
// 🔥 FIX: Must import SpriteBatches to render!
import { SpriteBatchMan } from "../SpriteBatch/SpriteBatchMan.js";
import { SpriteBatch } from "../SpriteBatch/SpriteBatch.js";

export class ShipMan {
    static State = Object.freeze({
        Ready: "Ready",
        MissileFlying: "MissileFlying",
        Dead: "Dead"
    });

    constructor() {
        this.pStateReady = new ShipStateReady();
        this.pStateMissileFlying = new ShipStateMissileFlying();
        this.pStateDead = new ShipStateDead();
        this.pShip = null;
        this.pMissile = null;
    }

    static Create() {
        if (ShipMan.instance === null) {
            ShipMan.instance = new ShipMan();
        }
        ShipMan.instance.pShip = ShipMan.ActivateShip();
        ShipMan.instance.pShip.SetState(ShipMan.State.Ready);
    }

    static PrivInstance() {
        return ShipMan.instance;
    }

    static GetShip() {
        return ShipMan.PrivInstance().pShip;
    }

    static GetState(state) {
        const pShipMan = ShipMan.PrivInstance();
        switch (state) {
            case ShipMan.State.Ready: return pShipMan.pStateReady;
            case ShipMan.State.MissileFlying: return pShipMan.pStateMissileFlying;
            case ShipMan.State.Dead: return pShipMan.pStateDead;
            default: return null;
        }
    }

    static GetMissile() {
        return ShipMan.PrivInstance().pMissile;
    }

static ActivateMissile() {
        const pShipMan = ShipMan.PrivInstance();

        // Copy over safe copy
        const pMissile = new Missile(GameObject.Name.PlayerShot, GameSprite.Name.PlayerShot, 400, 100);
        pShipMan.pMissile = pMissile;

        // 🔥 FIX: Attach the missile to the SpriteBatches so it renders!
        const pSB_Aliens = SpriteBatchMan.Find(SpriteBatch.Name.Aliens);
        const pSB_Boxes = SpriteBatchMan.Find(SpriteBatch.Name.Boxes);
        pMissile.ActivateGameSprite(pSB_Aliens);
        pMissile.ActivateCollisionSprite(pSB_Boxes);

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

        // 🔥 FIX: Attach the Ship to the SpriteBatch so it renders!
        const pSB_Aliens = SpriteBatchMan.Find(SpriteBatch.Name.Aliens);
        pShip.ActivateGameSprite(pSB_Aliens);

        // Attach the ship to the ship root
        const pShipRoot = GameObjectMan.Find(GameObject.Name.ShipRoot);
        console.assert(pShipRoot !== null);

        // Add to GameObject Tree - {update and collisions}
        pShipRoot.Add(pShipMan.pShip);

        return pShipMan.pShip;
    }
}
ShipMan.instance = null;