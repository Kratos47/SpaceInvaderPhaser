// /**
//  * @file Game.js
//  * @description The main Phaser Scene handling initialization, asset loading, and the update loop.
//  */

// // --- FIX: INPUT HIJACKING ---
// window.addEventListener("keydown", function (e) {
//     if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
//         e.preventDefault();
//     }
// }, false);

// // --- Core Engine Imports ---
// import { TextureMan } from "./Texture/TextureManager.js";
// import { Texture } from "./Texture/Texture.js";
// import { ImageMan } from "./Image/ImageManager.js";
// import { Image } from "./Image/Image.js";
// import { GameSpriteMan } from "./Sprite/GameSpriteManager.js";
// import { GameSprite } from "./Sprite/GameSprite.js";
// import { SpriteBatchMan } from "./SpriteBatch/SpriteBatchMan.js";
// import { SpriteBatch } from "./SpriteBatch/SpriteBatch.js";
// import { ProxySpriteMan } from "./Sprite/ProxySpriteManager.js";
// import { BoxSpriteMan } from "./Sprite/BoxSpriteManager.js";
// import { TimerMan } from "./Timer/TimerMan.js";
// import { TimeEvent } from "./Timer/TimeEvent.js";
// import { setActiveScene } from './Globals.js';

// // --- Input & Sound Imports ---
// import { InputMan } from "./Input/InputMan.js";
// import { MoveRightObserver } from "./Input/MoveRightObserver.js";
// import { MoveLeftObserver } from "./Input/MoveLeftObserver.js";
// import { ShootObserver } from "./Input/ShootObserver.js";
// import { Sound } from "./Sound/Sound.js";

// // --- Game Object / Animation Imports ---
// import { AnimationSprite } from "./Sprite/AnimationSprite.js";
// import { GameObjectMan } from "./GameObject/GameObjectMan.js";
// import { GameObject } from "./GameObject/GameObject.js";
// import { AlienCategory } from "./GameObject/Aliens/AlienCategory.js";
// import { AlienFactory } from "./GameObject/AlienFactory.js";
// import { ShipRoot } from "./Ship/ShipRoot.js";
// import { ShipMan } from "./Ship/ShipMan.js";
// import { MissileGroup } from "./GameObject/Missiles/MissileGroup.js"
// import { WallGroup } from "./GameObject/Wall/WallGroup.js"
// import { WallRight } from "./GameObject/Wall/WallRight.js";
// import { WallLeft } from "./GameObject/Wall/WallLeft.js";
// import { WallTop } from "./GameObject/Wall/WallTop.js";

// // --- Collision Imports ---
// import { ColPairMan } from "./Collisions/ColPairManager.js";
// import { ColPair } from "./Collisions/ColPair.js";
// import { GridObserver } from "./Observers/GridObserver.js";
// import { SndObserver } from "./Observers/SndObserver.js";
// import { ShipReadyObserver } from "./Observers/ShipReadyObserver.js";
// import { ShipRemoveMissileObserver } from "./Observers/ShipRemoveMissileObserver.js";
// import { AlienRemoveObserver } from "./Observers/AlienRemoveObserver.js";
// import { DelayedObjectMan } from "./GameObject/DelayedObjectMan.js";

// export default class Game extends Phaser.Scene {
//     constructor() {
//         super({ key: "Game" });
//     }

//     init() {
//         console.log("Game initialized");
//         setActiveScene(this);

//         console.log("===== Manager Tests Begin =====");
//         TextureMan.Create(1, 1);
//         ImageMan.Create(5, 2);
//         GameSpriteMan.Create(4, 2);
//         BoxSpriteMan.Create(3, 1);
//         SpriteBatchMan.Create(3, 1);
//         TimerMan.Create(3, 1);
//         ProxySpriteMan.Create(10, 1);
//         GameObjectMan.Create(3, 1);
//         ColPairMan.Create(1, 1);
//     }

