/**
 * @file Game.js
 * @description The main Phaser Scene handling initialization, asset loading, and the update loop.
 */

// --- FIX: INPUT HIJACKING ---
// Prevents the parent portfolio page from scrolling when using Space or Arrow keys.
window.addEventListener("keydown", function (e) {
    // 32: Space, 37: Left, 38: Up, 39: Right, 40: Down
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
import { TimerMan } from "./Timer/TimerMan.js";
import { TimeEvent } from "./Timer/TimeEvent.js";
import { setActiveScene } from './Globals.js';

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
        GameObjectMan.Create(3, 1);
    }

    preload() {
        this.load.image(Texture.psDefaultPhaserTexture, "./assets/HotPink.png");
        TextureMan.Add(Texture.Name.SpaceInvaders, "assets/kindpng_4810910.png");
    }

    create() {
        // 1. Load Textures & Images
        TextureMan.Add(Texture.Name.SpaceInvaders, Texture.Name.SpaceInvaders);

        // ImageMan mappings
        ImageMan.Add(Image.Name.OctopusA, Texture.Name.SpaceInvaders, 554, 26, 104, 70);
        ImageMan.Add(Image.Name.OctopusB, Texture.Name.SpaceInvaders, 554, 26, 104, 70);
        ImageMan.Add(Image.Name.AlienA, Texture.Name.SpaceInvaders, 118, 27, 95, 70);
        ImageMan.Add(Image.Name.AlienB, Texture.Name.SpaceInvaders, 118, 27, 95, 70);
        ImageMan.Add(Image.Name.SquidA, Texture.Name.SpaceInvaders, 118, 27, 95, 70);
        ImageMan.Add(Image.Name.SquidB, Texture.Name.SpaceInvaders, 118, 27, 95, 70);

        // Texture Atlas Slicing
        const atlas = this.textures.get(Texture.Name.SpaceInvaders);
        atlas.add(Image.Name.OctopusA, 0, 554, 26, 104, 70);
        atlas.add(Image.Name.OctopusB, 0, 554, 26, 104, 70);
        atlas.add(Image.Name.AlienA, 0, 118, 27, 95, 70);
        atlas.add(Image.Name.AlienB, 0, 118, 27, 95, 70);
        atlas.add(Image.Name.SquidA, 0, 118, 27, 95, 70);
        atlas.add(Image.Name.SquidB, 0, 118, 27, 95, 70);

        // 2. Base Sprites
        GameSpriteMan.Add(GameSprite.Name.SquidA, Image.Name.SquidA, Texture.Name.SpaceInvaders, 100, 532, 33, 33);
        GameSpriteMan.Add(GameSprite.Name.AlienA, Image.Name.AlienA, Texture.Name.SpaceInvaders, 100, 466, 45, 33);
        GameSpriteMan.Add(GameSprite.Name.OctopusA, Image.Name.OctopusA, Texture.Name.SpaceInvaders, 100, 400, 49, 33);

        // 3. Phaser Native Animations 
        this.anims.create({
            key: 'anim_squid',
            frames: [
                { key: Texture.Name.SpaceInvaders, frame: Image.Name.SquidA },
                { key: Texture.Name.SpaceInvaders, frame: Image.Name.SquidB }
            ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'anim_alien',
            frames: [
                { key: Texture.Name.SpaceInvaders, frame: Image.Name.AlienA },
                { key: Texture.Name.SpaceInvaders, frame: Image.Name.AlienB }
            ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'anim_octopus',
            frames: [
                { key: Texture.Name.SpaceInvaders, frame: Image.Name.OctopusA },
                { key: Texture.Name.SpaceInvaders, frame: Image.Name.OctopusB }
            ],
            frameRate: 2,
            repeat: -1
        });

        // Trigger animations
        GameSpriteMan.Find(GameSprite.Name.SquidA).PlayAnimation('anim_squid');
        GameSpriteMan.Find(GameSprite.Name.AlienA).PlayAnimation('anim_alien');
        GameSpriteMan.Find(GameSprite.Name.OctopusA).PlayAnimation('anim_octopus');

        // 4. Create SpriteBatch
        SpriteBatchMan.Add(SpriteBatch.Name.Aliens, 2);

        // 5. Build the Alien Grid using the Factory
        const AF = new AlienFactory(SpriteBatch.Name.Aliens);
        this.pGrid = AF.Create(GameObject.Name.AlienGrid, AlienCategory.Type.Grid);

        let pFirstColumn = null;
        for (let i = 0; i < 11; i++) {
            const colName = GameObject.Name[`Column_${i}`];
            const pColumn = AF.Create(colName, AlienCategory.Type.Column);
            this.pGrid.Add(pColumn);
            if (pFirstColumn === null) pFirstColumn = pColumn;
        }

        // Populate the Columns
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
        TimerMan.Update(time / 1000);
        SpriteBatchMan.Draw();
    }
}

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'arcade-container',
        width: 896,
        height: 1024
    },
    scene: [Game]
};

export const game = new Phaser.Game(config);