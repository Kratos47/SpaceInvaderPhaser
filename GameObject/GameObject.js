import { Component } from "../Composite/Component.js";
import {ProxySprite} from "../Sprite/ProxySprite.js"


export class GameObject extends Component {
    static Type = Object.freeze({
        Squid: "Squid",
        Alien: "Alien",
        Octopus: "Octopus",
        Column: "Column",
        Grid: "Grid"
    });

    static Name = Object.freeze({
        Squid: "Squid",
        Alien: "Alien",
        Octopus: "Octopus",
        AlienGrid: "AlienGrid",
        Column_0: "Column_0",
        Column_1: "Column_1",
        Column_2: "Column_2",
        Column_3: "Column_3",
        Column_4: "Column_4",
        Column_5: "Column_5",
        Column_6: "Column_6",
        Column_7: "Column_7",
        Column_8: "Column_8",
        Column_9: "Column_9",
        Column_10: "Column_10",
        Null_Object: "Null_Object",
        Uninitialized: "Uninitialized"
    });

    constructor(gameName = GameObject.Name.Uninitialized, spriteName = null) {
        super();
        this.name = gameName;
        this.x = 0.0;
        this.y = 0.0;
        
        // 🔥 THIS IS WHAT YOU WERE MISSING!
        // If a real sprite name is passed (like "SquidA"), create the visual Proxy.
        // If it's a structural node (like a Grid passing "NullObject"), leave it null.
        if (spriteName !== null && spriteName !== "NullObject") {
            this.pProxySprite = new ProxySprite(spriteName);
        } else {
            this.pProxySprite = null; 
        }
    }

    Update() {
        // Only push coordinate updates to the rendering engine if a proxy exists.
        if (this.pProxySprite !== null) {
            this.pProxySprite.x = this.x;
            this.pProxySprite.y = this.y;
        }
    }

    GetName() {
        return this.name;
    }

    Dump() {
        console.log(`\t\t\t       name: ${this.name} (${this})`);
        if (this.pProxySprite !== null) {
            console.log(`\t\t   pProxySprite: ${this.pProxySprite.name}`);
        } else {
            console.log("\t\t   pProxySprite: null");
        }
        console.log(`\t\t\t      (x,y): ${this.x}, ${this.y}`);
    }
}