//     preload() {
//         // Hijack Phaser's internal missing texture key!
//         this.load.image('__DEFAULT', './assets/HotPink.png');
//         TextureMan.Add(Texture.Name.SpaceInvaders, "assets/SI_atlas.png");
//         TextureMan.Add(Texture.Name.ShipNdShots, "assets/SpaceInvaders.png");
        
//         // Load Audio Files
//         this.load.audio('fastinvader2', 'assets/fastinvader2.wav');
//         this.load.audio('shoot', 'assets/shoot.wav');
//         this.load.audio('ufo_highpitch', 'assets/ufo_highpitch.wav');
//     }

//     create() {

//         // 1. Image Slices
//         ImageMan.Add(Image.Name.OctopusA, Texture.Name.SpaceInvaders, 554, 26, 105, 71);
//         ImageMan.Add(Image.Name.OctopusB, Texture.Name.SpaceInvaders, 664, 27, 97, 71);
//         ImageMan.Add(Image.Name.AlienA, Texture.Name.SpaceInvaders, 118, 27, 97, 71);
//         ImageMan.Add(Image.Name.AlienB, Texture.Name.SpaceInvaders, 227, 27, 97, 71);
//         ImageMan.Add(Image.Name.SquidA, Texture.Name.SpaceInvaders, 349, 26, 72, 71);
//         ImageMan.Add(Image.Name.SquidB, Texture.Name.SpaceInvaders, 461, 26, 72, 71);
        
//         ImageMan.Add(Image.Name.PlayerShot, Texture.Name.ShipNdShots, 3, 29, 1, 4);
//         ImageMan.Add(Image.Name.Ship, Texture.Name.ShipNdShots, 3, 14, 13, 8);

//         // Required by Phaser's WebGL renderer to draw the slices
//         const atlas = this.textures.get(Texture.Name.SpaceInvaders);
//         atlas.add(Image.Name.OctopusA, 0, 554, 26, 105, 71);
//         atlas.add(Image.Name.OctopusB, 0, 664, 27, 97, 71);
//         atlas.add(Image.Name.AlienA, 0, 118, 27, 97, 71);
//         atlas.add(Image.Name.AlienB, 0, 227, 27, 97, 71);
//         atlas.add(Image.Name.SquidA, 0, 349, 26, 72, 71);
//         atlas.add(Image.Name.SquidB, 0, 461, 26, 72, 71);
       
//         // Add Ship and PlayerShot to the ShipNdShots atlas!
//         const atlasShip = this.textures.get(Texture.Name.ShipNdShots);
//         atlasShip.add(Image.Name.PlayerShot, 0, 3, 29, 1, 4);
//         atlasShip.add(Image.Name.Ship, 0, 3, 14, 13, 8);

//         // 2. Base Sprites 
//         GameSpriteMan.Add(GameSprite.Name.SquidA, Image.Name.SquidA, Texture.Name.SpaceInvaders, 100, 532, 45, 45);
//         GameSpriteMan.Add(GameSprite.Name.AlienA, Image.Name.AlienA, Texture.Name.SpaceInvaders, 100, 466, 45, 33);
//         GameSpriteMan.Add(GameSprite.Name.OctopusA, Image.Name.OctopusA, Texture.Name.SpaceInvaders, 100, 400, 49, 33);
//         GameSpriteMan.Add(GameSprite.Name.PlayerShot, Image.Name.PlayerShot, Texture.Name.ShipNdShots, 0, 0, 5, 40);
        
//         // 🔥 FIX 1: Dropped the ship to Y=900 so it sits at the bottom of the screen!
//         GameSpriteMan.Add(GameSprite.Name.Ship, Image.Name.Ship, Texture.Name.ShipNdShots, 500, 900, 80, 28);
//                 // --- RAW PHASER RENDER HACK ---
//         //this.add.sprite(400, 500, Texture.Name.ShipNdShots, Image.Name.Ship).setDisplaySize(80, 28);
        
//         this.add.sprite(450, 500, Texture.Name.ShipNdShots, Image.Name.PlayerShot).setDisplaySize(20, 40);

