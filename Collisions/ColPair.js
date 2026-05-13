import { DLink } from "../Manager/DLink.js";
import { ColSubject } from "./ColSubject.js";
import { ColRect } from "./ColRect.js";
import { Iterator } from "../Composite/Iterator.js";

export class ColPair extends DLink {
    static Name = Object.freeze({
        Alien_Missile: "Alien_Missile",
        Alien_Wall: "Alien_Wall",
        Missile_Wall: "Missile_Wall",
        Missile_Alien: "Missile_Alien",
        NullObject: "NullObject",
        Not_Initialized: "Not_Initialized"
    });

    constructor() {
        super();
        this.treeA = null;
        this.treeB = null;
        this.name = ColPair.Name.Not_Initialized;
        this.poSubject = new ColSubject();
    }

    Set(colpairName, pTreeRootA, pTreeRootB) {
        console.assert(pTreeRootA !== null && pTreeRootB !== null);
        this.treeA = pTreeRootA;
        this.treeB = pTreeRootB;
        this.name = colpairName;
    }

    Wash() {
        this.treeA = null;
        this.treeB = null;
        this.name = ColPair.Name.Not_Initialized;
    }

    Process() {
        ColPair.Collide(this.treeA, this.treeB);
    }

    static Collide(pSafeTreeA, pSafeTreeB) {
        let pNodeA = pSafeTreeA;
        let pNodeB = pSafeTreeB;

        while (pNodeA !== null) {
            pNodeB = pSafeTreeB;

            while (pNodeB !== null) {
                let rectA = pNodeA.GetColObject().poColRect;
                let rectB = pNodeB.GetColObject().poColRect;

                if (ColRect.Intersect(rectA, rectB)) {
                    // Double Dispatch (Visitor)
                    pNodeA.Accept(pNodeB);
                    break;
                }
                pNodeB = Iterator.GetSibling(pNodeB);
            }
            pNodeA = Iterator.GetSibling(pNodeA);
        }
    }

    Attach(observer) { this.poSubject.Attach(observer); }
    NotifyListeners() { this.poSubject.Notify(); }
    
    SetCollision(pObjA, pObjB) {
        this.poSubject.pObjA = pObjA;
        this.poSubject.pObjB = pObjB;
    }
    
    GetName() { return this.name; }
    SetName(inName) { this.name = inName; }
}