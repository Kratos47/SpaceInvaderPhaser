import { WallCategory } from "./WallCategory.js";
import { ColPairMan } from "../../Collisions/ColPairManager.js";

export class WallBottom extends WallCategory {
    constructor(name, spriteName, posX, posY, width, height) {
        super(name, spriteName, WallCategory.Type.Bottom);

        this.poColObj.poColRect.Set(posX, posY, width, height);

        this.x = posX;
        this.y = posY;

        this.SetCollisionColor(1.0, 1.0, 0.0); // Yellow
    }

    Accept(other) {
        other.VisitWallBottom(this);
    }

    VisitBomb(b) {
        const pColPair = ColPairMan.GetActiveColPair();
        pColPair.SetCollision(b, this);
        pColPair.NotifyListeners();
    }

    Update() {
        super.Update();
    }
}