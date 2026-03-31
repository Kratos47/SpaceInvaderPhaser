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

        // Inherit exact dimensions from the heavy base sprite
        this.poPhaserSprite.setDisplaySize(this.pSprite.sx, this.pSprite.sy);
        this.poPhaserSprite.setVisible(true);
    }

    Update() {
        this.PrivPushToReal();
    }

    Render() {
        // 🔥 FIX: This is called by SpriteBatchMan.Draw() every frame!
        // We sync the visual Phaser sprite with the logical coordinates here.
        if (this.pSprite && this.pSprite.poSprite) {
            this.poPhaserSprite.x = this.x;
            this.poPhaserSprite.y = this.y;

            // Sync the animation frame
            this.poPhaserSprite.setTexture(
                this.pSprite.poSprite.texture.key,
                this.pSprite.poSprite.frame.name
            );

            // DIAGNOSTIC LOG: Print out the first Proxy's data to the console
            if (this.name === ProxySprite.Name.Proxy && this.x > 0) {
               //  console.log(`Drawing Proxy at X: ${this.x}, Y: ${this.y}`);
            }
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
}