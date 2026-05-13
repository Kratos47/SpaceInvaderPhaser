/**
 * @file Engine.js
 * @description Barrel file to consolidate all Space Invaders engine imports into a single clean module.
 */

// --- Core Engine ---
export { TextureMan } from "./Texture/TextureManager.js";
export { Texture } from "./Texture/Texture.js";
export { ImageMan } from "./Image/ImageManager.js";
export { Image } from "./Image/Image.js";
export { GameSpriteMan } from "./Sprite/GameSpriteManager.js";
export { GameSprite } from "./Sprite/GameSprite.js";
export { SpriteBatchMan } from "./SpriteBatch/SpriteBatchMan.js";
export { SpriteBatch } from "./SpriteBatch/SpriteBatch.js";
export { ProxySpriteMan } from "./Sprite/ProxySpriteManager.js";
export { BoxSpriteMan } from "./Sprite/BoxSpriteManager.js";
export { TimerMan } from "./Timer/TimerMan.js";
export { TimeEvent } from "./Timer/TimeEvent.js";
export { setActiveScene } from './Globals.js';

// --- Input & Sound ---
export { InputMan } from "./Input/InputMan.js";
export { MoveRightObserver } from "./Input/MoveRightObserver.js";
export { MoveLeftObserver } from "./Input/MoveLeftObserver.js";
export { ShootObserver } from "./Input/ShootObserver.js";
export { Sound } from "./Sound/Sound.js";

// --- Game Objects & Animations ---
export { AnimationSprite } from "./Animation_Sprite/AnimationSprite.js";
export { MovementSprite } from "./Animation_Sprite/MovementSprite.js";
export { GameObjectMan } from "./GameObject/GameObjectMan.js";
export { GameObject } from "./GameObject/GameObject.js";
export { AlienCategory } from "./GameObject/Aliens/AlienCategory.js";
export { AlienFactory } from "./GameObject/AlienFactory.js";
export { ShipRoot } from "./Ship/ShipRoot.js";
export { ShipMan } from "./Ship/ShipMan.js";
export { MissileGroup } from "./GameObject/Missiles/MissileGroup.js"
export { WallGroup } from "./GameObject/Wall/WallGroup.js"
export { WallRight } from "./GameObject/Wall/WallRight.js";
export { WallLeft } from "./GameObject/Wall/WallLeft.js";
export { WallTop } from "./GameObject/Wall/WallTop.js";

// --- Collisions & Observers ---
export { ColPairMan } from "./Collisions/ColPairManager.js";
export { ColPair } from "./Collisions/ColPair.js";
export { GridObserver } from "./Observers/GridObserver.js";
export { SndObserver } from "./Observers/SndObserver.js";
export { ShipReadyObserver } from "./Observers/ShipReadyObserver.js";
export { ShipRemoveMissileObserver } from "./Observers/ShipRemoveMissileObserver.js";
export { AlienRemoveObserver } from "./Observers/AlienRemoveObserver.js";
export { DelayedObjectMan } from "./GameObject/DelayedObjectMan.js";