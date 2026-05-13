import { ColObserver } from "../Collisions/ColObserver.js"
import { WallCategory } from "../GameObject/Wall/WallCategory.js"

export class GridObserver extends ColObserver {
    Notify() {
        // OK do some magic
        const pGrid = this.pSubject.pObjA;
        const pWall = this.pSubject.pObjB;

        if (pWall.GetCategoryType() === WallCategory.Type.Right) {
            pGrid.SetDelta(-20.0);
            pGrid.visitwallright = true;
        } else if (pWall.GetCategoryType() === WallCategory.Type.Left) {
            pGrid.SetDelta(20.0);
            pGrid.visitwallleft = true;
        } else {
            console.assert(false, "GridObserver: Unknown WallType");
        }
    }
}