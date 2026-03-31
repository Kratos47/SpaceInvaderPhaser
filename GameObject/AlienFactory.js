import { SpriteBatchMan } from "../SpriteBatch/SpriteBatchMan.js";
import { GameObjectMan } from "./GameObjectMan.js"; 
import { GameSprite } from "../Sprite/GameSprite.js";
import { AlienCategory } from "./Aliens/AlienCategory.js";
import { Squid } from "./Aliens/Squid.js";
import { Alien } from "./Aliens/Alien.js";
import { Octopus } from "./Aliens/Octopus.js";
import { AlienGrid } from "./Aliens/AlienGrid.js";
import { AlienColumn } from "./Aliens/AlienColumn.js";

export class AlienFactory {
    constructor(spriteBatchName) {
        this.pSpriteBatch = SpriteBatchMan.Find(spriteBatchName);
        console.assert(this.pSpriteBatch !== null, "AlienFactory could not find SpriteBatch");
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
        
        GameObjectMan.Attach(pGameObj);

        if (pGameObj.pProxySprite) {
            // FIX: Pass the actual object, NOT .name
            this.pSpriteBatch.Attach(pGameObj.pProxySprite);
        }

        return pGameObj;
    }
}