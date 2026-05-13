import { SpriteBatchMan } from "../SpriteBatch/SpriteBatchMan.js";
import { GameSprite } from "../Sprite/GameSprite.js";
import { AlienCategory } from "./Aliens/AlienCategory.js";
import { Squid } from "./Aliens/Squid.js";
import { Alien } from "./Aliens/Alien.js";
import { Octopus } from "./Aliens/Octopus.js";
import { AlienGrid } from "./Aliens/AlienGrid.js";
import { AlienColumn } from "./Aliens/AlienColumn.js";

export class AlienFactory {
    // 1. Added boxSpriteBatchName to constructor to match C#
    constructor(spriteBatchName, boxSpriteBatchName) {
        this.pSpriteBatch = SpriteBatchMan.Find(spriteBatchName);
        console.assert(this.pSpriteBatch !== null, "AlienFactory: could not find SpriteBatch");
        
        this.pBoxSpriteBatch = SpriteBatchMan.Find(boxSpriteBatchName);
        console.assert(this.pBoxSpriteBatch !== null, "AlienFactory: could not find BoxSpriteBatch");
    }

    Create(name, type, posX = 0.0, posY = 0.0) {
        let pGameObj = null;

        switch (type) {
            case AlienCategory.Type.Squid:
                pGameObj = new Squid(name, GameSprite.Name.SquidA, posX, posY);
                break;

            case AlienCategory.Type.Alien:
                pGameObj = new Alien(name, GameSprite.Name.AlienA, posX, posY);
                break;

            case AlienCategory.Type.Octopus:
                pGameObj = new Octopus(name, GameSprite.Name.OctopusA, posX, posY);
                break;

            case AlienCategory.Type.Grid:
                pGameObj = new AlienGrid(name, GameSprite.Name.NullObject, 0.0, 0.0);
                break;

            case AlienCategory.Type.Column:
                pGameObj = new AlienColumn(name, GameSprite.Name.NullObject, 0.0, 0.0);
                break;

            default:
                console.assert(false, `Unknown AlienCategory.Type: ${type}`);
                break;
        }

        console.assert(pGameObj !== null);
        
        // C# Equivalent: //GameObjectMan.Attach(pGameObj); 
        // We do NOT attach here because it gets added to the composite tree via pGrid.Add()!

        // 2. Exact C# 1:1 method calls for wiring sprites
        pGameObj.ActivateGameSprite(this.pSpriteBatch);
        pGameObj.ActivateCollisionSprite(this.pBoxSpriteBatch);

        return pGameObj;
    }
}