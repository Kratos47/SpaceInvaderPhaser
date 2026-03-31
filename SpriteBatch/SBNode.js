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

    Set(spriteParam) {
        // If a string is passed, look it up in the Managers
        if (typeof spriteParam === 'string') {
            this.pSpriteBase = GameSpriteMan.Find(spriteParam);
            if (this.pSpriteBase === null) {
                this.pSpriteBase = BoxSpriteMan.Find(spriteParam);
            }
        } 
        // If an object is passed (like a ProxySprite), attach it directly!
        else {
            this.pSpriteBase = spriteParam;
        }

        console.assert(this.pSpriteBase !== null, `SBNode failed to set sprite`);
    }

    Wash() {
        this.pSpriteBase = null;
    }
}