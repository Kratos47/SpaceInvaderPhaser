import { Leaf } from "../../Composite/Leaf.js";
import { Component } from "../../Composite/Component.js";
import { ForwardIterator } from "../../Composite/ForwardIterator.js";

export class AlienCategory extends Leaf {
    static Type = Object.freeze({
        Squid: "Squid",
        Alien: "Alien",
        Octopus: "Octopus",
        Column: "Column",
        Grid: "Grid",
        Missile: "Missile",
        MissileGroup: "MissileGroup"
    });

    constructor(name, spriteName) {
        super(name, spriteName);
    }
}