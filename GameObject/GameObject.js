import { Component } from "../Composite/Component.js";
import { ProxySprite } from "../Sprite/ProxySprite.js"
import { Iterator } from "../Composite/Iterator.js" 

import { ColObject } from "../Collisions/ColObject.js"; 
import { SpriteBatchMan } from "../SpriteBatch/SpriteBatchMan.js";
import { BoxSpriteMan } from "../Sprite/BoxSpriteManager.js";
import { GameSprite } from "../Sprite/GameSprite.js";

export class GameObject extends Component {
    static Type = Object.freeze({
        Squid: "Squid", Alien: "Alien", Octopus: "Octopus", Column: "Column", Grid: "Grid"
    });

    static Name = Object.freeze({
        Squid: "Squid", Alien: "Alien", Octopus: "Octopus", AlienGrid: "AlienGrid",
        Column_0: "Column_0", Column_1: "Column_1", Column_2: "Column_2", Column_3: "Column_3",
        Column_4: "Column_4", Column_5: "Column_5", Column_6: "Column_6", Column_7: "Column_7",
        Column_8: "Column_8", Column_9: "Column_9", Column_10: "Column_10",
        WallGroup: "WallGroup", WallRight: "WallRight", WallLeft: "WallLeft", WallTop: "WallTop",
        Ship: "Ship", ShipRoot: "ShipRoot", Missile: "Missile", MissileGroup: "MissileGroup",
        PlayerShot: "PlayerShot", Null_Object: "Null_Object", Uninitialized: "Uninitialized"
    });

    constructor(gameName = GameObject.Name.Uninitialized, spriteName = null) {
        super();
        this.name = gameName;
        this.x = 0.0;
        this.y = 0.0;
        this.bMarkForDeath = false;

        if (spriteName !== null && spriteName !== "NullObject" && spriteName !== GameSprite.Name.NullObject) {
            this.pProxySprite = new ProxySprite(spriteName);
            this.poColObj = new ColObject(this.pProxySprite);
        } else {
            this.pProxySprite = null;
            const dummyProxy = { pSprite: { x: 0, y: 0, sx: 0, sy: 0 } };
            this.poColObj = new ColObject(dummyProxy);
        }
    }

    Remove() {
        // --- 1. PROXY SPRITE TEARDOWN ---
        if (this.pProxySprite !== null) {
            
            // A. Safely disconnect from Azul Render Loop
            if (typeof this.pProxySprite.GetSBNode === 'function') {
                const pSBNode = this.pProxySprite.GetSBNode();
                if (pSBNode) SpriteBatchMan.Remove(pSBNode);
            } else if (this.pProxySprite.pSBNode !== undefined) {
                // Safely use the exact property we inject during ActivateGameSprite
                SpriteBatchMan.Remove(this.pProxySprite.pSBNode);
            }

            // B. 🔥 Wash the Proxy! This ensures ProxySprite.Render() drops it instantly.
            if (typeof this.pProxySprite.Wash === 'function') {
                this.pProxySprite.Wash();
            }
        }

        // --- 2. COLLISION BOX TEARDOWN ---
        if (this.poColObj !== null && this.poColObj.pColSprite !== null) {
            
            // A. Safely disconnect from Azul Render Loop
            if (typeof this.poColObj.pColSprite.GetSBNode === 'function') {
                const pSBNodeBox = this.poColObj.pColSprite.GetSBNode();
                if (pSBNodeBox) SpriteBatchMan.Remove(pSBNodeBox);
            } else if (this.poColObj.pColSprite.pSBNode !== undefined) {
                SpriteBatchMan.Remove(this.poColObj.pColSprite.pSBNode);
            }
            
            // B. Hide the specific Box graphic (which was already working great)
            if (this.poColObj.pColSprite.poBoxSprite) {
                this.poColObj.pColSprite.poBoxSprite.setVisible(false);
                this.poColObj.pColSprite.poBoxSprite.setActive(false);
            }

            // C. Remove from the Box Manager 
            BoxSpriteMan.Remove(this.poColObj.pColSprite);
        }

        // --- 3. ENGINE LOGIC TEARDOWN ---
        if (GameObject.GameObjectManRef !== null) {
            GameObject.GameObjectManRef.Remove(this);
        }
    }

    BaseUpdateBoundingBox(pStart) {
        let pNode = pStart;
        if (!this.poColObj || !this.poColObj.poColRect) return;

        let ColTotal = this.poColObj.poColRect;
        pNode = Iterator.GetChild(pNode);

        if (pNode !== null) {
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
            // 🔥 STORE THE NODE: This ensures we can actually remove it later!
            this.poColObj.pColSprite.pSBNode = pSpriteBatch.Attach(this.poColObj.pColSprite);
        }
    }

    ActivateGameSprite(pSpriteBatch) {
        console.assert(pSpriteBatch !== null);
        if (this.pProxySprite !== null) {
            // 🔥 STORE THE NODE: This ensures we can actually remove it later!
            this.pProxySprite.pSBNode = pSpriteBatch.Attach(this.pProxySprite);
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

GameObject.GameObjectManRef = null;