//         // 3. Create SpriteBatches
//         const pSB_Aliens = SpriteBatchMan.Add(SpriteBatch.Name.Aliens, 2);
//         const pSB_Boxes = SpriteBatchMan.Add(SpriteBatch.Name.Boxes, 1);
        
//         // 🔥 FIX 2: Created the batch for the Ship & Missiles so they actually render!
//         // (Verify SpriteBatch.Name.Ships matches whatever your ShipMan/Missile uses)
//         const pSB_Ships = SpriteBatchMan.Add(SpriteBatch.Name.Ships, 3); 

//         // 4. Create Walls (Adjusted for Phaser's Y-down layout)
//         const pWallGroup = new WallGroup(GameObject.Name.WallGroup, GameSprite.Name.NullObject, 0.0, 0.0);
        
//         // Right Wall: x=876 (edge of 896), y=512 (center), width=40, height=1024
//         const pWallRight = new WallRight(GameObject.Name.WallRight, GameSprite.Name.NullObject, 876, 512, 40, 1024);
//         const pWallLeft = new WallLeft(GameObject.Name.WallLeft, GameSprite.Name.NullObject, 20, 512, 40, 1024);
        
//         pWallGroup.Add(pWallRight);       
//         pWallGroup.Add(pWallLeft);
//         GameObjectMan.Attach(pWallGroup);

//         const pWallGroup2 = new WallGroup(GameObject.Name.WallGroup, GameSprite.Name.NullObject, 0.0, 0.0);
//         // Top Wall: x=448 (center), y=20 (top edge), width=896, height=40
//         const pWallTop = new WallTop(GameObject.Name.WallTop, GameSprite.Name.NullObject, 448, 20, 896, 40);
        
//         pWallGroup2.Add(pWallTop);
//         GameObjectMan.Attach(pWallGroup2);

//         // 🔥 FIX: Wire the Wall objects directly into the Box SpriteBatch!
//         // (Assuming pSB_Boxes was created in Step 3 just above this)
//         pWallGroup.ActivateCollisionSprite(pSB_Boxes);
//         pWallRight.ActivateCollisionSprite(pSB_Boxes);
//         pWallLeft.ActivateCollisionSprite(pSB_Boxes);
        
//         pWallGroup2.ActivateCollisionSprite(pSB_Boxes);
//         pWallTop.ActivateCollisionSprite(pSB_Boxes);

//         // 5. Build the Alien Grid using the Factory
//         const AF = new AlienFactory(SpriteBatch.Name.Aliens, SpriteBatch.Name.Boxes);
//         this.pGrid = AF.Create(GameObject.Name.AlienGrid, AlienCategory.Type.Grid);

//         let pFirstColumn = null;
//         for (let i = 0; i < 11; i++) {
//             const colName = GameObject.Name[`Column_${i}`];
//             const pColumn = AF.Create(colName, AlienCategory.Type.Column);
//             this.pGrid.Add(pColumn);
//             if (pFirstColumn === null) pFirstColumn = pColumn;
//         }

//         let currCol = pFirstColumn;
//         for (let i = 0; i < 11; i++) {
//             const xOffset = 50.0 + (66 * i);
//             currCol.Add(AF.Create(GameObject.Name.Squid, AlienCategory.Type.Squid, xOffset, 100.0));
//             currCol.Add(AF.Create(GameObject.Name.Alien, AlienCategory.Type.Alien, xOffset, 150.0));
//             currCol.Add(AF.Create(GameObject.Name.Alien, AlienCategory.Type.Alien, xOffset, 200.0));
//             currCol.Add(AF.Create(GameObject.Name.Octopus, AlienCategory.Type.Octopus, xOffset, 250.0));
//             currCol.Add(AF.Create(GameObject.Name.Octopus, AlienCategory.Type.Octopus, xOffset, 300.0));
//             currCol = currCol.pNext;
//         }
//         GameObjectMan.Attach(this.pGrid);

//         // 6. Animations & Sounds
//         const pAnimSprite_Squid = new AnimationSprite(GameSprite.Name.SquidA);
//         pAnimSprite_Squid.Attach(Image.Name.SquidB);
//         pAnimSprite_Squid.Attach(Image.Name.SquidA);

