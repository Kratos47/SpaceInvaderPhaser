
import { TextureMan } from "./Texture/TextureManager.js"
import { Texture } from "./Texture/Texture.js";

import { ImageMan } from "./Image/ImageManager.js"
import { Image } from "./Image/Image.js"

import { GameSpriteMan } from "./Sprite/GameSpriteManager.js";
import { GameSprite } from "./Sprite/GameSprite.js";

import { BoxSpriteMan } from "./Sprite/BoxSpriteManager.js";
import { BoxSprite } from "./Sprite/BoxSprite.js";

import { setActiveScene } from './Globals.js';
import { denormalizeToHex } from "../Globals.js";

import { SpriteBatchMan } from "./SpriteBatch/SpriteBatchMan.js";
import { SpriteBatch } from "./SpriteBatch/SpriteBatch.js";

export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: "Game" });

    }
    // ---------------------------------------------------
    // Phaser lifecycle
    // ---------------------------------------------------

    init() {
        console.log("Game initialized");

        // So that scene in availble in all files
        setActiveScene(this);

        console.log("===== Manager Tests Begin =====");

        TextureMan.Create(1, 1);

        ImageMan.Create(5, 2);

        GameSpriteMan.Create(4, 2);

        BoxSpriteMan.Create(3, 1);

        SpriteBatchMan.Create(3, 1);

        this.redSpeed = 2.0;

        this.AlienPosX = 0.0;
        this.AlienPosY = 0.0;
        this.AlienAngle = 0.0;

        this.blue = 0.0;
        this.red = 0.0;
        this.pStitch_Speed = 0.1;
        this.count3 = 0;
    }

    preload() {

        //load default texture
        this.load.image(Texture.psDefaultPhaserTexture, "./assets/HotPink.png");


        TextureMan.Add(Texture.Name.Aliens, "assets/kindpng_4810910.png");
        TextureMan.Add(Texture.Name.Birds, "assets/Birds.png");
        TextureMan.Add(Texture.Name.PacMan, "assets/PacMan.png");
        TextureMan.Add(Texture.Name.Stitch, "assets/stitch.png");
    }

    create() {

        ImageMan.Add(Image.Name.Alien_Crab, Texture.Name.Aliens, 118, 27, 95, 70);

        this.pAlien_Crab = GameSpriteMan.Add(GameSprite.Name.Alien_Crab, Image.Name.Alien_Crab, Texture.Name.Aliens, 200, 200, 1, 1);

        ImageMan.Add(Image.Name.RedBird, Texture.Name.Birds, 47, 41, 48, 46);

        this.pRedBird = GameSpriteMan.Add(GameSprite.Name.RedBird, Image.Name.RedBird, Texture.Name.Birds, 150, 300, 1, 1);

        ImageMan.Add(Image.Name.Alien_Octopus, Texture.Name.Aliens, 554, 26, 104, 70);

        this.pAlien_Octopus = GameSpriteMan.Add(GameSprite.Name.Alien_Octopus, Image.Name.Alien_Octopus, Texture.Name.Aliens,
            650, 150, 1, 1);

        ImageMan.Add(Image.Name.Stitch, Texture.Name.Stitch, 0, 0, 300, 410);
        this.pStitch = GameSpriteMan.Add(GameSprite.Name.Stitch, Image.Name.Stitch, Texture.Name.Stitch, 200, 250, 0.5, 0.5);

        this.color = { r: 1, g: 1, b: 1 };

        BoxSpriteMan.Add(BoxSprite.Name.Box1, 200.0, 300.0, 150.0, 150.0, this.color);



        //Sprite Batches
        this.pSB_Aliens = SpriteBatchMan.Add(SpriteBatch.Name.Aliens, 4);
        this.pSB_Boxes = SpriteBatchMan.Add(SpriteBatch.Name.Boxes, 3);
        this.pSB_AngryBirds = SpriteBatchMan.Add(SpriteBatch.Name.AngryBirds, 2);
        this.pSB_Stitch = SpriteBatchMan.Add(SpriteBatch.Name.Stitch, 1);


        this.pSB_AngryBirds.Attach(GameSprite.Name.RedBird);

        this.pSB_Boxes.Attach(BoxSprite.Name.Box1);

        this.pSB_Aliens.Attach(GameSprite.Name.Alien_Crab);

        this.pSB_Stitch.Attach(GameSprite.Name.Stitch);


        // 2. Add the listener to call your custom Draw()
        // This tells Phaser: "Every time you finish updating, call my manual Draw"
        this.events.on('postupdate', () => {
            SpriteBatchMan.Draw();
        });


        console.log("===== Manager Tests End =====");
    }

    update(time, delta) {

        // Add your update below this line: ----------------------------
        //--------------------------------------------------------
        // Boxes
        //--------------------------------------------------------
        this.count3++;
        this.pBoxSprite1 = BoxSpriteMan.Find(BoxSprite.Name.Box1);
        if (this.count3 == 100) {
            this.pBoxSprite1.SwapColor({ r: 1, g: 0, b: 0 });
        }
        else if (this.count3 == 200) {
            this.pBoxSprite1.SwapColor({ r: 0, g: 1, b: 0 });
        }
        else if (this.count3 == 300) {
            this.pBoxSprite1.SwapColor({ r: 0, g: 0, b: 1 });
            this.count3 = 0;
        }
        this.pBoxSprite1.Update();

        //console.log("===== Game Update =====");
        // Game loop placeholder
        if (this.pRedBird.x > this.scale.width || this.pRedBird.x < 0.0) {
            this.redSpeed *= -1.0;
        }
        this.pRedBird.x += this.redSpeed;
        this.pRedBird.Update();

        //--------------------------------------------------------
        // Alien - Angles,position
        //--------------------------------------------------------

        this.AlienAngle += 0.1;
        this.AlienPosX += 2.0;
        if (this.AlienPosX > 800.0)
            this.AlienPosX = 0.0;
        this.AlienPosY += 1.0;
        if (this.AlienPosY > 600.0)
            this.AlienPosY = 0.0;

        this.pAlien_Crab.x = this.AlienPosX;
        this.pAlien_Crab.y = this.AlienPosY;
        this.pAlien_Crab.angle = this.AlienAngle;

        this.pAlien_Crab.Update();


        // 1. Increment values (using your logic)
        this.blue += 0.001;
        this.red -= 0.002;

        if (this.red <= 0.0) {
            this.red = 1.0;
        }

        // 2. Wrap values to ensure they stay in the 0.0 - 1.0 range if blue grows too large
        let b = Math.min(this.blue, 1.0);

        // 3. Convert floats (0-1) to integers (0-255)
        let rInt = Math.floor(this.red * 255);
        let bInt = Math.floor(b * 255);

        // 4. Create the Hex color
        let hexColor = Phaser.Display.Color.GetColor(rInt, 0, bInt);

        // 5. Apply to sprite
        this.pAlien_Octopus.SwapColor(hexColor)


        //--------------------------------------------------------
        // Stitch
        //--------------------------------------------------------
        if (this.pStitch.sx > 2 || this.pStitch.sx < 0.0) {
            this.pStitch_Speed *= -1.0;
            this.pStitch.sy *= -1.0;
        }
        this.pStitch.sx += this.pStitch_Speed;
        this.pStitch.Update();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // This tells Phaser to start using your Game class defined above
    scene: [Game]
};

// This "turns the key" to start the engine
export const game = new Phaser.Game(config);




