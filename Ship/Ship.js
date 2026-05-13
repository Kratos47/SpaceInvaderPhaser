import { ShipCategory } from "./ShipCategory.js";
import { ShipMan } from "./ShipMan.js";

export class Ship extends ShipCategory {
    constructor(name, spriteName, posX, posY) {
        super(name, spriteName, ShipCategory.Type.Ship);
        this.x = posX;
        this.y = posY;

        this.shipSpeed = 3.0;
        this.state = null;
    }

    Update() {
        super.Update();
    }

    Accept(other) {
        // Important: at this point we have a Ship
        // Call the appropriate collision reaction
        other.VisitShip(this);
    }

    MoveRight() {
        this.state.MoveRight(this);
    }

    MoveLeft() {
        this.state.MoveLeft(this);
    }

    ShootMissile() {
        // Parameter removed to match JS architecture
        this.state.ShootMissile(this);
    }

    SetState(inState) {
        this.state = ShipMan.GetState(inState);
    }

    Handle() {
        this.state.Handle(this);
    }

    GetState() {
        return this.state;
    }
}