//         const pAnimSprite_Alien = new AnimationSprite(GameSprite.Name.AlienA);
//         pAnimSprite_Alien.Attach(Image.Name.AlienB);
//         pAnimSprite_Alien.Attach(Image.Name.AlienA);

//         const pAnimSprite_Octopus = new AnimationSprite(GameSprite.Name.OctopusA);
//         pAnimSprite_Octopus.Attach(Image.Name.OctopusB);
//         pAnimSprite_Octopus.Attach(Image.Name.OctopusA);

//         TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Squid, 0.5);
//         TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Alien, 0.5);
//         TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Octopus, 0.5);

//         const pSound = new Sound();
//         TimerMan.Add(TimeEvent.Name.SpriteAnimation, pSound, 0.5);

//         // 7. Input Observers
//         let pInputSubject;
//         pInputSubject = InputMan.GetArrowRightSubject();
//         pInputSubject.Attach(new MoveRightObserver());

//         pInputSubject = InputMan.GetArrowLeftSubject();
//         pInputSubject.Attach(new MoveLeftObserver());

//         pInputSubject = InputMan.GetSpaceSubject();
//         pInputSubject.Attach(new ShootObserver());

//         // 8. Missile Root
//         const pMissileGroup = new MissileGroup(GameObject.Name.MissileGroup, GameSprite.Name.NullObject, 0.0, 0.0);
//         GameObjectMan.Attach(pMissileGroup);

//         // 9. Ship Root
//         const pShipRoot = new ShipRoot(GameObject.Name.ShipRoot, GameSprite.Name.NullObject, 0.0, 0.0);
//         GameObjectMan.Attach(pShipRoot);
//         ShipMan.Create();

//         // 10. Collision Pairs & Observers
//         let pColPair;
//         pColPair = ColPairMan.Add(ColPair.Name.Alien_Wall, this.pGrid, pWallGroup);
//         pColPair.Attach(new GridObserver());
//         pColPair.Attach(new SndObserver());

//         pColPair = ColPairMan.Add(ColPair.Name.Missile_Wall, pMissileGroup, pWallGroup2);
//         pColPair.Attach(new ShipReadyObserver());
//         pColPair.Attach(new ShipRemoveMissileObserver());

//         pColPair = ColPairMan.Add(ColPair.Name.Missile_Alien, pMissileGroup, this.pGrid);
//         pColPair.Attach(new ShipReadyObserver());
//         pColPair.Attach(new ShipRemoveMissileObserver());
//         pColPair.Attach(new AlienRemoveObserver());

//         // 11. THE METRONOME
//         const marchGrid = () => {
//             this.pGrid.MoveGrid();
//             TimerMan.Add(TimeEvent.Name.SpriteAnimation, marchGrid, 0.5);
//         };
//         TimerMan.Add(TimeEvent.Name.SpriteAnimation, marchGrid, 0.5);
        
//         console.log("===== Grid Setup Complete =====");
//     }

//     update(time, delta) {
//         InputMan.Update();
//         TimerMan.Update(time / 1000);
//         GameObjectMan.Update();
        
//         ColPairMan.Process();
//         DelayedObjectMan.Process();
        
//         SpriteBatchMan.Draw();
//     }
// }

// const config = {
//     type: Phaser.AUTO,
//     width: 896,
//     height: 1024,
//     backgroundColor: '#000000',
//     scene: [Game]
// };

// export const game = new Phaser.Game(config);

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

// --- Core Engine Imports ---
import { TextureMan } from "./Texture/TextureManager.js";
import { Texture } from "./Texture/Texture.js";
import { ImageMan } from "./Image/ImageManager.js";
import { Image } from "./Image/Image.js";
import { GameSpriteMan } from "./Sprite/GameSpriteManager.js";
import { GameSprite } from "./Sprite/GameSprite.js";
import { SpriteBatchMan } from "./SpriteBatch/SpriteBatchMan.js";
import { SpriteBatch } from "./SpriteBatch/SpriteBatch.js";
import { ProxySpriteMan } from "./Sprite/ProxySpriteManager.js";
import { BoxSpriteMan } from "./Sprite/BoxSpriteManager.js";
import { TimerMan } from "./Timer/TimerMan.js";
import { TimeEvent } from "./Timer/TimeEvent.js";
import { setActiveScene } from './Globals.js';

