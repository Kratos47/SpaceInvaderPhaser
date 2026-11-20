import { TimeEvent } from "../TimeEvent.js";
import { GameObjectMan } from "../../GameObject/GameObjectMan.js";
import { GameObject } from "../../GameObject/GameObject.js";
import { GameSprite } from "../../Sprite/GameSprite.js";
import { Missile } from "../../GameObject/Missiles/Missile.js"
import { SpriteBatchMan } from "../../SpriteBatch/SpriteBatchMan.js";
import { SpriteBatch } from "../../SpriteBatch/SpriteBatch.js";

export class MissileSpawnEvent extends TimeEvent {
    constructor() {
        super();
    }

    Execute(deltaTime) {
        // 1. Generate random X between 300 and 700 (inclusive)
        const randomX = Math.floor(Math.random() * (700 - 300 + 1)) + 300;

        // 🔥 PHASER Y-AXIS FIX: 
        // In Azul, 100.0f was near the bottom of the screen.
        // In Phaser, the bottom is 1024. We spawn at Y = 900.0 (Ship height).
        const spawnY = 900.0;

        // 2. Create the Missile
        const pMissile = new Missile(
            GameObject.Name.Missile, 
            GameSprite.Name.Missile, 
            randomX, 
            spawnY
        );

        // 3. Attach to rendering lists 
        // (Note: We use the 'Aliens' batch since we dropped the 'Birds' name)
        const pSB_Aliens = SpriteBatchMan.Find(SpriteBatch.Name.Aliens);
        const pSB_Boxes = SpriteBatchMan.Find(SpriteBatch.Name.Boxes);
        
        console.assert(pSB_Aliens !== null, "MissileSpawnEvent: Could not find Aliens SpriteBatch");
        console.assert(pSB_Boxes !== null, "MissileSpawnEvent: Could not find Boxes SpriteBatch");

        pMissile.ActivateGameSprite(pSB_Aliens);
        pMissile.ActivateCollisionSprite(pSB_Boxes);

        // 4. Attach to the MissileRoot
        const pMissileGroup = GameObjectMan.Find(GameObject.Name.MissileGroup);
        console.assert(pMissileGroup !== null, "MissileSpawnEvent: Could not find MissileGroup");
        
        // Add to GameObject Tree - {update and collisions}
        pMissileGroup.Add(pMissile);
    }
}