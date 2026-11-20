import { InputObserver } from "./InputObserver.js";
import { BoxSprite } from "../Sprite/BoxSprite.js";

export class ToggelColBox_Key_T extends InputObserver {
    Notify() {
        BoxSprite.ColSpriteToggel = !BoxSprite.ColSpriteToggel;
    }
}