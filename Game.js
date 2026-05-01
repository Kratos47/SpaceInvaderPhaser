/**
 * @file Game.js
 * @description The main Phaser Scene handling initialization, asset loading, and the update loop.
 */

// --- FIX: INPUT HIJACKING ---
window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

import { TextureMan } from "./Texture/TextureManager.js";
import { Texture } from "./Texture/Texture.js";
import { ImageMan } from "./Image/ImageManager.js";
import { Image } from "./Image/Image.js";
import { GameSpriteMan } from "./Sprite/GameSpriteManager.js";
import { GameSprite } from "./Sprite/GameSprite.js";
import { SpriteBatchMan } from "./SpriteBatch/SpriteBatchMan.js";
import { SpriteBatch } from "./SpriteBatch/SpriteBatch.js";
import { ProxySprite } from "./Sprite/ProxySprite.js";
import { ProxySpriteMan } from "./Sprite/ProxySpriteManager.js";
import { TimerMan } from "./Timer/TimerMan.js";
import { TimeEvent } from "./Timer/TimeEvent.js";
import { setActiveScene } from './Globals.js';

// --- Command / Animation Imports ---
import { AnimationSprite } from "./Sprite/AnimationSprite.js";

// --- Grid System Imports ---
import { GameObjectMan } from "./GameObject/GameObjectMan.js";
import { GameObject } from "./GameObject/GameObject.js";
import { AlienCategory } from "./GameObject/Aliens/AlienCategory.js";
import { AlienFactory } from "./GameObject/AlienFactory.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
    }

    init() {
        console.log("Game initialized");
        setActiveScene(this);

        console.log("===== Manager Tests Begin =====");
        TextureMan.Create(1, 1);
        ImageMan.Create(5, 2);
        GameSpriteMan.Create(4, 2);
        SpriteBatchMan.Create(3, 1);
        TimerMan.Create(3, 1);
        ProxySpriteMan.Create(10, 1);
        GameObjectMan.Create(3, 1);
    }

    preload() {
        this.load.image(Texture.psDefaultPhaserTexture, "./assets/HotPink.png");
        TextureMan.Add(Texture.Name.SpaceInvaders, "assets/kindpng_4810910.png");
    }

    create() {
        // 1. Load Textures & Images
        TextureMan.Add(Texture.Name.SpaceInvaders, Texture.Name.SpaceInvaders);

        // Your EXACT ImageMan mappings
        ImageMan.Add(Image.Name.OctopusA, Texture.Name.SpaceInvaders, 554, 26, 105, 71);
        ImageMan.Add(Image.Name.OctopusB, Texture.Name.SpaceInvaders, 664, 27, 97, 71);
        ImageMan.Add(Image.Name.AlienA, Texture.Name.SpaceInvaders, 118, 27, 97, 71);
        ImageMan.Add(Image.Name.AlienB, Texture.Name.SpaceInvaders, 227, 27, 97, 71);
        ImageMan.Add(Image.Name.SquidA, Texture.Name.SpaceInvaders, 349, 26, 72, 71);
        ImageMan.Add(Image.Name.SquidB, Texture.Name.SpaceInvaders, 461, 26, 72, 71);

        // Required by Phaser's WebGL renderer to draw the slices, using your correct coordinates
        const atlas = this.textures.get(Texture.Name.SpaceInvaders);
        atlas.add(Image.Name.OctopusA, 0, 554, 26, 105, 71);
        atlas.add(Image.Name.OctopusB, 0, 664, 27, 97, 71);
        atlas.add(Image.Name.AlienA, 0, 118, 27, 97, 71);
        atlas.add(Image.Name.AlienB, 0, 227, 27, 97, 71);
        atlas.add(Image.Name.SquidA, 0, 349, 26, 72, 71);
        atlas.add(Image.Name.SquidB, 0, 461, 26, 72, 71);

        // 2. Base Sprites 
        GameSpriteMan.Add(GameSprite.Name.SquidA, Image.Name.SquidA, Texture.Name.SpaceInvaders, 100, 532, 45, 45);
        GameSpriteMan.Add(GameSprite.Name.AlienA, Image.Name.AlienA, Texture.Name.SpaceInvaders, 100, 466, 45, 33);
        GameSpriteMan.Add(GameSprite.Name.OctopusA, Image.Name.OctopusA, Texture.Name.SpaceInvaders, 100, 400, 49, 33);

        // 3. Create SpriteBatch
        const pSB_Aliens = SpriteBatchMan.Add(SpriteBatch.Name.Aliens, 2);

        // 4. Build the Alien Grid using the Factory
        const AF = new AlienFactory(SpriteBatch.Name.Aliens);
        this.pGrid = AF.Create(GameObject.Name.AlienGrid, AlienCategory.Type.Grid);

        let pFirstColumn = null;
        for (let i = 0; i < 11; i++) {
            const colName = GameObject.Name[`Column_${i}`];
            const pColumn = AF.Create(colName, AlienCategory.Type.Column);
            this.pGrid.Add(pColumn);
            if (pFirstColumn === null) pFirstColumn = pColumn;
        }

        // create proxies of various invaders in the grid and in their respective colums/rows
        let currCol = pFirstColumn;
        for (let i = 0; i < 11; i++) {
            const xOffset = 50.0 + (66 * i);
            currCol.Add(AF.Create(GameObject.Name.Squid, AlienCategory.Type.Squid, xOffset, 100.0));
            currCol.Add(AF.Create(GameObject.Name.Alien, AlienCategory.Type.Alien, xOffset, 150.0));
            currCol.Add(AF.Create(GameObject.Name.Alien, AlienCategory.Type.Alien, xOffset, 200.0));
            currCol.Add(AF.Create(GameObject.Name.Octopus, AlienCategory.Type.Octopus, xOffset, 250.0));
            currCol.Add(AF.Create(GameObject.Name.Octopus, AlienCategory.Type.Octopus, xOffset, 300.0));
            currCol = currCol.pNext;
        }

        // 5. Create Animation Sprites (The Command Pattern)
        const pAnimSprite_Squid = new AnimationSprite(GameSprite.Name.SquidA);
        pAnimSprite_Squid.Attach(Image.Name.SquidB);
        pAnimSprite_Squid.Attach(Image.Name.SquidA);

        const pAnimSprite_Alien = new AnimationSprite(GameSprite.Name.AlienA);
        pAnimSprite_Alien.Attach(Image.Name.AlienB);
        pAnimSprite_Alien.Attach(Image.Name.AlienA);

        const pAnimSprite_Octopus = new AnimationSprite(GameSprite.Name.OctopusA);
        pAnimSprite_Octopus.Attach(Image.Name.OctopusB);
        pAnimSprite_Octopus.Attach(Image.Name.OctopusA);

        // Add AnimationSprite to timer
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Squid, 0.5);
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Alien, 0.5);
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Octopus, 0.5);

        // Push initial proxy coordinates so they render immediately
        GameObjectMan.Update();

        // 6. THE METRONOME
        const marchGrid = () => {
            this.pGrid.Move();
            GameObjectMan.Update();
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, marchGrid, 0.5);
        };

        TimerMan.Add(TimeEvent.Name.SpriteAnimation, marchGrid, 0.5);
        console.log("===== Grid Setup Complete =====");
    }

    update(time, delta) {
        // Fire off timer events (This executes your AnimationSprite commands!)
        TimerMan.Update(time / 1000);
        
        // Render Proxies to screen
        SpriteBatchMan.Draw();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 896,
    height: 1024,
    backgroundColor: '#000000',
    scene: [Game]
};

export const game = new Phaser.Game(config);