import { SpriteBase } from "./SpriteBase.js";
import { GameSpriteMan } from "./GameSpriteManager.js";
import { activeScene } from "../Globals.js";
import { Texture } from "../Texture/Texture.js";

export class ProxySprite extends SpriteBase {
    static Name = Object.freeze({
        Proxy: "Proxy",
        Uninitialized: "Uninitialized"
    });

    constructor(name = ProxySprite.Name.Uninitialized) {
        super();
        this.name = ProxySprite.Name.Uninitialized;
        this.x = 0.0;
        this.y = 0.0;
        this.pSprite = null;

        // Give the Proxy its own actual Phaser sprite
        this.poPhaserSprite = activeScene.add.sprite(0, 0, Texture.Name.Default);
        
        // 🔥 FIX 1: Hide it immediately! We don't want Phaser exposing pooled objects at 0,0.
        this.poPhaserSprite.setVisible(false);

        if (name !== ProxySprite.Name.Uninitialized) {
            this.Set(name);
        }
    }

    Set(name) {
        this.name = ProxySprite.Name.Proxy;
        this.pSprite = GameSpriteMan.Find(name);
        console.assert(this.pSprite !== null, "ProxySprite could not find base GameSprite");

        // 🔥 FIX 2: Dynamically grab the exact atlas key and frame from the base GameSprite!
        const atlasKey = this.pSprite.poSprite.texture.key;
        const frameName = this.pSprite.poSprite.frame.name;
        
        this.poPhaserSprite.setTexture(atlasKey, frameName);
        this.poPhaserSprite.setDisplaySize(this.pSprite.sx, this.pSprite.sy);
        
        // Removed setVisible(true) from here! 
        // Pooled objects must stay invisible until SpriteBatch explicitly draws them.
    }

    Update() {
        this.PrivPushToReal();
    }

   Render() {
        // 🔥 FIX 1: Make sure pooled objects become visible when rendering begins!
        this.poPhaserSprite.setVisible(true);

        if (this.pSprite && this.pSprite.poSprite) {
            this.poPhaserSprite.x = this.x;
            this.poPhaserSprite.y = this.y;

            // Sync the animation frame
            this.poPhaserSprite.setTexture(
                this.pSprite.poSprite.texture.key,
                this.pSprite.poSprite.frame.name
            );

            // 🔥 FIX 2: setTexture destroys the scale! We MUST re-apply the absolute 
            // pixel dimensions from the GameSprite every single frame!
            this.poPhaserSprite.setDisplaySize(this.pSprite.sx, this.pSprite.sy);
            
            this.poPhaserSprite.angle = this.angle;
        }
    }

    PrivPushToReal() {
        if (this.pSprite !== null) {
            this.pSprite.x = this.x;
            this.pSprite.y = this.y;
        }
    }

    Clear() {
        this.x = 0.0;
        this.y = 0.0;
        this.name = ProxySprite.Name.Uninitialized;
        this.pSprite = null;
        if (this.poPhaserSprite) this.poPhaserSprite.setVisible(false);
    }

    Wash() {
        this.clear();
        this.Clear();
    }

    SetName(inName) { this.name = inName; }
    GetName() { return this.name; }

    Dump() {
        console.log(`   Name: ${this.name}`);
        if (this.pSprite !== null) {
            console.log(`   GameSprite: ${this.pSprite.GetName()}`);
        } else {
            console.log("   GameSprite: null");
        }
        console.log(`   (x,y): ${this.x}, ${this.y}`);
    }
}