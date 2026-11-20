import { DLink } from "../Manager/DLink.js";

export class ColVisitor extends DLink {
    VisitGrid(b) { console.assert(false, "VisitGrid not implemented"); }
    VisitColumn(b) { console.assert(false, "VisitColumn not implemented"); }
    VisitAlien(b) { console.assert(false, "VisitAlien not implemented"); }
    VisitOctopus(b) { console.assert(false, "VisitOctopus not implemented"); }
    VisitSquid(b) { console.assert(false, "VisitSquid not implemented"); }
    
    VisitMissile(m) { console.assert(false, "VisitMissile not implemented"); }
    VisitMissileGroup(m) { console.assert(false, "VisitMissileGroup not implemented"); }
    
    VisitWallGroup(w) { console.assert(false, "VisitWallGroup not implemented"); }
    VisitWallRight(w) { console.assert(false, "VisitWallRight not implemented"); }
    VisitWallLeft(w) { console.assert(false, "VisitWallLeft not implemented"); }
    VisitWallTop(w) { console.assert(false, "VisitWallTop not implemented"); }
    VisitWallBottom(w) { console.assert(false, "VisitWallBottom not implemented"); }
    
    VisitShip(s) { console.assert(false, "VisitShip not implemented"); }
    VisitShipRoot(s) { console.assert(false, "VisitShipRoot not implemented"); }

    // --- NEW SHIELD METHODS ---
    VisitShieldRoot(s) { console.assert(false, "VisitShieldRoot not implemented"); }
    VisitShieldGrid(s) { console.assert(false, "VisitShieldGrid not implemented"); }
    VisitShieldColumn(s) { console.assert(false, "VisitShieldColumn not implemented"); }
    VisitShieldBrick(s) { console.assert(false, "VisitShieldBrick not implemented"); }

    // --- NEW BOMB METHODS ---
    VisitBombRoot(b) { console.assert(false, "VisitBombRoot not implemented"); }
    VisitBomb(b) {console.assert(false, `VisitBomb not implemented on ${this.constructor.name}`);}

    Accept(other) { console.assert(false, "Accept not implemented"); }
}