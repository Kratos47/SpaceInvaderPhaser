import { ColRect } from "./ColRect.js";
import { BoxSpriteMan } from "../Sprite/BoxSpriteManager.js";
import { BoxSprite } from "../Sprite/BoxSprite.js";

export class ColObject {
    constructor(pProxySprite) {
        console.assert(pProxySprite !== null);

        let pSprite = pProxySprite.pSprite;
        console.assert(pSprite !== null);

        // Origin is in the UPPER RIGHT 
        this.poColRect = new ColRect(pSprite.x, pSprite.y, pSprite.sx, pSprite.sy);
        console.assert(this.poColRect !== null);

        // Create the sprite
        this.pColSprite = BoxSpriteMan.Add(BoxSprite.Name.Box, this.poColRect.x, this.poColRect.y, this.poColRect.width, this.poColRect.height);
        console.assert(this.pColSprite !== null);
        
        this.pColSprite.SwapColor({ r: 0.2, g: 0.6, b: 0.9 });
    }

    UpdatePos(x, y) {
        this.poColRect.x = x;
        this.poColRect.y = y;

        this.pColSprite.x = this.poColRect.x;
        this.pColSprite.y = this.poColRect.y;
        
        // Equivalent to SetScreenRect
        this.pColSprite.sx = this.poColRect.width;
        this.pColSprite.sy = this.poColRect.height;
        this.pColSprite.Update();
    }
}