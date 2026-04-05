/**
 * @file Game.js
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
import { TimerMan } from "./Timer/TimerMan.js";
import { TimeEvent } from "./Timer/TimeEvent.js";
import { setActiveScene } from './Globals.js';

import { GameObjectMan } from "./GameObject/GameObjectMan.js";
import { GameObject } from "./GameObject/GameObject.js";
import { AlienCategory } from "./GameObject/Aliens/AlienCategory.js";
import { AlienFactory } from "./GameObject/AlienFactory.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
    }

    init() {
        setActiveScene(this);
        TextureMan.Create(1, 1);
        ImageMan.Create(5, 2);
        GameSpriteMan.Create(4, 2);
        SpriteBatchMan.Create(3, 1);
        TimerMan.Create(3, 1);
        GameObjectMan.Create(3, 1);
    }

    preload() {
        // Ensure this path is correct relative to your index.html
        this.load.image(Texture.psDefaultPhaserTexture, "./assets/HotPink.png");
        this.load.image(Texture.Name.SpaceInvaders, "assets/kindpng_4810910.png");
    }

    create() {
        // 1. REGISTER TEXTURE IN YOUR MANAGER
        TextureMan.Add(Texture.Name.SpaceInvaders, Texture.Name.SpaceInvaders);

        // 2. DEFINE IMAGE FRAMES (Slicing the spritesheet)
        // Adjust these X, Y, W, H values to match your specific png layout
        const atlas = this.textures.get(Texture.Name.SpaceInvaders);
        atlas.add(Image.Name.OctopusA, 0, 554, 26, 104, 70);
        atlas.add(Image.Name.OctopusB, 0, 554, 26, 104, 70); // Update with OctopusB coordinates
        atlas.add(Image.Name.AlienA, 0, 118, 27, 95, 70);
        atlas.add(Image.Name.AlienB, 0, 118, 27, 95, 70);
        atlas.add(Image.Name.SquidA, 0, 118, 27, 95, 70);
        atlas.add(Image.Name.SquidB, 0, 118, 27, 95, 70);

        // 3. CREATE ANIMATIONS
        this.anims.create({
            key: 'anim_squid',
            frames: [{ key: Texture.Name.SpaceInvaders, frame: Image.Name.SquidA }, { key: Texture.Name.SpaceInvaders, frame: Image.Name.SquidB }],
            frameRate: 2, repeat: -1
        });
        this.anims.create({
            key: 'anim_alien',
            frames: [{ key: Texture.Name.SpaceInvaders, frame: Image.Name.AlienA }, { key: Texture.Name.SpaceInvaders, frame: Image.Name.AlienB }],
            frameRate: 2, repeat: -1
        });
        this.anims.create({
            key: 'anim_octopus',
            frames: [{ key: Texture.Name.SpaceInvaders, frame: Image.Name.OctopusA }, { key: Texture.Name.SpaceInvaders, frame: Image.Name.OctopusB }],
            frameRate: 2, repeat: -1
        });

        // 4. SETUP SPRITE BATCHES & FACTORY
        SpriteBatchMan.Add(SpriteBatch.Name.Aliens, 2);
        const AF = new AlienFactory(SpriteBatch.Name.Aliens);
        this.pGrid = AF.Create(GameObject.Name.AlienGrid, AlienCategory.Type.Grid);

        // Build Columns
        let pFirstColumn = null;
        for (let i = 0; i < 11; i++) {
            const colName = GameObject.Name[`Column_${i}`];
            const pColumn = AF.Create(colName, AlienCategory.Type.Column);
            this.pGrid.Add(pColumn);
            if (pFirstColumn === null) pFirstColumn = pColumn;
        }

        // Populate Columns (Moving them down so they aren't hidden by the top border)
        let currCol = pFirstColumn;
        for (let i = 0; i < 11; i++) {
            const xOffset = 80.0 + (60 * i); // Adjusted spacing
            currCol.Add(AF.Create(GameObject.Name.Squid, AlienCategory.Type.Squid, xOffset, 200.0));
            currCol.Add(AF.Create(GameObject.Name.Alien, AlienCategory.Type.Alien, xOffset, 250.0));
            currCol.Add(AF.Create(GameObject.Name.Alien, AlienCategory.Type.Alien, xOffset, 300.0));
            currCol.Add(AF.Create(GameObject.Name.Octopus, AlienCategory.Type.Octopus, xOffset, 350.0));
            currCol.Add(AF.Create(GameObject.Name.Octopus, AlienCategory.Type.Octopus, xOffset, 400.0));
            currCol = currCol.pNext;
        }

        GameObjectMan.Update();

        // 5. GRID METRONOME
        const marchGrid = () => {
            this.pGrid.Move();
            GameObjectMan.Update();
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, marchGrid, 0.5);
        };
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, marchGrid, 0.5);
    }

    update(time, delta) {
        TimerMan.Update(time / 1000);
        SpriteBatchMan.Draw();
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
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