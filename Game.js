/**
- @file Game.js
- @description The main Phaser Scene handling initialization, asset loading, and the update loop.
 */

// --- FIX: INPUT HIJACKING ---
// window.addEventListener("keydown", function (e) {
//     if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
//         e.preventDefault();
//     }
// }, false);

// 🚀 Barrel Import
import {
    Simulation, TextureMan, Texture, ImageMan, Image, GameSpriteMan, GameSprite,
    SpriteBatchMan, SpriteBatch, ProxySpriteMan, BoxSpriteMan,
    TimerMan, TimeEvent, setActiveScene, InputMan, MoveRightObserver,
    MoveLeftObserver, ShootObserver, ToggelColBox_Key_T, Sound, AnimationSprite, MovementSprite,
    GameObjectMan, GameObject, AlienCategory, AlienFactory, ShipRoot,
    ShipMan, MissileGroup, WallGroup, WallRight, WallLeft, WallTop, WallBottom,
    ColPairMan, ColPair, GridObserver, SndObserver, ShipReadyObserver,
    ShipRemoveMissileObserver, RemoveMissileObserver, RemoveBombObserver, RemoveBrickObserver, AlienRemoveObserver,
    DelayedObjectMan, ShieldRoot, ShieldFactory, ShieldCategory, BombRoot, BombSpawnEvent, MissileSpawnEvent
} from "./Engine.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
    }

    init() {
        console.log("Game initialized");
        setActiveScene(this);

        Simulation.Create();
        TextureMan.Create(2, 1);
        ImageMan.Create(30, 5);
        GameSpriteMan.Create(30, 5);
        BoxSpriteMan.Create(10, 1);
        SpriteBatchMan.Create(10, 1);
        TimerMan.Create(500, 10);
        ProxySpriteMan.Create(200, 50);
        GameObjectMan.Create(20, 5);
        ColPairMan.Create(10, 1);
    }

    preload() {
        this.load.image('__DEFAULT', './assets/HotPink.png');
        this.load.image(Texture.Name.SpaceInvaders, "assets/SpaceInvaders.png");
        TextureMan.Add(Texture.Name.SpaceInvaders, "assets/SpaceInvaders.png");

        this.load.image(Texture.Name.Birds, "assets/Birds_N_Shield.png");
        TextureMan.Add(Texture.Name.Birds, "assets/Birds_N_Shield.png");

        this.load.audio('fastinvader2', 'assets/fastinvader2.wav');
        this.load.audio('shoot', 'assets/shoot.wav');
        this.load.audio('ufo_highpitch', 'assets/ufo_highpitch.wav');
    }

    create() {
        // -------------------------------------------------------------------------
        // 1. Setup Image Data
        // -------------------------------------------------------------------------
        ImageMan.Add(Image.Name.OctopusA, Texture.Name.SpaceInvaders, 3, 3, 12, 8);
        ImageMan.Add(Image.Name.OctopusB, Texture.Name.SpaceInvaders, 18, 3, 12, 8);
        ImageMan.Add(Image.Name.AlienA, Texture.Name.SpaceInvaders, 33, 3, 11, 8);
        ImageMan.Add(Image.Name.AlienB, Texture.Name.SpaceInvaders, 47, 3, 11, 8);
        ImageMan.Add(Image.Name.SquidA, Texture.Name.SpaceInvaders, 61, 3, 8, 8);
        ImageMan.Add(Image.Name.SquidB, Texture.Name.SpaceInvaders, 72, 3, 8, 8);
        ImageMan.Add(Image.Name.PlayerShot, Texture.Name.SpaceInvaders, 3, 29, 1, 4);
        ImageMan.Add(Image.Name.Ship, Texture.Name.SpaceInvaders, 3, 14, 13, 8);

        const atlas = this.textures.get(Texture.Name.SpaceInvaders);
        atlas.add(Image.Name.OctopusA, 0, 3, 3, 12, 8);
        atlas.add(Image.Name.OctopusB, 0, 18, 3, 12, 8);
        atlas.add(Image.Name.AlienA, 0, 33, 3, 11, 8);
        atlas.add(Image.Name.AlienB, 0, 47, 3, 11, 8);
        atlas.add(Image.Name.SquidA, 0, 61, 3, 8, 8);
        atlas.add(Image.Name.SquidB, 0, 72, 3, 8, 8);
        atlas.add(Image.Name.PlayerShot, 0, 3, 29, 1, 4);
        atlas.add(Image.Name.Ship, 0, 3, 14, 13, 8);

        ImageMan.Add(Image.Name.BombStraight, Texture.Name.Birds, 225, 70, 10, 10);
        ImageMan.Add(Image.Name.BombZigZag, Texture.Name.Birds, 132, 100, 20, 50);
        ImageMan.Add(Image.Name.BombCross, Texture.Name.Birds, 219, 103, 19, 47);
        ImageMan.Add(Image.Name.Brick, Texture.Name.Birds, 20, 210, 10, 5);
        ImageMan.Add(Image.Name.BrickLeft_Top0, Texture.Name.Birds, 15, 180, 10, 5);
        ImageMan.Add(Image.Name.BrickLeft_Top1, Texture.Name.Birds, 15, 185, 10, 5);
        ImageMan.Add(Image.Name.BrickLeft_Bottom, Texture.Name.Birds, 35, 215, 10, 5);
        ImageMan.Add(Image.Name.BrickRight_Top0, Texture.Name.Birds, 75, 180, 10, 5);
        ImageMan.Add(Image.Name.BrickRight_Top1, Texture.Name.Birds, 75, 185, 10, 5);
        ImageMan.Add(Image.Name.BrickRight_Bottom, Texture.Name.Birds, 55, 215, 10, 5);

        const birdAtlas = this.textures.get(Texture.Name.Birds);
        birdAtlas.add(Image.Name.BombStraight, 0, 225, 70, 10, 10);
        birdAtlas.add(Image.Name.BombZigZag, 0, 132, 100, 20, 50);
        birdAtlas.add(Image.Name.BombCross, 0, 219, 103, 19, 47);
        birdAtlas.add(Image.Name.Brick, 0, 20, 210, 10, 5);
        birdAtlas.add(Image.Name.BrickLeft_Top0, 0, 15, 180, 10, 5);
        birdAtlas.add(Image.Name.BrickLeft_Top1, 0, 15, 185, 10, 5);
        birdAtlas.add(Image.Name.BrickLeft_Bottom, 0, 35, 215, 10, 5);
        birdAtlas.add(Image.Name.BrickRight_Top0, 0, 75, 180, 10, 5);
        birdAtlas.add(Image.Name.BrickRight_Top1, 0, 75, 185, 10, 5);
        birdAtlas.add(Image.Name.BrickRight_Bottom, 0, 55, 215, 10, 5);

        // -------------------------------------------------------------------------
        // 2. Base Game Sprites
        // -------------------------------------------------------------------------
        GameSpriteMan.Add(GameSprite.Name.SquidA, Image.Name.SquidA, Texture.Name.SpaceInvaders, 100, 532, 45, 45);
        GameSpriteMan.Add(GameSprite.Name.AlienA, Image.Name.AlienA, Texture.Name.SpaceInvaders, 100, 466, 45, 33);
        GameSpriteMan.Add(GameSprite.Name.OctopusA, Image.Name.OctopusA, Texture.Name.SpaceInvaders, 100, 400, 49, 33);
        GameSpriteMan.Add(GameSprite.Name.PlayerShot, Image.Name.PlayerShot, Texture.Name.SpaceInvaders, 0, 0, 5, 40);
        GameSpriteMan.Add(GameSprite.Name.Ship, Image.Name.Ship, Texture.Name.SpaceInvaders, 500, 900, 80, 28);

        GameSpriteMan.Add(GameSprite.Name.BombZigZag, Image.Name.BombZigZag, Texture.Name.Birds, 200, 200, 20, 60);
        GameSpriteMan.Add(GameSprite.Name.BombStraight, Image.Name.BombStraight, Texture.Name.Birds, 100, 100, 5, 50);
        GameSpriteMan.Add(GameSprite.Name.BombDagger, Image.Name.BombCross, Texture.Name.Birds, 100, 100, 20, 60);

        GameSpriteMan.Add(GameSprite.Name.Brick, Image.Name.Brick, Texture.Name.Birds, 50, 25, 20, 10);
        GameSpriteMan.Add(GameSprite.Name.Brick_LeftTop0, Image.Name.BrickLeft_Top0, Texture.Name.Birds, 50, 25, 20, 10);
        GameSpriteMan.Add(GameSprite.Name.Brick_LeftTop1, Image.Name.BrickLeft_Top1, Texture.Name.Birds, 50, 25, 20, 10);
        GameSpriteMan.Add(GameSprite.Name.Brick_LeftBottom, Image.Name.BrickLeft_Bottom, Texture.Name.Birds, 50, 25, 20, 10);
        GameSpriteMan.Add(GameSprite.Name.Brick_RightTop0, Image.Name.BrickRight_Top0, Texture.Name.Birds, 50, 25, 20, 10);
        GameSpriteMan.Add(GameSprite.Name.Brick_RightTop1, Image.Name.BrickRight_Top1, Texture.Name.Birds, 50, 25, 20, 10);
        GameSpriteMan.Add(GameSprite.Name.Brick_RightBottom, Image.Name.BrickRight_Bottom, Texture.Name.Birds, 50, 25, 20, 10);

        GameSpriteMan.Add(GameSprite.Name.Missile, Image.Name.PlayerShot, Texture.Name.SpaceInvaders, 0, 0, 5, 40);

        // -------------------------------------------------------------------------
        // 3. Create SpriteBatches
        // -------------------------------------------------------------------------
        const pSB_Aliens = SpriteBatchMan.Add(SpriteBatch.Name.Aliens, 2);
        const pSB_Boxes = SpriteBatchMan.Add(SpriteBatch.Name.Boxes, 1);
        const pSB_Shields = SpriteBatchMan.Add(SpriteBatch.Name.Shields, 3);

        // -------------------------------------------------------------------------
        // 4. Create Walls
        // -------------------------------------------------------------------------
        const pWallGroup = new WallGroup(GameObject.Name.WallGroup, GameSprite.Name.NullObject, 0.0, 0.0);
        pWallGroup.ActivateGameSprite(pSB_Aliens);
        pWallGroup.ActivateCollisionSprite(pSB_Boxes);

        const pWallRight = new WallRight(GameObject.Name.WallRight, GameSprite.Name.NullObject, 876, 512, 40, 1024);
        pWallRight.ActivateCollisionSprite(pSB_Boxes);

        const pWallLeft = new WallLeft(GameObject.Name.WallLeft, GameSprite.Name.NullObject, 20, 512, 40, 1024);
        pWallLeft.ActivateCollisionSprite(pSB_Boxes);

        const pWallBottom = new WallBottom(GameObject.Name.WallBottom, GameSprite.Name.NullObject, 448, 1000, 1000, 40);
        pWallBottom.ActivateCollisionSprite(pSB_Boxes);

        pWallGroup.Add(pWallRight);
        pWallGroup.Add(pWallLeft);
        pWallGroup.Add(pWallBottom);
        GameObjectMan.Attach(pWallGroup);

        const pWallGroup2 = new WallGroup(GameObject.Name.WallGroup, GameSprite.Name.NullObject, 0.0, 0.0);
        pWallGroup2.ActivateGameSprite(pSB_Aliens);
        pWallGroup2.ActivateCollisionSprite(pSB_Boxes);

        const pWallTop = new WallTop(GameObject.Name.WallTop, GameSprite.Name.NullObject, 448, 20, 5000, 40);
        pWallTop.ActivateCollisionSprite(pSB_Boxes);

        pWallGroup2.Add(pWallTop);
        GameObjectMan.Attach(pWallGroup2);

        // -------------------------------------------------------------------------
        // 5. Build the Alien Grid
        // -------------------------------------------------------------------------
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

        // -------------------------------------------------------------------------
        // 6. Build the Bomb Root
        // -------------------------------------------------------------------------
        const pBombRoot = new BombRoot(GameObject.Name.BombRoot, GameSprite.Name.NullObject, 0.0, 0.0);
        pBombRoot.ActivateCollisionSprite(pSB_Boxes);
        GameObjectMan.Attach(pBombRoot);

        // -------------------------------------------------------------------------
        // 7. Build the Shields (Factory Pattern)
        // -------------------------------------------------------------------------
        const pShieldRoot = new ShieldRoot(GameObject.Name.ShieldRoot, GameSprite.Name.NullObject, 0.0, 0.0);
        GameObjectMan.Attach(pShieldRoot);

        const SF = new ShieldFactory(SpriteBatch.Name.Shields, SpriteBatch.Name.Boxes, pShieldRoot);

        const brickWidth = 20.0;
        const brickHeight = 10.0;
        const start_y = 800.0;

        const bY = (index) => start_y - (index * brickHeight);

        let colIdx = 0;

        for (let s = 0; s < 4; s++) {
            let start_x = 88.0 + (s * 200);
            let off_x = 0;
            let pColumn;

            // Col 0
            SF.SetParent(pShieldRoot);
            pColumn = SF.Create(ShieldCategory.Type.Column, GameObject.Name[`ShieldColumn_${colIdx++}`]);
            SF.SetParent(pColumn);
            SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x, bY(0));
            SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x, bY(1));
            SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x, bY(2));
            SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x, bY(3));
            SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x, bY(4));
            SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x, bY(5));
            SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x, bY(6));
            SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x, bY(7));
            SF.Create(ShieldCategory.Type.LeftTop1, GameObject.Name.ShieldBrick, start_x, bY(8));
            SF.Create(ShieldCategory.Type.LeftTop0, GameObject.Name.ShieldBrick, start_x, bY(9));

            // Col 1
            SF.SetParent(pShieldRoot);
            pColumn = SF.Create(ShieldCategory.Type.Column, GameObject.Name[`ShieldColumn_${colIdx++}`]);
            SF.SetParent(pColumn);
            off_x += brickWidth;
            for (let i = 0; i <= 9; i++) SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x + off_x, bY(i));

            // Col 2
            SF.SetParent(pShieldRoot);
            pColumn = SF.Create(ShieldCategory.Type.Column, GameObject.Name[`ShieldColumn_${colIdx++}`]);
            SF.SetParent(pColumn);
            off_x += brickWidth;
            SF.Create(ShieldCategory.Type.LeftBottom, GameObject.Name.ShieldBrick, start_x + off_x, bY(2));
            for (let i = 3; i <= 9; i++) SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x + off_x, bY(i));

            // Col 3
            SF.SetParent(pShieldRoot);
            pColumn = SF.Create(ShieldCategory.Type.Column, GameObject.Name[`ShieldColumn_${colIdx++}`]);
            SF.SetParent(pColumn);
            off_x += brickWidth;
            for (let i = 3; i <= 9; i++) SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x + off_x, bY(i));

            // Col 4
            SF.SetParent(pShieldRoot);
            pColumn = SF.Create(ShieldCategory.Type.Column, GameObject.Name[`ShieldColumn_${colIdx++}`]);
            SF.SetParent(pColumn);
            off_x += brickWidth;
            SF.Create(ShieldCategory.Type.RightBottom, GameObject.Name.ShieldBrick, start_x + off_x, bY(2));
            for (let i = 3; i <= 9; i++) SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x + off_x, bY(i));

            // Col 5
            SF.SetParent(pShieldRoot);
            pColumn = SF.Create(ShieldCategory.Type.Column, GameObject.Name[`ShieldColumn_${colIdx++}`]);
            SF.SetParent(pColumn);
            off_x += brickWidth;
            for (let i = 0; i <= 9; i++) SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x + off_x, bY(i));

            // Col 6
            SF.SetParent(pShieldRoot);
            pColumn = SF.Create(ShieldCategory.Type.Column, GameObject.Name[`ShieldColumn_${colIdx++}`]);
            SF.SetParent(pColumn);
            off_x += brickWidth;
            for (let i = 0; i <= 7; i++) SF.Create(ShieldCategory.Type.Brick, GameObject.Name.ShieldBrick, start_x + off_x, bY(i));
            SF.Create(ShieldCategory.Type.RightTop1, GameObject.Name.ShieldBrick, start_x + off_x, bY(8));
            SF.Create(ShieldCategory.Type.RightTop0, GameObject.Name.ShieldBrick, start_x + off_x, bY(9));
        }

        // -------------------------------------------------------------------------
        // 8. Animations & Sounds (Timer Setup)
        // -------------------------------------------------------------------------
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

        // Load 200 Bomb Spawn Events (uncomment to run bomb stress test)
        // for (let i = 0; i < 200; i++) {
        //     const timeOffset = (Math.random() * 100) + 1.0;
        //     TimerMan.Add(TimeEvent.Name.BombSpawn, new BombSpawnEvent(), timeOffset);
        // }

        // Load 200 Missile Spawn Events (uncomment to run missile stress test)
        // for (let i = 0; i < 200; i++) {
        //     const timeOffset = (Math.random() * 100) + 1.0;
        //     TimerMan.Add(TimeEvent.Name.MissileSpawn, new MissileSpawnEvent(), timeOffset);
        // }

        const startText = this.add.text(448, 512, 'CLICK TO START', {
            fontSize: '40px', fill: '#00FF00', fontFamily: 'Courier', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            startText.destroy();
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
            this.sound.play('fastinvader2', { volume: 0 });

            TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Squid, 0.5);
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Alien, 0.5);
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, pAnimSprite_Octopus, 0.5);
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, pMovement, 0.5);
            TimerMan.Add(TimeEvent.Name.SpriteAnimation, pSound, 0.5);
        });

        // -------------------------------------------------------------------------
        // 9. Input, Simulation & Ships
        // -------------------------------------------------------------------------
        let pInputSubject;
        pInputSubject = InputMan.GetArrowRightSubject();
        pInputSubject.Attach(new MoveRightObserver());

        pInputSubject = InputMan.GetArrowLeftSubject();
        pInputSubject.Attach(new MoveLeftObserver());

        pInputSubject = InputMan.GetSpaceSubject();
        pInputSubject.Attach(new ShootObserver());

        pInputSubject = InputMan.GetTSubject();
        pInputSubject.Attach(new ToggelColBox_Key_T());

        Simulation.SetState(Simulation.State.Realtime);

        const pMissileGroup = new MissileGroup(GameObject.Name.MissileGroup, GameSprite.Name.NullObject, 0.0, 0.0);
        pMissileGroup.ActivateGameSprite(pSB_Aliens);
        pMissileGroup.ActivateCollisionSprite(pSB_Boxes);
        GameObjectMan.Attach(pMissileGroup);

        const pShipRoot = new ShipRoot(GameObject.Name.ShipRoot, GameSprite.Name.NullObject, 0.0, 0.0);
        GameObjectMan.Attach(pShipRoot);
        ShipMan.Create();

        // -------------------------------------------------------------------------
        // 10. Collision Pairs
        // -------------------------------------------------------------------------
        let pColPair;

        pColPair = ColPairMan.Add(ColPair.Name.Alien_Wall, this.pGrid, pWallGroup);
        pColPair.Attach(new GridObserver());
        pColPair.Attach(new SndObserver());

        pColPair = ColPairMan.Add(ColPair.Name.Missile_Wall, pMissileGroup, pWallGroup2);
        pColPair.Attach(new ShipReadyObserver());
        pColPair.Attach(new RemoveMissileObserver());

        pColPair = ColPairMan.Add(ColPair.Name.Missile_Alien, pMissileGroup, this.pGrid);
        pColPair.Attach(new ShipReadyObserver());
        pColPair.Attach(new ShipRemoveMissileObserver());
        pColPair.Attach(new AlienRemoveObserver());

        // Bomb & Shield Pairs
        pColPair = ColPairMan.Add(ColPair.Name.Bomb_Wall, pBombRoot, pWallGroup);
        pColPair.Attach(new RemoveBombObserver());

        pColPair = ColPairMan.Add(ColPair.Name.Bomb_Shield, pBombRoot, pShieldRoot);
        pColPair.Attach(new RemoveBombObserver());
        pColPair.Attach(new RemoveBrickObserver());

        pColPair = ColPairMan.Add(ColPair.Name.Missile_Shield, pMissileGroup, pShieldRoot);
        pColPair.Attach(new RemoveMissileObserver());
        pColPair.Attach(new RemoveBrickObserver());
        pColPair.Attach(new ShipReadyObserver());

        this.events.on('render', () => {
        SpriteBatchMan.Draw();
});
    }

   update(time, delta) {
    // Single Step, FixedStep, Realtime, Pause...
    Simulation.Update(time / 1000);

    // Input
    InputMan.Update();

    // Run based on simulation stepping
    if (Simulation.GetTimeStep() > 0.0) {
        TimerMan.Update(Simulation.GetTotalTime());
        ColPairMan.Process();
        GameObjectMan.Update();
        DelayedObjectMan.Process();
    }
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