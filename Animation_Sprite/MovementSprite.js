import { GameObjectMan } from "../GameObject/GameObjectMan.js";
import { GameObject } from "../GameObject/GameObject.js";
import { TimerMan } from "../Timer/TimerMan.js";
import { TimeEvent } from "../Timer/TimeEvent.js";

export class MovementSprite {
    constructor() {
        this.pGrid = GameObjectMan.Find(GameObject.Name.AlienGrid);
        console.assert(this.pGrid !== null, "MovementSprite: AlienGrid not found");
    }

    Execute(deltaTime) {
        this.pGrid.MoveGrid();

        if (this.pGrid.visitwallright === true || this.pGrid.visitwallleft === true) {  
            this.pGrid.JumpDown();
            this.pGrid.visitwallright = false;
            this.pGrid.visitwallleft = false;
        }

        // Add itself back to timer
        TimerMan.Add(TimeEvent.Name.SpriteAnimation, this, deltaTime);
    }
}