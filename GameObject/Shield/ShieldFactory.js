import { ShieldBrick } from "./ShieldBrick.js";
import { ShieldRoot } from "./ShieldRoot.js";
import { ShieldGrid } from "./ShieldGrid.js";
import { ShieldColumn } from "./ShieldColumn.js";
import { ShieldCategory } from "./ShieldCategory.js";
import { SpriteBatchMan } from "../../SpriteBatch/SpriteBatchMan.js";
import { GameSprite } from "../../Sprite/GameSprite.js";

export class ShieldFactory {
    constructor(spriteBatchName, collisionSpriteBatchName, pTree) {
        this.pSpriteBatch = SpriteBatchMan.Find(spriteBatchName);
        console.assert(this.pSpriteBatch !== null, "ShieldFactory: Could not find SpriteBatch");

        this.pCollisionSpriteBatch = SpriteBatchMan.Find(collisionSpriteBatchName);
        console.assert(this.pCollisionSpriteBatch !== null, "ShieldFactory: Could not find Collision SpriteBatch");

        console.assert(pTree !== null, "ShieldFactory: pTree is null");
        this.pTree = pTree;
    }

    SetParent(pParentNode) {
        console.assert(pParentNode !== null);
        this.pTree = pParentNode;
    }

    Create(type, gameName, posX = 0.0, posY = 0.0) {
        let pShield = null;

        switch (type) {
            case ShieldCategory.Type.Brick:
                pShield = new ShieldBrick(gameName, GameSprite.Name.Brick, posX, posY);
                break;
            case ShieldCategory.Type.LeftTop1:
                pShield = new ShieldBrick(gameName, GameSprite.Name.Brick_LeftTop1, posX, posY);
                break;
            case ShieldCategory.Type.LeftTop0:
                pShield = new ShieldBrick(gameName, GameSprite.Name.Brick_LeftTop0, posX, posY);
                break;
            case ShieldCategory.Type.LeftBottom:
                pShield = new ShieldBrick(gameName, GameSprite.Name.Brick_LeftBottom, posX, posY);
                break;
            case ShieldCategory.Type.RightTop1:
                pShield = new ShieldBrick(gameName, GameSprite.Name.Brick_RightTop1, posX, posY);
                break;
            case ShieldCategory.Type.RightTop0:
                pShield = new ShieldBrick(gameName, GameSprite.Name.Brick_RightTop0, posX, posY);
                break;
            case ShieldCategory.Type.RightBottom:
                pShield = new ShieldBrick(gameName, GameSprite.Name.Brick_RightBottom, posX, posY);
                break;
            case ShieldCategory.Type.Root:
                pShield = new ShieldRoot(gameName, GameSprite.Name.NullObject, posX, posY);
                if (pShield.poColObj && pShield.poColObj.pColSprite) pShield.poColObj.pColSprite.SetLineColor(0, 0, 1);
                break;
            case ShieldCategory.Type.Grid:
                pShield = new ShieldGrid(gameName, GameSprite.Name.NullObject, posX, posY);
                if (pShield.poColObj && pShield.poColObj.pColSprite) pShield.poColObj.pColSprite.SetLineColor(0, 0, 1);
                break;
            case ShieldCategory.Type.Column:
                pShield = new ShieldColumn(gameName, GameSprite.Name.NullObject, posX, posY);
                if (pShield.poColObj && pShield.poColObj.pColSprite) pShield.poColObj.pColSprite.SetLineColor(1, 0, 0);
                break;
            default:
                console.assert(false, "ShieldFactory: Unknown Shield Category Type");
                break;
        }

        // Add to the composite tree
        this.pTree.Add(pShield);

        // Attach to the rendering lists
        pShield.ActivateGameSprite(this.pSpriteBatch);
        pShield.ActivateCollisionSprite(this.pCollisionSpriteBatch);

        return pShield;
    }
}