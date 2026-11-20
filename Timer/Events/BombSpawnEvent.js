import { TimeEvent } from "../TimeEvent.js";
import { GameObjectMan } from "../../GameObject/GameObjectMan.js";
import { GameObject } from "../../GameObject/GameObject.js";
import { Bomb } from "../../GameObject/Bomb/Bomb.js";
import { GameSprite } from "../../Sprite/GameSprite.js";
import { FallStraight } from "../../GameObject/Bomb/FallStraight.js";
import { FallZigZag } from "../../GameObject/Bomb/FallZigZag.js";
import { FallDagger } from "../../GameObject/Bomb/FallDagger.js";
import { SpriteBatchMan } from "../../SpriteBatch/SpriteBatchMan.js";
import { SpriteBatch } from "../../SpriteBatch/SpriteBatch.js";
import { Iterator } from "../../Composite/Iterator.js";

export class BombSpawnEvent extends TimeEvent {
    constructor() {
        super();
    }

    Execute(deltaTime) {
        // --- 1. SAFEGUARD: Does the grid still exist? ---
        const pGrid = GameObjectMan.Find(GameObject.Name.AlienGrid);
        if (!pGrid) return; 

        // --- 2. SAFEGUARD: Collect only columns that have living aliens ---
        let activeColumns = [];
        let pColumn = Iterator.GetChild(pGrid);
        
        while (pColumn !== null) {
            // If the column has at least one child (alien), it is active
            if (Iterator.GetChild(pColumn) !== null) {
                activeColumns.push(pColumn);
            }
            pColumn = Iterator.GetSibling(pColumn);
        }

        // If no columns are active (you won the level), abort!
        if (activeColumns.length === 0) return; 

        // --- 3. Pick a random ACTIVE column ---
        const targetCol = activeColumns[Math.floor(Math.random() * activeColumns.length)];

        // --- 4. SAFEGUARD: Find the physically lowest alien (Highest Y in Phaser) ---
        let pAlien = Iterator.GetChild(targetCol);
        let lowestY = -1;
        let spawnX = 0;

        while (pAlien !== null) {
            if (pAlien.y > lowestY) { 
                lowestY = pAlien.y;
                spawnX = pAlien.x;
            }
            pAlien = Iterator.GetSibling(pAlien);
        }

        // --- 5. Pick a random Bomb Strategy ---
        const randStrat = Math.floor(Math.random() * 3);
        let pStrategy = null;
        let spriteName = null;

        if (randStrat === 0) {
            pStrategy = new FallStraight();
            spriteName = GameSprite.Name.BombStraight;
        } else if (randStrat === 1) {
            pStrategy = new FallZigZag();
            spriteName = GameSprite.Name.BombZigZag;
        } else {
            pStrategy = new FallDagger();
            spriteName = GameSprite.Name.BombDagger;
        }

        // --- 6. Spawn the Bomb right on top of the Alien ---
        const pBombRoot = GameObjectMan.Find(GameObject.Name.BombRoot);
        console.assert(pBombRoot !== null, "BombSpawnEvent: Could not find BombRoot");

        // Spawn exactly at the Alien's X and Y
        const pBomb = new Bomb(GameObject.Name.Bomb, spriteName, pStrategy, spawnX, lowestY);
        pBombRoot.Add(pBomb);

        // Attach to rendering lists
        const pSB_Aliens = SpriteBatchMan.Find(SpriteBatch.Name.Aliens);
        const pSB_Boxes = SpriteBatchMan.Find(SpriteBatch.Name.Boxes);
        
        pBomb.ActivateGameSprite(pSB_Aliens);
        pBomb.ActivateCollisionSprite(pSB_Boxes);
    }
}