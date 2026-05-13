import { GameSpriteMan } from "../Sprite/GameSpriteManager.js";
import { ImageMan } from "../Image/ImageManager.js";
import { TimerMan } from "../Timer/TimerMan.js";
import { TimeEvent } from "../Timer/TimeEvent.js";

// Lightweight replica of your C# SLink node
class ImageHolder {
    constructor(pImage) {
        this.pImage = pImage;
        this.pSNext = null;
    }
}

export class AnimationSprite {
    constructor(spriteName) {
        // initialized the sprite animation is attached to
        this.pSprite = GameSpriteMan.Find(spriteName);
        console.assert(this.pSprite !== null, "AnimationSprite: pSprite not found");

        // initialize references
        this.pCurrImage = null;

        // list
        this.poFirstImage = null;
    }

    Attach(imageName) {
        // Get the image
        const pImage = ImageMan.Find(imageName);
        console.assert(pImage !== null, "AnimationSprite: Image not found");

        // Create a new holder
        const pImageHolder = new ImageHolder(pImage);

        // Attach it to the Animation Sprite ( Push to front )
        pImageHolder.pSNext = this.poFirstImage;
        this.poFirstImage = pImageHolder;

        // Set the first one to this image
        this.pCurrImage = pImageHolder;
    }

    Execute(deltaTime) {
        // advance to next image 
        let pImageHolder = this.pCurrImage.pSNext;

        // if at end of list, set to first
        if (pImageHolder === null) {
            pImageHolder = this.poFirstImage;
        }

        // squirrel away for next timer event
        this.pCurrImage = pImageHolder;

        // change image
        this.pSprite.SwapImage(pImageHolder.pImage);

        // Add itself back to timer
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, this, deltaTime);
    }
}