// --- Input & Sound Imports ---
import { InputMan } from "./Input/InputMan.js";
import { MoveRightObserver } from "./Input/MoveRightObserver.js";
import { MoveLeftObserver } from "./Input/MoveLeftObserver.js";
import { ShootObserver } from "./Input/ShootObserver.js";
import { Sound } from "./Sound/Sound.js";

// --- Game Object / Animation Imports ---
import { AnimationSprite } from "./Animation_Sprite/AnimationSprite.js";
import { MovementSprite } from "./Animation_Sprite/MovementSprite.js"; // 🔥 Import the newly translated file
import { GameObjectMan } from "./GameObject/GameObjectMan.js";
import { GameObject } from "./GameObject/GameObject.js";
import { AlienCategory } from "./GameObject/Aliens/AlienCategory.js";
import { AlienFactory } from "./GameObject/AlienFactory.js";
import { ShipRoot } from "./Ship/ShipRoot.js";
import { ShipMan } from "./Ship/ShipMan.js";
import { MissileGroup } from "./GameObject/Missiles/MissileGroup.js"
import { WallGroup } from "./GameObject/Wall/WallGroup.js"
import { WallRight } from "./GameObject/Wall/WallRight.js";
import { WallLeft } from "./GameObject/Wall/WallLeft.js";
import { WallTop } from "./GameObject/Wall/WallTop.js";

