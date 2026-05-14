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

// 🔥 The new, perfectly clean Barrel Import!
import {
    TextureMan, Texture, ImageMan, Image, GameSpriteMan, GameSprite,
    SpriteBatchMan, SpriteBatch, ProxySpriteMan, BoxSpriteMan,
    TimerMan, TimeEvent, setActiveScene, InputMan, MoveRightObserver,
    MoveLeftObserver, ShootObserver, Sound, AnimationSprite, MovementSprite,
    GameObjectMan, GameObject, AlienCategory, AlienFactory, ShipRoot,
    ShipMan, MissileGroup, WallGroup, WallRight, WallLeft, WallTop,
    ColPairMan, ColPair, GridObserver, SndObserver, ShipReadyObserver,
    ShipRemoveMissileObserver, AlienRemoveObserver, DelayedObjectMan
} from "./Engine.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
    }

    init() {
        console.log("Game initialized");
        setActiveScene(this);

        // 🔥 FIX: Bump all initial capacities to 10 to bypass Manager.Grow() bugs!
        TextureMan.Create(2, 1);
        ImageMan.Create(10, 2); 
        GameSpriteMan.Create(10, 2); 
        BoxSpriteMan.Create(10, 1);
        SpriteBatchMan.Create(10, 1);
        TimerMan.Create(10, 1);
        ProxySpriteMan.Create(100, 10);
        GameObjectMan.Create(10, 1);
        ColPairMan.Create(10, 1);
    }

    preload() {
        this.load.image('__DEFAULT', './assets/HotPink.png');

        // 🔥 Consolidated to just the single original SpaceInvaders texture
        this.load.image(Texture.Name.SpaceInvaders, "assets/SpaceInvaders.png");
        TextureMan.Add(Texture.Name.SpaceInvaders, "assets/SpaceInvaders.png");

        // Load Audio Files
        this.load.audio('fastinvader2', 'assets/fastinvader2.wav');
        this.load.audio('shoot', 'assets/shoot.wav');
        this.load.audio('ufo_highpitch', 'assets/ufo_highpitch.wav');
    }

    create() {
        // 1. Setup Image Data 
        ImageMan.Add(Image.Name.OctopusA, Texture.Name.SpaceInvaders, 3, 3, 12, 8);
        ImageMan.Add(Image.Name.OctopusB, Texture.Name.SpaceInvaders, 18, 3, 12, 8);
        ImageMan.Add(Image.Name.AlienA, Texture.Name.SpaceInvaders, 33, 3, 11, 8);
        ImageMan.Add(Image.Name.AlienB, Texture.Name.SpaceInvaders, 47, 3, 11, 8);
        ImageMan.Add(Image.Name.SquidA, Texture.Name.SpaceInvaders, 61, 3, 8, 8);
        ImageMan.Add(Image.Name.SquidB, Texture.Name.SpaceInvaders, 72, 3, 8, 8);
        ImageMan.Add(Image.Name.PlayerShot, Texture.Name.SpaceInvaders, 3, 29, 1, 4);
        ImageMan.Add(Image.Name.Ship, Texture.Name.SpaceInvaders, 3, 14, 13, 8);

        // 🔥 Slice the Phaser Atlas using the EXACT same original C# coordinates
        const atlas = this.textures.get(Texture.Name.SpaceInvaders);
        atlas.add(Image.Name.OctopusA, 0, 3, 3, 12, 8);
        atlas.add(Image.Name.OctopusB, 0, 18, 3, 12, 8);
        atlas.add(Image.Name.AlienA, 0, 33, 3, 11, 8);
        atlas.add(Image.Name.AlienB, 0, 47, 3, 11, 8);
        atlas.add(Image.Name.SquidA, 0, 61, 3, 8, 8);
        atlas.add(Image.Name.SquidB, 0, 72, 3, 8, 8);
        atlas.add(Image.Name.PlayerShot, 0, 3, 29, 1, 4);
        atlas.add(Image.Name.Ship, 0, 3, 14, 13, 8);

        // 2. Base Sprites (Routed entirely through SpaceInvaders texture)
        GameSpriteMan.Add(GameSprite.Name.SquidA, Image.Name.SquidA, Texture.Name.SpaceInvaders, 100, 532, 45, 45);
        GameSpriteMan.Add(GameSprite.Name.AlienA, Image.Name.AlienA, Texture.Name.SpaceInvaders, 100, 466, 45, 33);
        GameSpriteMan.Add(GameSprite.Name.OctopusA, Image.Name.OctopusA, Texture.Name.SpaceInvaders, 100, 400, 49, 33);
        GameSpriteMan.Add(GameSprite.Name.PlayerShot, Image.Name.PlayerShot, Texture.Name.SpaceInvaders, 0, 0, 5, 40);
        GameSpriteMan.Add(GameSprite.Name.Ship, Image.Name.Ship, Texture.Name.SpaceInvaders, 500, 900, 80, 28);
        console.log("SHIP SEARCH RESULT:", GameSpriteMan.Find(GameSprite.Name.Ship));

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

        //Change the width to 5000 so it catches missiles fired from out of bounds!
        const pWallTop = new WallTop(GameObject.Name.WallTop, GameSprite.Name.NullObject, 448, 20, 5000, 40);
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

        const pMovement = new MovementSprite();
        const pSound = new Sound();

        // 🔥 THE BROWSER AUTOPLAY FIX:
        // Create a classic arcade start text in the center of the screen
        const startText = this.add.text(448, 512, 'CLICK TO START', { 
            fontSize: '40px', 
            fill: '#00FF00', 
            fontFamily: 'Courier',
            fontStyle: 'bold'
        }).setOrigin(0.5);

       // Wait for a mouse click anywhere on the game canvas
        this.input.once('pointerdown', () => {
            
            // 1. Destroy the start text
            startText.destroy(); 
            
            // 🔥 2. BROWSER SECURITY BYPASS: 
            // We must force the AudioContext to wake up instantly before TimerMan takes over!
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
            // Play a silent dummy note to permanently unlock the browser's audio pipeline
            this.sound.play('fastinvader2', { volume: 0 }); 

            // 3. Now it is safe to hand the commands to the 0.5 second delay loop
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Squid, 0.5);
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Alien, 0.5);
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Octopus, 0.5);
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, pMovement, 0.5);
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, pSound, 0.5);
            
        });

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
        ShipMan.Create(); 

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

        // --- RAW PHASER RENDER HACK ---
        // This bypasses your SpriteBatches and Managers entirely
        this.add.sprite(448, 512, Texture.Name.SpaceInvaders, Image.Name.Ship).setDisplaySize(80, 28);

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
    pixelArt: true,
    scene: [Game]
};

export const game = new Phaser.Game(config);