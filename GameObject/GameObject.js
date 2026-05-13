import { Component } from "../Composite/Component.js";
import { ProxySprite } from "../Sprite/ProxySprite.js"
import { Iterator } from "../Composite/Iterator.js" 

import { ColObject } from "../Collisions/ColObject.js"; // Adjust path if needed
import { SpriteBatchMan } from "../SpriteBatch/SpriteBatchMan.js";
import { BoxSpriteMan } from "../Sprite/BoxSpriteManager.js";
import { GameSprite } from "../Sprite/GameSprite.js";
// 🚫 REMOVED GameObjectMan import here to break the circular dependency loop!

export class GameObject extends Component {
    static Type = Object.freeze({
        Squid: "Squid",
        Alien: "Alien",
        Octopus: "Octopus",
        Column: "Column",
        Grid: "Grid"
    });

    static Name = Object.freeze({
        Squid: "Squid",
        Alien: "Alien",
        Octopus: "Octopus",
        AlienGrid: "AlienGrid",
        Column_0: "Column_0",
        Column_1: "Column_1",
        Column_2: "Column_2",
        Column_3: "Column_3",
        Column_4: "Column_4",
        Column_5: "Column_5",
        Column_6: "Column_6",
        Column_7: "Column_7",
        Column_8: "Column_8",
        Column_9: "Column_9",
        Column_10: "Column_10",
        WallGroup: "WallGroup",
        WallRight: "WallRight",
        WallLeft: "WallLeft",
        WallTop: "WallTop",
        Ship: "Ship",
        ShipRoot: "ShipRoot",
        Missile: "Missile",
        MissileGroup: "MissileGroup",
        PlayerShot: "PlayerShot",
        Null_Object: "Null_Object",
        Uninitialized: "Uninitialized"
    });

    constructor(gameName = GameObject.Name.Uninitialized, spriteName = null) {
        super();
        this.name = gameName;
        this.x = 0.0;
        this.y = 0.0;
        this.bMarkForDeath = false;

        // 🔥 FIX: Bulletproof check to ensure NullObjects NEVER spawn a pink proxy!
        if (spriteName !== null && spriteName !== "NullObject" && spriteName !== GameSprite.Name.NullObject) {
            this.pProxySprite = new ProxySprite(spriteName);
            this.poColObj = new ColObject(this.pProxySprite);
        } else {
            this.pProxySprite = null;
            
            // Structural nodes (Grid, Columns) still NEED a collision box!
            const dummyProxy = { pSprite: { x: 0, y: 0, sx: 0, sy: 0 } };
            this.poColObj = new ColObject(dummyProxy);
        }
    }

    Remove() {
        // Remove from SpriteBatch
        if (this.pProxySprite !== null) {
            const pSBNode = this.pProxySprite.GetSBNode();
            if (pSBNode) SpriteBatchMan.Remove(pSBNode);
        }

        // Remove collision sprite from spriteBatch
        if (this.poColObj !== null && this.poColObj.pColSprite !== null) {
            const pSBNodeBox = this.poColObj.pColSprite.GetSBNode();
            if (pSBNodeBox) SpriteBatchMan.Remove(pSBNodeBox);
            
            BoxSpriteMan.Remove(this.poColObj.pColSprite);
        }

        // Remove from GameObjectMan using our injected reference
        if (GameObject.GameObjectManRef !== null) {
            GameObject.GameObjectManRef.Remove(this);
        }
    }

    BaseUpdateBoundingBox(pStart) {
        let pNode = pStart;
        
        // Protection check
        if (!this.poColObj || !this.poColObj.poColRect) return;

        let ColTotal = this.poColObj.poColRect;
        pNode = Iterator.GetChild(pNode);

        if (pNode !== null) {
            // Equivalent to ColTotal.Set(...)
            ColTotal.x = pNode.poColObj.poColRect.x;
            ColTotal.y = pNode.poColObj.poColRect.y;
            ColTotal.width = pNode.poColObj.poColRect.width;
            ColTotal.height = pNode.poColObj.poColRect.height;

            while (pNode !== null) {
                ColTotal.Union(pNode.poColObj.poColRect);
                pNode = Iterator.GetSibling(pNode);
            }

            this.x = this.poColObj.poColRect.x;
            this.y = this.poColObj.poColRect.y;

            // Sync the debug BoxSprite to the new calculated rectangle
            this.poColObj.UpdatePos(this.x, this.y);
        }
    }

    Update() {
        if (this.pProxySprite !== null) {
            this.pProxySprite.x = this.x;
            this.pProxySprite.y = this.y;
        }
        if (this.poColObj !== null) {
            this.poColObj.UpdatePos(this.x, this.y);
        }
    }

    ActivateCollisionSprite(pSpriteBatch) {
        console.assert(pSpriteBatch !== null);
        if (this.poColObj !== null && this.poColObj.pColSprite !== null) {
            pSpriteBatch.Attach(this.poColObj.pColSprite);
        }
    }

    ActivateGameSprite(pSpriteBatch) {
        console.assert(pSpriteBatch !== null);
        if (this.pProxySprite !== null) {
            pSpriteBatch.Attach(this.pProxySprite);
        }
    }

    GetColObject() {
        console.assert(this.poColObj !== null);
        return this.poColObj;
    }

    GetName() {
        return this.name;
    }

    Dump() {
        console.log(`\t\t\t       name: ${this.name} (${this})`);
        if (this.pProxySprite !== null) {
            console.log(`\t\t   pProxySprite: ${this.pProxySprite.name}`);
        } else {
            console.log("\t\t   pProxySprite: null");
        }
        console.log(`\t\t\t      (x,y): ${this.x}, ${this.y}`);
    }
}

// Set up the static reference variable. GameObjectMan will populate this!
GameObject.GameObjectManRef = null;