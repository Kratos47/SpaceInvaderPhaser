import { Leaf } from "../../Composite/Leaf.js";
import { Component } from "../../Composite/Component.js";
import { ForwardIterator } from "../../Composite/ForwardIterator.js";

export class AlienCategory extends Leaf {
    static Type = Object.freeze({
        Squid: "Squid",
        Alien: "Alien",
        Octopus: "Octopus",
        Column: "Column",
        Grid: "Grid"
    });

    constructor(name, spriteName) {
        super(name, spriteName);
    }

    Move() {
        if (this.x > 850 || this.x < 30) {
            Component.deltaX *= -1.0;

            let pIt = new ForwardIterator(this.pParent.pParent);
            let pNode = pIt.First();

            while (!pIt.IsDone()) {
                // 🔥 FIX: ADD deltaY so the grid moves down the screen in Phaser!
                pNode.y += Component.deltaY;
                pNode = pIt.Next();
            }
        }
    }

    Update() {
        this.x += Component.deltaX;
        super.Update();
    }
}