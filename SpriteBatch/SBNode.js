/**
 * @file SBNode.js
 * @description A node within a SpriteBatch that holds a reference to a renderable sprite.
 */

import { DLink } from "../Manager/DLink.js";
import { GameSpriteMan } from "../Sprite/GameSpriteManager.js";
import { BoxSpriteMan } from "../Sprite/BoxSpriteManager.js";

export class SBNode_Link extends DLink {}

export class SBNode extends SBNode_Link {
    constructor() {
        super();
        this.pSpriteBase = null;
    }

    Set(name) {
        // Try GameSprite first
        this.pSpriteBase = GameSpriteMan.Find(name);

        if (this.pSpriteBase === null) {
            // Try BoxSprite if not a standard GameSprite
            this.pSpriteBase = BoxSpriteMan.Find(name);
        }

        console.assert(this.pSpriteBase !== null, `SBNode failed to find sprite: ${name}`);
    }

    Wash() {
        this.pSpriteBase = null;
    }
}