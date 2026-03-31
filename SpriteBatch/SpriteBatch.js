/**
 * @file SpriteBatch.js
 * @description Represents a rendering layer/group containing its own SBNodeMan.
 */

import { DLink } from "../Manager/DLink.js";
import { SBNodeMan } from "./SBNodeMan.js";

export class SpriteBatch_Link extends DLink {}

export class SpriteBatch extends SpriteBatch_Link {
    static Name = Object.freeze({
        PacMan: "PacMan",
        AngryBirds: "AngryBirds",
        Boxes: "Boxes",
        Aliens: "Aliens",
        Stitch: "Stitch",
        Uninitialized: "Uninitialized"
    });

    constructor() {
        super();
        this.name = SpriteBatch.Name.Uninitialized;
        this.priority = 0;
        this.pSBNodeMan = new SBNodeMan();
    }

    Set(name, priority, reserveNum = 3, reserveGrow = 1) {
        this.name = name;
        this.priority = priority;
        this.pSBNodeMan.Set(name, reserveNum, reserveGrow);
    }

    Attach(spriteParam) { return this.pSBNodeMan.Attach(spriteParam); }
    Wash() {}
    Dump() {}
    
    SetName(inName) { this.name = inName; }
    GetName() { return this.name; }
    GetSBNodeMan() { return this.pSBNodeMan; }
}