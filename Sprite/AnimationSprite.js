import { Command } from "../Timer/Command.js"; 
import { GameSpriteMan } from "./GameSpriteManager.js";
import { ImageMan } from "../Image/ImageManager.js";
import { TimerMan } from "../Timer/TimerMan.js";
import { TimeEvent } from "../Timer/TimeEvent.js";
import { SLink } from "../Manager/Slink.js";

// ImageHolder now properly inherits from your SLink base class
class ImageHolder extends SLink {
    constructor(pImage) {
        super(); // Initializes this.pSNext = null
        this.pImage = pImage;
    }
}

export class AnimationSprite extends Command {
    constructor(spriteName) {
        super();
        
        // initialized the sprite animation is attached to
        this.pSprite = GameSpriteMan.Find(spriteName);
        console.assert(this.pSprite !== null, "AnimationSprite failed to find GameSprite");

        // initialize references
        this.pCurrImage = null;

        // list
        this.poFirstImage = null;
    }

    Attach(imageName) {
        // Get the image
        const pImage = ImageMan.Find(imageName);
        console.assert(pImage !== null, "AnimationSprite failed to find Image");

        // Create a new holder
        const pImageHolder = new ImageHolder(pImage);
        console.assert(pImageHolder !== null);

        // Attach it to the Animation Sprite ( Push to front )
        // We create a temporary reference object to mimic C#'s 'ref' keyword
        let refObj = { head: this.poFirstImage };
        SLink.AddToFront(refObj, pImageHolder);
        
        // Unpack the modified reference back into our class variable
        this.poFirstImage = refObj.head;

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