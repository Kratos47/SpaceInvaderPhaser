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
        this.poPhaserSprite.setVisible(false);

        if (name !== ProxySprite.Name.Uninitialized) {
            this.Set(name);
        }
    }

    Set(name) {
        this.name = ProxySprite.Name.Proxy;
        this.pSprite = GameSpriteMan.Find(name);
        console.assert(this.pSprite !== null, "ProxySprite could not find base GameSprite");

        const atlasKey = this.pSprite.poSprite.texture.key;
        const frameName = this.pSprite.poSprite.frame.name;
        
        this.poPhaserSprite.setTexture(atlasKey, frameName);
        this.poPhaserSprite.setDisplaySize(this.pSprite.sx, this.pSprite.sy);
    }

    Update() {
        this.PrivPushToReal();
    }

    Render() {
        // 🔥 THE ZOMBIE FIX: If this Proxy was washed/cleared, abort rendering!
        // This stops dead missiles from forcing themselves back to visible.
        if (this.pSprite === null) {
            if (this.poPhaserSprite) this.poPhaserSprite.setVisible(false);
            return;
        }

        this.poPhaserSprite.setVisible(true);

        if (this.pSprite && this.pSprite.poSprite) {
            this.poPhaserSprite.x = this.x;
            this.poPhaserSprite.y = this.y;

            this.poPhaserSprite.setTexture(
                this.pSprite.poSprite.texture.key,
                this.pSprite.poSprite.frame.name
            );

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
        if (this.poPhaserSprite) {
            this.poPhaserSprite.setVisible(false);
            this.poPhaserSprite.setActive(false);
        }
    }

    Wash() {
        // 🔥 FIX: Corrected typo 'this.clear()' to 'this.Clear()'
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