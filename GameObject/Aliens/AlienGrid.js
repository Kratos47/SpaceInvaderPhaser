import { Composite } from "../../Composite/Composite.js";
import { ForwardIterator } from "../../Composite/ForwardIterator.js";
import { Iterator } from "../../Composite/Iterator.js";
import { ColPair } from "../../Collisions/ColPair.js";

export class AlienGrid extends Composite {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName);
        this.x = posX;
        this.y = posY;

        if (this.poColObj && this.poColObj.pColSprite) {
            this.poColObj.pColSprite.SwapColor({ r: 0, g: 1, b: 0 }); // Green
        }
        this.deltaX = 20.0;
        this.visitwallright = false;
        this.visitwallleft = false;
        this.hitsound = true;
    }

    Accept(other) {
        other.VisitGrid(this);
    }

    VisitMissileGroup(m) {
        // MissileRoot vs WallRoot
        const pGameObj = Iterator.GetChild(m);
        ColPair.Collide(pGameObj, this);
    }

    VisitMissile(m) {
        // Missile vs WallRoot
        const pGameObj = Iterator.GetChild(this);
        ColPair.Collide(m, pGameObj);
    }

    Update() {
        super.BaseUpdateBoundingBox(this);
        super.Update();
    }

    
    MoveGrid() {
        const pFor = new ForwardIterator(this);
        let pNode = pFor.First();
        
        while (!pFor.IsDone()) {
            pNode.x += this.deltaX;
            pNode = pFor.Next();
        }
    }

    JumpDown() {
        const pFor = new ForwardIterator(this);
        let pNode = pFor.First();
        
        while (!pFor.IsDone()) {
            // Note: Changed to +20.0 because Phaser Y goes down the screen!
            pNode.y += 20.0; 
            pNode = pFor.Next();
        }
        this.hitsound = true;
    }

    GetDeltaX() {
        return this.deltaX;
    }

    SetDelta(inDeltaX) {
        this.deltaX = inDeltaX;
    }
}