// --- Collision Imports ---
import { ColPairMan } from "./Collisions/ColPairManager.js";
import { ColPair } from "./Collisions/ColPair.js";
import { GridObserver } from "./Observers/GridObserver.js";
import { SndObserver } from "./Observers/SndObserver.js";
import { ShipReadyObserver } from "./Observers/ShipReadyObserver.js";
import { ShipRemoveMissileObserver } from "./Observers/ShipRemoveMissileObserver.js";
import { AlienRemoveObserver } from "./Observers/AlienRemoveObserver.js";
import { DelayedObjectMan } from "./GameObject/DelayedObjectMan.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
    }

    init() {
        console.log("Game initialized");
        setActiveScene(this);

        TextureMan.Create(1, 1);
        ImageMan.Create(5, 2);
        GameSpriteMan.Create(4, 2);
        BoxSpriteMan.Create(3, 1);
        SpriteBatchMan.Create(3, 1);
        TimerMan.Create(3, 1);
        ProxySpriteMan.Create(10, 1);
        GameObjectMan.Create(3, 1);
        ColPairMan.Create(1, 1);
    }

    preload() {
        this.load.image('__DEFAULT', './assets/HotPink.png');
        
        // 🔥 CRITICAL: Must download over network before adding to TextureMan
        this.load.image(Texture.Name.SpaceInvaders, "assets/SI_atlas.png");
        this.load.image(Texture.Name.ShipNdShots, "assets/SpaceInvaders.png");
        
        TextureMan.Add(Texture.Name.SpaceInvaders, "assets/SI_atlas.png");
        TextureMan.Add(Texture.Name.ShipNdShots, "assets/SpaceInvaders.png");
        
        // Load Audio Files
        this.load.audio('fastinvader2', 'assets/fastinvader2.wav');
        this.load.audio('shoot', 'assets/shoot.wav');
        this.load.audio('ufo_highpitch', 'assets/ufo_highpitch.wav');
    }

    create() {
        // 1. Image Slices
        ImageMan.Add(Image.Name.OctopusA, Texture.Name.SpaceInvaders, 554, 26, 105, 71);
        ImageMan.Add(Image.Name.OctopusB, Texture.Name.SpaceInvaders, 664, 27, 97, 71);
        ImageMan.Add(Image.Name.AlienA, Texture.Name.SpaceInvaders, 118, 27, 97, 71);
        ImageMan.Add(Image.Name.AlienB, Texture.Name.SpaceInvaders, 227, 27, 97, 71);
        ImageMan.Add(Image.Name.SquidA, Texture.Name.SpaceInvaders, 349, 26, 72, 71);
        ImageMan.Add(Image.Name.SquidB, Texture.Name.SpaceInvaders, 461, 26, 72, 71);
        
        ImageMan.Add(Image.Name.PlayerShot, Texture.Name.ShipNdShots, 3, 29, 1, 4);
        ImageMan.Add(Image.Name.Ship, Texture.Name.ShipNdShots, 3, 14, 13, 8);

        const atlas = this.textures.get(Texture.Name.SpaceInvaders);
        atlas.add(Image.Name.OctopusA, 0, 554, 26, 105, 71);
        atlas.add(Image.Name.OctopusB, 0, 664, 27, 97, 71);
        atlas.add(Image.Name.AlienA, 0, 118, 27, 97, 71);
        atlas.add(Image.Name.AlienB, 0, 227, 27, 97, 71);
        atlas.add(Image.Name.SquidA, 0, 349, 26, 72, 71);
        atlas.add(Image.Name.SquidB, 0, 461, 26, 72, 71);
       
        const atlasShip = this.textures.get(Texture.Name.ShipNdShots);
        atlasShip.add(Image.Name.PlayerShot, 0, 3, 29, 1, 4);
        atlasShip.add(Image.Name.Ship, 0, 3, 14, 13, 8);

        // 2. Base Sprites 
        GameSpriteMan.Add(GameSprite.Name.SquidA, Image.Name.SquidA, Texture.Name.SpaceInvaders, 100, 532, 45, 45);
        GameSpriteMan.Add(GameSprite.Name.AlienA, Image.Name.AlienA, Texture.Name.SpaceInvaders, 100, 466, 45, 33);
        GameSpriteMan.Add(GameSprite.Name.OctopusA, Image.Name.OctopusA, Texture.Name.SpaceInvaders, 100, 400, 49, 33);
        GameSpriteMan.Add(GameSprite.Name.PlayerShot, Image.Name.PlayerShot, Texture.Name.ShipNdShots, 0, 0, 5, 40);
        GameSpriteMan.Add(GameSprite.Name.Ship, Image.Name.Ship, Texture.Name.ShipNdShots, 500, 900, 80, 28);

        // 3. Create SpriteBatches (Exactly matching C# logic)
        const pSB_Aliens = SpriteBatchMan.Add(SpriteBatch.Name.Aliens, 2);
        const pSB_Boxes = SpriteBatchMan.Add(SpriteBatch.Name.Boxes, 1);

        // 4. Create Walls 
        const pWallGroup = new WallGroup(GameObject.Name.WallGroup, GameSprite.Name.NullObject, 0.0, 0.0);
        pWallGroup.ActivateGameSprite(pSB_Aliens);
        pWallGroup.ActivateCollisionSprite(pSB_Boxes);

        const pWallRight = new WallRight(GameObject.Name.WallRight, GameSprite.Name.NullObject, 876, 512, 40, 1024);
        pWallRight.ActivateCollisionSprite(pSB_Boxes);
        
        const pWallLeft = new WallLeft(GameObject.Name.WallLeft, GameSprite.Name.NullObject, 20, 512, 40, 1024);
        pWallLeft.ActivateCollisionSprite(pSB_Boxes);
        
        pWallGroup.Add(pWallRight);       
        pWallGroup.Add(pWallLeft);
        GameObjectMan.Attach(pWallGroup);

        const pWallGroup2 = new WallGroup(GameObject.Name.WallGroup, GameSprite.Name.NullObject, 0.0, 0.0);
        pWallGroup2.ActivateGameSprite(pSB_Aliens);
        pWallGroup2.ActivateCollisionSprite(pSB_Boxes);

        const pWallTop = new WallTop(GameObject.Name.WallTop, GameSprite.Name.NullObject, 448, 20, 896, 40);
        pWallTop.ActivateCollisionSprite(pSB_Boxes);
        
        pWallGroup2.Add(pWallTop);
        GameObjectMan.Attach(pWallGroup2);

        // 5. Build the Alien Grid
        const AF = new AlienFactory(SpriteBatch.Name.Aliens, SpriteBatch.Name.Boxes);
        this.pGrid = AF.Create(GameObject.Name.AlienGrid, AlienCategory.Type.Grid);

        let pFirstColumn = null;
        for (let i = 0; i < 11; i++) {
            const colName = GameObject.Name[`Column_${i}`];
            const pColumn = AF.Create(colName, AlienCategory.Type.Column);
            pColumn.ActivateCollisionSprite(pSB_Aliens);

            this.pGrid.Add(pColumn);
            if (pFirstColumn === null) pFirstColumn = pColumn;
        }

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
        GameObjectMan.Attach(this.pGrid);

        // 6. Animations & Sounds
        const pAnimSprite_Squid = new AnimationSprite(GameSprite.Name.SquidA);
        pAnimSprite_Squid.Attach(Image.Name.SquidB);
        pAnimSprite_Squid.Attach(Image.Name.SquidA);

        const pAnimSprite_Alien = new AnimationSprite(GameSprite.Name.AlienA);
        pAnimSprite_Alien.Attach(Image.Name.AlienB);
        pAnimSprite_Alien.Attach(Image.Name.AlienA);

        const pAnimSprite_Octopus = new AnimationSprite(GameSprite.Name.OctopusA);
        pAnimSprite_Octopus.Attach(Image.Name.OctopusB);
        pAnimSprite_Octopus.Attach(Image.Name.OctopusA);

        // 🔥 RESTORED THE MOVEMENT COMMAND:
        const pMovement = new MovementSprite();

        TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Squid, 0.5);
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Alien, 0.5);
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Octopus, 0.5);
        
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, pMovement, 0.5);

        const pSound = new Sound();
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, pSound, 0.5);

        // 7. Input Observers
        let pInputSubject;
        pInputSubject = InputMan.GetArrowRightSubject();
        pInputSubject.Attach(new MoveRightObserver());

        pInputSubject = InputMan.GetArrowLeftSubject();
        pInputSubject.Attach(new MoveLeftObserver());

        pInputSubject = InputMan.GetSpaceSubject();
        pInputSubject.Attach(new ShootObserver());

        // 8. Missile Root
        const pMissileGroup = new MissileGroup(GameObject.Name.MissileGroup, GameSprite.Name.NullObject, 0.0, 0.0);
        pMissileGroup.ActivateGameSprite(pSB_Aliens);
        pMissileGroup.ActivateCollisionSprite(pSB_Boxes);
        GameObjectMan.Attach(pMissileGroup);

        // 9. Ship Root
        const pShipRoot = new ShipRoot(GameObject.Name.ShipRoot, GameSprite.Name.NullObject, 0.0, 0.0);
        GameObjectMan.Attach(pShipRoot);
        ShipMan.Create(); // (Be sure Ship attaches to pSB_Aliens internally!)

        // 10. Collision Pairs
        let pColPair;
        pColPair = ColPairMan.Add(ColPair.Name.Alien_Wall, this.pGrid, pWallGroup);
        pColPair.Attach(new GridObserver());
        pColPair.Attach(new SndObserver());

        pColPair = ColPairMan.Add(ColPair.Name.Missile_Wall, pMissileGroup, pWallGroup2);
        pColPair.Attach(new ShipReadyObserver());
        pColPair.Attach(new ShipRemoveMissileObserver());

        pColPair = ColPairMan.Add(ColPair.Name.Missile_Alien, pMissileGroup, this.pGrid);
        pColPair.Attach(new ShipReadyObserver());
        pColPair.Attach(new ShipRemoveMissileObserver());
        pColPair.Attach(new AlienRemoveObserver());
    }

    update(time, delta) {
        InputMan.Update();
        TimerMan.Update(time / 1000);
        GameObjectMan.Update();
        
        ColPairMan.Process();
        DelayedObjectMan.Process();
        
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